// setInterval(() => {
//   getData();
// }, 1000);

// if (localStorage.getItem("chatapplicationtoken") === null) {
//   window.location = "./login/login.html";
// }

document.querySelectorAll("form")[0].addEventListener("submit", async (e) => {
  e.preventDefault();
  const token = localStorage.getItem("chatapplicationtoken");
  const groupinput = document.getElementById("groupvalue").value;
  console.log(groupinput);
  const res = await axios.post(
    `http://localhost:4000/create-group`,
    { name: groupinput },
    {
      headers: {
        token: token,
      },
    }
  );
  if (res.data.message === true) {
    location.reload();
  }
});

async function getGroups() {
  const token = localStorage.getItem("chatapplicationtoken");
  const res = await axios.get(`http://localhost:4000/get-groups`, {
    headers: {
      token: token,
    },
  });
  if (res.data.groups) {
    const scroll = document.getElementById("scroll");
    res.data.groups.forEach((e) => {
      const div = document.createElement("div");
      div.setAttribute("id", e.id);
      div.setAttribute("class", "chats");
      div.innerText = e.groupName;
      scroll.appendChild(div);
    });
  }
  console.log(res);
}
getGroups();
document.querySelectorAll("button")[0].addEventListener("click", () => {
  let cgroup = document.querySelectorAll("button")[0];
  if (cgroup.innerText === "CreateGroup") {
    cgroup.innerText = "+";
    document.getElementById("groupform").setAttribute("class", "");
  } else {
    document.getElementById("groupform").setAttribute("class", "displaynone");
    cgroup.innerText = "CreateGroup";
  }
});

document.getElementById("scroll").addEventListener("click", (e) => {
  console.log(e);
  if (e.target.classList.contains("chats")) {
    document.getElementById("right").setAttribute("class", "");
    localStorage.setItem("currentGroup", e.target.id);
    document.getElementById("groupNameDisplay").innerText = e.target.innerText;
  }
});
document.getElementById("addMember").addEventListener("click", () => {
  if (document.getElementById("addMember").innerText === "Add Member") {
    document.getElementById("addMember").innerText = "Close Form";
    document.getElementById("addMemberForm").setAttribute("class", "");
  } else {
    document.getElementById("addMember").innerText = "Add Member";
    document
      .getElementById("addMemberForm")
      .setAttribute("class", "displaynone");
  }
});

document
  .getElementById("addMemberForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("chatapplicationtoken");
    const value = document.getElementById("addMemberApi").value;
    const query = +localStorage.getItem("currentGroup");

    const res = await axios.post(
      `http://localhost:4000/add-member?groupId=${query}`,
      {
        email: value,
      },
      {
        headers: {
          token: token,
        },
      }
    );
    console.log(res);
  });
// async function getData() {
//   const token = localStorage.getItem("chatapplicationtoken");
//   const lastId = JSON.parse(localStorage.getItem("chatData")) || [];

//   const query = lastId.length !== 0 ? lastId[lastId.length - 1].id : undefined;
//   const res = await axios.get(
//     `http://localhost:4000/get-messages?lastid=${query}`,
//     {
//       headers: {
//         token: token,
//       },
//     }
//   );
//   localStorage.setItem(
//     "chatData",
//     JSON.stringify([...lastId, ...res.data.data])
//   );
//   if (document.getElementById("messages").childElementCount === 0) {
//     display(JSON.parse(localStorage.getItem("chatData")));
//   } else {
//     display(res.data.data);
//   }

//   console.log(res);
// }
// getData();

function display(data) {
  const outerdiv = document.getElementById("messages");

  data.forEach((ele) => {
    const div = document.createElement("div");
    div.innerText = ele.Message;
    outerdiv.append(div);
  });
}

const message = document.querySelector("input");
document.querySelectorAll("form")[2].addEventListener("submit", async (e) => {
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
