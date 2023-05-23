const { Kafka, Partitioners } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'my-producer',
  brokers: ['localhost:9092',],
});

const producer = kafka.producer({ createPartitioner: Partitioners.LegacyPartitioner })
producer.connect().then(console.log("Producer up and ready."))

module.exports = producer;