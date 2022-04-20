const request = require('supertest')
const { app } = require('../app')
const { connectMongoDb, getDataBase, client } = require('../config/mongoDb')
const { Client } = require('../models/client')
// const { MongoClient } = require('mongodb');
// const url = process.env.MONGOURL;
// const client = new MongoClient(url);
// const db = getDataBase()

require('dotenv').config()

beforeAll(async () => { 
    // console.log(Client,'<<<<<<<');
    await connectMongoDb()
})

afterAll(async () => {
    // await db
    // .collection('clients')
    // .deleteOne({email:'testing99@mail.com'})
    // process.exit()
    // client.close()    
})



describe(`GET /clients --success`, () => {
    it('should return 200 ', async () => {
        // await connectMongoDb()
        const res = await request(app).get('/clients')
        expect(res.status).toBe(200)
        expect(res.body[0]).toHaveProperty('_id', expect.any(String))
        expect(res.body[0]).toHaveProperty('name', expect.any(String))
        expect(res.body[0]).toHaveProperty('email', expect.any(String))
        expect(res.body[0]).toHaveProperty('phoneNumber', expect.any(String))
    })
})

describe(`GET /clients/:id--success`, () => {
    it('should return 200 ', async () => {
        // await connectMongoDb()
        //625584887e8eeed032147b55
        const res = await request(app).get('/clients/625cc4700822f03e43c7680b')
        expect(res.status).toBe(200)
        expect(res.body).toHaveProperty('_id', '625cc4700822f03e43c7680b')
        expect(res.body).toHaveProperty('email', expect.any(String))
        expect(res.body).toHaveProperty('name', expect.any(String))
        expect(res.body).toHaveProperty('phoneNumber', expect.any(String))
    })
})

// const body = { email: "test1@mail.com", password: "12345" }
// const res = await request(app).post('/clients/login').send(body)

describe(`GET /clients/login --success`, () => {
    it('should return 200 ', async () => {
        // await connectMongoDb()
        const body = { email: "testing99@mail.com", password: "12345" }
        const res = await request(app).post('/clients/login').send(body)
        expect(res.status).toBe(200)
        expect(res.body).toHaveProperty('name', expect.any(String))
        expect(res.body).toHaveProperty('_id', expect.any(String))
        expect(res.body).toHaveProperty('email', "testing99@mail.com")
        expect(res.body).toHaveProperty('phoneNumber', expect.any(String))
    })
})

describe(`GET /clients/login --failed invalid password`, () => {
    it('should return 400 ', async () => {
        // await connectMongoDb()
        const body = { email: "test1@mail.com", password: "1234" }
        const res = await request(app).post('/clients/login').send(body)
        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty('message', "invalid email or password")
    })
})

describe(`GET /clients/login --failed invalid email`, () => {
    it('should return 400 ', async () => {
        // await connectMongoDb()
        const body = { email: "test1@mail11.com", password: "12345" }
        const res = await request(app).post('/clients/login').send(body)
        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty('message', "invalid email or password")
    })
})
//empty email and passord
describe(`GET /clients/login --failed empty password`, () => {
    it('should return 400 ', async () => {
        // await connectMongoDb()
        const body = { email: "test1@mail.com", password: "" }
        const res = await request(app).post('/clients/login').send(body)
        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty('message', "email or password are required")
    })
})

describe(`GET /clients/login --failed empty email`, () => {
    it('should return 400 ', async () => {
        // await connectMongoDb()
        const body = { email: "", password: "12345" }
        const res = await request(app).post('/clients/login').send(body)
        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty('message', "email or password are required")
    })
})

describe(`GET /clients/register --success`, () => {
    it('should return 400 ', async () => {
        // await connectMongoDb()
        const body = { email: 'testing99@mail.com', password: "12345", phoneNumber: '01883822', name: 'testing' }
        const res = await request(app).post('/clients/register').send(body)
        expect(res.status).toBe(201)
        expect(res.body).toHaveProperty('_id', expect.any(String))
        expect(res.body).toHaveProperty('name', 'testing')
        expect(res.body).toHaveProperty('email', 'testing99@mail.com')
        expect(res.body).toHaveProperty('phoneNumber', expect.any(String))
    })
})

describe(`GET /clients/register --failed email empty`, () => {
    it('should return 200 ', async () => {
        // await connectMongoDb()
        const body = { email: '', password: "12345", phoneNumber: '01883822', name: 'testing' }
        const res = await request(app).post('/clients/register').send(body)
        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty('message', 'please fill all the form registration')
    })
})

describe(`GET /clients/register --failed password empty`, () => {
    it('should return 200 ', async () => {
        // await connectMongoDb()
        const body = { email: 'testing99@mail.com', password: "", phoneNumber: '01883822', name: 'testing' }
        const res = await request(app).post('/clients/register').send(body)
        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty('message', 'please fill all the form registration')
    })
})

describe(`GET /clients/register --failed phoneNumber empty`, () => {
    it('should return 200 ', async () => {
        // await connectMongoDb()
        const body = { email: 'testing99@mail.com', password: "12345", phoneNumber: '', name: 'testing' }
        const res = await request(app).post('/clients/register').send(body)
        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty('message', 'please fill all the form registration')
    })
})

describe(`GET /clients/register --failed name empty`, () => {
    it('should return 200 ', async () => {
        // await connectMongoDb()
        const body = { email: 'testing99@mail.com', password: "12345", phoneNumber: '01883822', name: '' }
        const res = await request(app).post('/clients/register').send(body)
        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty('message', 'please fill all the form registration')
    })
})

// client.close()
describe(`GET /clients --failed without connecting to mongoDB`, () => {
    it('should return 500 ', async () => {
        await client.close()
        const res = await request(app).get('/clients')
        expect(res.status).toBe(500)
        expect(res.body).toHaveProperty('message', 'something error in find all client')
    })
})

describe(`GET /clients/:id --failed without connecting to mongoDB`, () => {
    it('should return 500 ', async () => {
        const res = await request(app).get('/clients/625584887e8eeed032147b55')
        expect(res.status).toBe(500)
        expect(res.body).toHaveProperty('message', 'something error in find one client')
    })
})

describe(`POST /clients/login --failed without connecting to mongoDB`, () => {
    it('should return 500 ', async () => {
        const body = { email: "test1@mail.com", password: "12345" }
        const res = await request(app).post('/clients/login').send(body)
        expect(res.status).toBe(500)
        expect(res.body).toHaveProperty('message', 'something error in login client')
    })
})

describe(`POST /clients/register --failed without connecting to mongoDB`, () => {
    it('should return 500 ', async () => {
        const body = { email: 'testing99@mail.com', password: "12345", phoneNumber: '01883822', name: 'testing' }
        const res = await request(app).post('/clients/register').send(body)
        expect(res.status).toBe(500)
        expect(res.body).toHaveProperty('message', 'something error in register client')
    })
})

