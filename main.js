console.log("Hello Remmer");

Main();

var urlText;
async function Main(){
  // Context of Plugin => RemID
  var PluginContext = await RemNoteAPI.v0.get_context();
  
  //Get Chidlren of Plugin Rem
  var pluginID = await RemNoteAPI.v0.get(PluginContext.remId);
  console.log("Content of Plugin RemID: ", pluginID);

  // Get Content of first child
  var urlMD = await RemNoteAPI.v0.get(pluginID.children[0]);
  
  urlAsMarkdown = urlMD.nameAsMarkdown;
  console.log("Get Children.Text : ", urlMD.nameAsMarkdown);
  let pattern = /http(.*)/gm;
  var urlRemovedParentheses = urlAsMarkdown.replace(/[)]/g, "");
  var urlText = urlRemovedParentheses.match(pattern);
  console.log("Pure URL: ", urlText);
  
  document.getElementById("web").src = urlText;
}