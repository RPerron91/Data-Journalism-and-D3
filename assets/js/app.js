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

// Select scatter tag, append SVG area to it, and set the dimensions of SVG area
var svg = d3.select("#scatter")
  .append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth);




// Append chart to the SVG area and shift it by margins to fit axis labels
var chartGroup = svg.append("g")
  .attr("transform", `translate(${chartMargin.left*2}, ${chartMargin.bottom*2})`);

// Load Data from csv and use values for scatter plot points and axes  
d3.csv("../assets/data/data.csv", function(data) {
  
  // Make sure categories being used are all numeric
  for(i =1; i < data.length; i++) {
    data[i].poverty = +data[i].poverty
    data[i].age = +data[i].age
    data[i].income = +data[i].income
    data[i].healthcare = +data[i].healthcare
    data[i].obesity = +data[i].obesity
    data[i].smokes = +data[i].smokes

  };
  // Console log the data to check if everything is formatted correctly 
  console.log(data);


  // scale y to chart height using healthcare data for ticks
  var yScale = d3.scaleLinear()
    .domain([0, d3.max(data.healthcare)])
    .range([chartHeight, 0]);


  // scale x to chart width using poverty data for ticks
  var xScale = d3.scaleLinear()
      .domain(d3.min(data.poverty), d3.max(data.poverty))
      .range([0, chartWidth]);
      
  // Set scales to corresponding Axes
  var yAxis = d3.axisLeft(yScale).ticks(10);
  var xAxis = d3.axisBottom(xScale);
  
  // set x to the x axis
  chartGroup.append("g")
    .attr("transform", `translate(0, ${chartHeight-60})`)
    .call(xAxis);

  // set y to the y axis
  chartGroup.append("g")
    .attr("transform", `translate(0, ${-60})`)
    .call(yAxis);



// Set up switch functions for on(click) events
//   var xAxis = 'poverty';

//   function getXScale(Axis) {

//     switch(Axis) {
//     case 'poverty':
//       d3.scaleLinear()
//         .range([0, chartWidth])
//         .domain(d3.extent(data, d => d.poverty));
//       break;
  
//     case 'age':
//       d3.scaleLinear()
//         .range([0, chartWidth])
//         .domain(d3.extent(data, d => d.age));
//       break;

//     case 'income':
//       d3.scaleLinear()
//         .range([0, chartWidth])
//         .domain(d3.extent(data, d => d.income));
//       break;

//     };
//   };

//   getXScale(xAxis);

//   var yAxis = 'healthcare';

//   function getYScale(Axis) {

//   switch(Axis) {
//   case 'healthcare':
//     d3.scaleLinear()
//       .range([chartHeight, 0])
//       .domain([0, d3.extent(data, d => d.healthcare)]);
//     break;

//   case 'obesity':
//     d3.scaleLinear()
//       .range([chartHeight, 0])
//       .domain([0, d3.extent(data, d => d.obesity)]);
//     break;

//   case 'smokes':
//     d3.scaleLinear()
//       .range([chartHeight, 0])
//       .domain([0, d3.extent(data, d => d.smokes)]);
//     break;

//   };
// };
//   getYScale(yAxis)

  // setup properties of circles to be displayed on the graph
  var circles = chartGroup.selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cy", yScale(d => d.healthcare))
      .attr("cx", xScale(d => d.poverty))
      .attr("r", 10)
      .attr("id", data.state)
      .attr("fill", "blue");

  // append circles to group
  circles.append("circle")

  // append title(s) to bottom center of chart
  chartGroup.append("text")
    .attr("transform", `translate(${chartWidth/2}, ${chartHeight-35})`)
    .classed("poverty-text", true)
    .text("poverty");

  // chartGroup.append("text")
  //   .attr("transform", `translate(${chartWidth/2}, ${chartHeight-20})`)
  //   .classed("age-text", true)
  //   .text("age");

  // chartGroup.append("text")
  //   .attr("transform", `translate(${chartWidth/2}, ${chartHeight-5})`)
  //   .classed("income-text", true)
  //   .text("income");
    
  // rotate title(s) and append to left center of chart
  chartGroup.append("text")
    .attr("transform", `translate(${-chartMargin.left}, ${chartHeight/2})rotate(${-90})`)
    .classed("healthcare-text", true)
    .text("healthcare");

  // chartGroup.append("text")
  //   .attr("transform", `translate(${-2*chartMargin.left}, ${chartHeight/2})rotate(${-90})`)
  //   .classed("obesity-text", true)
  //   .text("obesity");

  // chartGroup.append("text")
  //   .attr("transform", `translate(${-3*chartMargin.left}, ${chartHeight/2})rotate(${-90})`)
  //   .classed("smokes-text", true)
  //   .text("smokes");
});




