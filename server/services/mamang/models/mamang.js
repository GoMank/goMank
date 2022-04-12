const { ObjectId } = require("mongodb");
const { getDataBase } = require("../config/mongoDb");


class Mamang {
    static async findAllMamang() {
        try {
            const db = getDataBase()
            const mamangs = await db
                .collection('mamangs')
                .find()
                .project({ password: 0 })
                .toArray()
            return mamangs
        } catch (error) {
            throw (error)
        }
    }

    static async findOneMamang(id) {
        try {
            const db = getDataBase()
            const mamang = await db
                .collection('mamangs')
                .findOne({ _id: ObjectId(id) })
            delete mamang.password
            return mamang
        } catch (error) {
            throw (error)
        }
    }

    static async registerMamang(data) {
        try {
            const db = getDataBase()
            const mamang = await db
                .collection('mamangs')
                .insertOne(data)
            return mamang
        } catch (error) {
            throw (error)
        }
    }

    static async loginMamang(data) {
        try {
            const db = getDataBase()
            const mamang = await db
                .collection('mamangs')
                .findOne({ email: data.email })
            return mamang
        } catch (error) {
            throw (error)
        }
    }

    static async deleteOneMamang(id) {
        try {
            const db = getDataBase()
            await db
                .collection('mamangs')
                .deleteOne({ _id: ObjectId(id) })
            return "success deleting"
        } catch (error) {
            throw (error)
        }
    }

    // static async updateOneMamang(id, address) {
    //     try {
    //         const db = getDataBase()
    //         await db
    //             .collection('mamangs')
    //             .updateOne({ _id: ObjectId(id) },
    //                 {
    //                     $set: {
    //                         address: address
    //                     },
    //                 })
    //         return 'success updating'
    //     } catch (error) {
    //         throw (error)
    //     }
    // }

    static async updateSaldoMamang(id, saldo) {
        try {
            const db = getDataBase()
            await db
                .collection('mamangs')
                .updateOne({ _id: ObjectId(id) },
                    {
                        $set: {
                            saldo: saldo
                        },
                    })
            return 'success updating saldo'
        } catch (error) {
            throw (error)
        }
    }
}

module.exports = { Mamang }
