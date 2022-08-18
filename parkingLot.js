"use strict";

const fs = require("fs");

process.stdin.resume();
process.stdin.setEncoding("ascii");
let inputString = "";
let currentLine = 0;

process.stdin.on("data", function (chunk) {
  inputString += chunk;
});
process.stdin.on("end", function () {
  inputString = inputString.split("\n");
  main();
});

function readLine() {
  return inputString[currentLine++];
}

class ParkingLot {
  // Add the methods here
  slots = [];

  constructor(parkingSize) {
    this.slots = new Array(parkingSize).fill(null);
  }

  park(carId) {
    console.log(`Parking car: ${carId}`);
    if (this.slots.every((slot) => slot !== null)) {
      return false;
    }

    for (let i = 0; i <= this.slots.length; i++) {
      const slot = this.slots[i];

      if (slot === null) {
        this.slots[i] = carId;
        return true;
      }
    }
  }

  remove(carId) {
    console.log(`Leaving car: ${carId}`);
    if (this.slots.every((slot) => slot !== carId)) {
      return false;
    }

    for (let i = 0; i <= this.slots.length; i++) {
      const slot = this.slots[i];

      if (slot === carId) {
        this.slots[i] = null;
        return true;
      }
    }
  }

  getSlots() {
    console.log(`Parking slots: ${this.slots}`);
    return this.slots;
  }

  getSize() {
    console.log(`Parking size is: ${this.slots.length}`);
    return this.slots.length;
  }

  getAvailable() {
    const availableSlots = this.slots.filter((s) => s === null).length;
    console.log(`Available parking slots: ${availableSlots}`);
    return availableSlots;
  }

  isFull() {
    return this.getAvailable() === 0;
  }
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const numberOfSlots = parseInt(readLine().trim());
  const parkingLotObj = new ParkingLot(numberOfSlots);
  ws.write(`Parking Lot created with number of slots as ${numberOfSlots}\n`);

  let numberOfOperations = parseInt(readLine().trim());
  while (numberOfOperations-- > 0) {
    const inputs = readLine().trim().split(" ");
    const operation = inputs[0];
    const carId = inputs[1];

    switch (operation) {
      case "Park":
        if (parkingLotObj.park(carId)) {
          ws.write(`Parking Started: ${carId}\n`);
        } else {
          ws.write(`Parking Full: ${carId}\n`);
        }
        break;
      case "Remove":
        if (parkingLotObj.remove(carId)) {
          ws.write(`Car id ${carId} removed from parking\n`);
        } else {
          ws.write(`Car: ${carId} not found\n`);
        }
        break;
      case "GetSlots":
        const status = parkingLotObj.getSlots();
        status.forEach((obj, i) => {
          if (obj) {
            ws.write(`Parked at slot ${i + 1}: ${obj}\n`);
          } else {
            ws.write(`Slot ${i + 1} is empty\n`);
          }
        });
        break;
      default:
        break;
    }
  }
  ws.end();
}
