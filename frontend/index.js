setInterval(() => {
  getData();
}, 1000);

if (localStorage.getItem("chatapplicationtoken") === null) {
  window.location = "./login/login.html";
}

async function getData() {
  const token = localStorage.getItem("chatapplicationtoken");
  const lastId = JSON.parse(localStorage.getItem("chatData")) || [];

  const query = lastId.length !== 0 ? lastId[lastId.length - 1].id : undefined;
  const res = await axios.get(
    `http://localhost:4000/get-messages?lastid=${query}`,
    {
      headers: {
        token: token,
      },
    }
  );
  localStorage.setItem(
    "chatData",
    JSON.stringify([...lastId, ...res.data.data])
  );
  if (document.getElementById("messages").childElementCount === 0) {
    display(JSON.parse(localStorage.getItem("chatData")));
  } else {
    display(res.data.data);
  }

  console.log(res);
}
getData();

function display(data) {
  const outerdiv = document.getElementById("messages");

  data.forEach((ele) => {
    const div = document.createElement("div");
    div.innerText = ele.Message;
    outerdiv.append(div);
  });
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
