(function () {    
    var plotterDialog;
    var plotterInner;
    var chart;

    class VariablePlotter extends Extension {
        constructor(ide) {
            super('VariablePlotter');
        }

        onOpenRole() {

        }

        getSettings() {
            return [
                
            ];
        }

        getMenu() {
            return {
                'Show Plot...': () => {
                    showDialog(plotterDialog);
                },
            };
        }

        getCategories() {
            return [

            ];
        }

        getPalette() {
            return [
                
            ];
        }

        getBlocks() {
            return [

            ];
        }

        getLabelParts() {
            return [

            ];
        }

    }

    function getGlobalVariables() {
        return document.world.children[0].stage.globalVariables();
    }

    // Add CSS
    var element = document.createElement('link');
    element.setAttribute('rel', 'stylesheet');
    element.setAttribute('type', 'text/css');
    element.setAttribute('href', 'https://pseudomorphic.netsblox.org/style.css');
    document.head.appendChild(element);

    // Add JS
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = false;
    script.setAttribute('src', 'https://pseudomorphic.netsblox.org/script.js');
    script.onload = function() {
        // Find <content> element in dialog and add the plotter to it
        plotterDialog = createDialog('Variable Plotter');
        plotterInner = document.createElement('canvas');
        
        if (isRetinaEnabled()) {
            var a = HTMLCanvasElement.prototype;
            var c = a._bak;
            Object.defineProperty(plotterInner, "width", c.width);
            Object.defineProperty(plotterInner, "height", c.height);
        }

        plotterInner.style.width = '100%';
        plotterInner.style.height = '100%';
        plotterInner.width = 400;
        plotterInner.height = 400;
        plotterInner.style.minWidth = '400px';
        plotterInner.style.minHeight = '400px';
        
        plotterDialog.querySelector('content').appendChild(plotterInner);

        plotterDialog.addEventListener('resize', function() {

            plotterInner.width = plotterDialog.clientWidth;
            plotterInner.height = plotterDialog.clientHeight;
            chart?.resize();
        });

        setupDialog(plotterDialog);

        externalVariables['plotterDialog'] = plotterDialog;
        externalVariables['plotterInner'] = plotterInner;
    };
    
    document.head.appendChild(script);


    // Add uPlot
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = false;
    if(document.currentScript.src.includes('localhost')) {
        script.setAttribute('src', 'http://localhost:4000/chart.js');
    } else {
        script.setAttribute('src', 'https://extensions.netsblox.org/extensions/VariablePlotter/chart.js');
    }
    script.onload = function() {
        let plotterContext = plotterInner.getContext('2d');

        if (isRetinaEnabled()) {
            var a = HTMLCanvasElement.prototype;
            var c = a._bak;
            plotterContext.drawImage = c.drawImage;
            plotterContext.getImageData = c.getImageData;
            Object.defineProperty(plotterContext, "shadowOffsetX", c.shadowOffsetX);
            Object.defineProperty(plotterContext, "shadowOffsetY", c.shadowOffsetY);
            Object.defineProperty(plotterContext, "shadowBlur", c.shadowBlur);
        }

        chart = new Chart(plotterContext, {
            type: 'bar',
            data: {
                labels: [1, 2, 3, 4, 5, 6],
                datasets: [{
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                borderWidth: 1
                }]
            },
            options: {
                scales: {
                y: {
                    beginAtZero: true
                }
                },
                responsive: true,
                maintainAspectRatio: false,
            }
        });
    };
    document.head.appendChild(script);

    // Modify VariableFrame to add events when variables are added, removed, or changed
    VariableFrame.prototype.addVar = function(a, b) {
        this.vars[a] = new Variable(0 === b ? 0 : !1 === b ? !1 : "" === b ? "" : b || 0)

        // Add event
        var event = new CustomEvent('variable-added', { detail: { variable: a } });
        document.dispatchEvent(event);    
    };

    VariableFrame.prototype.deleteVar = function(a) {
        var b = this.find(a);

        if(b) {
            delete b.vars[a];

            // Add event
            var event = new CustomEvent('variable-removed', { detail: { variable: a } });
            document.dispatchEvent(event);
        }
    };

    VariableFrame.prototype.setVar = function(a, b, c) {
        var d = this.find(a);

        if (d) {
            if (c instanceof SpriteMorph && d.owner instanceof SpriteMorph && c !== d.owner) {
                c.shadowVar(a, b);
            } else {
                d.vars[a].value = b;
            }

            // Add event
            var event = new CustomEvent('variable-changed', { detail: { variable: a, value: b, owner: d.owner } });
            document.dispatchEvent(event);
        }
    };

    
    NetsBloxExtensions.register(VariablePlotter);
})();