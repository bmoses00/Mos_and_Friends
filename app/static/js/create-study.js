//index of list item currently being modified
var index = 1;
var contentList = [];
var idlist = [];
var sendThis = {};

var errorFlashed = false;

var first_render = true;



var deleteItem = function(r, type) {
  if (type == "g" && (d3.select("#graphcontainer" + r).node() == null)) {
    //console.log()
    addSelectInput();
  } else {
    d3.select("#graphcontainer" + r).remove();
  }

  d3.selectAll("li")
    .each(function(d, i) {
      if (i == r) {
        this.remove();
      }
    });

  var offset = 1;




  contentList.splice(r - 1, 1);
  idlist.splice(r - 1, 1);
  var i = r + 1;
  for (i; i < idlist.length + 2; i++) {
    d3.select("#delete" + i)
      .attr("onclick", "deleteItem(" + (parseInt(d3.select("#delete" + i).node().id[6]) - offset) + "," + ("'" + idlist[i - 2].charAt(0)) + "')")
      .attr("id", "delete" + (parseInt(d3.select("#delete" + i).node().id[6]) - offset));
    if (idlist[i - 2].charAt(0) == "g") {
      d3.select("#graphcontainer" + i).attr("id", "graphcontainer" + (i - 1));
      d3.select("#subject1dropdown" + i).attr("id", "subject1dropdown" + (i - 1)).attr("onchange", "updateDropdowns(" + (i - 1) + ")");
      d3.select("#subject2dropdown" + i).attr("id", "subject2dropdown" + (i - 1)).attr("onchange", "updateDropdowns(" + (i - 1) + ")");
      d3.select("#startyeardropdown" + i).attr("id", "startyeardropdown" + (i - 1)).attr("onchange", "renderGraph(" + (i - 1) + ")");
      d3.select("#endyeardropdown" + i).attr("id", "endyeardropdown" + (i - 1)).attr("onchange", "renderGraph(" + (i - 1) + ")");
      d3.select("#title" + i).attr("id", "title" + (i - 1));
      d3.select("#svg" + i).attr("id", "svg" + (i - 1));
      d3.select("#path" + i).attr("id", "path" + (i - 1));
      d3.select("#x-axis" + i).attr("id", "x-axis" + (i - 1));
      d3.select("#y-axis" + i).attr("id", "y-axis" + (i - 1));
      d3.select("#path2" + i).attr("id", "path2" + (i - 1));
      d3.select("#x-axis2" + i).attr("id", "x-axis2" + (i - 1));
      d3.select("#y-axis2" + i).attr("id", "y-axis2" + (i - 1));
      d3.select("#x-label" + i).attr("id", "x-label" + (i - 1));
      d3.select("#y-label" + i).attr("id", "y-label" + (i - 1));
      d3.select("#y-label2" + i).attr("id", "y-label2" + (i - 1));
    }
  }


  index -= 1;
}

var addtextinput = function() {
  //remove previous item in list
  d3.selectAll("li")
    .each(function(d, i) {
      if (i == index) {
        this.remove();
      }
    });
  //create a new input group for text
  var text = document.createElement("div");
  text.className += "input-group";
  var input = document.createElement("div");
  input.className += "input-group-prepend";
  var span = document.createElement("span");
  span.className += "input-group-text";
  span.innerHTML = "Add Text:";
  input.appendChild(span);
  text.appendChild(input);
  var actualinput = document.createElement("textarea");
  actualinput.className += "form-control";
  actualinput.id = "text" + index;
  d3.select(actualinput).attr("oninput", 'auto_grow(this)');
  idlist.push("text" + index);
  text.appendChild(actualinput);
  console.log(actualinput);
  //create the new list item to be added to the page
  var listItem = d3.select("#masterlist").append("li").attr("class", "list-group-item");

  var structure = listItem.append("div").attr("class", "row");
  var firstCol = structure.append("div").attr("class", "col-10");

  firstCol.node().appendChild(text);

  listItem.innerHTML += "<br>";

  var deltCol = structure.append("div").attr("class", "col-2")

  //create a button to delete
  deltCol
    .append("button")
    .attr("class", "btn btn-outline-danger")
    .html("Delete")
    .attr("id", "delete" + index)
    .attr("onclick", "deleteItem(" + index + ",'t')");

  addSelectInput();
  index += 1;
}

var addSelectInput = function() {
  //create new list item
  var listItem = document.createElement("li");
  listItem.className += "list-group-item";
  //listItem.innerHTML += "<br>";
  //Create add text button
  var textbutton = document.createElement("button");
  textbutton.innerHTML = " Add Text ";
  textbutton.className += "btn btn-outline-primary";
  textbutton.setAttribute("onclick", "addtextinput()");
  textbutton.id = "textbutton";
  //add add text button
  listItem.appendChild(textbutton);
  listItem.innerHTML += "&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;";
  //Create add graph button
  var graphbutton = document.createElement("button");
  graphbutton.innerHTML = " Add Graph ";
  graphbutton.className += "btn btn-outline-primary";
  graphbutton.setAttribute("onclick", "addgraphinput()");
  graphbutton.id = "graphbutton";
  //add the button to the list
  listItem.appendChild(graphbutton);
  //add new list item to list
  var list = document.getElementById("masterlist");
  list.appendChild(listItem);
}




var addgraphinput = function() {
  //remove previous item in list
  d3.selectAll("li")
    .each(function(d, i) {
      if (i == index) {
        this.remove()
      }
    });

  //create new list item
  var listitem = d3.select("#masterlist")
    .append("li")
    .attr("class", "list-group-item")
    .html("<br>");

  //create structure for graph input
  var structure = listitem
    .append("div")
    .attr("class", "row pb-4");

  //create col/form for subject
  var subjectCol = structure
    .append("div")
    .attr("class", "col-5 pr-5");

  //create row for subjecr 1
  var sub1Row = subjectCol.append("div").attr("class", "row").html("Subject 1: ");

  //create select for subject dropdown menu
  var subjectDropdown1 = sub1Row
    .append("select")
    .attr("class", "custom-select ml-5 w-50")
    .attr("required", "true")
    .attr("onchange", "updateDropdowns(" + index + ")")
    .attr("id", "subject1dropdown" + index);


  //add Options to dropdown
  //will be down with a for loop through list of subjects, but for now j adding samples
  subjectDropdown1.append("option").html("");
  for (i = 0; i < econData.length; i++) {
    subjectDropdown1.append("option").html(econData[i].title);
    //console.log(econData);
    //console.log(subjectDropdown1.node());
  }

  subjectCol.node().innerHTML += "<br><br>";


  //create row for subjecr 2
  var sub2Row = subjectCol.append("div").attr("class", "row").html("Subject 2: ");

  //create select for subject dropdown menu
  var subjectDropdown2 = sub2Row
    .append("select")
    .attr("class", "custom-select ml-5 w-50")
    .attr("required", "true")
    .attr("onchange", "updateDropdowns(" + index + ")")
    .attr("id", "subject2dropdown" + index);

  //  subjectCol.node().innerHTML += "<br><br>";

  //add Options to dropdown
  //will be down with a for loop through list of subjects, but for now j adding samples
  subjectDropdown2.append("option").html("");
  for (i = 0; i < econData.length; i++) {
    subjectDropdown2.append("option").html(econData[i].title);
  }




  //create col/form for dates
  var dateCol = structure
    .append("div")
    .attr("class", "col-5 pl-5");

  //create row for start date
  var startRow = dateCol
    .append("div")
    .attr("class", "row")
    .html("Start Date: ");

  startRow.node().innerHTML += "&ensp;&ensp;";

  //create start date dropdowns
  var startYearDropdown = startRow
    .append("select")
    .attr("class", "custom-select w-50")
    .attr("onchange", "renderGraph(" + index + ")")
    .attr("id", "startyeardropdown" + index);

  //we will add specific years later
  var startyearOptions = startYearDropdown
    .append("option").html("");


  dateCol.node().innerHTML += "<br><br>";
  //create row for end date
  var endRow = dateCol
    .append("div")
    .attr("class", "row")
    .html("End Date: ");

  endRow.node().innerHTML += "&ensp;&ensp;&ensp;";
  //create start date dropdowns
  var endYearDropdown = endRow
    .append("select")
    .attr("class", "custom-select w-50")
    .attr("onchange", "renderGraph(" + index + ")")
    .attr("id", "endyeardropdown" + index);

  //we will add specific years later
  var endyearOptions = endYearDropdown
    .append("option")
    .html("");



  var i = 0;

  var finalCol = structure.append("div")
    .attr("class", "col-2").node();


  d3.select(finalCol)
    .append("button")
    .attr("class", "btn btn-outline-danger center-block")
    .html("Delete")
    .attr("id", "delete" + index)
    .attr("onclick", "deleteItem(" + index + ",'g')");

  structure.node().innerHTML += "<br><br>";

  idlist.push("graph" + index);

  index += 1;
}


function updateDropdowns(r) {
  var title1 = d3.select("#subject1dropdown" + r).node().value;
  var title2 = d3.select("#subject2dropdown" + r).node().value;

  if (title1 == '' && title2 == '') {
    return;
  }

  if (title1 == "" && title2 != "") {
    title1 = title2;
    title2 = "";
  }
  //get vals
  var year_start = d3.select("#startyeardropdown" + r);
  var year_end = d3.select("#endyeardropdown" + r);

  //get dropdowns and clear them
  var startyear = d3.select("#startyeardropdown" + r);
  startyear.selectAll("option").remove();

  var endyear = d3.select("#endyeardropdown" + r);
  endyear.selectAll("option").remove();

  //get data index
  var i = 0;
  var dataset1 = "";
  var dataset2 = "";
  var dataindex1 = 0;
  var dataindex2 = 0;

  for (i = 0; i < econData.length; i++) {
    if (econData[i].title == title1) {
      dataset1 = econData[i].name;
      dataindex1 = i
    }
    if (econData[i].title == title2) {
      dataset2 = econData[i].name;
      dataindex2 = i
    }
  }

  //get data from dataset
  var realStartYear = get_true_start_yea(dataset1, dataset2);

  var realEndYear = get_true_end_yea(dataset1, dataset2);
  //add options
  startyear.append("option").html(realStartYear);
  endyear.append("option").html(realEndYear);
  for (i = 1; i <= realEndYear - realStartYear; i++) {
    startyear.append("option").html("" + (realStartYear + i));
    endyear.append("option").html("" + (realEndYear - i));
  }

  if (!(d3.select("#graphcontainer" + r).node() == null)){
    renderGraph(r);
  }
}

function get_true_start_yea(dataset, dataset_2) {
  let year_start_1, year_start_2;
  econData.forEach(function(graph) {
    if (graph['name'] == dataset) year_start_1 = graph['start_date'].substring(0, 4);
    if (graph['name'] == dataset_2) year_start_2 = graph['start_date'].substring(0, 4);
  });

  if (year_start_1 == null) year_start_1 = "0001";
  if (year_start_2 == null) year_start_2 = "0001";

  return Math.max(year_start_1, year_start_2);
}



function get_true_end_yea(dataset, dataset_2) {

  let year_end_1, year_end_2;
  econData.forEach(function(graph) {
    if (graph['name'] == dataset) year_end_1 = graph['end_date'].substring(0, 4);
    if (graph['name'] == dataset_2) year_end_2 = graph['end_date'].substring(0, 4);
  });

  if (year_end_1 == null) year_end_1 = "9999"
  if (year_end_2 == null) year_end_2 = "9999"

  return Math.min(year_end_1, year_end_2);
}





function renderGraph(r) {

  if (d3.select("#graphcontainer" + r).node() == null) {
    first_render = true;
  }
  //  console.log(document.getElementById("graphcontainer" + r) == null);


  //  console.log(r);
  var title1 = d3.select("#subject1dropdown" + r).node().value;
  var title2 = "";

  if (d3.select("#subject2dropdown" + r).node().value != null) {
    title2 = d3.select("#subject2dropdown" + r).node().value;
  }

  if (title1 == "" && title2 != "") {
    title1 = title2;
    title2 = "";
  }

  var year_start = d3.select("#startyeardropdown" + r).node().value;
  var year_end = d3.select("#endyeardropdown" + r).node().value;

  var dataset1 = "";
  var dataset2 = "";

  var i = 0;
  var dataindex1 = 0;
  var dataindex2 = 0;

  for (i = 0; i < econData.length; i++) {
    if (econData[i].title == title1) {
      dataset1 = econData[i].name;
      dataindex1 = i;
    }
    if (econData[i].title == title2) {
      dataset2 = econData[i].name;
      dataindex2 = i;
    }
  }

  var listitem = d3.select(d3.selectAll("li").nodes()[r]);


  var textForTitle = "";

  if (title2 == "") {
    textForTitle = title1 + " From " + year_start + " To " + year_end;
  } else {
    textForTitle = title1 + " and " + title2 + " From " + year_start + " To " + year_end;
  }

  if (first_render) {
    //  listitem.append("div").attr("class", "container pt-4 center-block").attr("style", "margin-left: 0px;")
    // .append("h2")
    //   .html(title + " From " + year_start + " To " + year_end)
    //   .attr("id", "title" + r);

    listitem.append('div').attr("id", "graphcontainer" + r).attr("class", "container mt-5 text-center")
      .append("h2")
      .attr("class", "pb-5")
      .html(textForTitle)
      .attr("id", "title" + r);
  }

  var intitle = d3.select("#title" + r).html(textForTitle);
  var graphcontainer = d3.select("#graphcontainer" + r);

  //  graphcontainer.node().innerHTML += "<br><br>";


  let width = 900;
  let height = 300;

  if (first_render) {
    graphcontainer.append("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("style", "overflow: visible")
      .attr("id", "svg" + r)
      .append("g")
      .attr("id", "group")
      .attr("transform", "translate(50, 0)");
  }

  var svg = d3.select("#svg" + r);



  var contentitem = {}
  contentitem["type"] = "chart";
  contentitem["chart_start"] = year_start + "-01-01";
  contentitem["chart_end"] = year_end + "-01-01";
  contentitem["chart_name"] = dataset1;
  contentitem["chart_start_2"] = year_start + "-01-01";
  contentitem["chart_end_2"] = year_end + "-01-01";
  contentitem["chart_name_2"] = dataset2;



  contentList[r - 1] = contentitem;



  if (!(title1 == "" || year_start == "" || year_end == "")) {
    draw_graph(svg, dataset1, dataset2, year_start, year_end, first_render, r);
  }
  if (first_render) {
    //index += 1;
    addSelectInput();
    first_render = false;
  }
}




var finalizeStudy = function() {
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

    // console.log(sendThis);

    fetch("/create-study", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(sendThis)
      }).then(res => res.json())
      .then(data => {
        window.location = "/" + data.redirect;
      })
  }
}

function auto_grow(element) {
  element.style.height = "5px";
  element.style.height = (element.scrollHeight) + "px";
}
