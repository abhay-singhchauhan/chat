const root = "http://192.168.1.9:4000/";
const token = localStorage.getItem("chatapplicationtoken");

display();
async function display() {
  const res = await axios.get(`${root}get-user`, {
    headers: {
      token: token,
    },
  });
  console.log(res);
  const data = res.data.obj;

  const h4 = document.querySelectorAll("h4");
  document
    .querySelector("img")
    .setAttribute(
      "src",
      data.ProfileImageUrl || "../images/defaultProfile.png"
    );
  h4[0].innerText = data.Name;
  h4[1].innerText = data.Email;
  h4[2].innerText = data.Phone;
}

const button = document.querySelector("button");
console.log(button);
button.addEventListener("click", async () => {
  const file = document.querySelector("input").files[0];
  console.log(file);
  try {
    const res = await axios(`${root}upload-profile-image`, {
      headers: { token: token },
      method: "PUT",
    });
    console.log(res);
    console.log(res.data);
    const res2 = await fetch(res.data, {
      method: "PUT",
      headers: {
        "Content-type": "multipart/form-data",
      },
      body: file,
    });

    console.log(res2.url.split("?")[0]);
    const res3 = await axios.post(
      `${root}update-profile-image`,
      { url: res2.url.split("?")[0] },
      {
        headers: {
          token: token,
        },
      }
    );
    if (res3) {
      document
        .querySelector("img")
        .setAttribute(
          "src",
          res3.data.resp.ProfileImageUrl || "../images/defaultProfile.png"
        );
      console.log(res3);
    }
  } catch (err) {
    console.log(err);
  }
});
