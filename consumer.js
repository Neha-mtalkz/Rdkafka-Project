const kafka = require('node-rdkafka');

const consumer1 = new kafka.KafkaConsumer({
    "metadata.broker.list": "127.0.0.1:9092",
    "group.id": "hello-group2",
    "auto.offset.reset": "earliest"
});
const consumer2 = new kafka.KafkaConsumer({
    "metadata.broker.list": "127.0.0.1:9092",
    "group.id": "hello-group1",
    "auto.offset.reset": "earliest"
});

// const consumer3 = new kafka.KafkaConsumer({
//     "metadata.broker.list": "127.0.0.1:9092",
//     "group.id": "myid",
//     "auto.offset.reset": "earliest"
// });

consumer2.on("ready", function () {
    console.log("received message 2....................")
    consumer2.subscribe(['new-topic']);
    consumer2.consume();
}).on('data', function (data) {
    console.log(data.partition, " 2");
    console.log('Received message from partition 1: ' + data.value);
});
consumer1.on("ready", function () {
    consumer1.subscribe(['new-topic']);
    consumer1.consume()
    console.log("received message 1....................")
}).on('data', function (message) {
    console.log(message.partition, " 1");
    console.log('Received message from partition 0:', message.value);
});
consumer1.on('event.log', function (log) {
    console.log("Consumer log ", log);
});
// consumer3.on("ready", function () {
//     console.log("received message 3....................")
//     consumer3.subscribe(['ritul-singh']);
//     consumer3.consume();
// }).on('data', function (data) {
//     console.log('Received message from partition 2: ' + data.value);
// });

consumer1.connect();
consumer2.connect();
// consumer3.connect();

