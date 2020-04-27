let width = .8 * d3.select("#graph-container").node().getBoundingClientRect().width;
let height = d3.select("#graph-container").node().getBoundingClientRect().height;

let margin = 50;

let first_render = true;

svg = d3.select("#graph")
  .attr("width", width)
  .attr("height", height)
  .append("g")
    .attr("id", "group")
    .attr("transform", "translate(50, 0)");

const scaleX = d3.scaleTime().range([0, width - margin - 10])
const scaleY = d3.scaleLinear().range([height - margin, 0]);

const parseTime = d3.timeParse("%Y-%m-%d");

function render_graph(dataset) {
  d3.csv("static/csv/" + dataset + ".csv").then(function(raw_data) {

   data = []

   const date = raw_data.columns[0];
   const value = raw_data.columns[1];

   raw_data.forEach(function(d, index) {
     const current_year = d[date].substring(0, 4)

     if (d[value] != "." && current_year >= year_start && current_year <= year_end ) {
       d[value] = +d[value];
       d[date] = parseTime(d[date]);
       data.push(d);
     }
   });

   if (!first_render) {
     d3.select("#path").remove();
     d3.select("#x-axis").remove();
     d3.select("#y-axis").remove();
   }

   first_render = false;

   scaleX.domain(d3.extent(data, function(d) { return d[date]; }));
   scaleY.domain([0, d3.max(data, function(d) { return d[value]; })]);

   let line = d3.line()
     .x(d => scaleX(d[date]))
     .y(d => scaleY(d[value]));

   // draws line graph
   svg.append("path")
     .data([data])
     .attr("id", "path")
     .attr("fill", "none")
     .attr("stroke", "steelblue")
     .attr("stroke-width", 1.5)
     .attr("d", line);

   // x and y axes
   svg.append("g")
     .attr("id", "x-axis")
     .attr("transform", "translate(0," + (height - margin) + ")")
     .call(d3.axisBottom(scaleX));

   svg.append("g")
     .attr("id", "y-axis")
     .call(d3.axisLeft(scaleY));

 });
}

// const selector = document.getElementById("graph_selector");
// const button = document.getElementById("btn");

const selector = d3.select("#graph_selector")

function draw_graph() {
  if (selector.node().value == "none") {
    svg.selectAll("*").remove();
  }

  else {
    render_graph(selector.node().value);
  }
}

selector.on('change', draw_graph);
