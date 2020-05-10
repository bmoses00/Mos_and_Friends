if (editable == false) {
  const case_study = d3.select("#case_study_container");

  let width = .9 * d3.select("#graph-container").node().getBoundingClientRect().width;
  let height = 300;
  let margin = 75;

  content.forEach(function(element) {
    const entry = case_study
      .append("li")
      .classed("list-group-item", true)

    if (element.type == "text") {
      entry.html(element.text)
    } else {
      const svg = entry
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + margin + ", 0)");

      draw_graph(svg, element['chart_name'], element['chart_name_2'], element['chart_start'].substring(0, 4), element['chart_end'].substring(0, 4), true);
    }
  });
} else {
  var i;
  for (i = 0; i < study["content"].length; i++) {
    if (study["content"][i]['type'] == "text") {
      addtextinput();
      d3.select("#text" + (i + 1)).html(study["content"][i]["text"]);
    } else {
      console.log(study['content'][i])
      addgraphinput(false);


      var subject1Dropdown = d3.select("#subject1dropdown" + (i + 1)).node();
      var subject1DropdownOptions = subject1Dropdown.options;

      //console.log(study['content'][i]['chart_name'].replace(/_/g, " "));
      var j;
      var subject1 = "";

      for (j = 0; j < econData.length; j++) {
        if (study['content'][i]['chart_name'] == econData[j]['name']) {
          subject1 = econData[j]['title'];
        }
      }

      for (j = 0; j < subject1DropdownOptions.length; j++) {
        if (subject1DropdownOptions[j].value == subject1) {
          subject1Dropdown.selectedIndex = subject1DropdownOptions[j].index;
        }
      }



      var subject2Dropdown = d3.select("#subject2dropdown" + (i + 1)).node();
      var subject2DropdownOptions = subject2Dropdown.options;

      //  console.log(study['content'][i]['chart_name'].replace(/_/g, " "));
      var subject2 = "";

      for (j = 0; j < econData.length; j++) {
        if (study['content'][i]['chart_name_2'] == econData[j]['name']) {
          subject2 = econData[j]['title'];
          console.log(subject2);
        }
      }

      for (j = 0; j < subject2DropdownOptions.length; j++) {
        if (subject2DropdownOptions[j].value == subject2) {
          subject2Dropdown.selectedIndex = subject2DropdownOptions[j].index;
        }
      }

      console.log(subject2Dropdown);


      updateDropdowns(i + 1, false);
      // d3.select("#subjectdropdown" + (i + 1)).property('selected', study['content'][i]['chart_name'].replace(/_/g, " ")).node();
      //d3.select("#subject2dropdown" + (i + 1)).attr("value", study['content'][i]['chart_name_2']);
      var start_year_dropdown = d3.select("#startyeardropdown" + (i + 1)).node();
      var start_year_options = start_year_dropdown.options;
      var given_start_year = study['content'][i]['chart_start'].slice(0, 4);

      for (j = 0; j < start_year_options.length; j++) {
        if (start_year_options[j].value == given_start_year) {
          start_year_dropdown.selectedIndex = start_year_options[j].index;
        }
      }

      var end_year_dropdown = d3.select("#endyeardropdown" + (i + 1)).node();
      var end_year_options = end_year_dropdown.options;
      var given_end_year = study['content'][i]['chart_end'].slice(0, 4);

      for (j = 0; j < end_year_options.length; j++) {
        if (end_year_options[j].value == given_end_year) {
          end_year_dropdown.selectedIndex = end_year_options[j].index;
        }
      }
      renderGraph(i + 1);
    }
  }
}

var updateStudy = function() {
  // console.log(contentList);
  var i = 0;
  for (i = 0; i < idlist.length; i++) {
    if (idlist[i].charAt(0) == "t") {
      var intext = d3.select("#" + idlist[i]).node().value;
      var textitem = {
        "type": "text",
        "text": intext
      }
      contentList[i] = textitem;
    }
  }
  sendThis["title"] = d3.select("#bigTitle").node().value;
  sendThis["content"] = contentList;
  sendThis["description"] = d3.select("#description").node().value;

  if (sendThis['title'] == "") {
    if (!errorFlashed) {
      var firstChild = d3.select("#flashable").attr("class", "alert alert-danger").html("You Must Enter A Title!");
      errorFlashed = true;
    }
  } else {

    fetch("/update-study/" + id, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(sendThis)
    }).then(() => location.reload());
  }
}

var addComment = function() {
  var text = d3.select("#userComment").node().value;
  var tosend = {
    "comment": text
  };
  fetch("/add-comment/" + id, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(tosend)
  }).then(() => location.reload());
}
