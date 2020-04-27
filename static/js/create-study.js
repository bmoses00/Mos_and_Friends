//index of list item currently being modified
var index = 1;
var contentList = [];
var idlist = [];
var sendThis = {};

var first_render = true;



var deleteItem = function(r) {
  d3.selectAll("li")
    .each(function(d, i) {
      if (i == r) {
        this.remove();
      }
    });
  console.log(idlist);
  console.log(r - 1);
  contentList.splice(r - 1, 1);
  idlist.splice(r - 1, 1);
    console.log(idlist);
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
  idlist.push("text" + index);
  text.appendChild(actualinput);
  //create the new list item to be added to the page
  var listItem = document.createElement("li");
  listItem.className += "list-group-item";
  listItem.appendChild(text);
  listItem.innerHTML += "<br>";
  //create a button to go back
  var backbutton = document.createElement("button");
  backbutton.className += "btn btn-secondary";
  backbutton.setAttribute("onclick", "removeCurrent()");
  backbutton.innerHTML = "Back";
  backbutton.id = "backTextButton";
  listItem.appendChild(backbutton);
  //listItem.innerHTML += "&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;";
  //create a button to finalize the text
  var newbutton = document.createElement("button");
  newbutton.className += "btn btn-secondary ml-5";
  newbutton.setAttribute("onclick", "finalizeText()");
  newbutton.innerHTML = "Finalize this text";
  newbutton.id = "finalizeTextButton";
  listItem.appendChild(newbutton);
  //add new list item to page
  var list = document.getElementById("masterlist");
  list.appendChild(listItem);
}

var removeCurrent = function() {
  //remove old
  d3.selectAll("li")
    .each(function(d, i) {
      if (i == index) {
        this.remove();
      }
    });
  idlist.pop();
  //create new list item
  var listItem = document.createElement("li");
  listItem.className += "list-group-item";
  //listItem.innerHTML += "<br>";
  //Create add text button
  var textbutton = document.createElement("button");
  textbutton.innerHTML = " Add Text ";
  textbutton.className += "btn btn-secondary";
  textbutton.setAttribute("onclick", "addtextinput()");
  textbutton.id = "textbutton";
  //add add text button
  listItem.appendChild(textbutton);
  listItem.innerHTML += "&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;";
  //Create add graph button
  var graphbutton = document.createElement("button");
  graphbutton.innerHTML = " Add Graph ";
  graphbutton.className += "btn btn-secondary";
  graphbutton.setAttribute("onclick", "addgraphinput()");
  graphbutton.id = "graphbutton";
  //add the button to the list
  listItem.appendChild(graphbutton);
  //add new list item to list
  var list = document.getElementById("masterlist");
  list.appendChild(listItem);
}

var removeGraphInput = function() {
  //remove old
  d3.selectAll("li")
    .each(function(d, i) {
      if (i == index || i == index + 1) {
        this.remove();
      }
    });

  console.log(index);
  console.log(contentList);
  if (!first_render && contentList[index - 1]["type"] == "chart"){
    contentList.pop();
    console.log(contentList);
  }
  idlist.pop();

  first_render = true;
  //create new list item
  var listItem = document.createElement("li");
  listItem.className += "list-group-item";
  //listItem.innerHTML += "<br>";
  //Create add text button
  var textbutton = document.createElement("button");
  textbutton.innerHTML = " Add Text ";
  textbutton.className += "btn btn-secondary";
  textbutton.setAttribute("onclick", "addtextinput()");
  textbutton.id = "textbutton";
  //add add text button
  listItem.appendChild(textbutton);
  listItem.innerHTML += "&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;";
  //Create add graph button
  var graphbutton = document.createElement("button");
  graphbutton.innerHTML = " Add Graph ";
  graphbutton.className += "btn btn-secondary";
  graphbutton.setAttribute("onclick", "addgraphinput()");
  graphbutton.id = "graphbutton";
  //add the button to the list
  listItem.appendChild(graphbutton);
  //add new list item to list
  var list = document.getElementById("masterlist");
  list.appendChild(listItem);
}

var finalizeText = function() {

  // //remove old
  d3.select("#backTextButton").remove();
  d3.select("#finalizeTextButton").remove();
  //add delete button
  d3.select(d3.selectAll("li").nodes()[index])
    .append("button")
    .attr("class", "btn btn-secondary")
    .html("Delete")
    .attr("id", "delete" + index)
    .attr("onclick", "deleteItem(" + index + ")");

  index += 1;

  //create new list item
  var listItem = document.createElement("li");
  listItem.className += "list-group-item";
  //Create add text button
  var textbutton = document.createElement("button");
  textbutton.innerHTML = " Add Text ";
  textbutton.className += "btn btn-secondary";
  textbutton.setAttribute("onclick", "addtextinput()");
  textbutton.id = "textbutton";
  //add add text button
  listItem.appendChild(textbutton);
  listItem.innerHTML += "&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;";
  //Create add graph button
  var graphbutton = document.createElement("button");
  graphbutton.innerHTML = " Add Graph ";
  graphbutton.className += "btn btn-secondary";
  graphbutton.setAttribute("onclick", "addgraphinput()");
  graphbutton.id = "graphbutton";
  //add the button to the list
  listItem.appendChild(graphbutton);
  //add new list item to list
  var list = document.getElementById("masterlist");
  list.appendChild(listItem);

  var actualText = d3.select("#text" + (index - 1)).node().value;
  contentList.push({"type" : "text", "text" : actualText});
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
    .attr("class", "col-5 pr-5")
    .html("Choose Subject:");

  subjectCol.node().innerHTML += "<br><br>";

  //create select for subject dropdown menu
  var subjectDropdown = subjectCol
    .append("select")
    .attr("class", "custom-select")
    .attr("required", "true")
    .attr("onchange", "renderGraph()")
    .attr("id", "subjectdropdown");

  //add Options to dropdown
  //will be down with a for loop through list of subjects, but for now j adding samples
  subjectDropdown.append("option").html("");
  for (i = 0; i < econData.length; i++) {
    subjectDropdown.append("option").html(econData[i].title);
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
    .attr("class", "custom-select w-25")
    // .attr("onchange", "renderGraph()")
    .attr("id", "startyeardropdown");

  //we will add specific years later
  var startyearOptions = startYearDropdown
    .append("option").html("");


  startRow.node().innerHTML += "&ensp;&ensp;";

  //start month dropdown
  var startMonthDropdown = startRow
    .append("select")
    .attr("class", "custom-select w-25")
    // .attr("onchange", "renderGraph()")
    .attr("id", "startmonthdropdown");


  var i = 0;
  //month options
  startMonthDropdown.append("option").html("");

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
    .attr("class", "custom-select w-25")
    // .attr("onchange", "renderGraph()")
    .attr("id", "endyeardropdown");

  //we will add specific years later
  var endyearOptions = endYearDropdown
    .append("option")
    .html("");

  endRow.node().innerHTML += "&ensp;&ensp;";

  //end month dropdown
  var endMonthDropdown = endRow
    .append("select")
    .attr("class", "custom-select w-25")
    // .attr("onchange", "renderGraph()")
    .attr("id", "endmonthdropdown");


  var i = 0;
  endMonthDropdown.append("option").html("");
  //listitem.node().innerHTML += "<br><br>";
  //add render/back buttons
  var finalCol = structure.append("div")
    .attr("class", "col-2");


  var backbutton = finalCol
    .append("button")
    .attr("class", "btn btn-secondary")
    .attr("id", "backbutton")
    .attr("onclick", "removeGraphInput()")
    .html("Back");

  finalCol.node().innerHTML += "<br><br>";

  var renderButton = finalCol
    .append("button")
    .attr("class", "btn btn-secondary")
    .attr("id", "renderGraph")
    .attr("onclick", "renderGraph()")
    .html("Render Graph");

  finalCol.node().innerHTML += "<br><br>";

  var finalizeButton = finalCol
    .append("button")
    .attr("class", "btn btn-secondary")
    .attr("id", "finalizeGraph")
    .attr("onclick", "finalizeGraph()")
    .html("Finalize Graph");

  structure.node().innerHTML += "<br><br>";

  idlist.push("graph" + index);
}



function renderGraph() {

  var title = d3.select("#subjectdropdown").node().value;

  var year_start = d3.select("#startyeardropdown").node().value;
  var year_end = d3.select("#endyeardropdown").node().value;
  var month_start = d3.select("#startmonthdropdown").node().value;
  var month_end = d3.select("#endmonthdropdown").node().value;


  var dataset = "";
  var i = 0;
  var dataindex = 0;
  for (i = 0; i < econData.length; i++) {
    if (econData[i].title == title) {
      dataset = econData[i].routing_name;
      dataindex = i;
    }
  }

  //for selecting dates
  var startmonth = d3.select("#startmonthdropdown");
  startmonth.selectAll("option").remove();
  var startyear = d3.select("#startyeardropdown");
  startyear.selectAll("option").remove();
  var endmonth = d3.select("#endmonthdropdown");
  endmonth.selectAll("option").remove();
  var endyear = d3.select("#endyeardropdown");
  endyear.selectAll("option").remove();

  var realStartYear = parseInt(econData[dataindex].start_date.slice(0, 4));
  var realStartMonth = parseInt(econData[dataindex].start_date.slice(5, 7));

  var realEndYear = parseInt(econData[dataindex].end_date.slice(0, 4));
  var realEndMonth = parseInt(econData[dataindex].end_date.slice(5, 7));

  var maxMonth = Math.max(realEndMonth, realStartMonth);



  console.log(realStartYear);

  startyear.append("option").html("");
  endyear.append("option").html("");
  for (i = 0; i < realEndYear - realStartYear; i++) {
    startyear.append("option").html("" + (realStartYear + i));
    endyear.append("option").html("" + (realStartYear + i));
  }

  startmonth.append("option").html("");
  endmonth.append("option").html("");
  for (i = 0; i <= maxMonth; i++) {
    startmonth.append("option").html("" + i);
    endmonth.append("option").html("" + i);
  }

  var list = d3.select("#masterlist");

  if (first_render) {
    list.append("li").attr("class", "list-group-item").append("h2").attr("class", "mb-5")
      .html(title + " From " + year_start + " To " + year_end)
      .attr("id", "title" + index);
  }

  var intitle = d3.select("#title" + index).html(title + " From " + year_start + " To " + year_end);
  var graphcontainer = d3.select(d3.selectAll("li").nodes()[index + 1]).append("div").attr("class", "container-fluid");



  let width = 900;
  let height = 300;
  let margin = 50;
  const parseTime = d3.timeParse("%Y-%m-%d");

  const scaleX = d3.scaleTime().range([0, width - margin - 10])
  const scaleY = d3.scaleLinear().range([height - margin, 0]);



  if (first_render) {
    graphcontainer.append("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("style", "overflow: visible")
      .attr("id", "svg" + index)
      .append("g")
      .attr("id", "group")
      .attr("transform", "translate(50, 0)");

  }

  var svg = d3.select("#svg" + index);


  if (!first_render) {
    contentList.pop();
  }

  var contentitem = {}
  contentitem["type"] = "chart";
  contentitem["chart_start"] = year_start + "-01-01";
  contentitem["chart_end"] = year_end + "-01-01";
  contentitem["chart_name"] = title;

  contentList.push(contentitem);


  first_render = false;

  if (!(title == "" || year_start == "" || year_end == "")) { //|| month_start == "" || month_end == "")) {

    d3.csv("static/csv/" + dataset + ".csv").then(function(raw_data) {

      data = []

      const date = raw_data.columns[0];
      const value = raw_data.columns[1];

      raw_data.forEach(function(d, index) {
        const current_year = d[date].substring(0, 4)

        if (d[value] != "." && current_year >= year_start && current_year <= year_end) {
          d[value] = +d[value];
          d[date] = parseTime(d[date]);
          data.push(d);
        }
      });

      if (!first_render) {
        d3.select("#path" + index).remove();
        d3.select("#x-axis" + index).remove();
        d3.select("#y-axis" + index).remove();
      }

      first_render = false;

      scaleX.domain(d3.extent(data, function(d) {
        return d[date];
      }));
      scaleY.domain([0, d3.max(data, function(d) {
        return d[value];
      })]);

      let line = d3.line()
        .x(d => scaleX(d[date]))
        .y(d => scaleY(d[value]));

      // draws line graph
      svg.append("path")
        .data([data])
        .attr("id", "path" + index)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 1.5)
        .attr("d", line);

      // x and y axes
      svg.append("g")
        .attr("id", "x-axis" + index)
        .attr("transform", "translate(0," + (height - margin) + ")")
        .call(d3.axisBottom(scaleX));

      svg.append("g")
        .attr("id", "y-axis" + index)
        .call(d3.axisLeft(scaleY));

    });
  }
}



var finalizeGraph = function() {
  d3.selectAll("li")
    .each(function(d, i) {
      if (i == index) {
        this.remove();
      }
    });
  index += 1;
  first_render = true;
  //create new list item
  var listItem = document.createElement("li");
  listItem.className += "list-group-item";
  //Create add text button
  var textbutton = document.createElement("button");
  textbutton.innerHTML = " Add Text ";
  textbutton.className += "btn btn-secondary";
  textbutton.setAttribute("onclick", "addtextinput()");
  textbutton.id = "textbutton";
  //add add text button
  listItem.appendChild(textbutton);
  listItem.innerHTML += "&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;";
  //Create add graph button
  var graphbutton = document.createElement("button");
  graphbutton.innerHTML = " Add Graph ";
  graphbutton.className += "btn btn-secondary";
  graphbutton.setAttribute("onclick", "addgraphinput()");
  graphbutton.id = "graphbutton";
  //add the button to the list
  listItem.appendChild(graphbutton);
  //add new list item to list
  var list = document.getElementById("masterlist");
  list.appendChild(listItem);
}

var finalizeStudy = function(){
  var i = 0;
  for (i = 0; i < contentList.length; i++){
    if (contentList[i]["type"] == "text"){
      var intext = d3.select("#" + idlist[i]).node().value;
      contentList[i]["text"] = intext;
    }
  }
  sendThis["title"] = d3.select("#bigTitle").node().value;
  sendThis["content"] = contentList;
  console.log(sendThis);
  window.location = "/home";
}
