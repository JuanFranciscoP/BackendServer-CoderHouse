class UserManager {
  static #users = [];
  create(data) {
    const user = {
      id:
        UserManager.#users.length === 0
          ? 1
          : UserManager.#users[UserManager.#users.length - 1].id + 1,
      photo: data.photo,
      email: data.email,
      password: data.password,
      role: 0,
    };
    UserManager.#users.push(user);
    console.log("usuario creado correctamente");
  }
  read() {
    console.log(UserManager.#users)
  }
}

const gestorDeUsuarios = new UserManager();

gestorDeUsuarios.create({
  photo: "photo.png",
  email: "juanpepito@hotmail.com",
  password: "hola123",
});

gestorDeUsuarios.read()