let width = 1000;
let height = 500;

let margin = 50;

let first_render = true;

svg = d3.select("#graph")
  .attr("width", width)
  .attr("height", height)
  .append("g")
  .attr("transform",
  "translate(50, 0)");

const scaleX = d3.scaleTime().range([0, width - margin - 10])
const scaleY = d3.scaleLinear().range([height - margin, 0]);

const parseTime = d3.timeParse("%Y-%m-%d");

function render_graph(dataset) {
  d3.csv("static/csv/" + dataset + ".csv").then(function(data) {

    const date = data.columns[0]
    const value = data.columns[1]

    data.forEach(function(d, index) {

      d[date] = parseTime(d[date]);
      // some quarters have no data, for these, we set the yield to that of the previous quarter
      if (d[value] == ".") {
        d[value] = +data[index - 1][value];
      }
      else {
        d[value] = +d[value];
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

const selector = document.getElementById("graph_selector");
const button = document.getElementById("btn");

function draw_graph() {
  render_graph(selector.value);
}

button.addEventListener('click', draw_graph);
