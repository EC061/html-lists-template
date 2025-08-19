const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

describe('HTML Resume Structure', () => {
  let dom;
  let document;

  beforeAll(() => {
    const filePath = path.join(__dirname, '../index.html');
    const html = fs.readFileSync(filePath, 'utf-8');
    dom = new JSDOM(html);
    document = dom.window.document;
  });

  test('has valid HTML5 boilerplate', () => {
    expect(/^<!doctype html>/i.test(dom.serialize())).toBe(true);
    expect(document.documentElement.lang).toBe('en');
    expect(document.querySelector('meta[charset="UTF-8"]')).not.toBeNull();
    expect(document.querySelector('meta[name="viewport"]')).not.toBeNull();
  });

  test('has a <title> that is not "Document"', () => {
    const title = document.querySelector('title');
    expect(title).not.toBeNull();
    expect(title.textContent.trim().toLowerCase()).not.toBe('document');
    expect(title.textContent.trim().length).toBeGreaterThan(0);
  });

  test('has an <h1> heading', () => {
    const h1 = document.querySelector('h1');
    expect(h1).not.toBeNull();
    expect(h1.textContent.trim().length).toBeGreaterThan(0);
  });

  test('has properly tagged Skills section', () => {
    const h3s = Array.from(document.querySelectorAll('h3'));
    const skillsHeading = h3s.find(h => h.textContent.trim().toLowerCase() === 'skills');
    expect(skillsHeading).toBeDefined();

    const ul = skillsHeading.nextElementSibling;
    expect(ul).not.toBeNull();
    expect(ul.tagName.toLowerCase()).toBe('ul');

    const lis = ul.querySelectorAll('li');
    expect(lis.length).toBeGreaterThanOrEqual(2);
  });

  test('has properly tagged Experience section', () => {
    const h3s = Array.from(document.querySelectorAll('h3'));
    const experienceHeading = h3s.find(h => h.textContent.trim().toLowerCase() === 'experience');
    expect(experienceHeading).toBeDefined();

    const dl = experienceHeading.nextElementSibling;
    expect(dl).not.toBeNull();
    expect(dl.tagName.toLowerCase()).toBe('dl');

    const dts = dl.querySelectorAll('dt');
    const dds = dl.querySelectorAll('dd');
    expect(dts.length).toBeGreaterThanOrEqual(2);
    expect(dds.length).toBeGreaterThanOrEqual(2);
    expect(dts.length).toBe(dds.length); // Matching pairs
  });
});
