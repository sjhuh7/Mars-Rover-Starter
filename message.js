const Command = require("./command");

class Message {
   constructor(name, commands) {
      if (!name) {
         throw new Error("Name is required.");

      }
      if (!Array.isArray(commands)) {
         throw new Error("Commands must be in an array.");

      }
      for (let i = 0; i < commands.length; i++) {
         if (!(commands[i] instanceof Command)) {
            throw new Error("Commands have to be an array of Command objects")
         }
      }
      this.name = name;
      this.commands = commands;
   }
}

module.exports = Message;