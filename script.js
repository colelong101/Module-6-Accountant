function paySalary() {
  let employeeName = document.getElementById("name").value;
  let employeeHours = document.getElementById("hours").value;

  let basePayRate = 10.0;
  let overtimeRate = 1.5;

  let regHours = Math.min(employeeHours, 40);
  let overtimeHours = Math.max(employeeHours - regHours, 0);

  let regPay = basePayRate * regHours;
  let overtimePay = basePayRate * overtimeRate * overtimeHours;

  let salary = regPay + overtimePay;

  document.getElementById("name-output").textContent =
    "Employee Name: " + employeeName;
  document.getElementById("pay").textContent =
    "Employee Gross Pay: $" + salary.toFixed(2);
}

function areAllTimesheetsSubmitted(timesheets) {
  return (
    timesheets.length === 35 &&
    timesheets.every((timesheet) => timesheet.submitted)
  );
}

function calculateFICATax(employees) {
  // Calculate the total gross pay for all the employees
  let totalGrossPay = employees.reduce((total, emp) => total + emp.grossPay, 0);

  // FICA Tax Calculations
  let ficaTax = totalGrossPay * 0.0765;

  return ficaTax.toFixed(2);
}

module.exports = {
  paySalary,
  areAllTimesheetsSubmitted,
  calculateFICATax,
};
