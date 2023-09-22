const inputs = document.querySelectorAll("input");

document.querySelector("form").addEventListener("submit", async (e) => {
  e.preventDefault(); //http://localhost:4000/signup
  const res = await axios.post("http://localhost:4000/login", {
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
    document.querySelector("p").innerText = res.data.message;
  }
});
