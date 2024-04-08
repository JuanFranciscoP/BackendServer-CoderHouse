const { log } = require("console");
const fs = require("fs");

const path = "./FilesManagement-FS/tickets.json";
const content = JSON.stringify([{ title: "HP1" }, { title: "HP2" }], null, 2);

fs.promises
  .writeFile(path, content)
  .then((res) => console.log(res))
  .catch((err) => console.log(err));

fs.promises
  .readFile(path, "utf-8")
  .then((res) => console.log(res))
  .catch((err) => console.log(err));

fs.promises
  .unlink(path)
  .then(() => console.log("se ha eliminado"))
  .catch((err) => console.log(err));
