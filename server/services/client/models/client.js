const { ObjectId } = require("mongodb");
const { getData } = require("../config/mongoDb");


class Client {
    static async findAllClient() {
        try {
            const db = getData()
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
            const db = getData()
            const client = await db
                .collection('clients')
                .findOne({ _id: id })
            delete client.password
            return client
        } catch (error) {
            throw (error)
        }
    }

    static async registerClient(data) {
        try {
            const db = getData()
            const client = await db
                .collection('clients')
                .insertOne(data)
            return client
        } catch (error) {
            throw (error)
        }
    }

    static async loginClient(data) {
        try {
            const db = getData()
            const client = await db
                .collection('clients')
                .findOne({email:data.email})
            return client
        } catch (error) {
            throw (error)
        }
    }
}

module.exports = { Client }
