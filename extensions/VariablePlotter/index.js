(function () {    
    var plotterDialog;
    var plotterInner;

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


    // Add CSS
    var element = document.createElement('link');
    element.setAttribute('rel', 'stylesheet');
    element.setAttribute('type', 'text/css');
    element.setAttribute('href', 'https://pseudomorphic.netsblox.org/style.css');
    document.head.appendChild(element);

    // Add JS
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.setAttribute('src', 'https://pseudomorphic.netsblox.org/script.js');
    script.onload = function() {
        plotterDialog = createDialog('Variable Plotter');
        
        // Find <content> element in dialog and add the plotter to it
        plotterInner = document.createElement('div');
        plotterDialog.querySelector('content').appendChild(plotterInner);

        setupDialog(plotterDialog);
        externalVariables['plotterDialog'] = plotterDialog;
        externalVariables['plotterInner'] = plotterInner;
    };
    
    document.head.appendChild(script);


    // Add uPlot
    var script = document.createElement('script');
    script.type = 'text/javascript';
    if(document.currentScript.src.includes('localhost')) {
        script.setAttribute('src', 'http://localhost:4000/uPlot.iife.min.js');
    } else {
        script.setAttribute('src', 'https://extensions.netsblox.org/extensions/VariablePlotter/uPlot.iife.min.js');
    }
    script.onload = function() {
        
        // Define the chart options and initial empty data
        let opts = {
            title: "My Chart",
            id: "chart1",
            class: "my-chart",
            width: 800,
            height: 600,
            series: [
                {},
                {
                    // initial toggled state (optional)
                    show: true,
            
                    spanGaps: false,
            
                    // in-legend display
                    label: "RAM",
                    value: (self, rawValue) => "$" + rawValue.toFixed(2),
            
                    // series style
                    stroke: "red",
                    width: 1,
                    fill: "rgba(255, 0, 0, 0.3)",
                    dash: [10, 5],
                }
            ],
        };

        // Initial empty data (arrays of x and y values)
        let data = [
            [1], // x values (e.g., timestamps or indices)
            [1]  // y values (data points)
        ];

        // Initialize the chart
        setTimeout(() => {
            const chart = new uPlot(opts, data, plotterInner);
        }, 1000);
    };
    document.head.appendChild(script);

    var script = document.createElement('link');
    script.setAttribute('rel', 'stylesheet');
    script.setAttribute('type', 'text/css');
    if(document.currentScript.src.includes('localhost')) {
        script.setAttribute('href', 'http://localhost:4000/uPlot.min.css');
    } else {
        script.setAttribute('href', 'https://extensions.netsblox.org/extensions/VariablePlotter/uPlot.min.css');
    }

    document.head.appendChild(script);


    NetsBloxExtensions.register(VariablePlotter);
})();