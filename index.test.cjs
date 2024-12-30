//const test = require("node:test");
//const puppeteer = require("puppeteer");

const express = require('express');
const path = require('path');
webserver: {
	let app = express();
	app.use('/', express.static(path.join(__dirname, '.')));
	app.listen(8888, '0.0.0.0');
}

const test = require('node:test');
const assert = require('node:assert');
const puppeteer = require('puppeteer-core');

const conf = {
	args: ['--no-sandbox',],
	headless: true,
	ignoreHTTPSErrors: true,
	executablePath: "/usr/bin/google-chrome"
};

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
	await t.test("Canva Do Exist", async t => {
		let canva = await page.evaluate(() => {
			return document.getElementById("viewContent");
		});
		assert.ok(canva);
	});
	await t.test("Script Loaded", async t => {
		let script = await page.evaluate(async () => {
			let script = document.getElementById("ruah-script");
			return script;
		});
		await assert.ok(script);
	});
	await t.test("App initializated", async t => {
		let app = await page.evaluate(() => {
			return document.getElementById("hp-scada");
		});
		assert.notEqual(app, null);
	});
	await browser.close();
});

