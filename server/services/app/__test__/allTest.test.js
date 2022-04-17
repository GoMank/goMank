const request = require('supertest')
const { app } = require('../app')
const { Log, Order } = require('../models/index.js')

beforeAll(async () => {
    // let customer = await Customer.create({username:'username',email:'email@mail.com',password:'password'})
    // const payLoad = {id:customer.id,role:'customer'}
    // customer={id:customer.id,username:customer.username,email:customer.email}
    // token = makeToken(payLoad)
})

afterAll(async () => {
    // await Customer.destroy({truncate:true,cascade:true,restartIdentity:true})
    // await Favorite.destroy({truncate:true,cascade:true,restartIdentity:true})
})

describe(`GET /logs`, () => {
    describe(`GET /logs -- success test`, () => {
        it('should return 200 ', async () => {
            const res = await request(app).get('/logs')
            expect(res.status).toBe(200)
            expect(res.body[0]).toHaveProperty('id', expect.any(Number))
            expect(res.body[0]).toHaveProperty('orderId', expect.any(Number))
            expect(res.body[0]).toHaveProperty('description', expect.any(String))
            expect(res.body[0]).toHaveProperty('type', expect.any(String))
            expect(res.body[0]).toHaveProperty('createdAt', expect.any(String))
            expect(res.body[0]).toHaveProperty('updatedAt', expect.any(String))
        })
    })
})


describe(`GET /orders`, () => {
    describe(`GET /orders -- success test`, () => {
        it('should return 200 ', async () => {
            const res = await request(app).get('/orders')
            expect(res.status).toBe(200)
            expect(res.body[0]).toHaveProperty('id', expect.any(Number))
            expect(res.body[0]).toHaveProperty('invoiceNumber', expect.any(String))
            expect(res.body[0]).toHaveProperty('price', expect.any(Number))
            expect(res.body[0]).toHaveProperty('orderStatus', expect.any(String))
            expect(res.body[0]).toHaveProperty('paymentMethod', expect.any(String))
            expect(res.body[0]).toHaveProperty('paymentStatus', expect.any(String))
            expect(res.body[0]).toHaveProperty('clientId', expect.any(Number))
            expect(res.body[0]).toHaveProperty('clientName', expect.any(String))
            expect(res.body[0]).toHaveProperty('mamangId', expect.any(Number))
            expect(res.body[0]).toHaveProperty('mamangName', expect.any(String))
            expect(res.body[0]).toHaveProperty('address', expect.any(String))
            expect(res.body[0]).toHaveProperty('createdAt', expect.any(String))
            expect(res.body[0]).toHaveProperty('updatedAt', expect.any(String))
            expect(res.body[0]).toHaveProperty('Logs', expect.any(Array))
            expect(res.body[0].Logs[0]).toHaveProperty('id', expect.any(Number))
            expect(res.body[0].Logs[0]).toHaveProperty('orderId', expect.any(Number))
            expect(res.body[0].Logs[0]).toHaveProperty('description', expect.any(String))
            expect(res.body[0].Logs[0]).toHaveProperty('type', expect.any(String))
            expect(res.body[0].Logs[0]).toHaveProperty('createdAt', expect.any(String))
            expect(res.body[0].Logs[0]).toHaveProperty('updatedAt', expect.any(String))
        })
    })
})

describe(`GET /orders/1`, () => {
    describe(`GET /orders/1 -- success test`, () => {
        it('should return 200 ', async () => {
            const res = await request(app).get('/orders/1')
            expect(res.status).toBe(200)
            expect(res.body).toHaveProperty('id', expect.any(Number))
            expect(res.body).toHaveProperty('invoiceNumber', expect.any(String))
            expect(res.body).toHaveProperty('price', expect.any(Number))
            expect(res.body).toHaveProperty('orderStatus', expect.any(String))
            expect(res.body).toHaveProperty('paymentMethod', expect.any(String))
            expect(res.body).toHaveProperty('paymentStatus', expect.any(String))
            expect(res.body).toHaveProperty('clientId', expect.any(Number))
            expect(res.body).toHaveProperty('clientName', expect.any(String))
            expect(res.body).toHaveProperty('mamangId', expect.any(Number))
            expect(res.body).toHaveProperty('mamangName', expect.any(String))
            expect(res.body).toHaveProperty('address', expect.any(String))
            expect(res.body).toHaveProperty('createdAt', expect.any(String))
            expect(res.body).toHaveProperty('updatedAt', expect.any(String))
        })
    })

    describe(`GET /orders/1 -- failed test order not found`, () => {
        it('should return 404 ', async () => {
            const res = await request(app).get('/orders/1000')
            expect(res.status).toBe(404)
            expect(res.body).toHaveProperty('message', "no order found")
        })
    })
})
//clientId, clientName, mamangId, mamangName, address, paymentMethod
describe(`POST/orders`, () => {
    describe(`POST/orders --success test`, () => {
        it('should return 201 ', async () => {
            const res = await request(app).post('/orders').send({
                clientId:1,
                clientName:'testClient',
                mamangId:1,
                mamangName:'testMamang',
                address:'Latitude -6.914744 Longitude 107.107.609811',
                paymentMethod:'Cash'
            })
            expect(res.status).toBe(201)
        })
    })

    //failed payment method null , empty , 'not cash or cashless'
    describe(`POST/orders --failed test not cash or cashless`, () => {
        it('should return 400 ', async () => {
            const res = await request(app).post('/orders').send({
                clientId: 1,
                clientName: 'testClient',
                mamangId: 1,
                mamangName: 'testMamang',
                address: 'Latitude -6.914744 Longitude 107.107.609811',
                paymentMethod: 'not cash or cashless'
            })
            expect(res.status).toBe(400)
            expect(res.body).toHaveProperty('message', 'Payment method must be either Cash or Cashless')
        })
    })

    describe(`POST/orders --failed test payment method null`, () => {
        it('should return 400 ', async () => {
            const res = await request(app).post('/orders').send({
                clientId: 1,
                clientName: 'testClient',
                mamangId: 1,
                mamangName: 'testMamang',
                address: 'Latitude -6.914744 Longitude 107.107.609811',
                // paymentMethod:'not cash or cashless'
            })
            expect(res.status).toBe(400)
            expect(res.body).toHaveProperty('message', 'Payment Method cannot be empty')
        })
    })
    //failed clientId null
    describe(`POST/orders --failed test clientId null`, () => {
        it('should return 400 ', async () => {
            const res = await request(app).post('/orders').send({
                // clientId:1,
                clientName: 'testClient',
                mamangId: 1,
                mamangName: 'testMamang',
                address: 'Latitude -6.914744 Longitude 107.107.609811',
                paymentMethod: 'Cash'
            })
            expect(res.status).toBe(400)
            expect(res.body).toHaveProperty('message', 'Client ID cannot be empty')
        })
    })
    //failed clientName null
    describe(`POST/orders --failed test clientName null`, () => {
        it('should return 400 ', async () => {
            const res = await request(app).post('/orders').send({
                clientId: 1,
                // clientName:'testClient',
                mamangId: 1,
                mamangName: 'testMamang',
                address: 'Latitude -6.914744 Longitude 107.107.609811',
                paymentMethod: 'Cash'
            })
            expect(res.status).toBe(400)
            expect(res.body).toHaveProperty('message', 'Client Name cannot be empty')
        })
    })
    //failed mamangId null
    describe(`POST/orders --failed test mamangId null`, () => {
        it('should return 400 ', async () => {
            const res = await request(app).post('/orders').send({
                clientId: 1,
                clientName: 'testClient',
                // mamangId:1,
                mamangName: 'testMamang',
                address: 'Latitude -6.914744 Longitude 107.107.609811',
                paymentMethod: 'Cash'
            })
            expect(res.status).toBe(400)
            expect(res.body).toHaveProperty('message', 'Mamang ID cannot be empty')
        })
    })
    //failed mamangName null
    describe(`POST/orders --failed test mamangName null`, () => {
        it('should return 400 ', async () => {
            const res = await request(app).post('/orders').send({
                clientId: 1,
                clientName: 'testClient',
                mamangId: 1,
                // mamangName:'testMamang',
                address: 'Latitude -6.914744 Longitude 107.107.609811',
                paymentMethod: 'Cash'
            })
            expect(res.status).toBe(400)
            expect(res.body).toHaveProperty('message', 'Mamang Name cannot be empty')
        })
    })
    //failed address null
    describe(`POST/orders --failed test address null`, () => {
        it('should return 400 ', async () => {
            const res = await request(app).post('/orders').send({
                clientId: 1,
                clientName: 'testClient',
                mamangId: 1,
                mamangName: 'testMamang',
                // address:'Latitude -6.914744 Longitude 107.107.609811',
                paymentMethod: 'Cash'
            })
            expect(res.status).toBe(400)
            expect(res.body).toHaveProperty('message', 'Address cannot be empty')
        })
    })
})

describe(`DELETE/orders`, () => {
    //timeout ? kenapa yah
    describe(`DELETE/orders --success test`, () => {
        it('should return 200 ', async () => {
            const res = await request(app).delete('/orders/delete/2')
            expect(res.status).toBe(200)
            expect(res.body).toHaveProperty('message','Order status has been deleted')
        })
    })

    describe(`DELETE/orders --failed test not found`, () => {
        it('should return 200 ', async () => {
            const res = await request(app).delete('/orders/delete/200')
            expect(res.status).toBe(404)
            expect(res.body).toHaveProperty('message', 'no order found')
        })
    })
})

describe(`Update/orders/edit/done/1`, () => {
    describe(`Update/orders/edit/done/1 - success`, () => {
        it('should return 200 ', async () => {
            const res = await request(app).patch('/orders/edit/done/1')
            expect(res.status).toBe(200)
            expect(res.body).toHaveProperty('message', 'Order status has been updated to Done')
        })
    })
    describe(`Update/orders/edit/done/100 - failed not found`, () => {
        it('should return 400 ', async () => {
            const res = await request(app).patch('/orders/edit/done/100')
            expect(res.status).toBe(404)
            expect(res.body).toHaveProperty('message', 'no order found')
        })
    })
})

describe(`Update/orders/edit/cancel/1`, () => {
    describe(`Update/orders/edit/cancel/1 - success`, () => {
        it('should return 200 ', async () => {
            const res = await request(app).patch('/orders/edit/cancel/1')
            expect(res.status).toBe(200)
            expect(res.body).toHaveProperty('message', 'Order status has been updated to Cancel and deleted')
        })
    })
    describe(`Update/orders/edit/cancel/100 - failed not found`, () => {
        it('should return 400 ', async () => {
            const res = await request(app).patch('/orders/edit/cancel/100')
            expect(res.status).toBe(404)
            expect(res.body).toHaveProperty('message', 'no order found')
        })
    })
})

