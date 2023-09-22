const inputs = document.querySelectorAll("input");
document.querySelector("form").addEventListener("submit", async (e) => {
  e.preventDefault();
  if (inputs[3].value === inputs[4].value) {
    const response = await axios.post("http://localhost:4000/signup", {
      name: inputs[0].value,
      email: inputs[1].value,
      phone: inputs[2].value,
      password: inputs[3].value,
    });
    console.log(response);
    if (response.data.data !== null) {
      document.querySelector("p").style.color = "green";
      document.querySelector("p").innerText = response.data.message;
    } else {
      document.querySelector("p").style.color = "red";
      document.querySelector("p").innerText = response.data.message;
    }
  } else {
    document.querySelector("p").style.color = "red";
    document.querySelector("p").innerText = "Passoword Mismatch";
  }
});
