async function getData() {
  const token = localStorage.getItem("chatapplicationtoken");
  const res = await axios.get("http://localhost:4000/get-messages", {
    headers: {
      token: token,
    },
  });
  display(res.data.data);
  console.log(res);
}
getData();

function display(data) {
  let str = "";
  data.forEach((ele) => {
    str += `<div>${ele.Message}</div>`;
  });
  document.getElementById("messages").innerHTML = "";
  document.getElementById("messages").innerHTML = str;
}

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
