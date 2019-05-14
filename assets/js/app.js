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
var svg = d3.select("#scatter")
  .append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth);


// Append a group to the SVG area and shift it by margins to fit all 3 axis labels
var chartGroup = svg.append("g")
  .attr("transform", `translate(${chartMargin.left*3}, ${chartMargin.bottom*3})`);

// Load Data from csv and use values for scatter plot points  
d3.csv("../assets/data/data.csv", function(data) {
    for(i =1; i < data.length; i++) {
      data[i].poverty = +data[i].poverty
      data[i].age = +data[i].age
      data[i].income = +data[i].income
      data[i].healthcare = +data[i].healthcare
      data[i].obesity = +data[i].obesity
      data[i].smokes = +data[i].smokes

    };
  console.log(data);

  var xAxis = 'poverty';

  function getXScale(Axis) {

    switch(Axis) {
    case 'poverty':
      d3.scaleLinear()
        .range([0, chartWidth])
        .domain(d3.extent(data, d => d.poverty));
      break;
  
    case 'age':
      d3.scaleLinear()
        .range([0, chartWidth])
        .domain(d3.extent(data, d => d.age));
      break;

    case 'income':
      d3.scaleLinear()
        .range([0, chartWidth])
        .domain(d3.extent(data, d => d.income));
      break;

    };
  };

  getXScale(xAxis);

  var yAxis = 'healthcare';

  function getYScale(Axis) {

  switch(Axis) {
  case 'healthcare':
    d3.scaleLinear()
      .range([chartHeight, 0])
      .domain([0, d3.extent(data, d => d.healthcare)]);
    break;

  case 'obesity':
    d3.scaleLinear()
      .range([chartHeight, 0])
      .domain([0, d3.extent(data, d => d.obesity)]);
    break;

  case 'smokes':
    d3.scaleLinear()
      .range([chartHeight, 0])
      .domain([0, d3.extent(data, d => d.smokes)]);
    break;

  };
};
  getYScale(yAxis)

  var markers = chartGroup.selectAll("marker")
      .data(data)
      .enter()
      .append("marker")
      .attr("radius", 50)
      .text(data.abbr);


  chartGroup.append("text")
    .attr("transform", `translate(${chartWidth/2}, ${chartHeight + chartMargin.bottom + 20})`)
    .classed("poverty-text text", true)
    .text("poverty");

  chartGroup.append("text")
    .attr("transform", `translate(${chartWidth/2}, ${chartHeight + chartMargin.bottom + 35})`)
    .classed("age-text text", true)
    .text("age");

  chartGroup.append("text")
    .attr("transform", `translate(${chartWidth/2}, ${chartHeight + chartMargin.bottom + 50})`)
    .classed("income-text text", true)
    .text("income");
    
  chartGroup.append("text")
    .attr("transform", `translate(${0}, ${chartHeight/2})rotate(${-90})`)
    .classed("healthcare-text text", true)
    .text("healthcare");
});




