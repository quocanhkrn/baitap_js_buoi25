function UserService() {
  this.getList = function () {
    return axios.get("https://6386f01de399d2e473f019bb.mockapi.io/api/EXBUOI25");
  };

  this.addUser = function (user) {
    return axios({
      url: "https://6386f01de399d2e473f019bb.mockapi.io/api/EXBUOI25",
      method: "post",
      data: user,
    });
  };

  this.updateUser = function (user, id) {
    return axios({
      url: `https://6386f01de399d2e473f019bb.mockapi.io/api/EXBUOI25/${id}`,
      method: "put",
      data: user,
    });
  };

  this.deleteUser = function (id) {
    return axios({
      url: `https://6386f01de399d2e473f019bb.mockapi.io/api/EXBUOI25/${id}`,
      method: "delete",
    });
  };
}
