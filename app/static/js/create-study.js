//index of list item currently being modified
var index = 1;
var contentList = [];
var idlist = [];
var sendThis = {};

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
      if (i == r){
        this.remove();
      }
    });

  var offset = 1;




  contentList.splice(r - 1, 1);
  idlist.splice(r - 1, 1);
  var i = r + 1;
  for (i; i < idlist.length + 2; i++){
    d3.select("#delete" + i)
      .attr("onclick", "deleteItem(" + (parseInt(d3.select("#delete" + i).node().id[6]) - offset) + "," + ("'" + idlist[i - 2].charAt(0)) + "')")
      .attr("id", "delete" + (parseInt(d3.select("#delete" + i).node().id[6]) - offset));
    if (idlist[i - 2].charAt(0) == "g"){
      d3.select("#graphcontainer" + i).attr("id", "graphcontainer" + (i - 1));
      d3.select("#subjectdropdown" + i).attr("id", "subjectdropdown" + (i - 1)).attr("onchange", "updateDropdowns(" + (i - 1) + ")");
      d3.select("#startyeardropdown" + i).attr("id", "startyeardropdown" + (i - 1)).attr("onchange", "renderGraph(" + (i - 1) + ")");
      d3.select("#endyeardropdown" + i).attr("id", "endyeardropdown" + (i - 1)).attr("onchange", "renderGraph(" + (i - 1) + ")");
      d3.select("#title" + i).attr("id", "title" + (i - 1));
      d3.select("#svg" + i).attr("id", "svg" + (i - 1));
      d3.select("#path" + i).attr("id", "path" + (i - 1));
      d3.select("#x-axis" + i).attr("id", "x-axis" + (i - 1));
      d3.select("#y-axis" + i).attr("id", "y-axis" + (i - 1));
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
  idlist.push("text" + index);
  text.appendChild(actualinput);
  //create the new list item to be added to the page
  var listItem = document.createElement("li");
  listItem.className += "list-group-item";
  listItem.appendChild(text);
  listItem.innerHTML += "<br>";

  //add new list item to page
  var list = document.getElementById("masterlist");
  list.appendChild(listItem);
  //create a button to delete
  d3.select(d3.selectAll("li").nodes()[index])
    .append("button")
    .attr("class", "btn btn-secondary")
    .html("Delete")
    .attr("id", "delete" + index)
    .attr("onclick", "deleteItem(" + index + ",'t')");

  addSelectInput();
  index+=1;
}

var addSelectInput = function(){
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
    .attr("onchange", "updateDropdowns(" + index + ")")
    .attr("id", "subjectdropdown" + index);

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
    .attr("class", "custom-select w-50")
    .attr("onchange", "renderGraph(" + index  + ")")
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
      .attr("class", "btn btn-secondary center-block")
      .html("Delete")
      .attr("id", "delete" + index)
      .attr("onclick", "deleteItem(" + index + ",'g')");

  structure.node().innerHTML += "<br><br>";

  idlist.push("graph" + index);

  index += 1;
}


function updateDropdowns(r){
  var title = d3.select("#subjectdropdown" + r).node().value;
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
  var dataindex = 0;
  for (i = 0; i < econData.length; i++) {
    if (econData[i].title == title) {
      dataset = econData[i].name;
      dataindex = i;
    }
  }

  //get data from dataset
  var realStartYear = parseInt(econData[dataindex].start_date.slice(0, 4));
  var realStartMonth = parseInt(econData[dataindex].start_date.slice(5, 7));

  var realEndYear = parseInt(econData[dataindex].end_date.slice(0, 4));
  var realEndMonth = parseInt(econData[dataindex].end_date.slice(5, 7));

  var maxMonth = Math.max(realEndMonth, realStartMonth);


  //add options
  startyear.append("option").html("");
  endyear.append("option").html("");
  for (i = 0; i < realEndYear - realStartYear; i++) {
    startyear.append("option").html("" + (realStartYear + i));
    endyear.append("option").html("" + (realStartYear + i));
  }

}



function renderGraph(r) {

  if (d3.select("#graphcontainer" + r).node() == null){
    first_render = true;
  }
//  console.log(document.getElementById("graphcontainer" + r) == null);

  var title = d3.select("#subjectdropdown" + r).node().value;
  var year_start = d3.select("#startyeardropdown" + r).node().value;
  var year_end = d3.select("#endyeardropdown" + r).node().value;

  var dataset = "";
  var i = 0;
  var dataindex = 0;
  for (i = 0; i < econData.length; i++) {
    if (econData[i].title == title) {
      dataset = econData[i].name;
      dataindex = i;
    }
  }

  var listitem = d3.select(d3.selectAll("li").nodes()[r]);

  if (first_render) {
  //  listitem.append("div").attr("class", "container pt-4 center-block").attr("style", "margin-left: 0px;")
    // .append("h2")
    //   .html(title + " From " + year_start + " To " + year_end)
    //   .attr("id", "title" + r);

    listitem.append('div').attr("id", "graphcontainer" + r).attr("class", "container mt-5 text-center")
    .append("h2")
      .attr("class", "pb-5")
      .html(title + " From " + year_start + " To " + year_end)
      .attr("id", "title" + r);
  }

  var intitle = d3.select("#title" + r).html(title + " From " + year_start + " To " + year_end);
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
  contentitem["chart_name"] = dataset;


  contentList[r - 1] = contentitem;



  if (!(title == "" || year_start == "" || year_end == "")) {
    draw_graph(svg, dataset, year_start, year_end, first_render, r);
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
                        "type" : "text",
                        "text" : intext
                      }
      contentList[i]= textitem;
    }
  }
  sendThis["title"] = d3.select("#bigTitle").node().value;
  sendThis["content"] = contentList;
  sendThis["description"] = d3.select("#description").node().value;

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
