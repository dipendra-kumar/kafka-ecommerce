// import the `Kafka` instance from the kafkajs library
const { Kafka, Partitioners } = require("kafkajs")

// the client ID lets kafka know who's producing the messages
const clientId = "my-app"
// we can define the list of brokers in the cluster
const brokers = ["localhost:9092"]
// this is the topic to which we want to write messages
const topic = "message-log"

// initialize a new kafka client and initialize a producer from it
const kafka = new Kafka({ clientId, brokers, createPartitioner: Partitioners.LegacyPartitioner })
const producer = kafka.producer()
producer.connect().then(console.log("Kafka producer connected!"))

module.exports = producer
