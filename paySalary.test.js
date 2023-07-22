const { paySalary, areAllTimesheetsSubmitted, calculateFICATax } = require('./script');
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

describe('areAllTimesheetsSubmitted', () => {
  test('should return true when all 35 timesheets are submitted', () => {
    const timesheets = Array(35).fill({ submitted: true });
    const result = areAllTimesheetsSubmitted(timesheets);
    expect(result).toBe(true);
  });
  
  
  test('should return false when not all 35 timesheets are submitted', () => {
    const timesheets = Array(34).fill({ submitted: true });
    timesheets.push({ submitted: false });
    const result = areAllTimesheetsSubmitted(timesheets);
    expect(result).toBe(false);
  });
});

describe('calculateFICATax', () => {
  test('should calculate FICA tax correctly for the given employee data', () => {
    const employees = [
      { employee: 'John Doe', grossPay: 400.00 },
      { employee: 'Jane Smith', grossPay: 450.00 },
      { employee: 'Bob Johnson', grossPay: 480.00 },
      { employee: 'Mary Williams', grossPay: 410.00 },
      { employee: 'James Brown', grossPay: 380.00 },
      { employee: 'Emily Davis', grossPay: 470.00 },
      { employee: 'Michael Lee', grossPay: 520.00 },
      { employee: 'Sarah Miller', grossPay: 490.00 },
      { employee: 'David Clark', grossPay: 510.00 },
      { employee: 'Jennifer Taylor', grossPay: 490.00 },
      { employee: 'Robert Anderson', grossPay: 460.00 },
      { employee: 'Karen Hall', grossPay: 430.00 },
      { employee: 'Christopher Lewis', grossPay: 380.00 },
      { employee: 'Laura Turner', grossPay: 480.00 },
      { employee: 'Matthew Scott', grossPay: 410.00 },
      { employee: 'Rebecca King', grossPay: 540.00 },
      { employee: 'Daniel Allen', grossPay: 400.00 },
      { employee: 'Kimberly Green', grossPay: 450.00 },
      { employee: 'Mark Evans', grossPay: 520.00 },
      { employee: 'Melissa Adams', grossPay: 460.00 },
      { employee: 'William Hill', grossPay: 470.00 },
      { employee: 'Jessica Young', grossPay: 500.00 },
      { employee: 'Steven Martinez', grossPay: 480.00 },
      { employee: 'Linda Hernandez', grossPay: 510.00 },
      { employee: 'Brian Walker', grossPay: 430.00 },
      { employee: 'Amanda Lopez', grossPay: 520.00 },
      { employee: 'Jeffrey Carter', grossPay: 540.00 },
      { employee: 'Stephanie Torres', grossPay: 490.00 },
      { employee: 'Gary Perez', grossPay: 450.00 },
      { employee: 'Nancy Wood', grossPay: 490.00 },
      { employee: 'Scott Mitchell', grossPay: 510.00 },
      { employee: 'Ashley Rivera', grossPay: 460.00 },
      { employee: 'Kenneth Price', grossPay: 420.00 },
      { employee: 'Carolyn Bailey', grossPay: 430.00 },
      { employee: 'Edward Barnes', grossPay: 390.00 },
      { employee: 'Samantha Wright', grossPay: 500.00 },
    ];

    const totalGrossPay = employees.reduce((total, emp) => total + emp.grossPay, 0);
    const expectedFICATax = totalGrossPay * 0.0765;

    const result = calculateFICATax(employees);
    expect(result).toBe(expectedFICATax.toFixed(2));
  });
});
