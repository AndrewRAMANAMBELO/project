const display = document.getElementById("display");
let current = "";
let operator = "";
let firstOperand = "";
let reset = false;

document.querySelectorAll(".btn").forEach(button => {
  button.addEventListener("click", () => {
    const val = button.dataset.value;

    if (button.id === "clear") {
      current = "";
      operator = "";
      firstOperand = "";
      display.textContent = "0";
      return;
    }

    if (val === "+/-") {
      current = (parseFloat(current) * -1).toString();
      display.textContent = current;
      return;
    }

    if (val === "%") {
      current = (parseFloat(current) / 100).toString();
      display.textContent = current;
      return;
    }

    if (["+", "-", "*", "/"].includes(val)) {
      if (firstOperand && operator && current) {
        // Si déjà une opération en cours, calcule d'abord
        firstOperand = eval(`${firstOperand} ${operator} ${current}`).toString();
        display.textContent = firstOperand;
      } else if (current) {
        firstOperand = current;
      }
      operator = val;
      reset = true;
      return;
    }

    if (button.id === "equals") {
      if (firstOperand && operator && current) {
        try {
          current = eval(`${firstOperand} ${operator} ${current}`).toString();
        } catch (e) {
          current = "Erreur";
        }
        display.textContent = current;
        firstOperand = "";
        operator = "";
        reset = true;
      }
      return;
    }

    if (reset) {
      current = "";
      reset = false;
    }

    if (val) {
      if (val === "." && current.includes(".")) return;
      current += val;
      display.textContent = current;
    }
  });
});
