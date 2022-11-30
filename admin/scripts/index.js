// GLOBAL FUNCTION
DOM = (id) => document.getElementById(id);

let displayTable = (data) => {
  let container = document.querySelector(".user-table");
  container.innerHTML = "";
  data.forEach((user, index) => {
    container.innerHTML += `
      <tr>
        <td scope="row">${index + 1}</td>
        <td scope="row">${user.username}</td>
        <td scope="row">${user.email}</td>
        <td scope="row">${user.language}</td>
        <td scope="row">${user.group}</td>
        <td scope="row">
          <div class="opt-btns d-flex flex-column" style="gap: 10px">
            <button type="button" class="btn btn-success" data-toggle="modal" data-target="#form" onclick="initializeUpdateModal('${
              user.id
            }')">Cập nhật</button>
            <button type="button" class="btn btn-danger" onclick="delUser('${user.id}')">Xoá</button>
          </div>
         </td>
      </tr>
    `;
  });
};

// ADD NEW USER
DOM("add-user-btn").onclick = () => {
  document.querySelector(".modal-title").innerHTML = "Thêm người dùng";
  DOM("update-submit").style.display = "none";
  DOM("form-modal").reset();
  DOM("username").disabled = false;
};

let addUser = () => {
  let _username = DOM("username").value;
  let _fullname = DOM("fullname").value;
  let _password = DOM("password").value;
  let _email = DOM("email").value;
  let _group = DOM("group").value;
  let _language = DOM("language").value;
  let _description = DOM("description").value;

  userService
    .getList()
    .then((res) => {
      for (user of res.data) {
        if (user.username === _username) {
          alert("A");
          return;
        }
      }
      let newUser = {
        username: _username,
        fullname: _fullname,
        password: _password,
        email: _email,
        group: _group,
        language: _language,
        description: _description,
      };
      userService
        .addUser(newUser)
        .then((res) => {
          getUserList();
          document.querySelector(".close").click();
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

// UPDATE
let initializeUpdateModal = (userID) => {
  document.querySelector(".modal-title").innerHTML = "Cập nhật";
  DOM("add-submit").style.display = "none";
  userService
    .getList()
    .then((res) => {
      for (user of res.data) {
        if (user.id === userID) {
          DOM("username").value = user.username;
          DOM("username").disabled = true;
          DOM("fullname").value = user.fullname;
          DOM("password").value = user.password;
          DOM("email").value = user.email;
          DOM("photo").value = user.photo;
          DOM("group").value = user.group;
          DOM("language").value = user.language;
          DOM("description").value = user.description;
          return;
        }
      }
    })
    .catch((err) => {
      console.log(err);
    });

  DOM("form-modal").onsubmit = () => {
    let _username = DOM("username").value;
    let _fullname = DOM("fullname").value;
    let _password = DOM("password").value;
    let _email = DOM("email").value;
    let _group = DOM("group").value;
    let _language = DOM("language").value;
    let _description = DOM("description").value;

    let newUser = {
      username: _username,
      fullname: _fullname,
      password: _password,
      email: _email,
      group: _group,
      language: _language,
      description: _description,
    };

    userService
      .updateUser(newUser, userID)
      .then((res) => {
        document.querySelector(".close").click();
        getUserList();
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

// REMOVE USER
let delUser = (userID) => {
  userService
    .deleteUser(userID)
    .then((res) => {
      getUserList();
    })
    .catch((err) => {
      console.log(err);
    });
};

// INITIALIZE
let userService = new UserService();

let getUserList = () => {
  userService
    .getList()
    .then((res) => {
      displayTable(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

getUserList();
