//const test = require("node:test");
//const puppeteer = require("puppeteer");

import test from 'node:test';
import puppeteer from 'puppeteer-core';

const conf = {
	args: ['--no-sandbox',],
	headless: false,
	ignoreHTTPSErrors: true,
	executablePath: executablePath(),
};

test("General test", async t => {
	const browser = await puppeteer.launch(conf);
	const page = await browser.newPage();
	let response = page.evaluate(word => `you said ${word}`, "Xuxu");
	assert.equal(response, "xuxu");
	await browser.close();
});

