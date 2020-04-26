//index of list item currently being modified
var index = 1;

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
    .attr("class", "row pb-4 border-bottom border-dark");

  //create col/form for subject
  var subjectCol = structure
    .append("div")
    .attr("class", "col pr-5")
    .html("Choose Subject:");

  subjectCol.node().innerHTML += "<br><br>";

  //create select for subject dropdown menu
  var subjectDropdown = subjectCol
    .append("select")
    .attr("class", "custom-select")
    .attr("required", "true")
    .attr("onchange", "renderGraph");

  //add Options to dropdown
  //will be down with a for loop through list of subjects, but for now j adding samples
  var subjectOptions = subjectDropdown
    .append("option").html("option 1");

  //create col/form for dates
  var dateCol = structure
    .append("div")
    .attr("class", "col pl-5");

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
    .attr("onchange", "renderGraph()");

  //we will add specific years later
  var startyearOptions = startYearDropdown
    .append("option").html("option");


  startRow.node().innerHTML += "&ensp;&ensp;";

  //start month dropdown
  var startMonthDropdown = startRow
    .append("select")
    .attr("class", "custom-select w-25")
    .attr("onchange", "renderGraph()");


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
    .attr("onchange", "renderGraph()");

  //we will add specific years later
  var endyearOptions = endYearDropdown
    .append("option")
    .html("option");

  endRow.node().innerHTML += "&ensp;&ensp;";

  //end month dropdown
  var endMonthDropdown = endRow
    .append("select")
    .attr("class", "custom-select w-25")
    .attr("onchange", "renderGraph()");


  var i = 0;
  for (i = 0; i < 12; i++) {
    endMonthDropdown.append("option").html((i + 1) + "");
  }
  listitem.node().innerHTML += "<br><br>";
  //add render/back buttons
  var belowRow = listitem
    .append("div")
    .attr("class", "row");


  var backbutton = belowRow
    .append("button")
    .attr("class", "btn btn-secondary")
    .attr("id", "backbutton")
    .attr("onclick", "removeCurrent()")
    .html("Back");
  structure.node().innerHTML += "<br><br>";
}

var renderGraph = function(){
  
}
