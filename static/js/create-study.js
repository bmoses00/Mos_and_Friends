var index = 1;

var addtextinput = function() {
  //remove previous item in list
  var oldItem = document.getElementById("masterlist").children[index];
  //console.log(document.getElementById("masterlist"));
  oldItem.remove();
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
  var oldItem = document.getElementById("masterlist").children[index];
  //console.log(document.getElementById("masterlist"));
  oldItem.remove();
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

var finalizeText = function(){
  //remove old
  var oldItem = document.getElementById("masterlist").children[index];
  //get text in before removing
  var textin = oldItem.children[0].children[1].value;
  console.log(textin);
  oldItem.remove();
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
