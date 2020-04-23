let width = 1000;
let height = 500;

let margin = 50;

svg = d3.select("#graph")
.attr("width", width)
.attr("height", height)
.append("g")
.attr("transform",
"translate(50, 0)");

const scaleX = d3.scaleTime().range([0, width - margin])
const scaleY = d3.scaleLinear().range([height - margin, 0]);

const parseTime = d3.timeParse("%Y-%m-%d");

function draw_graph(dataset) {
  d3.csv("static/csv/" + dataset).then(function(data) {

    data.forEach(function(d, index) {
      d.Date = parseTime(d.Date);
      // some quarters have no data, for these, we set the yield to that of the previous quarter
      if (d.Yield == ".") {
        d.Yield = +data[index - 1].Yield;
      }
      else {
      d.Yield = +d.Yield;
      }

    });

    scaleX.domain(d3.extent(data, function(d) { return d.Date; }));
    scaleY.domain([0, d3.max(data, function(d) { return d.Yield; })]);

    let line = d3.line()
      .x(d => scaleX(d.Date))
      .y(d => scaleY(d.Yield));

    svg.append("path")
       .data([data])
       .attr("fill", "none")
       .attr("stroke", "steelblue")
       .attr("stroke-width", 1.5)
       .attr("d", line);

     svg.append("g")
      .attr("transform", "translate(0," + (height - margin) + ")")
      .call(d3.axisBottom(scaleX));

     svg.append("g")
       .call(d3.axisLeft(scaleY));
  });
}

draw_graph("10_year_treasury_yields.csv")
