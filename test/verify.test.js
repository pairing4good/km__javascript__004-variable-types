const http = require("http");
const fs = require("fs");
const puppeteer = require("puppeteer");
const { assert } = require("console");

let server;
let browser;
let page;

beforeAll(async () => {
  server = http.createServer(function (req, res) {
    fs.readFile(__dirname + "/.." + req.url, function (err, data) {
      if (err) {
        res.writeHead(404);
        res.end(JSON.stringify(err));
        return;
      }
      res.writeHead(200);
      res.end(data);
    });
  });

  server.listen(process.env.PORT || 3000);
});

afterAll(() => {
  server.close();
});

beforeEach(async () => {
  browser = await puppeteer.launch();
  page = await browser.newPage();
  await page.goto("http://localhost:3000/index.html");
});

afterEach(async () => {
  await browser.close();
});

describe('the index.js file', () => {
  it('should define a string variable named animalName', async () => {
    const animalName = await page.evaluate(() => animalName);
    expect(typeof animalName).toBe('string');
  });
  
  
  it('should define a numeric variable named height', async () => {
    const height = await page.evaluate(() => height);
    expect(typeof height).toBe('number');
  });
  
  
  it('should define a boolean variable named isIndoorPet', async () => {
    const isIndoorPet = await page.evaluate(() => isIndoorPet);
    expect(typeof isIndoorPet).toBe('boolean');
  });
  
  
  it('should assign the innerHTML of the HTML element with the id result to the animalName', async () => {
    const animalName = await page.evaluate(() => animalName);
    const innerHtml = await page.$eval('#result', (result) => {
      return result.innerHTML.trim();
    });
    
    expect(innerHtml).toBe(animalName);
  });
});
