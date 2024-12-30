//const test = require("node:test");
//const puppeteer = require("puppeteer");

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

test("General test", async t => {
	const browser = await puppeteer.launch(conf);
	const page = await browser.newPage();
	page.on('error', err => {
		throw err;
	});
	await page.evaluate(create_canva);
	await t.test("Script Loaded", async t => {
		let script = await page.evaluate(async () => {
			let script = document.createElement("script");
			script.type = "text/javascript";
			script.src = "file:///index.js";
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
});

