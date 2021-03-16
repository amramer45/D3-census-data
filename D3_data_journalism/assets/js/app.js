// Assign plot to responsive function
function makeResponsive() {
    
    // If SVG area isn't empty, remove it and replace it with a resized version of the chart
    var svgArea = d3.select("#scatterPlot").select("svg");

    if(!svgArea.empty()) {
        svgArea.remove();
    }

    //Define SVG area
    var svgWidth = 960;
    var svgHeight = 620;

    //Define chart margins
    var chartMargin = {
        top: 20,
        right: 40,
        bottom: 60,
        left: 100,
    };

    //Definte chart area dimensions
    var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
    var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

    //Create an SVG wrapper
    var svg = d3.select("#scatter")
        .append("svg")
        .attr("width", svgWidth)
        .attr("height", svgHeight);
    
    //Append a group to the SVG area and shift
    var chartGroup = svg.append("g")
        .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);

    //Select variables
    var xSelect = "poverty";
    var ySelect = "healthcare"

    //Function used for updating x-scale var upon clicking on axis label
    function xScale(censusData, xSelect) {
        //Create scales
        var xLinearScale = d3.scaleLinear()
            .domain([d3.min(censusData, d => d[xSelect]) * 0.8,
                d3.max(censusData, d => d[xSelect]) * 1.2
            ])
            .range([0, chartWidth]);
        
        return xLinearScale;
    }

    //Function for the y-scale
    function yScale(censusData, ySelect) {
        //Create scales
        var yLinearScale = d3.scaleLinear()
            .domain([d3.min(censusData, d => d[ySelect]) * 0.8,
                d3.max(censusData, d => d[ySelect]) * 1.2
            ])
            .range([chartHeight, 0]);
        
        return yLinearScale;
    }

    //Function used for updating xAxis upon click
    function renderAxisX(newXScale, xAxis) {
        var bottomAxis = d3.axisBottom(newXScale);

        xAxis.transition()
            .duration(1000)
            .call(bottomAxis);

        return xAxis;
    }

    //Function for the yAxis
    function renderAxisY(newYScale, yAxis) {
        var leftAxis = d3.axisLeft(newYScale);

        yAxis.transition()
            .duration(1000)
            .call(leftAxis);

        return yAxis;
    }

    //Function for updating circles group
    function renderCircles(circlesGroup, newXScale, xSelect, newYScale, ySelect) {

        circlesGroup.transition()
            .duration(1000)
            .attr("cx", data => newXScale(data[xSelect]))
            .attr("cy", data => newYScale(data[ySelect]));

        return circlesGroup;
    }

    //Function for updating state labels
    function renderText(textGroup, newXScale, xSelect, newYScale, ySelect) {

        textGroup.transition()
        .duration(1000)
        .attr("x", d => newXScale(d[xSelect]))
        .attr("y", d => newYScale(d[ySelect]));

    return textGroup;
    }

    //
}