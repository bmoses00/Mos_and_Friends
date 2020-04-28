let width = .8 * d3.select("#graph-container").node().getBoundingClientRect().width;
let height = d3.select("#graph-container").node().getBoundingClientRect().height;

let margin = 50;
let first_render = true;

const scaleX = d3.scaleTime().range([0, width - margin - 10])
const scaleY = d3.scaleLinear().range([height - margin, 0]);

const parseTime = d3.timeParse("%Y-%m-%d");

const selector = d3.select("#graph_selector")
const year_start_selector = d3.select("#year_start")
const year_end_selector = d3.select("#year_end")

svg = d3.select("#graph")
  .attr("width", width)
  .attr("height", height)
  .append("g")
    .attr("id", "group")
    .attr("transform", "translate(50, 0)");

function plot_graph() {
  if (selector.node().value == "none") {
    svg.selectAll("*").remove();
    return;
  }
  var graph_selected;
  econ_data.forEach(function(graph) {
    if (graph['name'] == selector.node().value) {
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

  draw_graph(svg, selector.node().value,
              d3.select("#year_start").node().value,
              d3.select("#year_end").node().value, first_render);
  first_render = false;
}

function change_year() {
  if (d3.select("#year_start").node().value > d3.select("#year_end").node().value) return;

  draw_graph(svg, selector.node().value,
              d3.select("#year_start").node().value,
              d3.select("#year_end").node().value, first_render);
  first_render = false;
}

selector.on('change', plot_graph);
year_start_selector.on('change', change_year);
year_end_selector.on('change', change_year);
