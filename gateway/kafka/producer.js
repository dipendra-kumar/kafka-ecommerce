const { Kafka, Partitioners } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'my-producer',
  brokers: ['localhost:9092',],
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
  console.log('message sent.')
}

module.exports = sendMessage;