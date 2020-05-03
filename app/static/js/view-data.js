let width = .8 * d3.select("#graph-container").node().getBoundingClientRect().width;
let height = d3.select("#graph-container").node().getBoundingClientRect().height;

let first_render = true;

const selector   = d3.select("#graph_selector"  )
const selector_2 = d3.select("#graph_selector_2")

const year_start_selector = d3.select("#year_start")
const year_end_selector   = d3.select("#year_end"  )

svg = d3.select("#graph")
  .attr("width", width)
  .attr("height", height)
  .append("g")
    .attr("id", "group")
    .attr("transform", "translate(50, 0)");

function plot_graph() {
  // if (selector.node().value == "none") {
  //   d3.select("path").selectAll("*").remove();
  //   return;
  // }
  // if (selector_2.node().value == "none") {
  //   d3.select("path2").selectAll("*").remove();
  //   return;
  // }

  let graph_selected, graph_selected_2;
  econ_data.forEach(function(graph) {
    if (graph['name'] == selector.node().value) graph_selected = graph;
    if (graph['name'] == selector_2.node().value) graph_selected_2 = graph;
  });

  if (graph_selected == null) graph_selected = {'name' : null};
  if (graph_selected_2 == null) graph_selected_2 = {'name' : null};

  const year_start = get_true_start_year(graph_selected['name'], graph_selected_2['name']);
  const year_end = get_true_end_year(graph_selected['name'], graph_selected_2['name']);

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

  draw_graph(svg, selector.node().value, selector_2.node().value,
              d3.select("#year_start").node().value,
              d3.select("#year_end").node().value, first_render);
  first_render = false;
}

function change_year() {
  if (d3.select("#year_start").node().value > d3.select("#year_end").node().value) return;

  draw_graph(svg, selector.node().value, selector_2.node().value,
              d3.select("#year_start").node().value,
              d3.select("#year_end").node().value, first_render);
  first_render = false;
}
selector.on('change', plot_graph);
selector_2.on('change', plot_graph);
year_start_selector.on('change', change_year);
year_end_selector.on('change', change_year);
