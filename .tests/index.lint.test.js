// index.lint.test.js
const fs = require('fs');
const path = require('path');
const validator = require('html-validator');

describe('HTML Validation - index.html', () => {
  test('should have valid HTML (no missing closing tags)', async () => {
    const html = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');

    const options = {
      data: html,
      format: 'text', // or 'json' for structured results
    };

    const result = await validator(options);

    // Fail the test if the validator returns any errors
    if (result.includes('Error')) {
      console.error('\nHTML validation errors:\n', result);
    }
    expect(result.includes('Error')).toBe(false);
  });
});
