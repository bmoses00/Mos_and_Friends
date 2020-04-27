//index of list item currently being modified
var index = 1;

var first_render = true;


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
  listItem.appendChild(backbutton);
  listItem.innerHTML += "&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;";
  //create a button to finalize the text
  var newbutton = document.createElement("button");
  newbutton.className += "btn btn-secondary";
  newbutton.setAttribute("onclick", "finalizeText()");
  newbutton.innerHTML = "Finalize this text";
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
  //get old
  var oldItem = document.getElementById("masterlist").children[index];
  //get text in before removing
  var textin = oldItem.children[0].children[1].value;
  //remove old
  d3.selectAll("li")
    .each(function(d, i) {
      if (i == index) {
        this.remove();
      }
    });
  //create new list item
  var listItem = document.createElement("li");
  listItem.className += "list-group-item";
  //add the text input
  listItem.innerHTML = textin;
  //add to list
  var list = document.getElementById("masterlist")
  list.appendChild(listItem);
  //current index increases
  index += 1;

  //create new list item
  var listItem = document.createElement("li");
  listItem.className += "list-group-item";
  listItem.innerHTML += "<br>";
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
  subjectDropdown.append("option").html("inflation");
  subjectDropdown.append("option").html("unemployment");
  subjectDropdown.append("option").html("10_year_treasury_yields");

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
    .attr("onchange", "renderGraph()")
    .attr("id", "startyeardropdown");

  //we will add specific years later
  var startyearOptions = startYearDropdown
    .append("option").html("option");


  startRow.node().innerHTML += "&ensp;&ensp;";

  //start month dropdown
  var startMonthDropdown = startRow
    .append("select")
    .attr("class", "custom-select w-25")
    .attr("onchange", "renderGraph()")
    .attr("id", "startmonthdropdown");


  var i = 0;
  //month options
  for (i = 0; i < 12; i++) {
    startMonthDropdown.append("option").html((i + 1) + "");
  }

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
    .attr("onchange", "renderGraph()")
    .attr("id", "endyeardropdown");

  //we will add specific years later
  var endyearOptions = endYearDropdown
    .append("option")
    .html("option");

  endRow.node().innerHTML += "&ensp;&ensp;";

  //end month dropdown
  var endMonthDropdown = endRow
    .append("select")
    .attr("class", "custom-select w-25")
    .attr("onchange", "renderGraph()")
    .attr("id", "endmonthdropdown");


  var i = 0;
  for (i = 0; i < 12; i++) {
    endMonthDropdown.append("option").html((i + 1) + "");
  }
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

  var finalizeButton = finalCol
      .append("button")
      .attr("class", "btn btn-secondary")
      .attr("id", "finalizeGraph")
      .attr("onclick", "finalizeGraph()")
      .html("Finalize Graph");

  structure.node().innerHTML += "<br><br>";
}

function renderGraph() {

  var dataset = d3.select("#subjectdropdown").node().value;
  console.log(dataset);
  //for selecting dates

  var list = d3.select("#masterlist");

  if (first_render){
    list.append("li").attr("class", "list-group-item");
  }

  var graphcontainer = d3.select(d3.selectAll("li").nodes()[index + 1]);


  let width = 1100;
  let height = 200;
  let margin = 50;
  const parseTime = d3.timeParse("%Y-%m-%d");

  console.log(width);
  console.log(height);

  const scaleX = d3.scaleTime().range([0, width - margin - 10])
  const scaleY = d3.scaleLinear().range([height - margin, 0]);



  if (first_render){
    graphcontainer.append("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("id", "svg" + index)
      .append("g")
        .attr("id", "group")
        .attr("transform", "translate(50, 0)");

  }

  var svg = d3.select("#svg" + index);

  d3.csv("static/csv/" + dataset + ".csv").then(function(data) {

    const date = data.columns[0];
    const value = data.columns[1];

    data.forEach(function(d, index) {

      d[date] = parseTime(d[date]);
      // some quarters have no data, for these, we set the yield to that of the previous quarter
      if (d[value] == ".") {
        d[value] = +data[index - 1][value];
      }
      else {
        d[value] = +d[value];
      }
    });

    if (!first_render) {
      d3.select("#path" + index).remove();
      d3.select("#x-axis" + index).remove();
      d3.select("#y-axis" + index).remove();
    }


    scaleX.domain(d3.extent(data, function(d) { return d[date]; }));
    scaleY.domain([0, d3.max(data, function(d) { return d[value]; })]);

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

      first_render = false;


  });
}


var finalizeGraph = function(){
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
    listItem.innerHTML += "<br>";
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
