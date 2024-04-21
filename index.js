const child_process = require('child_process');
const fs = require('fs');
const path = require('path');

var inputDir = process.argv[2] || "INPUT";
inputDir = path.join(__dirname, inputDir)
var outputDir = process.argv[3] || path.join(__dirname, "OUTPUT");
outputDir = path.join(outputDir, "S.E.F_Music_Pack\\assets\\custom\\sounds");

var outJson = {};

if (!fs.existsSync(outputDir))
	fs.mkdirSync(outputDir, { recursive: true });

if (!fs.existsSync(inputDir))
	fs.mkdirSync(inputDir, { recursive: true })

fs.readdirSync(inputDir, { withFileTypes: true, recursive: true }).forEach((e) => {
	if (!e.isFile()) return;
	
	e.origName = e.name
	e.name = e.name.replaceAll(" ", "_").toLowerCase();
	fs.renameSync(path.join(inputDir, e.origName), path.join(inputDir, e.name));
	e.nameNoPath = e.name.replace(/\.[^/\\.]+$/, "");

	var outNameLow = `${outputDir}\\${e.nameNoPath}_sub.ogg`
	if (fs.existsSync(outNameLow))
		fs.unlinkSync(outNameLow)


	var outNameMid = `${outputDir}\\${e.nameNoPath}_mid.ogg`
	if (fs.existsSync(outNameMid))
		fs.unlinkSync(outNameMid)

	outJson[`${e.nameNoPath}_sub`] = { sounds: ["custom:" + e.nameNoPath + "_sub"] };
	outJson[`${e.nameNoPath}_mid`] = { sounds: ["custom:" + e.nameNoPath + "_mid"] };

	var lowLog = child_process.execSync(`ffmpeg -i "${inputDir}\\${e.name}" -af lowpass=120 -ac 1 -vn "${outNameLow}"`);
	var midLog = child_process.execSync(`ffmpeg -i "${inputDir}\\${e.name}" -af highpass=120 -ac 1 -vn "${outNameMid}"`);

	if(!fs.existsSync(path.join(__dirname, "logs")))
	fs.writeFileSync(path.join(__dirname, "logs", "lowlog.txt"), lowLog)
	fs.writeFileSync(path.join(__dirname, "logs", "midlog.txt"), midLog)
})

fs.writeFileSync(outputDir + "\\..\\sounds.json", JSON.stringify(outJson, null, 4));
fs.writeFileSync(path.join(outputDir, "..", "..", "..", "pack.mcmeta"), JSON.stringify({
	"pack": {
		"description": "§2§l S.E.F Music Collector",
		"pack_format": 6
	}
}, null, 4))
