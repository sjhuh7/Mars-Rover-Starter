const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {

  it("constructor sets position and default values for mode and generatorWatts", function () {

  
    const rover = new Rover(87382098)
    expect(rover.position).toBe(87382098)
    expect(rover.mode).toBe("NORMAL")
    expect(rover.generatorWatts).toBe(110)
  });
  it("response returned by receiveMessage contains the name of the message", function () {
    const commands = [new Command("STATUS_CHECK")];
    const message = new Message ("Testing to recieve the same message", commands);
    const rover = new Rover(87382098)
    const response = rover.receiveMessage(message)
    expect(response.message).toBe("Testing to recieve the same message")
  });
  it("response returned by receiveMessage includes two results if two commands are sent in the message", function () {
    const commands = [new Command("MODE_CHANGE", "LOW_POWER"), new Command("STATUS_CHECK")];
    const message = new Message("Testing with two commands", commands);
    const rover = new Rover(87382098)
    const response = rover.receiveMessage(message);
    expect(response.results.length).toBe(2)
  });
  it("responds correctly to the status check command", function () {
    const commands = [new Command("STATUS_CHECK")]
    const message = new Message("Testing status check", commands)
    const rover = new Rover(87382098)
    const response = rover.receiveMessage(message)
    expect(response.results[0].roverStatus.mode).toBe("NORMAL")
    expect(response.results[0].roverStatus.generatorWatts).toBe(110)
    expect(response.results[0].roverStatus.position).toBe(87382098)
  });
  it("responds correctly to the mode change command", function () {
    const commands = [new Command("MODE_CHANGE", "LOW_POWER")]
    const message = new Message("Testing the mode change", commands);
    const rover = new Rover(87382098);
    const response = rover.receiveMessage(message);
    expect(response.results[0].completed).toBe(true)
    expect(rover.mode).toBe("LOW_POWER")
  })
  it("responds with a false completed value when attempting to move in LOW_POWER mode", function (){
    const modeChangeCommand = new Command("MODE_CHANGE", "LOW_POWER")
    const moveCommand = new Command("MOVE", 100);
    const message = new Message("Test if moves during LOW_POWER mode", [modeChangeCommand, moveCommand]);
    const rover = new Rover(87382098)
    rover.receiveMessage(new Message("Change to LOW_POWER", [modeChangeCommand])); 
    const response = rover.receiveMessage(message)
    expect(response.results[0].completed).toBe(true);
    expect(response.results[1].completed).toBe(false)
    expect(rover.position).toBe(87382098)
  })
  it("responds with the position for the move command", function (){
    const commands = [new Command("MOVE", 87382098)]
    const message = new Message("Move rover to new position", commands)
    const rover = new Rover(100)
    const response = rover.receiveMessage(message)
    expect(response.results[0].completed).toBe(true);
    expect(rover.position).toBe(87382098);
  })

});


