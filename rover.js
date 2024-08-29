class Rover {
    constructor(position) {
      this.position = position;
      this.mode = "NORMAL";
      this.generatorWatts = 110;
    }
    //rover starts at a position, rover is in NORMAL MODE, and generator starts at 110 watts.
    receiveMessage(message) {
      let results = []

      for (let i = 0; i <message.commands.length; i++ ) {
        let command = message.commands[i]
        if (command.commandType === "STATUS_CHECK") {
          let roverStatus = {
            mode: this.mode,
            generatorWatts: this.generatorWatts,
            position: this.position
          }
          results.push({completed: true, roverStatus: roverStatus})

        } else if (command.commandType === "MODE_CHANGE") {
          this.mode = command.value;
          results.push({ completed: true})
        } else if (command.commandType === "MOVE") {
          if (this.mode === "NORMAL") {
            this.position = command.value;
            results.push({ completed: true});
          } else {
            results.push({completed:false})
          }
        } else {
          results.push({completed: false})
        }
    }
    return {
      message:message.name,
      results: results
    }
}
}
    


module.exports = Rover;