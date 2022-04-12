const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { Mamang } = require('../models/mamang')

class MamangController {
    static async findAllMamang(req, res, next) {
        try {
            const mamangs = await Mamang.findAllMamang()
            res.status(200).json(mamangs)
        } catch (error) {
            res.status(500).json({message:'something error in find all mamang'})
        }
    }

    static async findOneMamang(req, res, next) {
        try {
            const { id } = req.params
            const mamang = await Mamang.findOneMamang(id)
            delete mamang.password
            res.status(200).json(mamang)
        } catch (error) {
            res.status(500).json({message:'something error in find one mamang'})
        }
    }

    static async registerMamang(req, res, next) {
        try {
            if(!req.body.email || !req.body.password || !req.body.name || !req.body.phoneNumber){
                throw({
                    code:400,
                    message:'please fill all the form registration'    
                })
            }
            if(!req.body.gender || !req.body.address || !req.body.image || !req.body.rekNumber){
                throw({
                    code:400,
                    message:'please fill all the form registration'    
                })
            }
            let data = req.body
            data.saldo = 0
            data.password = bcrypt.hashSync(data.password,10)
            let mamang = await Mamang.registerMamang(data)
            mamang = await Mamang.findOneMamang(mamang.insertedId)
            res.status(201).json(mamang)
        } catch (error) {
            if(error.code === 400){
                res.status(400).json({message:error.message})
            }else{
                res.status(500).json({message:'something error in register mamang'})
            }
        }
    }

    static async loginMamang(req, res, next) {
        try {
            if(!req.body.email || !req.body.password){
                throw({
                    code:400,
                    message:'email or password are required'    
                })
            }
            const data = req.body
            const mamang = await Mamang.loginMamang(data)
            if(!mamang){
                throw({
                    code:400,
                    message:'invalid email or password'    
                })
            }
            if(!bcrypt.compareSync(data.password,mamang.password)){
                throw({
                    code:400,
                    message:'invalid email or password'    
                })
            }
            delete mamang.password
            res.status(200).json(mamang)
        } catch (error) {
            if(error.code === 400){
                res.status(400).json({message:error.message})
            }else{
                res.status(500).json({message:'something error in login mamang'})
            }
        }
    }
    
    static async deleteOneMamang(req, res, next) {
        try {
            const { id } = req.params
            await Mamang.deleteOneMamang(id)
            res.status(200).json({message:'success deleting mamang'})
        } catch (error) {
            res.status(500).json({message:'something error in login mamang'})
        }
    }

    static async updateSaldoMamang(req, res, next) {
        try {
            const { id } = req.params
            const {saldo} = req.body
            await Mamang.updateSaldoMamang(id,saldo)
            const mamang = await Mamang.findOneMamang(id)
            res.status(200).json(mamang)
        } catch (error) {
            res.status(500).json({message:'something error in update saldon mamang'})
        }
    }

}

module.exports = {MamangController}