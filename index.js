var fs = require('fs');
var pt = require('path')

const errorMessage = "Error: Make sure that you are in an NativeScript application's root directory (where the .json file is located).";

let dirPath = process.env.INIT_CWD;
if (!dirPath) {
    dirPath =  process.cwd();
}

var jsonPath = dirPath + "/package.json";
if (!fs.existsSync(jsonPath)) {
    jsonPath = __dirname + "/package.json";
    if (!fs.existsSync(jsonPath)) {
        {
            console.log(errorMessage);
            process.exit(1);
        }
    }
}

var onlyPath = pt.dirname(jsonPath);

var appGradlePath = pt.join(onlyPath, "App_Resources", "Android", "app.gradle");
if (!fs.existsSync(appGradlePath)) {
    appGradlePath = pt.join(onlyPath, "app/App_Resources", "Android", "app.gradle");
}

if (!fs.existsSync(appGradlePath)) {
    console.log(errorMessage);
    process.exit(1);
}

const appGradleFile = fs.readFileSync(appGradlePath);
let lines = appGradleFile.toString().split(/(?:\r\n|\r|\n)/g);

function generate_random_string(string_length){
    let random_string = '';
    let random_ascii;
    for(let i = 0; i < string_length; i++) {
        random_ascii = Math.floor((Math.random() * 25) + 97);
        random_string += String.fromCharCode(random_ascii)
    }
    return random_string
}

var suffix = "." + generate_random_string(3);


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