const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { Mamang } = require('../models/mamang')

class MamangController {
    static async findAllMamang(req, res, next) {
        try {
            const mamangs = await Mamang.findAllMamang()
            res.status(200).json(mamangs)
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'something error in find all mamang' })
        }
    }

    static async findOneMamang(req, res, next) {
        try {
            const { id } = req.params
            const mamang = await Mamang.findOneMamang(id)
            delete mamang.password
            res.status(200).json(mamang)
        } catch (error) {
            res.status(500).json({ message: 'something error in find one mamang' })
        }
    }

    static async registerMamang(req, res, next) {
        try {
            if (!req.body.email || !req.body.password || !req.body.name || !req.body.phoneNumber) {
                throw ({
                    code: 400,
                    message: 'please fill all the form registration'
                })
            }
            if (!req.body.gender || !req.body.address || !req.body.image || !req.body.rekNumber) {
                throw ({
                    code: 400,
                    message: 'please fill all the form registration'
                })
            }
            let data = req.body
            data.saldo = 0
            data.password = bcrypt.hashSync(data.password, 10)
            let mamang = await Mamang.registerMamang(data)
            mamang = await Mamang.findOneMamang(mamang.insertedId)
            res.status(201).json(mamang)
        } catch (error) {
            console.log(error);
            if (error.code === 400) {
                res.status(400).json({ message: error.message })
            } else {
                res.status(500).json({ message: 'something error in register mamang' })
            }
        }
    }

    static async loginMamang(req, res, next) {
        try {
            if (!req.body.email || !req.body.password) {
                throw ({
                    code: 400,
                    message: 'email or password are required'
                })
            }
            const data = req.body
            const mamang = await Mamang.loginMamang(data)
            if (!mamang) {
                throw ({
                    code: 400,
                    message: 'invalid email or password'
                })
            }
            if (!bcrypt.compareSync(data.password, mamang.password)) {
                throw ({
                    code: 400,
                    message: 'invalid email or password'
                })
            }
            delete mamang.password
            res.status(200).json(mamang)
        } catch (error) {
            if (error.code === 400) {
                res.status(400).json({ message: error.message })
            } else {
                res.status(500).json({ message: 'something error in login mamang' })
            }
        }
    }

    static async deleteOneMamang(req, res, next) {
        try {
            const { id } = req.params
            await Mamang.deleteOneMamang(id)
            res.status(200).json({ message: 'success deleting mamang' })
        } catch (error) {
            res.status(500).json({ message: 'something error in delete one mamang' })
        }
    }

    static async updateSaldoMamang(req, res, next) {
        try {
            if (!req.body.saldo) {
                throw ({
                    code: 400,
                    message: 'newest saldo required'
                })
            }
            const { id } = req.params
            const { saldo } = req.body
            await Mamang.updateSaldoMamang(id, saldo)
            const mamang = await Mamang.findOneMamang(id)
            res.status(200).json(mamang)
        } catch (error) {
            if (error.code === 400) {
                res.status(400).json({ message: error.message })
            } else {
                res.status(500).json({ message: 'something error in update saldo mamang' })
            }
        }
    }

    static async updateAddressMamang(req, res, next) {
        console.log(req.body);
        try {
            if (!req.body.address) {
                throw ({
                    code: 400,
                    message: 'newest coordinates required'
                })
            }
            const { id } = req.params
            const { address } = req.body
            console.log(id, address);
            await Mamang.updateAddressMamang(id, address)
            const mamang = await Mamang.findOneMamang(id)
            res.status(200).json(mamang)
        } catch (error) {
            console.log(error);
            if (error.code === 400) {
                res.status(400).json({ message: error.message })
            } else {
                res.status(500).json({ message: 'something error in update address mamang' })
            }
        }
    }

    static async findNearestMamang(req, res, next) {
        try {
            if (!req.body.location) {
                throw ({
                    nullLocation: true,
                })
            }
            const { location } = req.body
            let { mamangs, distances } = await Mamang.findNearestMamang(location)
            // delete mamang.password
            distances = distances.map(e => e.distance)
            // distances = distances.map(e=> e.distance )
            for (let i = 0; i < distances.length; i++) {
                distances[i] = distances[i] * 1600
            }
            res.status(200).json({ mamangs, distances })
        } catch (error) {
            console.log(error);
            if (error.nullLocation) {
                res.status(400).json({ message: 'Invalid location' })
            }else{
                res.status(500).json({ message: 'something error in find nearest mamang' })
            }
        }
    }

}

module.exports = { MamangController }