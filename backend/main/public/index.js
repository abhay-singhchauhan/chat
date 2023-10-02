const root = "http://192.168.1.9:4000/";

const right = document.getElementById("right");
const left = document.getElementById("left");
const addGroupButton = document.getElementById("addGroupButton");
const addingGroups = document.getElementById("addingGroups");
const createGroupForm = document.getElementById("createGroupForm");
const chats = document.getElementById("chatList");
const groupname = document.querySelector(".groupname");

//Event to create a Group
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
    <div><img src="./images/defaultProfile.png" alt="" /></div>
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

left.addEventListener("mouseover", () => {
  console.log("hi");
});

left.addEventListener("click", async (e) => {
  console.log(e.target);
  let id = undefined;
  console.log(e.target.parentElement);
  if (e.target.parentElement.classList.contains("chats")) {
    console.log("yes its contains");
    id = e.target.parentElement.id;
  } else if (e.target.classList.contains("chats")) {
    id = e.target.id;
  } else if (e.target.parentElement.parentElement.classList.contains("chats")) {
    id = e.target.parentElement.parentElement.id;
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
      }
    } catch (err) {
      console.log(err);
    }
  }
});

groupname.addEventListener("click", () => {
  localStorage.setItem(
    "groupNameId",
    JSON.stringify({ name: groupname.innerText, id: groupname.id })
  );
  window.location = "./groupinfo/groupinfo.html";
});
//functions without any http request
