const child_process = require('child_process');
const fs = require('fs');
const path = require('path');

var folder = ".\\" || "C:\\Users\\Horic\\AppData\\Roaming\\.minecraft\\music\\"

var inputDir = "input";
var outputDir = "output";

fs.readdirSync("input", {withFileTypes:true,recursive:true}).forEach((e)=>{
	if(!e.isFile()) return;
	e.nameNoPath = e.name.replace(/\.[^/\\.]+$/, "");


	var outNameLow = `${outputDir}\\${e.nameNoPath}_sub.mp3`
	if(fs.existsSync(outNameLow))
	fs.unlinkSync(outNameLow)


	var outNameMid = `${outputDir}\\${e.nameNoPath}_mid.mp3`
	if(fs.existsSync(outNameMid))
	fs.unlinkSync(outNameMid)

	if(!fs.existsSync("output"))
	fs.mkdirSync("output");

	child_process.execSync(`ffmpeg -i ${inputDir}\\${e.name} -af lowpass=120 ${outNameLow}`);
	child_process.execSync(`ffmpeg -i ${inputDir}\\${e.name} -af highpass=120 ${outNameMid}`);
})