window.onscroll = function () {
  let header = document.getElementById("header-lg");
  let brand = document.getElementById("nav__brand");
  if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
    header.classList.add("scrolled");
    brand.style.visibility = "hidden";
    brand.style.height = "50px";
  } else {
    header.classList.remove("scrolled");
    brand.style.visibility = "visible";
    brand.style.height = "auto";
  }
};

document.getElementById("sidebar-toggler").onclick = () => {
  document.getElementById("nav__sidebar").classList.toggle("sidebar-on");
  document.getElementById("nav__header").classList.toggle("sidebar-on");
};

let userService = new UserService();

let getUserList = () => {
  userService
    .getList()
    .then((res) => {
      displayList(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

let displayList = (list) => {
  let container = document.querySelector(".teachers .container");
  container.innerHTML = "";
  list.forEach((user) => {
    if (user.group === "GV") {
      container.innerHTML += `
      <div class="teachers__info-card">
        <div class="teachers__avt">
          <img src="imgs/${user.photo}" alt="" />
        </div>
        <div class="teachers__nationality">${user.language}</div>
        <div class="teachers__name">${user.fullname}</div>
        <div class="teachers__description">${user.description}</div>
      </div>
    `;
    }
  });
};

getUserList();
