function draw_graph(element, dataset, dataset_2, year_start, year_end, first_render, r) {

  const width = .8 * d3.select("#graph-container").node().getBoundingClientRect().width;
  const height = 300;
  const margin = 50;
  const parseTime = d3.timeParse("%Y-%m-%d");
  const scaleX = d3.scaleTime().range([0, width - (margin * 2) - 10])
  const scaleY = d3.scaleLinear().range([height - margin, 0]);

  if (r == null) r = ""; // todo: use default parameter

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
     d3.select("#x-label" + r).remove();
     d3.select("#y-label" + r).remove();
   }

   scaleX.domain(d3.extent(data, function(d) { return d[date]; }));

   let domain_lower;
   let translate;
   if (d3.min(data, function(d) { return d[value]; }) < 0)
     domain_lower = d3.min(data, function(d) { return d[value]; })
   else
     domain_lower = 0;

   scaleY.domain([domain_lower, d3.max(data, function(d) { return d[value]; })]);

   let line = d3.line()
     .x(d => scaleX(d[date]))
     .y(d => scaleY(d[value]));


   // draws line graph
   let line_path = element.append("path")
     .data([data])
     .attr("id", "path" + r)
     .attr("fill", "none")
     .attr("stroke", "steelblue")
     .attr("stroke-width", 1.5)
     .attr("d", line);

   let totalLength = line_path.node().getTotalLength();

   line_path
     .attr("stroke-dasharray", totalLength)
     .attr("stroke-dashoffset", totalLength)
     .transition()
     .duration(2000)
     .attr("stroke-dashoffset", 0);

   // x and y axes
   element.append("g")
     .attr("id", "x-axis" + r)
     .attr('transform', 'translate(0,' + (height - margin) + ')')
     .call(d3.axisBottom(scaleX));
   element.append("text")
      .attr("transform", "rotate(-90)")
      .attr("id", "y-label" + r)
      .attr("y", 0 - margin)
      .attr("x",0 - (height / 2))
      .attr("dy", "1em")
      .attr("fill", "steelblue")
      .style("text-anchor", "middle")
      .text(value);
   element.append("g")
     .attr("id", "y-axis" + r)
     .call(d3.axisLeft(scaleY));
   element.append("text")
      .attr("transform", "translate(" + (width/2 - margin)+ "," + height + ")")
      .attr("id", "x-label" + r)
      .style("text-anchor", "middle")
      .text("Year");
 });

 d3.csv("../static/csv/" + dataset_2 + ".csv").then(function(raw_data) {
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
     d3.select("#path2" + r).remove();
     d3.select("#x-axis2" + r).remove();
     d3.select("#y-axis2" + r).remove();
     d3.select("#y-label2" + r).remove();
   }

   scaleX.domain(d3.extent(data, function(d) { return d[date]; }));

   let domain_lower;
   let translate;
   if (d3.min(data, function(d) { return d[value]; }) < 0)
     domain_lower = d3.min(data, function(d) { return d[value]; })
   else
     domain_lower = 0;

   scaleY.domain([domain_lower, d3.max(data, function(d) { return d[value]; })]);

   let line = d3.line()
     .x(d => scaleX(d[date]))
     .y(d => scaleY(d[value]));

   // draws line graph
   element.append("path")
     .data([data])
     .attr("id", "path2" + r)
     .attr("fill", "none")
     .attr("stroke", "red")
     .attr("stroke-width", 1.5)
     .attr("d", line);

   // x and y axes
   element.append("text")
      .attr("transform", "rotate(-90)")
      .attr("id", "y-label2" + r)
      .attr("y", width - (2 * margin) + 20)
      .attr("x", -(height / 2))
      .attr("dy", "1em")
      .attr("fill", "red")
      .style("text-anchor", "middle")
      .text(value);

   element.append("g")
     .attr("id", "y-axis2" + r)
     .attr('transform', 'translate(' + (width - (2 * margin) - 10)+ ',0)')
     .call(d3.axisRight(scaleY));
 });
}

function get_true_start_year(dataset, dataset_2) {
  let year_start_1, year_start_2;
  econ_data.forEach(function(graph) {
    if (graph['name'] == dataset  ) year_start_1 = graph['start_date'].substring(0, 4);
    if (graph['name'] == dataset_2) year_start_2 = graph['start_date'].substring(0, 4);
  });

  if (year_start_1 == null) year_start_1 = "0001";
  if (year_start_2 == null) year_start_2 = "0001";

  return Math.max(year_start_1, year_start_2);
}

function get_true_end_year(dataset, dataset_2) {

  let year_end_1, year_end_2;
  econ_data.forEach(function(graph) {
    if (graph['name'] == dataset  ) year_end_1 = graph['end_date'].substring(0, 4);
    if (graph['name'] == dataset_2) year_end_2 = graph['end_date'].substring(0, 4);
  });

  if (year_end_1 == null) year_end_1 = "9999"
  if (year_end_2 == null) year_end_2 = "9999"

  return Math.min(year_end_1, year_end_2);
}
