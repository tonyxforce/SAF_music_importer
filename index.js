const child_process = require('child_process');
const fs = require('fs');

var inputDir = process.env.APPDATA + "\\.minecraft\\music";
var outputDir = process.argv[2] || `${process.env.APPDATA}\\.minecraft\\resourcepacks\\SAFsounds\\assets\\custom\\sounds`;

var outJson = {};

if(!fs.existsSync(outputDir))
fs.mkdirSync(outputDir, {recursive:true});

fs.readdirSync(inputDir, {withFileTypes:true,recursive:true}).forEach((e)=>{
	if(!e.isFile()) return;
	e.name = e.name.replace(" ", "_").toLowerCase();
	e.nameNoPath = e.name.replace(/\.[^/\\.]+$/, "");


	var outNameLow = `${outputDir}\\${e.nameNoPath}_sub.ogg`
	if(fs.existsSync(outNameLow))
	fs.unlinkSync(outNameLow)


	var outNameMid = `${outputDir}\\${e.nameNoPath}_mid.ogg`
	if(fs.existsSync(outNameMid))
	fs.unlinkSync(outNameMid)

	outJson[`${e.nameNoPath}_sub`] = {sounds:["custom:" + e.nameNoPath + "_sub"]};
	outJson[`${e.nameNoPath}_mid`] = {sounds:["custom:" + e.nameNoPath + "_mid"]};

	child_process.execSync(`ffmpeg -i "${inputDir}\\${e.name}" -af lowpass=120 -ac 1 "${outNameLow}"`);
	child_process.execSync(`ffmpeg -i "${inputDir}\\${e.name}" -af highpass=120 -ac 1 "${outNameMid}"`);
})

fs.writeFileSync(outputDir + "\\..\\sounds.json", JSON.stringify(outJson, null, 4));