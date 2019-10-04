// Expected args:
// 1 - path to the NativeScript's package.json file
// 2 - The unique suffix to add to the app's ID 
var fs = require('fs');
var pt = require('path')

var myArgs = process.argv.slice(2);
var jsonPath = myArgs[0];
var onlyPath = pt.dirname(jsonPath);

var appGradlePath = pt.join(onlyPath, "App_Resources", "Android", "app.gradle");
if (!fs.existsSync(appGradlePath)) {
    appGradlePath = pt.join(onlyPath, "app/App_Resources", "Android", "app.gradle");
}
const appGradleFile = fs.readFileSync(appGradlePath);
let lines = appGradleFile.toString().split(/(?:\r\n|\r|\n)/g);

var suffix = "." + getRandomInt(1000);


var newGradleText;
lines.forEach((element) => {
    if (element.includes("applicationId")) {
        var index = element.lastIndexOf('"');
        var word = element.substring(0, index);
        element = word + suffix + '"';
    }
    if (newGradleText !== undefined) {
        newGradleText += element;
    } else {
        newGradleText = element;
    }

    newGradleText += "\r\n";
});

fs.writeFileSync(appGradlePath, newGradleText);

const appJsonFile = fs.readFileSync(jsonPath);
var appJson = JSON.parse(appJsonFile);
var nativeScriptTag = appJson["nativescript"];
var idTag = nativeScriptTag["id"];
var newId = idTag + suffix;

appJson.nativescript.id = newId;
fs.writeFileSync(jsonPath, JSON.stringify(appJson, null, "\t"));
console.log("Updated app ID with: ", newId);


function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }