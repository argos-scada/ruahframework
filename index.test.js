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

function import_script () {
	let script = document.createElement("script");
	script.type = "text/javascript";
	script.src = "main.umd";
	script.setAttribute("boot", true);
	document.body.appendChild(script);
	return script;
}

test("General test", async t => {
	const browser = await puppeteer.launch(conf);
	const page = await browser.newPage();
	page.on('error', err => {
		throw err;
	});
	await page.evaluate(create_canva);
	await page.evaluate(import_script);
	await t.test("App initializated", async t => {
		await page.evaluate(() => {
			document.getElementById("hp-scada");
		});
	});
	await browser.close();
});

