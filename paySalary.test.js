const { paySalary } = require('./script');
const { JSDOM } = require('jsdom');

describe('paySalary', () => {
  test('calculates gross pay correctly for regular hours', () => {
    const employeeName = 'John Doe';
    const employeeHours = 40;

    const dom = new JSDOM(`<!DOCTYPE html><html><body>
      <input id="name" value="${employeeName}">
      <input id="hours" value="${employeeHours}">
      <span id="name-output"></span>
      <span id="pay"></span>
    </body></html>`);

    global.document = dom.window.document;
    paySalary();

    expect(document.getElementById('name-output').textContent).toBe(`Employee Name: ${employeeName}`);
    expect(document.getElementById('pay').textContent).toBe('Employee Gross Pay: $400.00');
  });

test('calculates gross pay correctly for overtime hours', () => {

  const employeeName = 'Jane Smith';
  const employeeHours = 50;

  const dom = new JSDOM(`<!DOCTYPE html><html><body>
    <input id="name" value="${employeeName}">
    <input id="hours" value="${employeeHours}">
    <span id="name-output"></span>
    <span id="pay"></span>
  </body></html>`);

  global.document = dom.window.document;

  paySalary();

  const basePayRate = 10.00;
  const regHours = Math.min(employeeHours, 40);
  const overtimeHours = Math.max(employeeHours - regHours, 0);
  const overtimeRate = 1.5;
  const expectedOvertimePay = basePayRate * overtimeHours * overtimeRate;

  expect(document.getElementById('name-output').textContent).toBe(`Employee Name: ${employeeName}`);
  expect(document.getElementById('pay').textContent).toBe(`Employee Gross Pay: $${(400 + expectedOvertimePay).toFixed(2)}`);
});
});

