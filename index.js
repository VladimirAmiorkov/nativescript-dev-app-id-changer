// Expected args:
// 1 - path to the NativeScript's package.json file
// 2 - The unique suffix to add to the app's ID 
var fs = require('fs');

var myArgs = process.argv.slice(2);
var jsonPath = myArgs[0];
var suffix = myArgs[1];
const appJsonFile = fs.readFileSync(jsonPath);
var appJson = JSON.parse(appJsonFile);
var nativeScriptTag = appJson["nativescript"];
var idTag = nativeScriptTag["id"];
var newId = idTag + "." + suffix;

appJson.nativescript.id = newId;
fs.writeFileSync(jsonPath, JSON.stringify(appJson, null, "\t"));
console.log("Updated app ID with: ", newId);