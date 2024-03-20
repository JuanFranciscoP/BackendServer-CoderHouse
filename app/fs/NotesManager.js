const fs = require("fs");
const crypto = require("crypto");

class NotesManager {
  constructor() {
    this.path = "./app/fs/files/notes.json";
    this.init();
  }
  init() {
    const exists = fs.existsSync(this.path);
    if (!exists) {
      const stringData = JSON.stringify([], null, 2);
      fs.writeFile(this.path, stringData, (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("archivo creado");
        }
      });
    } else {
      console.log("asdasd ");
    }
  }
  async create(data) {
    try {
      if (!data.text) {
        const error = new Error("ingrese texto");
        throw error
      } else {
        const note = {
          id: crypto.randomBytes(12).toString("hex"),
          text: data.text,
          date: data.date || new Date(),
        };
        let all = await fs.promises.readFile(this.path, "utf-8");
        all = JSON.parse(all);
        all.push(note);
        all = JSON.stringify(all, null, 2);
        await fs.promises.writeFile(this.path, all);
      }
    } catch (error) {
      throw error
    }
  }
  async read() {
    try {
      let all = await fs.promises.readFile(this.path, "utf-8");
      all = JSON.parse(all);
      console.log(all);
    } catch (error) {
      console.log(error)
    }
  }
}

const note1 = new NotesManager();

async function test () {
  try {
    const notes = new NotesManager();
    //notes.create({text:"la segunda nota creada por el hombre, venciendo a la maquina, o al menos usandola a su favor!"})
    notes.read()
  } catch (error) {
    console.log(error);
  }
  
}

test();