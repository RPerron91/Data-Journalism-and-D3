// @TODO: YOUR CODE HERE!
// Define SVG area dimensions
var svgWidth = 960;
var svgHeight = 660;

// Define the chart's margins as an object
var chartMargin = {
  top: 30,
  right: 30,
  bottom: 30,
  left: 30
};

// Define dimensions of the chart area
var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

// Select body, append SVG area to it, and set the dimensions
var svg = d3.select(".scatter")
  .append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth);


// Append a group to the SVG area and shift ('translate') it to the right and to the bottom
var chartGroup = svg.append("g")
  .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);

d3.csv("../assets/data/data.csv", function(error, data) {
    // Terminate function if error in data
    if (error) throw error;

    console.log(data)
    
    //converting data strings to numbers
    data.forEach(Data => {
        Data.poverty = +Data.poverty
        Data.age = +Data.age
        Data.income = +Data.income
        Data.healthcare = +Data.healthcare
        Data.obesity = +Data.obesity
        Data.smokes = +Data.smokes
        
    })
    
    chartGroup.selectall("marker")
        .data(data)
        .enter()
        .append("marker")
        .attr("radius", )
});

