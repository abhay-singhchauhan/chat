const message = document.querySelector("input");
document.querySelector("form").addEventListener("submit", async (e) => {
  e.preventDefault();
  try {
    const token = localStorage.getItem("chatapplicationtoken");
    const res = await axios.post(
      "http://localhost:4000/send-message",
      { message: message.value },
      {
        headers: {
          token: token,
        },
      }
    );
    console.log(res);
  } catch (err) {
    console.log(err);
  }
});
