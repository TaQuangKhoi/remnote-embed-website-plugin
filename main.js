console.log("Hello 🌎");
HideElement("web");

// Check and Get URL in Children
let urlText;
CheckChildrenURL();
async function CheckChildrenURL() {
  ShowElement("web");
  const PluginContext = await RemNoteAPI.v0.get_context();
  console.log("Context of Plugin:", PluginContext);

  const pluginID = await RemNoteAPI.v0.get(PluginContext.remId);
  console.log("Content of Plugin RemId", PluginContext.remId, ": ", test);

  var urlMD = await RemNoteAPI.v0.get(pluginID.children[0]);
  if (urlMD == undefined) {
    EmbedWeb(PluginContext.remId);
  } else {
    console.log("Get Children.Text : ", urlMD.nameAsMarkdown);
    var urlText = FilterURL(urlMD.nameAsMarkdown);
    document.getElementById("web").src = urlText; // Set src in iframe
    HideElement("inputURL");
  }
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
  var inputValue = document.getElementById("inputValue").value;
  console.log(inputValue);
  var input = document.getElementById("inputValue");

  input.addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
      ReceiveURL(e);
      createRemURL(inputValue, parentID);
      document.getElementById("web").src = inputValue;
      HideElement("inputURL");
      ShowElement("web");
    }
  });
}

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
async function test() {
  const documentId = await RemNoteAPI.v0.get_context();
  const pluginId = documentId.remId;
  var plugin_rem = await RemNoteAPI.v0.get(pluginId);
}
