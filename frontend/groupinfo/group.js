const groupNameId = JSON.parse(localStorage.getItem("groupNameId"));
const groupName = document.getElementById("groupname");
groupName.setAttribute("id", groupNameId.id);
groupName.innerText = groupNameId.name;
localStorage.removeItem("groupNameId");
const member = document.getElementById("membersdisplay");

member.addEventListener("click", async (e) => {
  console.log("hi");
  if (e.target.classList.contains("removeMember")) {
    if (confirm("Are you sure, you want to remove this member?")) {
      const token = localStorage.getItem("chatapplicationtoken");
      const userId = e.target.id;
      console.log(userId);
      const res = await axios.delete(
        `http://localhost:4000/remove-group-member?groupId=${groupNameId.id}&userId=${userId}`,
        {
          headers: {
            token: token,
          },
        }
      );
      if (res.data.success) {
        e.target.parenetElement.remove();
      }
    }
  }
});

document.getElementById("addMember").addEventListener("click", (e) => {
  if (e.target.innerText === "Add Member") {
    e.target.innerText = "Close Form";
    document.getElementById("addMemberForm").setAttribute("class", "");
  } else {
    e.target.innerText = "Add Member";
    document
      .getElementById("addMemberForm")
      .setAttribute("class", "displaynone");
  }
});

document.getElementById("submitButton").addEventListener("click", async (e) => {
  e.preventDefault();
  const token = localStorage.getItem("chatapplicationtoken");

  const string = document.getElementById("addMemberApi").value;
  try {
    const res = await axios.get(
      `http://localhost:4000/get-users?email=${string}`,
      {
        headers: {
          token: token,
        },
      }
    );
    displayMembers(res.data.data);
    console.log(res);
  } catch (err) {
    console.log(err);
  }
});

document.getElementById("addMemberApi").addEventListener("input", async (e) => {
  e.preventDefault();
  const token = localStorage.getItem("chatapplicationtoken");

  const string = document.getElementById("addMemberApi").value;
  try {
    const res = await axios.get(
      `http://localhost:4000/get-users?email=${string}`,
      {
        headers: {
          token: token,
        },
      }
    );
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
    str += ` <div>
  <p>${ele.Email}</p>
  <button class="addMemberToThisGroup" id="${ele.id}">Add</button>
</div>`;
  });
  memberDiv.innerHTML = str;
}

document.getElementById("addMembers").addEventListener("click", async (e) => {
  try {
    if (e.target.classList.contains("addMemberToThisGroup")) {
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
      console.log(res);
    }
  } catch (err) {
    console.log(err);
  }
});

document.getElementById("addMembers").addEventListener("mouseout", () => {
  document.getElementById("addMembers").setAttribute("class", "displaynone");
});
document.getElementById("addMembers").addEventListener("mouseover", () => {
  document.getElementById("addMembers").setAttribute("class", "");
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
    const displayMembers = document.getElementById("membersdisplay");
    console.log(res);
    if (res.data) {
      console.log(res);
      let str = "";
      res.data.forEach((ele) => {
        str += `<p >${ele.Name}</p><button id="${ele.id}" class="removeMember">remove</button>`;
      });
      displayMembers.innerHTML = str;
    }
  } catch (err) {
    console.log(err);
  }
}
display();
