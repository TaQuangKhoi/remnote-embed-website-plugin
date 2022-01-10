// File này do làm quá trớn nên không chạy được
console.log("Hello Remmer");

setInterval (()=> {
  CheckChildrenURL();
}, 1000);

// Check and Get URL in Children

var urlText;

async function GetPluginContext() {
  var PluginContext = await RemNoteAPI.v0.get_context();
  return PluginContext;
}
async function GetPluginFirstChild() {
  // GetPluginContext();
}

async function CheckChildrenURL() {
  // Context of Plugin => RemID
  var PluginContext = GetPluginContext();
  
  //Get Chidlren of Plugin Rem
  var pluginID = await RemNoteAPI.v0.get(PluginContext.remId);
  console.log("Content of Plugin RemID: ", pluginID);

  // Get Content of first child
  var urlMD = await RemNoteAPI.v0.get(pluginID.children[0]);
  
  console.log("Get Children.Text : ", urlMD.nameAsMarkdown);
  urlText = FilterURL(urlMD.nameAsMarkdown);
  ShowElement("web");
  document.getElementById("web").src = urlText; // Set src in iframe
  HideElement("inputURL");
}

// Filter URL with Regex
function FilterURL(urlAsMarkdown) {
  let pattern = /http(.*)/gm;
  var urlRemovedParentheses = urlAsMarkdown.replace(/[)]/g, "");
  var urlText = urlRemovedParentheses.match(pattern);
  console.log("Pure URL: ", urlText);
  return urlText;
}

// Wait URL from Input Bar
function EmbedWeb(parentID) {
  
}

HideElement("web");

CheckChildrenURL();
var input = document.getElementById("inputValue");
input.addEventListener("keydown", function(e) {
  if (e.key === "Enter") {
    var inputValue = ReceiveURL(e);
    /*
    var inputValue = document.getElementById("inputValue").value;
    console.log("inputValue: ", inputValue);
    
    */
    //createRemURL(inputValue, PluginContext.remId);
    document.getElementById("web").src = inputValue;
    HideElement("inputURL");
    ShowElement("web");
  }
});

function ReceiveURL(e) {
  var text = e.target.value;
  alert(text);
  return text;
}

async function createRemURL(URL, parentID) {
  await RemNoteAPI.v0.create(URL, parentID);
}

// Hide and Show element
function HideElement(ElementID) {
  var x = document.getElementById(ElementID);
  x.style.display = "none";
}
function ShowElement(ElementID) {
  var x = document.getElementById(ElementID);
  x.style.display = "block";
}

// Get Plugin ID, read the rem's children
