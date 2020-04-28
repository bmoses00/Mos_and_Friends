function draw_graph(element, dataset, year_start, year_end, first_render, r) {

  const width = .9 * d3.select("#graph-container").node().getBoundingClientRect().width;
  const height = 300;
  const margin = 50;
  const parseTime = d3.timeParse("%Y-%m-%d");
  const scaleX = d3.scaleTime().range([0, width - margin - 10])
  const scaleY = d3.scaleLinear().range([height - margin, 0]);

  if (r == null) r = "";

  d3.csv("../static/csv/" + dataset + ".csv").then(function(raw_data) {

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
     d3.select("#path" + r).remove();
     d3.select("#x-axis" + r).remove();
     d3.select("#y-axis" + r).remove();
   }

   scaleX.domain(d3.extent(data, function(d) { return d[date]; }));
   scaleY.domain([0, d3.max(data, function(d) { return d[value]; })]);

   let line = d3.line()
     .x(d => scaleX(d[date]))
     .y(d => scaleY(d[value]));

   // draws line graph
   element.append("path")
     .data([data])
     .attr("id", "path" + r)
     .attr("fill", "none")
     .attr("stroke", "steelblue")
     .attr("stroke-width", 1.5)
     .attr("d", line);

   // x and y axes
   element.append("g")
     .attr("id", "x-axis" + r)
     .attr("transform", "translate(0," + (height - margin) + ")")
     .call(d3.axisBottom(scaleX));

   element.append("g")
     .attr("id", "y-axis" + r)
     .call(d3.axisLeft(scaleY));

 });
}
