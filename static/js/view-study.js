const case_study = d3.select("#case_study_container")

content.forEach(function(element) {
  const entry = case_study
                  .append("li")
                  .classed("list-group-item", true)

  if (element.type == "text") {
    entry.html(element.text)
  }

  else {

  }
});
