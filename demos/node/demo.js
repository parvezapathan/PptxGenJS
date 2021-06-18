/*
 * NAME: demo.js
 * AUTH: Brent Ely (https://github.com/gitbrent/)
 * DATE: 20210502
 * DESC: PptxGenJS feature demos for Node.js
 * REQS: npm 4.x + `npm install pptxgenjs`
 *
 * USAGE: `node demo.js`       (runs local tests with callbacks etc)
 * USAGE: `node demo.js All`   (runs all pre-defined tests in `../common/demos.js`)
 * USAGE: `node demo.js Text`  (runs pre-defined single test in `../common/demos.js`)
 */

import { execGenSlidesFuncs, runEveryTest } from "../modules/demos.mjs";
import pptxgen from "../../src/bld/pptxgen.cjs.js"; // "pptxgenjs";
import { getData, getOptions } from "./exampledata.js";

// ============================================================================


const exportName = "PptxGenJS_Demo_Node";
let pptx = new pptxgen();

console.log(`\n\n--------------------==~==~==~==[ STARTING DEMO... ]==~==~==~==--------------------\n`);
console.log(`* pptxgenjs ver: ${pptx.version}`);
console.log(`* save location: ${process.cwd()}`);

if (process.argv.length > 2) {
	// A: Run predefined test from `../common/demos.js` //-OR-// Local Tests (callbacks, etc.)
	Promise.resolve()
		.then(() => {
			if (process.argv[2].toLowerCase() === "all") return runEveryTest(pptxgen);
			return execGenSlidesFuncs(process.argv[2], pptxgen);
		})
		.catch((err) => {
			throw new Error(err);
		})
		.then((fileName) => {
			console.log(`EX1 exported: ${fileName}`);
		})
		.catch((err) => {
			console.log(`ERROR: ${err}`);
		});
} else {
	let pptx1 = getPptxInstance()
	// B: Omit an arg to run only these below
	let slide = pptx1.addSlide();

	let scatLables = getData();
	let scatOption = getOptions();
	
	slide.addChart(pptx1.charts.SCATTER, scatLables, scatOption);
	// slide.addText("New Node Presentation", { x: 1.5, y: 1.5, w: 6, h: 2, margin: 0.1, fill: "FFFCCC" });
	// slide.addShape(pptx.shapes.OVAL_CALLOUT, { x: 6, y: 2, w: 3, h: 2, fill: "00FF00", line: "000000", lineSize: 1 }); // Test shapes availablity

	// EXAMPLE 1: Saves output file to the local directory where this process is running
	pptx1.writeFile({ fileName: exportName })
		.catch((err) => {
			throw new Error(err);
		})
		.then((fileName) => {
			console.log(`EX1 exported: ${fileName}`);
		})
		.catch((err) => {
			console.log(`ERROR: ${err}`);
		});

	// EXAMPLE 2: Save in various formats - JSZip offers: ['arraybuffer', 'base64', 'binarystring', 'blob', 'nodebuffer', 'uint8array']
	pptx1.write("base64")
		.catch((err) => {
			throw new Error(err);
		})
		.then((data) => {
			console.log(`BASE64 TEST: First 100 chars of 'data':\n`);
			console.log(data.substring(0, 99));
		})
		.catch((err) => {
			console.log(`ERROR: ${err}`);
		});

	// **NOTE** If you continue to use the `pptx` variable, new Slides will be added to the existing set
}

function getPptxInstance() {
	let instance = new pptxgen();

	instance.layout = "LAYOUT_4x3";
	instance.defineSlideMaster({
		title: "MASTER_SLIDE",
		bkgd: "FFFFFF",
		margin: [0.5, 0.5, 0.5, 0.5],
		objects: [],
		slideNumber: { x: 9.24, y: 6.65, font: "Arial", fontSize: 8, h: 0.53, w: 0.42 }
	});
	
	return instance;
}
// ============================================================================

console.log(`\n--------------------==~==~==~==[ ...DEMO COMPLETE ]==~==~==~==--------------------\n\n`);
