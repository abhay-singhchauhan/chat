const root = "http://192.168.1.9:4000/";
let userDetails = undefined;
const right = document.getElementById("right");
const left = document.getElementById("left");
const addGroupButton = document.getElementById("addGroupButton");
const addingGroups = document.getElementById("addingGroups");
const createGroupForm = document.getElementById("createGroupForm");
const chats = document.getElementById("chatList");
const groupname = document.querySelector(".groupname");
const socket = io();
//Event to create a Group
if (localStorage.getItem("chatapplicationtoken") === null) {
  window.location = "./login/login.html";
}

document.getElementById("profileSection").addEventListener("click", () => {
  window.location = "./profile/profile.html";
});

createGroupForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const inputFields = document.querySelectorAll(".createGroupFields");
  const token = localStorage.getItem("chatapplicationtoken");

  try {
    const res = await axios.post(
      `${root}create-group`,
      {
        name: inputFields[0].value,
        heading: inputFields[1].value,
      },
      {
        headers: {
          token: token,
        },
      }
    );
    console.log(res);
    if (res.data.success === true) {
      location.reload();
    }
  } catch (err) {
    console.log(err);
  }
});
//Event to create a Group

//Event to get all Groups

async function getGroups() {
  const token = localStorage.getItem("chatapplicationtoken");

  const res = await axios.get(`${root}get-groups`, {
    headers: {
      token: token,
    },
  });
  let str = "";
  console.log(res);
  userDetails = res.data.userDetails;
  document
    .getElementById("profileImage")
    .setAttribute(
      "src",
      userDetails.ProfileImageUrl || "./images/defaultProfile.png"
    );
  document.getElementById("nameDisplay").innerText =
    userDetails.Name.slice(0, 5) + "...";
  res.data.groups.groups.forEach((ele) => {
    let heading = "";
    let name = "";
    if (ele.Heading.length > 30) {
      heading = ele.Heading.slice(0, 30) + "...";
    } else {
      heading = ele.Heading;
    }
    if (ele.Name.length > 15) {
      name = ele.Name.slice(0, 15) + "...";
    } else {
      name = ele.Name;
    }
    str += `<div class="chats" id="${ele.id}">
    <div><img src=${ele.Image || "./images/defaultProfile.png"} alt="" /></div>
    <div>
      <div>${name}</div>
      <div>${heading}</div>
    </div>
  </div>`;
  });
  chats.innerHTML = str;
  console.log(res);
}
getGroups();
//Event to get all Groups

//functions without any http request
addGroupButton.addEventListener("mouseover", () => {
  console.log("hi");
  addingGroups.style.display = "flex";
});

addingGroups.addEventListener("mouseover", () => {
  addingGroups.style.display = "flex";
});
addingGroups.addEventListener("mouseout", () => {
  addingGroups.style.display = "none";
});

document.getElementById("back").addEventListener("click", () => {
  right.style.display = "none";
});

left.addEventListener("click", async (e) => {
  console.log(e.target);
  let id = undefined;

  if (e.target.parentElement.classList.contains("chats")) {
    console.log("yes its contains");
    id = e.target.parentElement.id;
  } else if (e.target.classList.contains("chats")) {
    id = e.target.id;
  } else if (e.target.parentElement.parentElement.classList.contains("chats")) {
    id = e.target.parentElement.parentElement.id;
  }
  console.log(groupname.id);
  if (groupname.id) {
    console.log("<<<<<<");
    socket.emit("leave", groupname.id);
  }

  if (id !== undefined) {
    try {
      const token = localStorage.getItem("chatapplicationtoken");
      console.log(token);
      let res = await axios({
        method: "post",
        url: `${root}get-group`,
        headers: { token: token },
        data: { id: id },
      });
      document.getElementById("messagesBox").innerHTML = "";
      getGroupMessages(1, id);
      console.log(res);
      if (res.data.success) {
        let name = "";
        if (res.data.group.Name.length > 10) {
          name = res.data.group.Name.slice(0, 10) + "...";
        } else {
          name = res.data.group.Name;
        }
        console.log(res.data.group);

        groupname.innerText = name;
        groupname.setAttribute("id", res.data.group.id);
        right.style.display = "block";
        socket.emit("joinChat", groupname.id, "Abhay");
      }
    } catch (err) {
      console.log(err);
    }
  }
});
socket.on("takeMessage", (obj) => {
  console.log(obj);
  if (userDetails.id !== obj.userId) {
    if (obj.isImage) {
      let div = document.createElement("div");
      div.setAttribute("class", "messagesleft");
      let innerDiv = document.createElement("div");
      let img = document.createElement("img");
      img.setAttribute("src", obj.message);
      innerDiv.append(img);
      div.append(innerDiv);
      document.getElementById("messagesBox").appendChild(div);
    } else {
      let div = document.createElement("div");
      div.setAttribute("class", "messagesleft");
      let innerDiv = document.createElement("div");
      let p = document.createElement("p");
      p.innerText = obj.userName + " :- " + obj.message;
      innerDiv.append(p);
      div.append(innerDiv);
      document.getElementById("messagesBox").appendChild(div);
    }
  }
});
groupname.addEventListener("click", () => {
  localStorage.setItem(
    "groupNameId",
    JSON.stringify({
      name: groupname.innerText,
      id: groupname.id,
      userDetails: userDetails,
    })
  );
  window.location = "./groupinfo/groupinfo.html";
});
//functions without any http request

document
  .getElementById("sendMessageIcon")
  .addEventListener("click", async () => {
    const token = localStorage.getItem("chatapplicationtoken");
    const input = document.getElementById("messageValue");
    const input2 = document.getElementById("sendInput");
    console.log(input2.files[0]);

    let obj = {
      groupId: groupname.id,
      userId: userDetails.id,
      userName: userDetails.Name,
    };

    if (input2.files[0]) {
      console.log("I'm here");
      const res = await axios(`${root}upload-message-image`, {
        headers: {
          token: token,
        },
        method: "PUT",
      });
      console.log(res);
      const res2 = await fetch(res.data, {
        method: "PUT",
        headers: {
          "Content-type": "multipart/form-data",
        },
        body: input2.files[0],
      });
      input2.value = "";
      console.log(res2);
      if (res2.status === 200) {
        (obj.message = res2.url.split("?")[0]), (obj.isImage = true);
        socket.emit("messageSent", obj);
        let div = document.createElement("div");
        div.setAttribute("class", "messagesright");
        let innerDiv = document.createElement("div");
        let img = document.createElement("img");
        img.setAttribute("src", obj.message);
        innerDiv.append(img);
        div.append(innerDiv);
        document.getElementById("messagesBox").append(div);
        axios.post(
          `${root}send-message`,
          {
            message: obj.message,
            groupId: obj.groupId,
            isImage: obj.isImage,
          },
          {
            headers: {
              token: token,
            },
          }
        );
      }
    } else {
      if (input.value.trim() !== "") {
        console.log("inside this shit");
        (obj.message = input.value), (obj.isImage = false);
        socket.emit("messageSent", obj);
        console.log(userDetails.Name);
        let div = document.createElement("div");
        div.setAttribute("class", "messagesright");
        let innerDiv = document.createElement("div");
        let p = document.createElement("p");
        p.innerText = input.value;
        innerDiv.append(p);
        div.append(innerDiv);
        document.getElementById("messagesBox").appendChild(div);
        input.value = "";
        axios.post(
          `${root}send-message`,
          {
            message: obj.message,
            groupId: obj.groupId,
            isImage: obj.isImage,
          },
          {
            headers: {
              token: token,
            },
          }
        );
      }
    }
  });

async function getGroupMessages(lastPoint, groupId) {
  try {
    const token = localStorage.getItem("chatapplicationtoken");
    const res = await axios.get(
      `${root}get-messages?groupId=${groupId}&ofsetDetails=${lastPoint}`,
      { headers: { token: token } }
    );
    console.log(res);

    if (document.querySelector(".arrowDiv"))
      document.querySelector(".arrowDiv").remove();

    appendMessages(res.data.data);
    if (res.data.obj.haveMore) {
      let haveMore = document.createElement("div");
      haveMore.setAttribute("class", "arrowDiv");
      let p2 = document.createElement("h2");
      p2.innerText = "🡹";
      haveMore.append(p2);
      p2.setAttribute("id", res.data.obj.lastPoint);
      document.getElementById("messagesBox").prepend(haveMore);
      p2.addEventListener("click", (ee) => {
        console.log("hi");
        getGroupMessages(+ee.target.id + 1, Number(groupname.id));
      });
    }
  } catch (err) {
    console.log(err);
  }
}

function appendMessages(data) {
  for (let i = data.length - 1; i >= 0; i--) {
    if (data[i].IsImage) {
      let div = document.createElement("div");
      if (data[i].userId === userDetails.id) {
        div.setAttribute("class", "messagesright");
      } else {
        div.setAttribute("class", "messagesleft");
      }
      let innerDiv = document.createElement("div");
      let img = document.createElement("img");
      console.log(data[i].Message, "<<<<<>>>>>");
      img.setAttribute("src", data[i].Message);
      innerDiv.append(img);
      div.append(innerDiv);
      document.getElementById("messagesBox").prepend(div);
    } else {
      let div = document.createElement("div");
      if (data[i].userId === userDetails.id) {
        div.setAttribute("class", "messagesright");
      } else {
        div.setAttribute("class", "messagesleft");
      }
      let innerDiv = document.createElement("div");
      let p = document.createElement("p");
      p.innerText = data[i].Message;
      innerDiv.append(p);
      div.append(innerDiv);
      document.getElementById("messagesBox").prepend(div);
      ////
    }
  }
}
