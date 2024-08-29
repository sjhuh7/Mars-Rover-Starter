const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {

  it("constructor sets position and default values for mode and generatorWatts")
    const rover = new Rover(98382)
    expect(rover.position).toBe(98382)
    expect(rover.generatorWatts).toBe(110)
  });
  it("response returned by recieveMessage contains the name of the message", function () {
    const commands = [new Command("STATUS_CHECK")];
    const message = new Message ("Test message", commands);
    const rover = new Rover(98382)
    const response = rover.receieveMessage(message)
    expect(response.message).toBe("Test message")
  });
  it("response returned by recieveMessage includes two results if two commands are sent in the message", function () {
    const commands = [new Command("MODE_CHANGE", "LOW_POWER"), new Command("STATUS_CHECK")];
    const message = new Message("Test message with two commands", commands);
    const rover = new Rover(98282)
    const response = rover.receiveMessage(message);
    expect(response.results.length).toBe(2)
  });

});


