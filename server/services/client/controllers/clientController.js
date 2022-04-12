const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { Client } = require('../models/client')

class ClientController {
    static async findAllClient(req, res, next) {
        try {
            const clients = await Client.findAllClient()
            res.status(200).json(clients)
        } catch (error) {
            res.status(500).json({message:'something error in find all client'})
        }
    }

    static async findOneClient(req, res, next) {
        try {
            const { id } = req.params
            const client = await Client.findOneClient(id)
            delete client.password
            res.status(200).json(client)
        } catch (error) {
            res.status(500).json({message:'something error in find one client'})
        }
    }

    static async registerClient(req, res, next) {
        try {
            if(!req.body.email || !req.body.password || !req.body.name || !req.body.phoneNumber){
                throw({
                    code:400,
                    message:'please fill all the form registration'    
                })
            }
            const data = req.body
            data.password = bcrypt.hashSync(data.password,10)
            let client = await Client.registerClient(data)
            client = await Client.findOneClient(client.insertedId)
            res.status(200).json(client)
        } catch (error) {
            console.log(error);
            if(error.code === 400){
                res.status(400).json({message:error.message})
            }else{
                res.status(500).json({message:'something error in register client'})
            }
        }
    }

    static async loginClient(req, res, next) {
        try {
            if(!req.body.email || !req.body.password){
                throw({
                    code:400,
                    message:'email or password are required'    
                })
            }
            const data = req.body
            const client = await Client.loginClient(data)
            if(!client){
                throw({
                    code:400,
                    message:'invalid email or password'    
                })
            }
            if(!bcrypt.compareSync(data.password,client.password)){
                throw({
                    code:400,
                    message:'invalid email or password'    
                })
            }

        } catch (error) {
            if(error.code === 400){
                res.status(400).json({message:error.message})
            }else{
                res.status(500).json({message:'something error in register client'})
            }
        }
    }    
}

module.exports = {ClientController}