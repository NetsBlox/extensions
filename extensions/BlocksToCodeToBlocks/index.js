(function () {
    // Much of this code is taken from Snap! 10, with modifications to support NetsBlox
    SyntaxElementMorph.prototype.revertToEmptyInput = function (arg) {
        var idx = this.parts().indexOf(arg),
            inp = this.inputs().indexOf(arg),
            deflt = new InputSlotMorph(),
            rcvr, def;
    
        if (idx !== -1) {
            if (this instanceof BlockMorph) {
                deflt = this.labelPart(this.parseSpec(this.blockSpec)[idx]);
                if (this.isCustomBlock) {
                    if (this.isGlobal) {
                        def = this.definition;
                    } else {
                        rcvr = this.scriptTarget(true);
                        if (rcvr) {
                            def = rcvr.getMethod(this.blockSpec);
                        }
                    }
                    if (def) {
                        if (deflt instanceof InputSlotMorph) {
                            deflt.setChoices.apply(
                                deflt,
                                def.inputOptionsOfIdx(inp)
                            );
                        } else if (deflt instanceof MultiArgMorph) {
                            deflt.setInfix(def.separatorOfInputIdx(inp));
                            deflt.setCollapse(def.collapseOfInputIdx(inp));
                            deflt.setExpand(def.expandOfInputIdx(inp));
                            deflt.setDefaultValue(def.defaultValueOfInputIdx(inp));
                            deflt.setInitialSlots(def.initialSlotsOfInputIdx(inp));
                            deflt.setMinSlots(def.minSlotsOfInputIdx(inp));
                            deflt.setMaxSlots(def.maxSlotsOfInputIdx(inp));
                        }
                    }
                }
            } else if (this instanceof MultiArgMorph) {
                deflt = this.labelPart(this.slotSpecFor(inp));
            } else if (this instanceof ReporterSlotMorph) {
                deflt = this.emptySlot();
            }
        }
        if (deflt.icon || deflt instanceof BooleanSlotMorph) {
            deflt.fixLayout();
        }
        this.replaceInput(arg, deflt);
        if (deflt instanceof MultiArgMorph) {
            deflt.refresh();
        } else if (deflt instanceof RingMorph) {
            deflt.fixBlockColor();
        }
        this.cachedInputs = null;
        return deflt;
    };

    BlockMorph.prototype.abstractBlockSpec = function () {
        // answer the semantic block spec substituting each input
         // with an underscore. Used as "name" of the Block.
        return this.parseSpec(this.blockSpec).map(str =>
            str === '%br' ? '$nl' : (str.length > 1 && (str[0]) === '%') ? '_' : str
        ).join(' ');
    };
    
    BlockMorph.prototype.localizeBlockSpec = function (spec) {
        // answer the translated block spec where the translation itself
        // is in the form of an abstract spec, i.e. with padded underscores
        // in place for percent-sign prefixed slot specs.
        var prefixes = ['%', '$'],
            slotSpecs = [],
            slotCount = -1,
            abstractSpec,
            translation;
    
        abstractSpec = this.parseSpec(spec).map(str => {
            if (str.length > 1 && prefixes.includes(str[0])) {
                slotSpecs.push(str);
                return '_';
            }
            return str;
        }).join(' ');
    
        // make sure to also remove any explicit slot specs from the translation
        translation = this.parseSpec(localize(abstractSpec)).map(str =>
            (str.length > 1 && prefixes.includes(str[0])) ? '_' : str
        ).join(' ');
    
        // replace abstract slot placeholders in the translation with their
        // concrete specs from the original block spec
        return translation.split(' ').map(word => {
            if (word === '_') {
                slotCount += 1;
                return slotSpecs[slotCount] || '';
            }
            return word;
        }).join(' ');
    };

    BlockMorph.prototype.dependencies = function (onlyGlobal, receiver) {
        // answer an array containing all custom block definitions referenced
        // by this and the following blocks, optional parameter to constrain
        // to global definitions.
        // specifying a receiver sprite is optional for cases where
        // the receiver sprite is not the currently edited one inside the IDE
        // if a receiver is not specified  this method can only be called from
        // within the IDE because it needs to be able to determine the scriptTarget
        var dependencies = [],
            quasiPrims = SpriteMorph.prototype.quasiPrimitives(),
            rcvr = onlyGlobal ? null : (receiver || this.scriptTarget());
        this.forAllChildren(morph => {
            var def;
            if (morph.isCustomBlock) {
                if (!onlyGlobal || (onlyGlobal && morph.isGlobal)) {
                    def = morph.isGlobal ? morph.definition
                        : rcvr.getMethod(morph.semanticSpec);
                    if (!def.isQuasiPrimitive()) {
                        [def].concat(def.collectDependencies(
                            quasiPrims,
                            [],
                            rcvr
                        )).forEach(
                            fun => {
                                if (!contains(dependencies, fun)) {
                                    dependencies.push(fun);
                                }
                            }
                        );
                    }
                }
            }
        });
        return dependencies;
    };
    
    // BlockMorph syntax analysis
    
    BlockMorph.prototype.components = function (parameterNames = []) {
        if (this instanceof ReporterBlockMorph) {
            return this.syntaxTree(parameterNames);
        }
        var seq = new List(this.blockSequence()).map((block, i) =>
            block.syntaxTree(i < 1 ? parameterNames : [])
        );
        return seq.length() === 1 ? seq.at(1) : seq;
    };
    
    BlockMorph.prototype.syntaxTree = function (parameterNames) {
        var expr = this.fullCopy(),
            nb = expr.nextBlock ? expr.nextBlock() : null,
            inputs, parts;
        if (nb) {
            nb.destroy();
        }
        expr.fixBlockColor(null, true);
        inputs = expr.inputs();
        parts = new List([expr.reify()]);
        inputs.forEach(inp => {
            var val;
            if (inp instanceof BlockMorph) {
                if (inp instanceof RingMorph && inp.isEmptySlot()) {
                    parts.add();
                    return;
                }
                parts.add(inp.components());
            } else if (inp.isEmptySlot()) {
                parts.add();
            } else if (inp instanceof MultiArgMorph) {
                if (!inp.inputs().length) {
                    parts.add();
                }
                inp.inputs().forEach((slot, i) => {
                    var entry;
                    if (slot instanceof BlockMorph) {
                        if (slot instanceof RingMorph && slot.isEmptySlot()) {
                            parts.add();
                            return;
                        }
                        parts.add(slot.components());
                    } else if (slot.isEmptySlot()) {
                        parts.add();
                    } else {
                        entry = slot.evaluate();
                        parts.add(entry instanceof BlockMorph ?
                            entry.components() : entry);
                    }
                    inp.revertToEmptyInput(slot);
                });
            } else if (inp instanceof ArgLabelMorph) {
                parts.add(inp.argMorph().components());
                expr.revertToEmptyInput(inp).collapseAll();
            } else if (inp instanceof RPCInputSlotMorph) {
                val = inp.evaluate();
                parts.add(val[0]);
            } else {
                val = inp.evaluate();
                if (val instanceof Array) {
                    val = '[' + val + ']';
                }
                if (inp instanceof ColorSlotMorph) {
                    val = val.toString();
                }
                parts.add(val instanceof BlockMorph ? val.components() : val);
            }
        });
        parts.at(1).updateEmptySlots();
        if (expr.selector === 'reportGetVar') {
            parts.add(expr.blockSpec);
            expr.setSpec('\xa0'); // non-breaking space, appears blank
        }
        parameterNames.forEach(name => parts.add(name));
        return parts;
    };
    
    BlockMorph.prototype.equalTo = function (other) {
        // private - only to be called from a Context
        return this.constructor.name === other.constructor.name &&
            this.selector === other.selector &&
            this.blockSpec === other.blockSpec;
    };
    
    BlockMorph.prototype.copyWithInputs = function (inputs) {
        // private - only to be called from a Context
        var cpy = this.fullCopy(),
            slots = cpy.inputs(),
            dta = inputs.itemsArray().map(inp =>
                inp instanceof Context ?
                    (inp.expression instanceof BlockMorph ?
                        inp.expression.fullCopy()
                        : inp.expression
                    )
                    : inp
            ),
            count = 0,
            dflt;
    
        function isOption(data) {
            return isString(data) &&
                data.length > 2 &&
                data[0] === '[' &&
                data[data.length - 1] === ']';
        }
    
        if (dta.length === 0) {
            return cpy.reify();
        }
        if (cpy.selector === 'reportGetVar' && (
            (dta.length === 1) || (cpy.blockSpec === '\xa0' && dta.length > 1))
        ) {
            cpy.setSpec(dta[0]);
            return cpy.reify(dta.slice(1));
        }
    
        // restore input slots
        slots.forEach(slt => {
            if (slt instanceof BlockMorph) {
                dflt = cpy.revertToEmptyInput(slt);
                if (dflt instanceof MultiArgMorph) {
                    dflt.collapseAll();
                }
            } else if (slt instanceof MultiArgMorph) {
                slt.inputs().forEach(entry => {
                    if (entry instanceof BlockMorph) {
                        slt.revertToEmptyInput(entry);
                    }
                });
            }
        });
    
        // distribute inputs among the slots
        slots = cpy.inputs();
        slots.forEach((slot) => {
            var inp, i, cnt, sub;
            if (slot instanceof MultiArgMorph && dta[count] instanceof List) {
                // let the list's first item control the arity of the polyadic slot
                // fill with the following items in the list
                inp = dta[count];
                if (inp.length() === 0) {
                    nop(); // ignore, i.e. leave slot as is
                } else {
                    slot.collapseAll();
                    for (i = 1; i <= inp.at(1); i += 1) {
                        cnt = inp.at(i + 1);
                        if (cnt instanceof List) {
                            cnt = Process.prototype.assemble(cnt);
                        }
                        if (cnt instanceof Context) {
                            sub = slot.addInput();
                            if (sub.nestedBlock) {
                                sub.nestedBlock(cnt.expression.fullCopy());
                            } else {
                                slot.replaceInput(
                                    sub,
                                    cnt.expression.fullCopy()
                                );
                            }
                        } else {
                            slot.addInput(cnt);
                        }
                    }
                }
                count += 1;
            } else if (slot instanceof MultiArgMorph && slot.inputs().length) {
                // fill the visible slots of the polyadic input as if they were
                // permanent inputs each
                slot.inputs().forEach(entry => {
                    inp = dta[count];
                    if (inp instanceof BlockMorph) {
                        if (inp instanceof CommandBlockMorph && entry.nestedBlock) {
                            entry.nestedBlock(inp);
                        } else if (inp instanceof ReporterBlockMorph &&
                                (!entry.isStatic || entry instanceof RingMorph)) {
                            slot.replaceInput(entry, inp);
                        }
                    } else {
                        if (inp instanceof List && inp.length() === 0) {
                            nop(); // ignore, i.e. leave slot as is
                        } else if (entry instanceof InputSlotMorph ||
                                entry instanceof TemplateSlotMorph ||
                                entry instanceof BooleanSlotMorph) {
                            entry.setContents(inp);
                        }
                    }
                    count += 1;
                });
            } else {
                // fill the visible slot, treat collapsed variadic slots as single
                // input (to be replaced by a reporter),
                // skip in case the join value is an empty list
                inp = dta[count];
                if (inp === undefined) {return; }
                if (inp instanceof BlockMorph) {
                    if (inp instanceof CommandBlockMorph && slot.nestedBlock) {
                        slot.nestedBlock(inp);
                    } else if (inp instanceof ReporterBlockMorph &&
                            (!slot.isStatic || slot instanceof RingMorph)) {
                        cpy.replaceInput(cpy.inputs()[count], inp);
                    } else if (inp instanceof ReporterBlockMorph &&
                            slot.nestedBlock) {
                        slot.nestedBlock(inp);
                    }
                } else {
                    if (inp instanceof List && inp.length() === 0) {
                        nop(); // ignore, i.e. leave slot as is
                    } else if (slot instanceof ColorSlotMorph) {
                        slot.setColor(Color.fromString(inp));
                    } else if (slot instanceof InputSlotMorph) {
                        slot.setContents(isOption(inp) ? [inp.slice(1, -1)] : inp);
                    } else if (slot instanceof TemplateSlotMorph ||
                            slot instanceof BooleanSlotMorph) {
                        slot.setContents(inp);
                    }
                }
                count += 1;
            }
        });
    
        // create a function to return
        return cpy.reify(dta.slice(count));
    };
    
    BlockMorph.prototype.copyWithNext = function (next, parameterNames) {
        var expr = this.fullCopy(),
            top;
        if (this instanceof ReporterBlockMorph) {
            return expr.reify();
        }
        top = next.fullCopy().topBlock();
        if (top instanceof CommandBlockMorph) {
            expr.bottomBlock().nextBlock(top);
        }
        return expr.reify(parameterNames);
    };
    
    BlockMorph.prototype.reify = function (inputNames, comment) {
        // private - assumes that I've already been deep copied
        var context = new Context();
        context.expression = this;
        context.inputs = inputNames || [];
        context.emptySlots = this.markEmptySlots();
        context.comment = comment || this.comment?.text();
        return context;
    };
    
    BlockMorph.prototype.markEmptySlots = function () {
        // private - mark all empty slots with an identifier
        // and return the count
        var count = 0;
    
        this.allInputs().forEach(input =>
            delete input.bindingID
        );
        this.allEmptySlots().forEach(slot => {
            count += 1;
            if (slot instanceof MultiArgMorph) {
                slot.bindingID = Symbol.for('arguments');
            } else {
                slot.bindingID = count;
            }
        });
        return count;
    };

    CustomBlockDefinition.prototype.isBootstrapped = function () {
        return this.isGlobal && this.selector &&
            SpriteMorph.prototype.blocks[this.selector] === this;
    };
    
    CustomBlockDefinition.prototype.isQuasiPrimitive = function () {
        return this.isBootstrapped() &&
            (this.primitive === this.selector ||
                this.selector === 'reportHyperZip') &&
            this.codeMapping !== null;
    };

    List.prototype.canBeWords = function () {
        return this.itemsArray().every(item =>
            isString(item) ||
            (typeof item === 'number') ||
            (item instanceof List && item.canBeWords())
        );
    };
    
    List.prototype.asWords = function () {
        // recursively join all leaf items with spaces between.
        // Caution, no error catching!
        // this method assumes that the list.canBeWords()
        return this.itemsArray().map(each =>
            each instanceof List ? each.asWords() : each.toString().trim()
        ).filter(word => word.length).join(' ');
    };
    
    // List to blocks parsing and encoding, highly experimental for v10
    
    List.prototype.parse = function (string) {
        var stream = new ReadStream(string);
        stream.upTo('(');
        stream.skip();
        this.parseStream(stream);
    };
    
    List.prototype.parseStream = function (stream) {
        var item = '',
            quoted = false,
            ch, child;
        while (!stream.atEnd()) {
            ch = stream.next();
            if (ch === ';' && !quoted) { // comment
                stream.upTo('\n');
            } else if (ch === '(' && !quoted) {
                child = new List();
                child.parseStream(stream);
                this.add(child);
            } else if ((ch === ')' || !ch.trim().length) && !quoted) {
                if (item.length) {
                    this.add(item);
                    item = '';
                }
                if (ch === ')') {
                    return;
                }
            } else if (ch === '"') {
                quoted = !quoted;
                if (!quoted && !item.length) {
                    this.add('');
                }
            } else if (ch === '\\') {
                item += stream.next();
            } else {
                item += ch;
            }
        }
    };
    
    List.prototype.encode = function (level = 0, indent = 4) {
        var str = '(',
            len = this.length(),
            hasBranch = false,
            item,
            i;
        for (i = 1; i <= len; i += 1) {
            item = this.at(i);
            if (item instanceof List && !(item.at(1) instanceof List)) {
                hasBranch = true;
            }
            str += this.encodeItem(item, level, indent);
            if (i < len) {
                str += ' ';
            }
        }
        str += hasBranch && indent ?
            '\n' + this.indentation(level, indent) + ')'
            : ')';
        return str;
    };
    
    List.prototype.encodeItem = function (data, level = 0, indent = 4) {
        if (data instanceof List) {
            if (!(data.at(1) instanceof List) && indent) {
                return '\n' +
                    this.indentation(level + 1, indent) +
                    data.encode(level + 1, indent);
            }
            return data.encode(level, indent);
        }
        return isString(data) ? this.escape(data)
            : (typeof data === 'boolean' ? this.encodeBoolean(data) : data);
    };
    
    List.prototype.escape = function (string) {
        var str = '',
            quoted = false,
            len = string.length,
            i, ch;
        if (string === 't') {
            return '\\t';
        } else if (string === 'f') {
            return '\\f';
        }
        for (i = 0; i < len; i += 1) {
            ch = string[i];
            if (ch === '"') {
                ch = '\\"';
            } else if (!ch.trim().length || '()'.includes(ch)) {
                if (!quoted) {
                    str = '"' + str;
                    quoted = true;
                }
            }
            str += ch;
        }
        return quoted ? str + '"' : str || '""';
    };
    
    List.prototype.encodeBoolean = function (data) {
        return (data === true) ? 't' : 'f';
    };
    
    List.prototype.indentation = function (level = 0, amount = 4) {
        return new Array(level * amount + 1).join(' ') || '';
    };


    SpriteMorph.prototype.getPrimitiveTemplates = function (category) {
        var blocks = this.blocksCache[category];
        if (!blocks) {
            blocks = this.blockTemplates(category);
            if (this.isCachingPrimitives) {
                this.blocksCache[category] = blocks;
            }
        }
        return blocks;
    };

    Process.prototype.isAST = function (aList) {
        var first = aList.at(1);
        if (first instanceof Context) {
            return true;
        }
        if (first instanceof List) {
            return first.at(1) instanceof Context;
        }
        return false;
    };

    Process.prototype.parseCode = function (string) {
        var data = new List();
        data.parse(string);
        return this.toBlockSyntax(data);
    };
    
    // Process syntax analysis
    
    Process.prototype.assemble = function (blocks) {
        var first;
        if (!(blocks instanceof List)) {
            return blocks;
        }
        first = blocks.at(1);
        if (first instanceof Context) {
            return first.copyWithInputs(
                blocks.cdr().map(each => this.assemble(each))
            );
        }
        if (blocks.isEmpty()) {
            return blocks;
        }
        if (this.reportIsA(blocks.at(1), 'number')) {
            return blocks.map(each => this.assemble(each));
        }
        return blocks.map(each => this.assemble(each)).itemsArray().reduce(
            (a, b) => a.copyWithNext(b)
        );
    };
    
    // Process - generating syntax trees from parsed text
    
    Process.prototype.toBlockSyntax = function (list) {
        var head;
        if (list.isEmpty()) {
            return list;
        }
        head = list.at(1);
        let l = head instanceof List ? this.toBlockSyntax(head) : this.blockMatching(head);
        let r = this.toInputSyntax(list.cdr());
    
        if(l.expression && (l.expression.selector == 'getJSFromRPCStruct' || l.expression.selector == 'doRunRPC')){
            // Build the RPC block's slots
            let inputs = r.itemsArray();
            l.expression.inputs()[0].setContents(inputs[0]);
            l.expression.inputs()[1].setContents(inputs[1]);
            l.expression.evaluate();
        }
    
        return this.variadify(
            list.cons(l, r)
        );
    };
    
    Process.prototype.blockMatching = function (string) {
        var pal = this.reportGet('blocks'),
            block,
            lbl,
            i;
        for (i = 1; i <= pal.length(); i += 1) {
            block = pal.at(i);
            if (block.expression && block.expression.isCustomBlock) {
                lbl = this.reportBasicBlockAttribute('label', block);
                if (snapEquals(string, lbl)) {
                    return block;
                }
            }
        }
        return (SpriteMorph.prototype.blockForSelector(
            this.blockAlias(string)
        ) || SpriteMorph.prototype.variableBlock(' ')).reify();
    };
    
    Process.prototype.toInputSyntax = function (list) {
        var head;
        if (list.isEmpty()) {
            return list;
        }
        head = list.at(1);
        return list.cons(
            head instanceof List ? this.toBlockSyntax(head)
                : this.parseInputValue(head),
            this.toInputSyntax(list.cdr())
        );
    };
    
    Process.prototype.parseInputValue = function (data) {
        if (data === 't') {
            return true;
        }
        if (data === 'f') {
            return false;
        }
        return data;
    };
    
    Process.prototype.variadify = function (list) {
        var ring = list.at(1),
            slot, idx, syntax, items;
        if (ring instanceof List) {
            return list;
        }
        slot = ring.expression.inputs().find(any =>
            any instanceof MultiArgMorph);
        if (slot) {
            idx = ring.expression.inputs().indexOf(slot) + 1;
            slot.collapseAll();
            items = list.itemsArray();
            syntax = new List(items.slice(0, idx));
            if (list.at(idx + 1) === ':') {
                syntax.add(list.at(idx + 2));
            } else {
                syntax.add(new List(
                    [list.cons(
                        list.length() - idx,
                        new List(items.slice(idx))
                    )]
                ));
            }
            return syntax;
        }
        return list;
    };
    
    Process.prototype.blockAlias = function (string) {
        return this.blockAliases[string] || string;
    };
    
    Process.prototype.selectorAlias = function (string) {
        return Object.keys(this.blockAliases).find(key =>
            this.blockAliases[key] === string) || string;
    };
    
    Process.prototype.blockAliases = {
        // motion:
        move : 'forward',
        right : 'turn',
        left : 'turnLeft',
        head: 'setHeading',
        glide : 'doGlide',
        changeX : 'changeXPosition',
        setX : 'setXPosition',
        changeY : 'changeYPosition',
        setY : 'setYPosition',
        bounce : 'bounceOffEdge',
        pos : 'getPosition',
        x : 'xPosition',
        y : 'yPosition',
        dir : 'direction',
    
        // looks:
        say : 'bubble',
        sayFor : 'doSayFor',
        think : 'doThink',
        thinkFor : 'doThinkFor',
        changeSize : 'changeScale',
        setSize : 'setScale',
        size : 'getScale',
    
        // sound:
    
        // pen:
        stamp : 'doStamp',
        fill: 'floodFill',
        trails : 'reportPenTrailsAsCostume',
    
        // control:
        broadcast : 'doBroadcast',
        wait : 'doWait',
        waitUntil : 'doWaitUntil',
        forever : 'doForever',
        repeat : 'doRepeat',
        until : 'doUntil',
        'for' : 'doFor',
        'if' : 'doIf',
        ifElse : 'reportIfElse',
        stop : 'doStopThis',
        run : 'doRun',
        call : 'evaluate',
        report : 'doReport',
        warp : 'doWarp',
        tell : 'doTellTo',
        ask : 'reportAskFor',
        pause : 'doPauseAll',
        pipe : 'reportPipe',
        define: 'doDefineBlock',
        setBlock: 'doSetBlockAttribute',
        getBlock: 'reportBlockAttribute',
        'this' : 'reportEnvironment',
    
        // sensing:
        date : 'reportDate',
        my : 'reportGet',
        object : 'reportObject',
        url : 'reportUrl',
    
        // operators:
        cmd : 'reifyScript',
        ring : 'reifyReporter',
        pred : 'reifyPredicate',
        '+' : 'reportVariadicSum',
        '-' : 'reportDifference',
        '*' : 'reportVariadicProduct',
        '/' : 'reportQuotient',
        round : 'reportRound',
        '^' : 'reportPower',
        '%' : 'reportModulus',
        mod : 'reportModulus',
        atan2 : 'reportAtan2',
        min : 'reportVariadicMin',
        max : 'reportVariadicMax',
        rand : 'reportRandom',
        '=' : 'reportVariadicEquals',
        '!=' : 'reportVariadicNotEquals',
        '<' : 'reportVariadicLessThan',
        '<=' : 'reportVariadicLessThanOrEquals',
        '>' : 'reportVariadicGreaterThan',
        '>=' : 'reportVariadicGreaterThanOrEquals',
        bool : 'reportBoolean',
        and : 'reportVariadicAnd',
        or : 'reportVariadicOr',
        not: 'reportNot',
        join : 'reportJoinWords',
        letter : 'reportLetter',
        unicode : 'reportUnicode',
        is : 'reportIsA',
        identical : 'reportVariadicIsIdentical',
        split : 'reportTextSplit',
    
        // variables:
        'var' : 'doDeclareVariables',
        'get' : 'reportGetVar',
        '+=' : 'doChangeVar',
        'set' : 'doSetVar',
    
        // lists:
    
        list : 'reportNewList',
        cons : 'reportCONS',
        cdr: 'reportCDR',
        data : 'reportListAttribute',
        at : 'reportListItem',
        contains : 'reportListContainsItem',
        empty : 'reportListIsEmpty',
        index : 'reportListIndex',
        add : 'doAddToList',
        del : 'doDeleteFromList',
        ins : 'doInsertInList',
        put : 'doReplaceInList',
        'from' : 'reportNumbers',
        append : 'reportConcatenatedLists',
        reshape : 'reportReshape',
        map : 'reportMap',
        keep : 'reportKeep',
        find : 'reportFindFirst',
        combine : 'reportCombine',
        forEach : 'doForEach',
    
        // extensions
    
        prim : 'doPrimitive',
        extension : 'doApplyExtension',
        ext: 'reportApplyExtension'
    };
    
    // Process - replacing blocks in syntax trees with text
    
    Process.prototype.toTextSyntax = function (list) {
        var head, syn;
        if (list.isEmpty()) {
            return list;
        }
        syn = this.devariadify(list);
        head = syn.at(1);
        return syn.cons(
            head instanceof List ? this.toTextSyntax(head)
                : this.blockToken(head),
            this.toInputTextSyntax(syn.cdr())
        );
    };
    
    Process.prototype.devariadify = function (list) {
        var ring = list.at(1),
            slot, idx, syntax;
        if (ring instanceof List) {
            return list;
        }
        slot = ring.expression.inputs().find(any =>
            any instanceof MultiArgMorph);
        if (slot && !slot.inputs().length) {
            idx = ring.expression.inputs().indexOf(slot) + 1;
            syntax = list.map(each => each); // shallow copy
            if (syntax.length() === (idx + 1) && syntax.at(idx + 1) === '') {
                syntax.remove(idx + 1);
                return syntax;
            }
            syntax.add(':', idx + 1);
            return syntax;
        }
        return list;
    };
    
    Process.prototype.blockToken = function (ring) {
        var block = ring.expression;
        return block.isCustomBlock &&
            !(block.isGlobal && block.definition.isBootstrapped()) ?
                this.reportBasicBlockAttribute('label', ring)
                : this.selectorAlias(block.selector);
    };
    
    Process.prototype.toInputTextSyntax = function (list) {
        var head;
        if (list.isEmpty()) {
            return list;
        }
        head = list.at(1);
        return list.cons(
            head instanceof List ? this.toTextSyntax(head) : head,
            this.toInputTextSyntax(list.cdr())
        );
    };
    
    // Process syntax analysis
    
    Process.prototype.assemble = function (blocks) {
        var first;
        if (!(blocks instanceof List)) {
            return blocks;
        }
        first = blocks.at(1);
        if (first instanceof Context) {
            return first.copyWithInputs(
                blocks.cdr().map(each => this.assemble(each))
            );
        }
        if (blocks.isEmpty()) {
            return blocks;
        }
        if (this.reportIsA(blocks.at(1), 'number')) {
            return blocks.map(each => this.assemble(each));
        }
        return blocks.map(each => this.assemble(each)).itemsArray().reduce(
            (a, b) => a.copyWithNext(b)
        );
    };


Process.prototype.reportBlockAttribute = function (attribute, block) {
    // hyper-dyadic
    // note: attributes in the left slot
    // can only be queried via the dropdown menu and are, therefore, not
    // reachable as dyadic inputs
    return this.hyper(
        (att, obj) => this.reportBasicBlockAttribute(att, obj),
        attribute,
        block
    );
};

Process.prototype.reportBasicBlockAttribute = function (attribute, block) {
    var choice = this.inputOption(attribute),
        expr, body, slots, data, def, info, loc, cmt, prim;
    this.assertType(block, ['command', 'reporter', 'predicate']);
    expr = block.expression;
    switch (choice) {
    case 'label':
        return expr ? expr.abstractBlockSpec() : '';
    case 'comment':
        if (block.comment) {
            return block.comment;
        }
        cmt = expr?.comment?.text();
        if (cmt) {
            return cmt;
        }
        if (expr.isCustomBlock) {
            def = (expr.isGlobal ?
                expr.definition
                : this.blockReceiver().getMethod(expr.semanticSpec));
            return def.comment?.text() || expr?.comment?.text() || '';
        }
        return '';
    case 'definition':
        if (expr.isCustomBlock) {
            if (expr.isGlobal) {
                if (expr.definition.primitive && !expr.definition.body) {
                    prim = SpriteMorph.prototype.blockForSelector(
                        'doPrimitive'
                    );
                    prim.inputs()[0].setContents(true);
                    prim.inputs()[1].setContents(expr.definition.primitive);
                    body = prim.reify();
                } else {
                    body = expr.definition.body || new Context();
                }
            } else {
                body = this.blockReceiver().getMethod(expr.semanticSpec).body ||
                    new Context();
            }
        } else {
            prim = SpriteMorph.prototype.blockForSelector('doPrimitive');
            prim.inputs()[0].setContents(true);
            prim.inputs()[1].setContents(expr.selector);
            body = prim.reify();
        }
        if (body instanceof Context &&
            (!body.expression || prim) &&
            !body.inputs.length
        ) {
            // make sure the definition has the same number of inputs as the
            // block prototype (i.e. the header)
            expr.inputs().forEach((inp, i) => body.addInput('#' + (i + 1)));
        }
        if (body.expression && body.expression.selector === 'doReport' &&
                body.expression.inputs()[0] instanceof BlockMorph) {
            return body.expression.inputs()[0].reify(body.inputs);
        }
        return body;
    case 'category':
        return expr ?
            SpriteMorph.prototype.allCategories().indexOf(expr.category) + 1
                : 0;
    case 'custom?':
        return expr ? !!expr.isCustomBlock : false;
    case 'global?':
        return (expr && expr.isCustomBlock) ? !!expr.isGlobal : true;
    case 'type':
        return ['command', 'reporter', 'predicate'].indexOf(
            this.reportTypeOf(block)
        ) + 1;
    case 'scope':
        return expr.isCustomBlock ? (expr.isGlobal ? 1 : 2) : 0;
    case 'selector':
        return expr.isCustomBlock ?
            (expr.isGlobal ? expr.definition.selector || '' : '')
            : expr.selector;
    case 'slots':
        if (expr.isCustomBlock) {
            slots = [];
            (expr.isGlobal ?
                expr.definition
                : this.blockReceiver().getMethod(expr.semanticSpec)
            ).declarations.forEach(value => slots.push(value[0]));
            return new List(slots).map(spec => this.slotType(spec));
        }
        return new List(
            expr.inputs().map(each =>
                each instanceof ReporterBlockMorph ?
                    each.getSlotSpec()
                    : (each instanceof MultiArgMorph &&
                            each.slotSpec instanceof Array ?
                        each.slotSpec
                        : each.getSpec())
            )
        ).map(spec => this.slotType(spec));
    case 'defaults':
        slots = new List();
        if (expr.isCustomBlock) {
            def = (expr.isGlobal ?
                expr.definition
                : this.blockReceiver().getMethod(expr.semanticSpec));
            // def.declarations.forEach(value => slots.add(value[1]));
            def.declarations.forEach(value => {
                if((value[0] || '').toString().startsWith('%mult')) {
                    data = (value[1] || '').split('\n').map(each =>
                        each.trim()).filter(each =>
                            each.length);
                    slots.add(data.length > 1 ? new List(data) : data[0]);
                } else {
                    slots.add(value[1]);
                }
            });
        } else {
            info = SpriteMorph.prototype.blocks[expr.selector];
            if (!info) {return slots; }
            slots = (info.defaults || []).map(v => this.inputOption(v));
            // adjust structure if the last input is variadic
            // and the default values overshoot the number of input slots
            if (expr.inputs().slice(-1)[0] instanceof MultiArgMorph &&
                slots.length > expr.inputs().length
            ) {
                data = slots.slice(expr.inputs().length - 1);
                slots = slots.slice(0, expr.inputs().length - 1);
                slots.push(new List(data));
            }
            slots = new List(slots);
        }
        return slots;
    case 'menus':
        slots = new List();
        if (expr.isCustomBlock) {
            def = (expr.isGlobal ?
                expr.definition
                : this.blockReceiver().getMethod(expr.semanticSpec));
            def.declarations.forEach(value => slots.add(
                isString(value[2]) ?
                    def.decodeChoices(def.parseChoices(value[2]))
                    : ''
            ));
        } else {
            expr.inputs().forEach(slot => {
                if (slot instanceof ReporterBlockMorph) {
                    slot = SyntaxElementMorph.prototype.labelPart(
                        slot.getSlotSpec()
                    );
                }
                slots.add(slot instanceof InputSlotMorph ?
                    (isString(slot.choices) ? '§_' + slot.choices
                        : CustomBlockDefinition.prototype.decodeChoices(
                            slot.choices
                        ))
                    : ''
                );
            });
        }
        return slots;
    case 'editables':
        slots = new List();
        if (expr.isCustomBlock) {
            def = (expr.isGlobal ?
                expr.definition
                : this.blockReceiver().getMethod(expr.semanticSpec));
            def.declarations.forEach(value => slots.add(!value[3]));
        } else {
            expr.inputs().forEach(slot => {
                if (slot instanceof ReporterBlockMorph) {
                    slot = SyntaxElementMorph.prototype.labelPart(
                        slot.getSlotSpec()
                    );
                }
                slots.add(slot instanceof InputSlotMorph ?
                    !slot.isReadOnly : false
                );
            });
        }
        return slots;
    case 'replaceables':
        slots = new List();
        if (expr.isCustomBlock) {
            def = (expr.isGlobal ?
                expr.definition
                : this.blockReceiver().getMethod(expr.semanticSpec));
            def.declarations.forEach(value => slots.add(!value[4]));
        } else {
            expr.inputs().forEach(slot => {
                if (slot instanceof ReporterBlockMorph) {
                    slot = SyntaxElementMorph.prototype.labelPart(
                        slot.getSlotSpec()
                    );
                }
                slots.add(!slot.isStatic);
            });
        }
        return slots;
    case 'separators':
        slots = new List();
        if (expr.isCustomBlock) {
            def = (expr.isGlobal ?
                expr.definition
                : this.blockReceiver().getMethod(expr.semanticSpec));
            def.declarations.forEach(value => slots.add(value[5]));
        } else {
            expr.inputs().forEach(slot => {
                if (slot instanceof ReporterBlockMorph) {
                    slot = SyntaxElementMorph.prototype.labelPart(
                        slot.getSlotSpec()
                    );
                }
                slots.add(slot instanceof MultiArgMorph ?
                    slot.infix : ''
                );
            });
        }
        return slots;
    case 'collapses':
        slots = new List();
        if (expr.isCustomBlock) {
            def = (expr.isGlobal ?
                expr.definition
                : this.blockReceiver().getMethod(expr.semanticSpec));
            def.declarations.forEach(value => slots.add(value[6]));
        } else {
            expr.inputs().forEach(slot => {
                if (slot instanceof ReporterBlockMorph) {
                    slot = SyntaxElementMorph.prototype.labelPart(
                        slot.getSlotSpec()
                    );
                }
                slots.add(slot instanceof MultiArgMorph ?
                    slot.collapse : ''
                );
            });
        }
        return slots;
    case 'expands':
        slots = new List();
        if (expr.isCustomBlock) {
            def = (expr.isGlobal ?
                expr.definition
                : this.blockReceiver().getMethod(expr.semanticSpec));
            def.declarations.forEach(value => {
                data = (value[7] || '').split('\n').map(each =>
                    each.trim()).filter(each =>
                        each.length);
                slots.add(data.length > 1 ? new List(data) : data[0]);
            });
        } else {
            expr.inputs().forEach(slot => {
                if (slot instanceof ReporterBlockMorph) {
                    slot = SyntaxElementMorph.prototype.labelPart(
                        slot.getSlotSpec()
                    );
                }
                if (slot instanceof MultiArgMorph) {
                    data = slot.labelText instanceof Array ?
                        new List(slot.labelText.map(item =>
                            item.replaceAll('\n', ' ')))
                        : (slot.labelText || '').replaceAll('\n', ' ');
                    slots.add(data);
                } else {
                    slots.add('');
                }
            });
        }
        return slots;
    case 'initial slots':
        slots = new List();
        if (expr.isCustomBlock) {
            def = (expr.isGlobal ?
                expr.definition
                : this.blockReceiver().getMethod(expr.semanticSpec));
            def.declarations.forEach(value => slots.add(+value[8] || 0));
        } else {
            expr.inputs().forEach(slot => {
                if (slot instanceof ReporterBlockMorph) {
                    slot = SyntaxElementMorph.prototype.labelPart(
                        slot.getSlotSpec()
                    );
                }
                slots.add(slot instanceof MultiArgMorph ?
                    slot.initialSlots : ''
                );
            });
        }
        return slots;
    case 'min slots':
        slots = new List();
        if (expr.isCustomBlock) {
            def = (expr.isGlobal ?
                expr.definition
                : this.blockReceiver().getMethod(expr.semanticSpec));
            def.declarations.forEach(value => slots.add(+value[9] || 0));
        } else {
            expr.inputs().forEach(slot => {
                if (slot instanceof ReporterBlockMorph) {
                    slot = SyntaxElementMorph.prototype.labelPart(
                        slot.getSlotSpec()
                    );
                }
                slots.add(slot instanceof MultiArgMorph ?
                    +slot.minInputs : ''
                );
            });
        }
        return slots;
    case 'max slots':
        slots = new List();
        if (expr.isCustomBlock) {
            def = (expr.isGlobal ?
                expr.definition
                : this.blockReceiver().getMethod(expr.semanticSpec));
            def.declarations.forEach(value => slots.add(+value[10] || 0));
        } else {
            expr.inputs().forEach(slot => {
                if (slot instanceof ReporterBlockMorph) {
                    slot = SyntaxElementMorph.prototype.labelPart(
                        slot.getSlotSpec()
                    );
                }
                slots.add(slot instanceof MultiArgMorph ?
                    +slot.maxInputs || 0 : ''
                );
            });
        }
        return slots;
    case 'translations':
        if (expr.isCustomBlock) {
            def = (expr.isGlobal ?
                expr.definition
                : this.blockReceiver().getMethod(expr.semanticSpec));
            loc = new List();
            Object.keys(def.translations).forEach(lang =>
                loc.add(new List([lang, def.translations[lang]]))
            );
            return loc;
        }
        return new List();
    }
    return '';
};

Process.prototype.reportGet = function (query) {
    // answer a reference to a first-class member
    // or a list of first-class members
    var thisObj = this.blockReceiver(),
        neighborhood,
        stage,
        objName;

    if (thisObj) {
        switch (this.inputOption(query)) {
        case 'self' :
            return thisObj;
        case 'other sprites':
            stage = thisObj.parentThatIsA(StageMorph);
            return new List(
                stage.children.filter(each =>
                    each instanceof SpriteMorph &&
                        each !== thisObj
                )
            );
        case 'parts': // shallow copy to disable side-effects
            return new List((thisObj.parts || []).map(each => each));
        case 'anchor':
            return thisObj.anchor || '';
        case 'parent':
            return thisObj.exemplar || '';
        case 'children':
            return new List(thisObj.specimens ? thisObj.specimens() : []);
        case 'temporary?':
            return thisObj.isTemporary || false;
        case 'clones':
            stage = thisObj.parentThatIsA(StageMorph);
            objName = thisObj.name || thisObj.cloneOriginName;
            return new List(
                stage.children.filter(each =>
                    each.isTemporary &&
                        (each !== thisObj) &&
                            (each.cloneOriginName === objName)
                )
            );
        case 'other clones':
            return thisObj.isTemporary ?
                    this.reportGet(['clones']) : new List();
        case 'neighbors':
            stage = thisObj.parentThatIsA(StageMorph);
            neighborhood = thisObj.bounds.expandBy(new Point(
                thisObj.width(),
                thisObj.height()
            ));
            return new List(
                stage.children.filter(each =>
                    each instanceof SpriteMorph &&
                        (each !== thisObj) &&
                            each.bounds.intersects(neighborhood)
                )
            );
        case 'dangling?':
            return !thisObj.rotatesWithAnchor;
        case 'draggable?':
            return thisObj.isDraggable;
        case 'rotation style':
            return thisObj.rotationStyle || 0;
        case 'rotation x':
            return thisObj.xPosition();
        case 'rotation y':
            return thisObj.yPosition();
        case 'center x':
            return thisObj.xCenter();
        case 'center y':
            return thisObj.yCenter();
        case 'left':
            return thisObj.xLeft();
        case 'right':
            return thisObj.xRight();
        case 'top':
            return thisObj.yTop();
        case 'bottom':
            return thisObj.yBottom();
        case 'name':
            return thisObj.name;
        case 'stage':
            return thisObj.parentThatIsA(StageMorph);
        case 'costume':
            return thisObj.costume;
        case 'costumes':
            return thisObj.reportCostumes();
        case 'sounds':
            return thisObj.sounds;
        case 'width':
            if (thisObj instanceof StageMorph) {
                return thisObj.dimensions.x;
            }
            stage = thisObj.parentThatIsA(StageMorph);
            return stage ? thisObj.width() / stage.scale : 0;
        case 'height':
            if (thisObj instanceof StageMorph) {
                return thisObj.dimensions.y;
            }
            stage = thisObj.parentThatIsA(StageMorph);
            return stage ? thisObj.height() / stage.scale : 0;
        case 'blocks': // palette unoordered without inherited methods
            return new List(
                thisObj.parentThatIsA(StageMorph).globalBlocks.concat(
                    thisObj.allBlocks(true)
                ).filter(
                    def => !def.isHelper
                ).map(
                    def => def.blockInstance().reify()
                ).concat(
                    SpriteMorph.prototype.categories.reduce(
                        (blocks, category) => blocks.concat(
                            thisObj.getPrimitiveTemplates(
                                category
                            ).filter(
                                each => each instanceof BlockMorph &&
                                    !(each instanceof HatBlockMorph)
                            ).map(block => {
                                let instance = block.fullCopy();
                                instance.isTemplate = false;
                                return instance.reify();
                            })
                        ),
                        []
                    )
                )
            );
        }
    }
    return '';
};


Process.prototype.slotType = function (spec) {
    // answer a number indicating the shape of a slot represented by its spec.
    // Note: you can also use it to translate mnemonics into slot type numbers
    if (spec instanceof Array) {
        // first check for a bunch of special cases
        if (spec[0] === '%rcv') {
            return 16;
        } else if (spec[0] === '%msgSend') {
            return 17;
        } else if (spec[0] === '%b') {
            return 18;
        }
        return new List(spec.map(each => this.slotType(each)));
    }

    var shift = 0,
        key = spec.toLowerCase(),
        num;

    if (spec.startsWith('%')) {
        key = spec.slice(1).toLowerCase();
        if (key.startsWith('mult')) {
            shift = 100;
            key = key.slice(5);
            if (key === 't') {
                shift = 0;
                key = 'variables';
            }
        }
    } else if (spec.endsWith('...')) {
        shift = 100;
        key = spec.slice(0, -3).toLowerCase();
    }

    num =  {
        '0':            0,
        's':            0, // spec
        // mnemonics:
        ' ':            0,
        '_':            0,
        'a':            0,
        'any':          0,

        '1':            1,
        'n':            1, // spec
        // mnemonics:
        '#':            1,
        'num':          1,
        'number':       1,

        '2':            2,
        'b':            2, // spec
        // mnemonics:
        '?':            2,
        'tf':           2,
        'bool':         2,
        'boolean':      2,

        '3':            3,
        'l':            3, // spec
        // mnemonics:
        ':':            3,
        'lst':          3,
        'list':         3,

        '4':            4,
        'txt':          4, // spec
        'mlt':          4, // spec
        'code':         4, // spec
        // mnemonics:
        'x':            4,
        'text':         4,
        'abc':          4,

        '5':            5,
        'c':            5, // spec
        'cs':           5, // spec
        // mnemonics:
        'script':       5,

        '6':            6,
        'cmdring':      6, // spec
        // mnemonics:
        'cmd':          6,
        'command':      6,

        '7':            7,
        'repring':      7, // spec
        // mnemonics:
        'rep':          7,
        'reporter':     7,

        '8':            8,
        'predring':     8, // spec
        // mnemonics:
        'pred':         8,
        'predicate':    8,

        '9':            9,
        'anyue':        9, // spec
        // mnemonics:
        'unevaluated':  9,

        '10':           10,
        'boolue':       10, // spec
        // mnemonics: none

        '11':           11,
        'obj':          11, // spec
        // mnemonics:
        'o':            11,
        'object':       11,

        '12':           12,
        't':            12, // spec
        'upvar':        12, // spec
        // mnemonics:
        'v':            12,
        'var':          12,
        'variable':     12,

        '13':           13,
        'clr':          13, // spec
        // mnemonics:
        'color':        13,

        '14':           14,
        'scriptvars':   14, // spec
        // mnemonics:
        'vars':         14,
        'variables':    14,

        '15':           15,
        'ca':           15, // spec
        'loop':         15, // spec

        '16':           16,
        'receive':      16, // spec
        // mnemonics:
        'receivers':    16,

        '17':           17,
        'send':         17, // spec

        '18':           18,
        'elseif':       18, // spec
        // mnemonics:
        'conditionals': 18

    }[key];
    if (num === undefined) {
        return spec;
    }
    return shift + num;
};

Process.prototype.slotSpec = function (num) {
    // answer a spec indicating the shape of a slot represented by a number
    // or by a textual mnemomic
    var prefix = '',
        id = this.reportIsA(num, 'text') ? this.slotType(num) : +num,
        spec;

    if (id >= 100) {
        prefix = '%mult';
        id -= 100;
    }

    spec = ['s', 'n', 'b', 'l', 'mlt', 'cs', 'cmdRing', 'repRing', 'predRing',
    'anyUE', 'boolUE', 'obj', 'upvar', 'clr', 'scriptVars', 'loop', 'receive',
    'send', 'elseif'][id];

    if (spec === undefined) {
        return null;
    }
    if (spec === 'upvar' && id > 100) {
        return null;
    }
    return prefix + '%' + spec;
};



Context.prototype.components = function () {
    var expr = this.expression;
    if (expr && expr.components) {
        expr = expr.components(this.inputs.slice());
    } else {
        expr = new Context();
        expr.inputs = this.inputs.slice();
    }
    return expr instanceof Context ? new List([expr]) : expr;
};

Context.prototype.equalTo = function (other) {
    var c1 = this.components(),
        c2 = other.components();
    if (this.emptyOrEqual(c1.cdr(), c2.cdr())) {
        if (this.expression && this.expression.length === 1 &&
                other.expression && other.expression.length === 1) {
            return snapEquals(this.expression[0], other.expression[0]);
        }
        return snapEquals(this.expression, other.expression);
    }
    return false;
};

Context.prototype.emptyOrEqual = function (list1, list2) {
    // private - return TRUE if both lists are either equal
    // or only contain empty items
    return list1.equalTo(list2) || (
        list1.itemsArray().every(item => !item) &&
        list2.itemsArray().every(item => !item)
    );
};

Context.prototype.copyWithInputs = function (inputs) {
    return this.expression ?
        this.expression.copyWithInputs(inputs)
        : this;
};

Context.prototype.copyWithNext = function (next) {
    return this.expression.copyWithNext(next.expression, this.inputs.slice());
};

Context.prototype.updateEmptySlots = function () {
    this.emptySlots = this.expression.markEmptySlots();
};


    class BlocksToCodeToBlocks extends Extension {
        constructor(ide) {
            super('BlocksToCodeToBlocks');
            this.ide = ide;
        }

        onOpenRole() {
            console.log('onOpenRole');
        }

        getMenu() {
            var options = {
                'Print current sprite scripts': function () {
                    let activeScripts = NetsBloxExtensions.ide.getActiveScripts().children;

                    for(let i = 0; i < activeScripts.length; i++) {
                        let tempProcess = new Process(activeScripts[i], null, null, null);
                        
                        if(tempProcess.topBlock instanceof HatBlockMorph){
                            let {hatBlockName, code} = processToCode(tempProcess);

                            console.log(hatBlockName, code);
                        }
                    }
                },
                'Print All Scripts': function () {
                    let sprites = NetsBloxExtensions.ide.sprites.asArray();
                    let output = '';

                    const globalVars = Object.keys(NetsBloxExtensions.ide.stage.globalVariables().vars);
                    if(globalVars.length > 0) {
                        output += 'Global Variables: ' + globalVars.join(', ') + '\n';
                    }
                    
                    const msgTypes = Object.keys(NetsBloxExtensions.ide.stage.messageTypes.msgTypes);
                    if(msgTypes.length > 0) {
                        let msgDescs = msgTypes.map(type => {
                            let t = NetsBloxExtensions.ide.stage.messageTypes.msgTypes[type];

                            return t.name + ' (' + t.fields.join(', ') + ')';
                        });
                        output += 'Message Types: ' + msgDescs.join(', ') + '\n';
                    }


                    const globalCustomBlocks = NetsBloxExtensions.ide.stage.globalBlocks;
                    if(globalCustomBlocks.length > 0) {
                        let tempProcess = new Process(null, null, null, null);
                        for(let i = 0; i < globalCustomBlocks.length; i++) {
                            output += '\nGlobal Custom Block: ' + globalCustomBlocks[i].spec + '\n';
                            output += blocksToCode.call(tempProcess, globalCustomBlocks[i].body) + '\n';
                        }
                    }

                    for(let i = 0; i < sprites.length; i++) {
                        let scripts = sprites[i].scripts.children;
                        sprites[i].edit();

                        output += '\n\nSprite: ' + sprites[i].name + '\n';

                        const vars = Object.keys(sprites[i].variables.vars);
                        if(vars.length > 0) {
                            output += 'Local Variables: ' + vars.join(', ') + '\n';
                        }

                        const customBlocks = sprites[i].customBlocks;
                        if(customBlocks.length > 0) {
                            let tempProcess = new Process(null, null, null, null);
                            for(let i = 0; i < customBlocks.length; i++) {
                                output += '\nLocal Custom Block: ' + customBlocks[i].spec + '\n';
                                output += blocksToCode.call(tempProcess, customBlocks[i].body) + '\n';
                            }
                        }


                        for(let j = 0; j < scripts.length; j++) {
                            let tempProcess = new Process(scripts[j], null, null, null);
                            
                            if(tempProcess.topBlock instanceof HatBlockMorph){
                                let {hatBlockName, code} = processToCode(tempProcess);

                                output += hatBlockName + "\n";
                                output += code + "\n";
                            }
                        }

                    }

                    output += '\n\nStage:\n';
                    let stage = NetsBloxExtensions.ide.stage;
                    stage.edit();
                    for(let i = 0; i < stage.scripts.children.length; i++) {
                        let tempProcess = new Process(stage.scripts.children[i], null, null, null);
                        
                        if(tempProcess.topBlock instanceof HatBlockMorph){
                            let {hatBlockName, code} = processToCode(tempProcess);

                            output += hatBlockName + "\n";
                            output += code + "\n";
                        }
                    }

                    console.log(output);
                },
            };

            return options;
        }

        getCategories() {
            return [];
        }

        getPalette() {
            return [
                new Extension.PaletteCategory(
                    'operators',
                    [
                        new Extension.Palette.Block('blocksToCode'),
                        new Extension.Palette.Block('codeToBlocks'),
                    ],
                    SpriteMorph
                ),
                new Extension.PaletteCategory(
                    'operators',
                    [
                        new Extension.Palette.Block('blocksToCode'),
                        new Extension.Palette.Block('codeToBlocks'),
                    ],
                    StageMorph
                )
            ];
        }

        getBlocks() {
            
            return [
                new Extension.Block(
                    'blocksToCode',
                    'reporter',
                    'operators',
                    'blocks to code %blocks',
                    [],
                    blocksToCode
                ).for(SpriteMorph, StageMorph),
                new Extension.Block(
                    'codeToBlocks',
                    'reporter',
                    'operators',
                    'code to blocks %code',
                    [],
                    codeToBlocks
                ).for(SpriteMorph, StageMorph),
            ];
        }

        getLabelParts() {
            return [
                new Extension.LabelPart(
                    '%code',
                    () => {
                        const part = new InputSlotMorph(
                            null, // text
                            false, // non-numeric
                            null,
                            false
                        );
                        return part;
                    }
                ),
                new Extension.LabelPart(
                    '%blocks',
                    () => {
                        const part = new InputSlotMorph(
                            null, // text
                            false, // non-numeric
                            null,
                            false
                        );
                        return part;
                    }
                ),
            ];
        }

        onRunScripts() {
            console.log('onRunScripts');    
        }

        onStopAllScripts() {
            console.log('onStopAllScripts');    
        }

        onPauseAll() {
            console.log('onPauseAll');    
        }

        onResumeAll() {
            console.log('onResumeAll');    
        }

        onNewSprite() {
            console.log('onNewSprite');    
        }

        onSetStageSize() {
            console.log('onSetStageSize');    
        } 

        onRenameSprite(spriteID, name) {
            console.log('sprite ' + spriteID + ' new name: ' + name);    
        } 
    }

    function processToCode(tempProcess) {
        let code = blocksToCode.call(tempProcess, tempProcess.topBlock.components());

        let hatBlockParts = tempProcess.topBlock.children.map(child => {
            console.log(child);

            if (child instanceof MessageOutputSlotMorph) {
                return "socket message \"" + child.lastValue + "\"";
            } else if (child instanceof InputSlotMorph) {
                return child.contents().text;
            } else if (child instanceof BlockSymbolMorph) {
                return child.name;
            } else if (child instanceof BooleanSlotMorph) {
                return child.value;
            } else if (child instanceof BlockMorph) {
                if(child.selector == 'receiveSocketMessage'){
                    return '';
                } else {
                    return blocksToCode.call(tempProcess, child.components());
                }
            } else if (child.text) {
                return child.text;
            } else {
                return '';
            }
        });

        // Remove last part
        hatBlockParts.pop();

        let hatBlockName = hatBlockParts.join(' ');
        return {hatBlockName, code};
    }

    function blocksToCode(blocks) {
        if (blocks instanceof Context) {
            blocks = blocks.components();
        }

        if (this.isAST(blocks)) {
            return this.toTextSyntax(blocks).encode();
        }

        return "()";
    }

    /// Must be run inside a Process
    function codeToBlocks(code) {
        if (typeof code === 'string') {
            if (code.trim().startsWith('(')) {
                code = this.parseCode(code);
            }
        } else {
            this.assertType(string, ['command', 'reporter', 'predicate']);
            code = code.components();
        }

        if (this.isAST(code)) {
            return this.assemble(code);
        }

        throw Error("Invalid code");
    }
    
    NetsBloxExtensions.register(BlocksToCodeToBlocks);
})();