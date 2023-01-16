const kafka = require('node-rdkafka');
//Stormwind
const producer = new kafka.Producer({
    "metadata.broker.list": "127.0.0.1:9092",
    "group.id": "hello-group",
    dr_cb: true
});
producer.on('delivery-report', function (err, report) {
    console.log('delivery-report: ' + JSON.stringify(report));
});
producer.on('ready', function () {
    console.log('Producer is ready');
    producer.produce('new-topic', 0, Buffer.from('Hello Neha Singh'), "Stormwind");
    producer.produce('new-topic', 1, Buffer.from('Hello Ritul Singh'), "Stormwind");
    // producer.produce('new-topic', 2, Buffer.from('Hello Nehaaaaaaaaaaaaaaa Singh'), "Stormwind");
});
producer.on('event.error', (err) => {
    console.log('Event error', err);
})
producer.on('disconnected', function (arg) {
    console.log('Producer disconnected. ', arg);
});
producer.connect();