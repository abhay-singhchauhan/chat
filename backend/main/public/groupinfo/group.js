const root = "http://192.168.1.9:4000/";
if (localStorage.getItem("groupNameId") === null) {
  window.location = "../index.html";
}
const back = document.getElementById("back");
const groupNameId = JSON.parse(localStorage.getItem("groupNameId"));
const groupName = document.getElementById("groupname");
groupName.setAttribute("id", groupNameId.id);
groupName.innerText = groupNameId.name;
localStorage.removeItem("groupNameId");
const member = document.getElementById("membersdisplay");
const plus = document.getElementById("plus");
const addingMembers = document.getElementById("addingMembers");
const containertop = document.getElementById("containertop");
//functions without http request

back.addEventListener("click", () => {
  console.log("back function");
  history.back();
});

plus.addEventListener("mouseover", () => {
  addingMembers.setAttribute("class", "");
});
plus.addEventListener("mouseout", () => {
  addingMembers.setAttribute("class", "displaynone");
});
addingMembers.addEventListener("mouseover", () => {
  addingMembers.setAttribute("class", "");
});
addingMembers.addEventListener("mouseout", () => {
  addingMembers.setAttribute("class", "displaynone");
});

//functions without http request
const containerbottom = document.getElementById("containerbottom");
containerbottom.addEventListener("click", async (e) => {
  console.log("hi");
  if (e.target.classList.contains("removeMember")) {
    if (confirm("Are you sure, you want to remove this member?")) {
      try {
        const token = localStorage.getItem("chatapplicationtoken");
        const userId = e.target.parentElement.id;
        console.log(userId);
        console.log(e.target.id);
        const res = await axios.delete(
          `http://localhost:4000/remove-group-member?groupId=${groupNameId.id}&userId=${userId}`,
          {
            headers: {
              token: token,
            },
          }
        );
        console.log(res);
        if (res.data.success) {
          e.target.parentElement.remove();
        } else {
          alert(res.data.message);
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
});

document.getElementById("addMemberApi").addEventListener("input", async (e) => {
  e.preventDefault();
  const token = localStorage.getItem("chatapplicationtoken");
  console.log("inside here");
  const string = document.getElementById("addMemberApi").value;
  try {
    const res = await axios.get(`${root}get-users?email=${string}`, {
      headers: {
        token: token,
      },
    });

    displayMembers(res.data.data);
    console.log(res);
  } catch (err) {
    console.log(err);
  }
});

function displayMembers(data) {
  const memberDiv = document.getElementById("addMembers");
  memberDiv.setAttribute("class", "");
  let str = "";
  data.forEach((ele) => {
    str += `<div id="${ele.id}" class="innerSearchMembers">
    <img src="../images/defaultProfile.png" alt="" />
    <p>${ele.Email}</p>
    <button class="addMember">Add</button>
  </div>`;
  });
  memberDiv.innerHTML = str;
}

document.getElementById("addMembers").addEventListener("click", async (e) => {
  try {
    if (e.target.classList.contains("addMember")) {
      const token = localStorage.getItem("chatapplicationtoken");
      console.log(groupName);
      const email = e.target.previousElementSibling.innerText;
      console.log(email);
      const res = await axios.post(
        `http://localhost:4000/add-member?groupId=${groupNameId.id}`,
        {
          email: email,
        },
        {
          headers: {
            token: token,
          },
        }
      );
      if (res.data.success) {
        alert("Member Added Successfully");
      } else {
        alert(res.data.message);
      }
      console.log(res);
    }
  } catch (err) {
    console.log(err);
  }
});

async function display() {
  try {
    const token = localStorage.getItem("chatapplicationtoken");

    const res = await axios.get(
      `http://localhost:4000/get-group-members?groupId=${groupNameId.id}`,
      {
        headers: {
          token: token,
        },
      }
    );

    console.log(res);
    if (res.data) {
      console.log(res);
      let str = "";
      res.data.forEach((ele) => {
        str += `<div id="${ele.id}"   class="members">
        <img src="../images/defaultProfile.png" alt="" />
        <p>${ele.Name}</p>
        <button class="removeMember">Remove</button>
      </div>`;
      });
      containerbottom.innerHTML = str;
    }
  } catch (err) {
    console.log(err);
  }
}
display();
