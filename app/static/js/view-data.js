let width  = d3.select("#graph-container").node().getBoundingClientRect().width*.8;
let height = d3.select("#graph-container").node().getBoundingClientRect().height;
let option_removed =   {'text': null, 'value': null};
let option_2_removed = {'text': null, 'value': null};

const selector            = d3.select("#graph_selector")
const selector_2          = d3.select("#graph_selector_2")
const year_start_selector = d3.select("#year_start")
const year_end_selector   = d3.select("#year_end")

svg = d3.select("#graph")
  .attr("width", width)
  .attr("height", height)
  .append("g")
    .attr("id", "group")
    .attr("transform", "translate(75, 0)");

function plot_graph() {
  // if (selector.node().value == "none") {
  //   d3.select("path").selectAll("*").remove();
  //   return;
  // }
  // if (selector_2.node().value == "none") {
  //   d3.select("path2").selectAll("*").remove();
  //   return;
  // }

  let graph_selected;
  let graph_selected_2;
  econ_data.forEach(function(graph) {
    if (graph['name'] == selector.node().value)   graph_selected   = graph;
    if (graph['name'] == selector_2.node().value) graph_selected_2 = graph;
  });

  if (graph_selected   == null) graph_selected   = {'name' : null};
  if (graph_selected_2 == null) graph_selected_2 = {'name' : null};

  const year_start = get_true_start_year(graph_selected['name'], graph_selected_2['name']);
  const year_end   = get_true_end_year(  graph_selected['name'], graph_selected_2['name']);

  year_start_selector.selectAll("*").remove()
  year_end_selector.selectAll("*").remove()

  for (let i = year_start; i <= year_end; i++) {
    year_start_selector.append("option").attr("value", i).html(i);
    year_end_selector.append("option").attr("value", i).html(i);
  }
  year_end_selector.node().selectedIndex = year_end_selector.node().options.length-1;

  draw_graph(svg,
    selector.node().value, selector_2.node().value,
    d3.select("#year_start").node().value, d3.select("#year_end").node().value);
}

function change_year() {
  if (d3.select("#year_start").node().value > d3.select("#year_end").node().value) return;
  draw_graph(svg,
    selector.node().value, selector_2.node().value,
    d3.select("#year_start").node().value, d3.select("#year_end").node().value);
}

selector.on('change', plot_graph);
selector_2.on('change', plot_graph);
year_start_selector.on('change', change_year);
year_end_selector.on('change', change_year);

function remove_selected_from_other() {
  let options = selector.node().children;
  let options_2 = selector_2.node().children;

  if (selector.node().value != "none") {
    for (let i = 0; i < options_2.length; i++) {
      if (options_2[i].value == selector.node().value) {
        option_2_removed['text'] = options_2[i].innerHTML;
        option_2_removed['value'] = options_2[i].value;
        options_2[i].remove();
      }}}
  if (selector_2.node().value != "none") {
    for (let i = 0; i < options.length; i++) {
      if (options[i].value == selector_2.node().value) {
        option_removed['text'] = options[i].innerHTML;
        option_removed['value'] = options[i].value;
        options[i].remove();
      }}}
}

function add_unselected_option_to_other() {
  if (option_removed['text'] != null) {
    selector.append("option")
      .html(option_removed['text'])
      .attr("value", option_removed['value'])
  }
  if (option_2_removed['text'] != null) {
    selector_2.append("option")
      .html(option_2_removed['text'])
      .attr("value", option_2_removed['value'])
  }
  option_removed =   {'text': null, 'value': null};
  option_2_removed = {'text': null, 'value': null};
}

function get_true_start_year(dataset, dataset_2) {
  let year_start_1;
  let year_start_2;
  econ_data.forEach(function(graph) {
    if (graph['name'] == dataset  ) year_start_1 = graph['start_date'].substring(0, 4);
    if (graph['name'] == dataset_2) year_start_2 = graph['start_date'].substring(0, 4);
  });
  if (year_start_1 == null) year_start_1 = "0001";
  if (year_start_2 == null) year_start_2 = "0001";

  return Math.max(year_start_1, year_start_2);
}

function get_true_end_year(dataset, dataset_2) {
  let year_end_1;
  let year_end_2;
  econ_data.forEach(function(graph) {
    if (graph['name'] == dataset  ) year_end_1 = graph['end_date'].substring(0, 4);
    if (graph['name'] == dataset_2) year_end_2 = graph['end_date'].substring(0, 4);
  });
  if (year_end_1 == null) year_end_1 = "9999";
  if (year_end_2 == null) year_end_2 = "9999";

  return Math.min(year_end_1, year_end_2);
}
