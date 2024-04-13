const { execSync } = require('child_process');
var ffmpeg = require('fluent-ffmpeg');
const { unlinkSync, readdirSync, existsSync } = require('fs');

var folder = ".\\" || "C:\\Users\\Horic\\AppData\\Roaming\\.minecraft\\music\\"

var inputDir = "input";
var outputDir = "output";

readdirSync("input", {withFileTypes:true,recursive:true}).forEach((e)=>{
	if(!e.isFile()) return;


	var outName = `${outputDir}\\${e.name}_sub.mp3`
	if(existsSync(outName))
	unlinkSync(outName)

	execSync(`ffmpeg -i ${inputDir}\\${e.name} -af highpass=120 ${outName}`);
})