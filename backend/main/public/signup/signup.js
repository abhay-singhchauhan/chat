const inputs = document.querySelectorAll("input");
document.querySelector("form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const p = document.querySelector("p");

  try {
    if (inputs[3].value === inputs[4].value) {
      const response = await axios.post("http://192.168.1.9:4000/signup", {
        name: inputs[0].value,
        email: inputs[1].value,
        phone: inputs[2].value,
        password: inputs[3].value,
      });
      console.log(response);
      if (response.status === 200) {
        p.style.color = "green";
        p.innerText = response.data.message;
        window.location = "../login/login.html";
      }
    } else {
      p.style.color = "red";
      p.innerText = "Passoword Mismatch";
    }
  } catch (err) {
    console.log(err);
    p.style.color = "red";
    p.innerText = err.response.data.message;
  }
});

document.getElementById("loginPage").addEventListener("click", () => {
  window.location = "../login/login.html";
});
document.getElementById("forgotPasswordPage").addEventListener("click", () => {
  window.location = "../forgotPassword/forgotPassword.html";
});
