const { ObjectId } = require("mongodb");
const { getDataBase } = require("../config/mongoDb");


class User {
    static async findAllClient() {
        try {
            const db = getDataBase()
            const clients = await db
                .collection('clients')
                .find()
                .project({password:0})
                .toArray()
            return clients
        } catch (error) {
            throw (error)
        }
    }

    static async findOneClient(id) {
        try {
            const db = getDataBase()
            const client = await db
                .collection('clients')
                .findOne({ _id: ObjectId(id) })
            delete client.password
            return client
        } catch (error) {
            throw (error)
        }
    }

    static async registerClient(data) {
        try {
            const db = getDataBase()
            const client = await db
                .collection('clients')
                .insertOne(data)
            return client
        } catch (error) {
            throw (error)
        }
    }
}

module.exports = { User }
