console.log("Hello Remmer");
var urlText;
var firstURL;
setTimeout(() => {
  Main();
}, 1000);

setInterval(() => {
  console.log("First URL: ", firstURL);
  CheckChange(firstURL);
}, 2000);

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
  var url = (urlRemovedParentheses.match(pattern))[0];
  firstURL = url;
  console.log("Pure URL: ", url);
  document.getElementById("web").src = url;
}

async function CheckChange(firstURL) {
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
  var urlNext = (urlRemovedParentheses.match(pattern))[0];
  console.log("urlNext: ", urlNext);
  console.log("firstURL: ", firstURL);
  if(urlNext === firstURL){
    console.log("Không có thay đổi");
  } else {
    console.log("Có thay đổi");
    document.getElementById("web").src = urlNext;
    firstURL = urlNext;
  }
}