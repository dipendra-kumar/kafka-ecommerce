const { Kafka, Partitioners } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'my-producer',
  brokers: ['10.8.10.102:9092',],
});

const producer = kafka.producer({ createPartitioner: Partitioners.LegacyPartitioner })
producer.connect().then(console.log("Producer up and ready."))

const sendMessage = async (topic, message) => {

  await producer.send({
    topic: topic,
    messages: [
      {
        value: JSON.stringify(message),
      },
    ],
  });
}

module.exports = sendMessage;