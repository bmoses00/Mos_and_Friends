const case_study = d3.select("#case_study_container")

let width = .8 * d3.select("#graph-container").node().getBoundingClientRect().width;
let height = 300;
let margin = 50;

const scaleX = d3.scaleTime().range([0, width - margin - 50])
const scaleY = d3.scaleLinear().range([height - margin, 0]);
const parseTime = d3.timeParse("%Y-%m-%d");

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

      draw_graph(svg, element['chart_name'], element['chart_start'], element['chart_end'], false);
    // d3.csv("../static/csv/" + element['chart_name'] + ".csv").then(function(raw_data) {
    //
    //   data = []
    //
    //   const date = raw_data.columns[0];
    //   const value = raw_data.columns[1];
    //
    //   raw_data.forEach(function(d, index) {
    //     const current_year = d[date].substring(0, 4)
    //     if (d[value] != "." && current_year >= element['chart_start'] && current_year <= element['chart_end'] ) {
    //       d[value] = +d[value];
    //       d[date] = parseTime(d[date]);
    //       data.push(d);
    //     }
    //   });
    //
    //   scaleX.domain(d3.extent(data, function(d) { return d[date]; }));
    //   scaleY.domain([0, d3.max(data, function(d) { return d[value]; })]);
    //
    //   let line = d3.line()
    //     .x(d => scaleX(d[date]))
    //     .y(d => scaleY(d[value]));
    //
    //   // draws line graph
    //   svg.append("path")
    //     .data([data])
    //     .attr("id", "path")
    //     .attr("fill", "none")
    //     .attr("stroke", "steelblue")
    //     .attr("stroke-width", 1.5)
    //     .attr("d", line);
    //
    //   // x and y axes
    //   svg.append("g")
    //     .attr("id", "x-axis")
    //     .attr("transform", "translate(0," + (height - margin) + ")")
    //     .call(d3.axisBottom(scaleX));
    //
    //   svg.append("g")
    //     .attr("id", "y-axis")
    //     .call(d3.axisLeft(scaleY));
    // })
  }
});
