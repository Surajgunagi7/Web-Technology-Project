const container = document.getElementById("container");
const registerBtn = document.getElementById("register");
const loginBtn = document.getElementById("login");

registerBtn.addEventListener("click", () => {
  container.classList.add("active");
});

loginBtn.addEventListener("click", () => {
  container.classList.remove("active");
});

usn = "2SD22CS094";
password = "a";

function validateName() {
  const name = document.getElementById("name").value;
  const nameError = document.getElementById("nameError");
  if (name.trim() === "") {
    nameError.textContent = "Name is required.";
    return false;
  } else {
    nameError.textContent = "";
    return true;
  }
}

function validateUSN() {
  const usn = document.getElementById("usn").value;
  const usnError = document.getElementById("usnError");
  const usnPattern = /^[2][S][D][0-9]{2}[A-Z]{2}[0-9]{3}$/i;
  if (!usn.match(usnPattern)) {
    usnError.textContent = "Invalid USN. Format: 2SD22XXX.";
    return false;
  } else {
    usnError.textContent = "";
    return true;
  }
}

function validateMobile() {
  const mobile = document.getElementById("mobile").value;
  const mobileError = document.getElementById("mobileError");
  const mobilePattern = /^\d{10}$/;
  if (!mobile.match(mobilePattern)) {
    mobileError.textContent = "Please enter a 10-digit mobile number.";
    return false;
  } else {
    mobileError.textContent = "";
    return true;
  }
}

function validateEmail() {
  const email = document.getElementById("email").value;
  const emailError = document.getElementById("emailError");
  const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  if (!email.match(emailPattern)) {
    emailError.textContent = "Please enter a valid email address.";
    return false;
  } else {
    emailError.textContent = "";
    return true;
  }
}

// function validatePassword() {
//   const password = document.getElementById("password").value;
//   const passwordError = document.getElementById("passwordError");
//   if (password.length < 6) {
//     passwordError.textContent = "Password must be at least 6 characters long.";
//     return false;
//   } else {
//     passwordError.textContent = "";
//     return true;
//   }
// }

function validateConfirmPassword() {
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  const confirmPasswordError = document.getElementById("confirmPasswordError");
  if (password !== confirmPassword) {
    confirmPasswordError.textContent = "Passwords do not match!";
    return false;
  } else {
    confirmPasswordError.textContent = "";
    return true;
  }
}

function validateDept() {
  const dept = document.getElementById("deptdropdown").value;
  const deptError = document.getElementById("deptError");
  if (dept === "-1") {
    deptError.textContent = "Please select a department.";
    return false;
  } else {
    deptError.textContent = "";
    return true;
  }
}

function validateAndStore() {
  const isNameValid = validateName();
  const isUSNValid = validateUSN();
  const isMobileValid = validateMobile();
  const isEmailValid = validateEmail();
  const isPasswordValid = validatePassword();
  const isConfirmPasswordValid = validateConfirmPassword();
  const isDeptValid = validateDept();

  if (
    isNameValid &&
    isUSNValid &&
    isMobileValid &&
    isEmailValid &&
    isPasswordValid &&
    isConfirmPasswordValid &&
    isDeptValid
  ) {
    alert("Registration successful!");
  } else {
    alert("Please correct the errors in the form.");
  }
}
// Sign-In Form Validation Functions
function validateSignInUSN() {
  const usn = document.getElementById("chkusn").value;
  const signInUSNError = document.getElementById("signInUSNError");
  const usnPattern = /^[2][S][D][0-9]{2}[A-Z]{2}[0-9]{3}$/i;
  if (!usn.match(usnPattern)) {
    signInUSNError.textContent = "Invalid USN. Format: 2SD22XXX.";
    return false;
  } else {
    signInUSNError.textContent = "";
    return true;
  }
}

function validateSignInPassword() {
  const passwd = document.getElementById("chkpasswd").value;
  const signInPasswordError = document.getElementById("signInPasswordError");
  if (password.trim() === "" || passwd != password) {
    signInPasswordError.textContent = passwd;
    return false;
  } else {
    signInPasswordError.textContent = "";
    return true;
  }
}

function checkallfields() {
  const usn = document.getElementById("chkusn").value;
  const password = document.getElementById("chkpasswd").value;
  const btn = document.getElementById("loginbtn");
  if (usn.trim() === "" || password.trim() === "") {
    btn.disabled = true;
    return false;
  } else {
    btn.disabled = false;
    return true;
  }
}

function verify() {
  const usn = document.getElementById("chkusn").value;
  const password = document.getElementById("chkpasswd").value;
  if (validateSignInUSN() && validateSignInPassword()) {
    // Perform sign-in logic
    alert("Logged in successfully!");
    window.location = "../../src/index.html";
  } else {
    alert("Invalid login details! Please try again.");
  }
}

// Password strength checking **************************************************************************************
const bars = document.querySelector("#bars"),
strengthDiv = document.querySelector("#strength"),
passwordInput = document.querySelector("#password");

const strength = {
1: "weak",
2: "medium",
3: "strong",
};

const strengthColors = {
weak: "#d0424f",
medium: "#e58448",
strong: "#1eb965"
};

const getIndicator = (password, strengthValue) => {
strengthValue.upper = /[A-Z]/.test(password);
strengthValue.lower = /[a-z]/.test(password);
strengthValue.numbers = /\d/.test(password);

let strengthIndicator = 0;

for (let metric in strengthValue) {
    if (strengthValue[metric] === true) {
        strengthIndicator++;
    }
}

return strength[strengthIndicator] ?? "";
};

const getStrength = (password) => {
let strengthValue = {
    upper: false,
    numbers: false,
    lower: false,
};

return getIndicator(password, strengthValue);
};

const handleChange = () => {
let { value: password } = passwordInput;

console.log(password);

const strengthText = getStrength(password);

bars.classList = "";

if (strengthText) {
    strengthDiv.innerText = `${strengthText} Password`;
    bars.classList.add(strengthText);
    // Update the color of the text based on the password strength
    strengthDiv.style.color = strengthColors[strengthText];
} else {
    strengthDiv.innerText = "";
}
};

// Event listener for the password input
passwordInput.addEventListener('input', handleChange);
