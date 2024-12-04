(function () {    
    /* Variable Plotter Extension 
    Allows NetsBlox variables to be plotted in a chart
    Features it should have:
    - Plotter in a dialog
    - Ability to add variables to the plotter
    - Ability to remove variables from the plotter
    - Ability to change the type of chart (bar, line, scatter, etc.)
    - Should work with both time-series and non-time-series data
    - Non-array variables should be plotted as a line chart over time?
     - Could have options for how to plot non-array variables, e.g. as a line chart over time, as a bar chart with the most recent value, etc.
    - Should be able to plot multiple variables on the same chart

    Nice to have:
    - Ability to save the chart as an image
    - Ability to control styling of the chart (colors, fonts, etc.)
    */
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
                'Log variables': () => {
                    console.log(getGlobalVariables());
                    console.log(getSpriteVariables());
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
        return window.world.children[0].stage.globalVariables().vars;
    }

    function getSpriteVariables() {
        let sprites = window.world.children[0].sprites.contents;

        let output = {};

        for (let sprite of sprites) {
            output[sprite.name] = sprite.variables.vars;
        }

        return output;
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

        plotterInner.style.flex = '1';
        plotterInner.style.overflow = 'hidden';
        plotterInner.width = 400;
        plotterInner.height = 400;
        plotterInner.style.minWidth = '400px';
        plotterInner.style.minHeight = '400px';
        plotterInner.style.maxHeight = '80%';
        
        const contentElement = plotterDialog.querySelector('content');
        contentElement.style.display = 'flex';
        contentElement.style['flex-flow'] = 'column';
        contentElement.style['justify-content'] = 'flex-end';
        contentElement.style['flex-direction'] = 'column-reverse';
        contentElement.style['justify-content'] = 'space-around';

        contentElement.innerHTML += '<div><button>Reset</button></div>';
        
        contentElement.innerHTML += '<div><select id="plottervars"><option></option></select></div>';

        document.getElementById('plottervars').addEventListener('change', function() {
            chart.data.datasets = [];
            let selectedVars = Array.from(this.selectedOptions).map(option => option.value);
            for (let varName of selectedVars) {
                chart.data.datasets.push({
                    label: varName,
                    data: [],
                    borderWidth: 1
                });
                
                if(varName) {
                    let variable = getGlobalVariables()[varName];

                    if(!variable) {
                        let spriteName = varName.split('.')[0];
                        let varName = varName.split('.')[1];
                        if (getSpriteVariables()[spriteName]) {
                            variable = getSpriteVariables()[spriteName][varName];
                        }
                    }

                    if (variable) {
                        updatePlotterVar(varName, variable.value);
                    }
                }
            }

            chart.update();
        });

        contentElement.appendChild(plotterInner);

        plotterDialog.addEventListener('resize', function() {
            plotterInner.width = chart.clientWidth;
            plotterInner.height = chart.clientHeight;
            chart?.resize();
        });

        document.addEventListener('variable-added', updatePlotterVars);
        document.addEventListener('variable-removed', updatePlotterVars);

        // Add event listener for when variables are changed
        document.addEventListener('variable-changed', function(event) { 
            let variable = event.detail.variable;
            let value = event.detail.value;
            let owner = event.detail.owner;
            updatePlotterVar(variable, value);
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
            type: 'line',
            data: {
                labels: [],
                datasets: [{
                label: '',
                data: [],
                borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        display: true
                    },
                    x: {
                        display: true
                    }
                },
                responsive: true,
                maintainAspectRatio: false,
                animation: {
                    duration: 0,
                },
            }
        });

        externalVariables['chart'] = chart;
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

    function updatePlotterVars() {
        let plotterVars = document.getElementById('plottervars');
        let selectedVars = Array.from(plotterVars.selectedOptions).map(option => option.value);
        
        plotterVars.innerHTML = '<option></option>';

        let globalVars = getGlobalVariables();
        let spriteVars = getSpriteVariables();

        for (let varName in globalVars) {
            let option = document.createElement('option');
            option.value = varName;
            option.innerText = varName;
            plotterVars.appendChild(option);
        }

        for (let spriteName in spriteVars) {
            for (let varName in spriteVars[spriteName]) {
                let option = document.createElement('option');
                option.value = spriteName + '.' + varName;
                option.innerText = spriteName + '.' + varName;
                plotterVars.appendChild(option);
            }
        }

        // Select the previously selected variables
        for (let varName of selectedVars) {
            let option = plotterVars.querySelector(`option[value="${varName}"]`);
            if (option) {
                option.selected = true;
            }
        }

        // Update the chart
        let selectedVarNames = Array.from(plotterVars.selectedOptions).map(option => option.value);

        for (let varName of selectedVarNames) {
            if(varName) {
                let variable = globalVars[varName];

                if(!variable) {
                    let spriteName = varName.split('.')[0];
                    let varName = varName.split('.')[1];
                    if (spriteVars[spriteName]) {
                        variable = spriteVars[spriteName][varName];
                    }
                }
            }
        }
    }

    function updatePlotterVar(variable, value) {
        console.log('Updating plotter var', variable, value);
        let selectedVars = Array.from(document.getElementById('plottervars').selectedOptions).map(option => option.value);

        if (selectedVars.includes(variable)) {
            let data = chart.data.datasets.find(dataset => dataset.label === variable);

            if (data) {
                // Handle Snap lists
                if(value instanceof List) {
                    value = value.contents;
                }

                if (Array.isArray(value)) {
                    // if one-dimensional array or empty array
                    if (value.length == 0 || (!Array.isArray(value[0]) && !(value[0] instanceof List))) {
                        data.data = value;
                        
                        let labels = [];

                        for (let i = 0; i < value.length; i++) {
                            labels.push(i);
                        }

                        chart.data.labels = labels;
                    } else if (Array.isArray(value[0]) || value[0] instanceof List) {
                        // if two-dimensional array use each element as a point
                        let points = [];
                        let labels = [];
                        
                        for (let i = 0; i < value.length; i++) {
                            let point = value[i];

                            if (point instanceof List) {
                                point = point.contents;
                            }

                            if (point.length == 2) {
                                points.push(point[1]);
                                labels.push(point[0]);
                            } else if (point.length == 1) {
                                points.push(point[0]);
                                labels.push(i);
                            }
                        }
                        data.data = points;
                        chart.data.labels = labels;
                    }
                } else {
                    data.data.push(value);
                    chart.data.labels.push(chart.data.labels.length);
                }
                chart.update();
            }
        }
    }
    
    NetsBloxExtensions.register(VariablePlotter);
})();