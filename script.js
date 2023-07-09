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

module.exports = {
  paySalary
};
