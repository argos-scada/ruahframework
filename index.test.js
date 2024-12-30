//const test = require("node:test");
//const puppeteer = require("puppeteer");

webserver: {
	import express from 'express';
	import path from 'path';
	let app = express();
	app.use('/', express.static(path.join(__dirname, '.')));
	app.listen(8888);
}

import test from 'node:test';
import assert from 'node:assert';
import puppeteer from 'puppeteer-core';

const conf = {
	args: ['--no-sandbox',],
	headless: true,
	ignoreHTTPSErrors: true,
	executablePath: "/usr/bin/google-chrome"
};

function create_canva () {
	let root = document.createElement("div");
	root.id = "viewContent";
	document.body.appendChild(root);
	return root;
}

test("General Test", async t => {
	console.log("General Test Started");
	const browser = await puppeteer.launch(conf);
	console.log("Browser is launched");
	const page = await browser.newPage();
	console.log("New page open");
	await page.goto('http://localhost:8888/test.html', { waitUntil: 'domcontentloaded' });
	console.log("Opened a new url");
	page.on('error', err => {
		throw err;
	});
	await page.evaluate(create_canva);
	console.log("1");
	await t.test("Script Loaded", async t => {
		let script = await page.evaluate(async () => {
			let script = document.createElement("script");
			script.type = "text/javascript";
			script.src = "index.js";
			script.setAttribute("boot", true);
			script.onerror = () => { throw new Error() };
			document.body.appendChild(script);
			let promise = new Promise((resolve, reject) => {
				script.onerror = reject(false);
				script.onload = resolve(true);
			});
			let result = await promise;
		});
		await assert.ok();
	});
	await t.test("App initializated", async t => {
		let app = await page.evaluate(() => {
			return document.getElementById("hp-scada");
		});
		assert.notEqual(app, null);
	});
	await browser.close();
	assert.equal(1, 2);
});

