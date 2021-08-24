const { Kafka } = require('kafkajs')


const kafkaInit = async function(id, brokerAddress, consumerGroup) {
    const kafka = new Kafka({
        clientId: id,
        brokers: brokerAddress
    });
    const producer = kafka.producer();
    await producer.connect();
    const consumer = kafka.consumer({ groupId: consumerGroup });
    await consumer.connect();

    return [kafka, producer, consumer]

}

const kafkaProduce = async function(producer, topic, messages) {
    await producer.send({
      topic: topic,
      messages: messages
    })

    await producer.disconnect()

}

const kafkaConsume = async function(consumer, topic) {
    await consumer.subscribe({ topic: 'test-topic', fromBeginning: true })

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        console.log({
          value: message.value.toString(),
        })
      },
    })

}




const start = async function(id, brokerAddress, topic, messsages, consumerGroup) {
    const result = await kafkaInit(id, brokerAddress, consumerGroup);
    const kafka = result[0];
    const producer = result[1];
    const consumer = result[2];

    await kafkaProduce(producer, topic, messages)
    await kafkaConsume(consumer, topic)

    console.log("We're done here!")
}

module.exports = {
    kafkaProduce: kafkaProduce,
    kafkaConsume: kafkaConsume,
    start: start
};
