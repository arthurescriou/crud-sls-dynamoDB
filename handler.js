const AWS = require('aws-sdk')

AWS.config.update({
  region: 'us-west-1',
  endpoint: 'http://localhost:8000',
})

const dynamodb = new AWS.DynamoDB()
const docClient = new AWS.DynamoDB.DocumentClient()

const listTables = () => dynamodb.listTables({}).promise()
const createTable = (name) =>
  dynamodb
    .createTable({
      TableName: name,
      KeySchema: [{ AttributeName: 'id', KeyType: 'HASH' }],
      AttributeDefinitions: [{ AttributeName: 'id', AttributeType: 'S' }],
      ProvisionedThroughput: {
        ReadCapacityUnits: 10,
        WriteCapacityUnits: 10,
      },
    })
    .promise()

const methods = {
  create: 'create',
  read: 'read',
  update: 'update',
  delete: 'delete',
}

const create = (table, Item) =>
  docClient
    .put({
      TableName: table,
      Item,
    })
    .promise()

const read = (table, id) =>
  docClient.get({ TableName: table, Key: { id } }).promise()

const deleteItem = (table, id) =>
  docClient.delete({ TableName: table, Key: { id } }).promise()

const list = (table) => docClient.scan({ TableName: table }).promise()

module.exports.crud = async (event) => {
  const { method: httpMethod } = event.requestContext.http
  const { entity, method, id } = event.pathParameters
  const { TableNames } = await listTables()
  if (!TableNames.includes(entity)) {
    await createTable(entity)
  }
  let response = {}
  if (id) {
    switch (method) {
      case methods.create:
        const item = { id }
        await create(entity, item)
        response = item
        break
      case methods.read:
        response = await read(entity, id)
        break
      case methods.delete:
        response = await deleteItem(entity, id)
        break
      default:
        response = 'unknown method'
    }
  } else {
    response = await list(entity)
  }

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        event: response,
      },
      null,
      2
    ),
  }
}
