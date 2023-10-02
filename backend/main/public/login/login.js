const inputs = document.querySelectorAll("input");

document.querySelector("form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const p = document.querySelector("p");
  try {
    const res = await axios.post(`http://192.168.1.9:4000/login`, {
      email: inputs[0].value,
      password: inputs[1].value,
    });

    console.log(res);
    if (res.status === 200) {
      localStorage.setItem("chatapplicationtoken", res.data.token);
      document.querySelector("p").innerText = res.data.message;
      window.location = "../index.html";
    } else {
      const res2 = res.json();
      console.log(res2);
      p.innerText = res.data.message;
    }
  } catch (err) {
    console.log(err);
    p.style.color = "red";
    p.innerText = err.response.data.message;
  }
});

document.getElementById("createAccountPage").addEventListener("click", () => {
  window.location = "../signup/signup.html";
});

document.getElementById("forgotPasswordPage").addEventListener("click", () => {
  window.location = "../forgotpassword/forgotpassword.html";
});

// document.getElementById("createAccountPage").addEventListener("click", () => {
//   window.location = "../signup/signup.html";
// });
