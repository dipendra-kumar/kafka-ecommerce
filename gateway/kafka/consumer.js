const { Kafka } = require("kafkajs")

const kafka = new Kafka({
  clientId: 'my-producer',
  brokers: ['10.8.10.102:9092',],
});

var msg;

const consumeMessage = async (groupName, topicName, cb) => {
  const consumer = kafka.consumer({ groupId: groupName, fromBeginning: true })
  consumer.connect().then(console.log('consumer connected!'))
  await consumer.subscribe({ topic: topicName })

  await consumer.run({
    eachMessage: async ({ message }) => {
      cb(JSON.parse(message.value))
    },
  })

  return msg;
}



module.exports = consumeMessage;
