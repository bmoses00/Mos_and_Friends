const case_study = d3.select("#case_study_container")

let width = .8 * d3.select("#graph-container").node().getBoundingClientRect().width;
let height = 300;
let margin = 50;

content.forEach(function(element) {
  const entry = case_study
                  .append("li")
                  .classed("list-group-item", true)

  if (element.type == "text") {
    entry.html(element.text)
  }

  else {
    const svg = entry
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", "translate(50, 0)");

      draw_graph(svg, element['chart_name'], element['chart_start'], element['chart_end'], true);
  }
});
