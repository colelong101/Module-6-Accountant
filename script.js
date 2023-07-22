function paySalary() {
  var employeeName = document.getElementById("name").value;
  var employeeHours = document.getElementById("hours").value;

  var basePayRate = 10.00;
  var overtimeRate = 1.5;

  var regHours = Math.min(employeeHours, 40);
  var overtimeHours = Math.max(employeeHours - regHours, 0);

  var regPay = basePayRate * regHours;
  var overtimePay = basePayRate * overtimeRate * overtimeHours;

  var salary = regPay + overtimePay;

  document.getElementById("name-output").textContent = "Employee Name: " + employeeName;
  document.getElementById("pay").textContent = "Employee Gross Pay: $" + salary.toFixed(2);
}

function areAllTimesheetsSubmitted(timesheets) {
  return timesheets.length === 35 && timesheets.every((timesheet) => timesheet.submitted);
}

function calculateFICATax(employees) {
  // Calculate the total gross pay for all the employees
  var totalGrossPay = employees.reduce((total, emp) => total + emp.grossPay, 0);

  // FICA Tax Calculations
  var ficaTax = totalGrossPay * 0.0765;

  return ficaTax.toFixed(2);
}

module.exports = {
  paySalary,
  areAllTimesheetsSubmitted,
  calculateFICATax,
};