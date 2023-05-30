const { Kafka } = require("kafkajs")

const kafka = new Kafka({
  clientId: 'my-producer',
  brokers: ['localhost:9092',],
});

const consumeMessage = async (groupName, topicName) => {
  const consumer = kafka.consumer({ groupId: groupName, fromBeginning: true })
  consumer.connect().then(console.log('consumer connected!'))
  await consumer.subscribe({ topic: topicName })

  var msg;
  await consumer.run({
    eachMessage: async ({ message }) => {
      msg = JSON.parse(message.value)
    },
  })

  return msg;
}



module.exports = consumeMessage;
