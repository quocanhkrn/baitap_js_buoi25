function UserService() {
  this.getList = function () {
    return axios.get("https://6386f01de399d2e473f019bb.mockapi.io/api/EXBUOI25");
  };
}
