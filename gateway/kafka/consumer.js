const { Kafka } = require("kafkajs")

const kafka = new Kafka({
  clientId: 'my-producer',
  brokers: ['localhost:9092',],
});

const consumeMessage = async (groupName, topicName) => {
  const consumer = kafka.consumer({ groupId: groupName, fromBeginning: true })
  consumer.connect().then(console.log('consumer connected!'))
  var msg = function (value) {
    return value;
  };
  await consumer.subscribe({ topic: topicName })
  await consumer.run({
    eachMessage: async ({ message }) => {
      msg(JSON.parse(message.value))
      console.log('msg received')
    },
  })
  console.log(msg, "this is message")
  return msg;

}



module.exports = consumeMessage;
