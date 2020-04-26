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

function render_graph(dataset, year_start, year_end) {

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

const selector = d3.select("#graph_selector")
const year_start_selector = d3.select("#year_start")
const year_end_selector = d3.select("#year_end")


function draw_graph() {

  if (selector.node().value == "none") {
    svg.selectAll("*").remove();
    return;
  }

  var graph_selected;
  econ_data.forEach(function(graph) {
    if (graph['routing_name'] == selector.node().value) {
      graph_selected = graph;
    }
  });

  const year_start = graph_selected['start_date'].substring(0, 4);
  const year_end = graph_selected['end_date'].substring(0, 4);

  year_start_selector.selectAll("*").remove()
  year_end_selector.selectAll("*").remove()


  for (let i = year_start; i <= year_end; i++) {
    year_start_selector
      .append("option")
      .attr("value", i)
      .html(i)
    year_end_selector
      .append("option")
      .attr("value", i)
      .html(i)
  }

  year_end_selector.node().selectedIndex = year_end_selector.node().options.length-1;

  render_graph(selector.node().value,
              d3.select("#year_start").node().value,
              d3.select("#year_end").node().value);

}

function change_year() {
  if (d3.select("#year_start").node().value > d3.select("#year_end").node().value) {
    return;
  }
  render_graph(selector.node().value,
              d3.select("#year_start").node().value,
              d3.select("#year_end").node().value);
}

selector.on('change', draw_graph);
year_start_selector.on('change', change_year);
year_end_selector.on('change', change_year);
