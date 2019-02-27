const serialport = require('serialport');

// Open the port

// *************************
//!  BaudRate for Bluetooth 9600
// *************************

const port = new serialport('/dev/cu.HC-06-DevB', {
  baudRate: 9600 // remember to check baudrate
});

// Queue
function Queue() {
  this.data = [];
}

Queue.prototype.enqueue = function (record) {
  this.data.unshift(record);
}

Queue.prototype.dequeue = function () {
  this.data.pop();
}

Queue.prototype.last = function () {
  return this.data[0];
}
Queue.prototype.first = function () {
  return this.data[this.data.length - 1];
}
Queue.prototype.size = function () {
  return this.data.length;
}

let count = true;
const q = new Queue();
let result = [];

// Read the port data
port.on('open', function () {
  console.log('open\n');
  port.on('data', function (data) {
    for (let i = 0; i < data.length; i++) {
      result[i] = data[i];
      q.enqueue(data[i]);
    }


    console.log(count, ' :result: ', result, ':len:', data.length);
    if (count == 0) {
      count++;
    } else {
      count--;
    }

    function end() {
      console.log('Stream closed.')
      return 0;
    }

    const sleep = (ms) => {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

    const test = async () => {
      await sleep(5000);
    }

    test();
  });
});
