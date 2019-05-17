// @TODO: YOUR CODE HERE!
// Define SVG area dimensions
function makeResponsive() {

  // if the SVG area isn't empty when the browser loads,
  // remove it and replace it with a resized version of the chart
  var svgArea = d3.select("body").select("svg");

  // clear svg if not empty
  if (!svgArea.empty()) {
    svgArea.remove();
  }
  

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
  .attr("height", chartHeight)
  .attr("width", chartWidth)
  .attr("transform", `translate(${chartMargin.left*2}, ${chartMargin.bottom*2})`);

// Load Data from csv and use values for scatter plot points and axes  
d3.csv("../assets/data/data.csv").then(function(data) {
  
  // Make sure categories being used are all numeric
  data.forEach(function(data) { 
    data.poverty = +data.poverty;
    data.age = +data.age;
    data.income = +data.income;
    data.healthcare = +data.healthcare;
    data.obesity = +data.obesity;
    data.smokes = +data.smokes;
  });
  // Console log the data to check if everything is formatted correctly 
  console.log(data);


  // scale y to chart height using healthcare data for ticks
  var yScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.healthcare)])
    .range([chartHeight, 0]);


  // scale x to chart width using poverty data for ticks
  var xScale = d3.scaleLinear()
      .domain([6, d3.max(data, d => d.poverty)])
      .range([chartMargin.left, chartWidth-chartMargin.left]);
      
  // Set scales to corresponding Axes
  var yAxis = d3.axisLeft(yScale);
  var xAxis = d3.axisBottom(xScale);
  
  // set x to the x axis
  chartGroup.append("g")
    .attr("transform", `translate(0, ${chartHeight-2*chartMargin.left-5})`)
    .call(xAxis);

  // set y to the y axis
  chartGroup.append("g")
    .attr("transform", `translate(${chartMargin.left}, ${-2*chartMargin.top-5})`)
    .call(yAxis);



//Set up switch functions for on(click) events
  // var xAxis = 'poverty';

  // var XScale = function getXScale(Axis) {

  //   switch(Axis) {
  //   case 'poverty':
  //     d3.scaleLinear()
  //       .range([0, chartWidth])
  //       .domain(d3.extent(data, d => d.poverty));
  //     break;
  
  //   case 'age':
  //     d3.scaleLinear()
  //       .range([0, chartWidth])
  //       .domain(d3.extent(data, d => d.age));
  //     break;

  //   case 'income':
  //     d3.scaleLinear()
  //       .range([0, chartWidth])
  //       .domain(d3.extent(data, d => d.income));
  //     break;

  //   };
  // };

  // XScale(xAxis);

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
  var circledata = chartGroup.selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cy", d=> yScale(d.healthcare))
      .attr("cx", d=> xScale(d.poverty))
      .attr("r", "10")
      .classed("stateCircle", true);

  var circleText = chartGroup.selectAll("text")
      .data(data)
      .enter()
      .append("text")

  var text = circleText
      .attr("y", d=> yScale(d.healthcare))
      .attr("x", d=> xScale(d.poverty))
      .text(d => {return d.abbr})
      .classed("stateText", true);
  

  var toolTip = d3.select("circle")
    .append("text")
    .classed("d3-tip", true)
    .attr("display", "none");

  //append circles with mouseover event
  circledata.on("mouseover", d => {
    console.log(d.abbr)
    toolTip.style("display", "block")
      .html(
      `<strong>${d.state}<strong>`);
  })
      .on("mousout"),function() {
        toolTip.style("display", "none");
      }

  // append title(s) to bottom center of chart
  chartGroup.append("text")
    .attr("transform", `translate(${chartWidth/2}, ${chartHeight-35})`)
    .classed("aText", true)
    .text("% in Poverty");

  // chartGroup.append("text")
  //   .attr("transform", `translate(${chartWidth/2}, ${chartHeight-20})`)
  //   .classed("aText", true)
  //   .text("Age");

  // chartGroup.append("text")
  //   .attr("transform", `translate(${chartWidth/2}, ${chartHeight-5})`)
  //   .classed("aText", true)
  //   .text("Income");
    
  // rotate title(s) and append to left center of chart
  chartGroup.append("text")
    .attr("transform", `translate(${-0}, ${(chartHeight-2*chartMargin.top)/2})rotate(${-90})`)
    .classed("aText", true)
    .text("% Lacking Healthcare");

  // chartGroup.append("text")
  //   .attr("transform", `translate(${-20}, ${(chartHeight-2*chartMargin.top)/2})rotate(${-90})`)
  //   .classed("aText", true)
  //   .text("% Pop. Obese");

  // chartGroup.append("text")
  //   .attr("transform", `translate(${-40}, ${(chartHeight-2*chartMargin.top)/2})rotate(${-90})`)
  //   .classed("aText", true)
  //   .text("% Smokes Regularly");
});
};

makeResponsive();

d3.select(window).on("resize", makeResponsive());



