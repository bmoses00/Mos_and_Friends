let width = 1000;
let height = 500;

let margin = 50;

let first_render = true;

svg = d3.select("#graph")
  .attr("width", width)
  .attr("height", height)
  .append("g")
  .attr("transform", "translate(50, 0)");

const scaleX = d3.scaleTime().range([0, width - margin])
const scaleY = d3.scaleLinear().range([height - margin, 0]);

const parseDate = d3.timeParse("%Y-%m-%d");

function render_graph(dataset) {

  fetch("/" + dataset)
    .then(response => response.json())
    .then(data => {

      if (!first_render) {
        d3.select("#path").remove();
        d3.select("#x-axis").remove();
        d3.select("#y-axis").remove();
      }

      first_render = false;

      for (const entry of data) {
           entry.date = parseDate(entry.date);
      }

      scaleX.domain(d3.extent(data, function(d) { return d.date; }));
      scaleY.domain([0, d3.max(data, function(d) { return d.yield; })]);

      let line = d3.line()
        .x(d => scaleX(d.date))
        .y(d => scaleY(d.yield));

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

      d3.select("#desc").text(dataset);
  });
}

const selector = document.getElementById("graph_selector");
const button = document.getElementById("btn");

function draw_graph() {
  render_graph(selector.value);
}

button.addEventListener('click', draw_graph);
