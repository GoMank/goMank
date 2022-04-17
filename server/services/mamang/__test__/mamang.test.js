const request = require('supertest')
const { app } = require('../app')
const { connectMongoDb, getDataBase } = require('../config/mongoDb')
const { MongoClient } = require('mongodb');
const { Mamang } = require('../models/mamang');
const url = process.env.MONGOURL;
const client = new MongoClient(url);
const db = getDataBase()
require('dotenv').config()

beforeAll(async () => { })

afterAll(async () => {
    // await db
    // .collection('clients')
    // .deleteOne({email:'testing99@mail.com'})
})
describe(`GET /mamangs --failed without connecting to mongoDB`, () => {
    it('should return 500 ', async () => {
        const res = await request(app).get('/mamangs')
        expect(res.status).toBe(500)
        expect(res.body).toHaveProperty('message', 'something error in find all mamang')
    })
})

describe(`GET /mamangs/nearest --failed without connecting to mongoDB`, () => {
    it('should return 500 ', async () => {
        const res = await request(app).get('/mamangs/nearest').send({ location: '[106.864,-6.254]' })
        expect(res.status).toBe(500)
        expect(res.body).toHaveProperty('message', 'something error in find nearest mamang')
    })
})

describe(`GET /mamangs/:id --failed without connecting to mongoDB`, () => {
    it('should return 500 ', async () => {
        const res = await request(app).get('/mamangs/62559dcfc9054d53a273fb14')
        expect(res.status).toBe(500)
        expect(res.body).toHaveProperty('message', 'something error in find one mamang')
    })
})

describe(`POST /mamangs/login --failed without connecting to mongoDB`, () => {
    it('should return 500 ', async () => {
        const body = { email: "mamang123@mail.com", password: "12345" }
        const res = await request(app).post('/mamangs/login').send(body)
        expect(res.status).toBe(500)
        expect(res.body).toHaveProperty('message', 'something error in login mamang')
    })
})

describe(`POST /mamangs/register --failed without connecting to mongoDB`, () => {
    it('should return 500 ', async () => {
        const body = {
            email: 'testMamang@mail.com',
            password: "12345",
            phoneNumber: '0822123456',
            name: 'testingMamang',
            gender: 'male',
            address: "[107.01118835699735,-6.269429087104287]",
            image: "https://i1.sndcdn.com/avatars-000009789474-uztegm-t500x500.jpg",
            rekNumber: "82292838"
        }
        const res = await request(app).post('/mamangs/register').send(body)
        expect(res.status).toBe(500)
        expect(res.body).toHaveProperty('message', 'something error in register mamang')
    })
})

describe(`DELETE /mamangs/:id --failed without connecting to mongoDB`, () => {
    it('should return 500 ', async () => {
        const res = await request(app).delete('/mamangs/62559dcfc9054d53a273fb14')
        expect(res.status).toBe(500)
        expect(res.body).toHaveProperty('message', 'something error in delete one mamang')
    })
})

describe(`PATCH /mamangs/:id --failed without connecting to mongoDB`, () => {
    it('should return 500 ', async () => {
        const res = await request(app).patch('/mamangs/62559dcfc9054d53a273fb14').send({ saldo: 5000 })
        expect(res.status).toBe(500)
        expect(res.body).toHaveProperty('message', 'something error in update saldo mamang')
    })
})

describe(`PATCH /mamangs/address/:id --failed without connecting to mongoDB`, () => {
    it('should return 500 ', async () => {
        const res = await request(app).patch('/mamangs/address/62559dcfc9054d53a273fb14')
            .send({ address: "[107.01118835699735,-6.269429087104287]" })
        expect(res.status).toBe(500)
        expect(res.body).toHaveProperty('message', 'something error in update address mamang')
    })
})


describe(`GET /mamangs --success`, () => {
    it('should return 200 ', async () => {
        await connectMongoDb()
        const res = await request(app).get('/mamangs')
        expect(res.status).toBe(200)
        expect(res.body[0]).toHaveProperty('_id', expect.any(String))
        expect(res.body[0]).toHaveProperty('name', expect.any(String))
        expect(res.body[0]).toHaveProperty('email', expect.any(String))
        expect(res.body[0]).toHaveProperty('phoneNumber', expect.any(String))
        expect(res.body[0]).toHaveProperty('gender', expect.any(String))
        expect(res.body[0]).toHaveProperty('address', expect.any(Object))
        expect(res.body[0].address).toHaveProperty('type', 'Point')
        expect(res.body[0].address).toHaveProperty('coordinates', expect.any(Array))
        expect(res.body[0]).toHaveProperty('image', expect.any(String))
        expect(res.body[0]).toHaveProperty('rekNumber', expect.any(String))
        expect(res.body[0]).toHaveProperty('saldo')
    })
})

describe(`GET /mamangs/:id--success`, () => {
    it('should return 200 ', async () => {
        await connectMongoDb()
        const res = await request(app).get('/mamangs/62559dcfc9054d53a273fb14')
        expect(res.status).toBe(200)
        expect(res.body).toHaveProperty('_id', '62559dcfc9054d53a273fb14')
        expect(res.body).toHaveProperty('email', expect.any(String))
        expect(res.body).toHaveProperty('name', expect.any(String))
        expect(res.body).toHaveProperty('phoneNumber', expect.any(String))
        expect(res.body).toHaveProperty('gender', expect.any(String))
        expect(res.body).toHaveProperty('address', expect.any(Object))
        expect(res.body.address).toHaveProperty('type', 'Point')
        expect(res.body.address).toHaveProperty('coordinates', expect.any(Array))
        expect(res.body).toHaveProperty('image', expect.any(String))
        expect(res.body).toHaveProperty('rekNumber', expect.any(String))
        expect(res.body).toHaveProperty('saldo')
    })
})

describe(`GET /mamangs/nearest --success`, () => {
    it('should return 200 ', async () => {
        await connectMongoDb()
        const res = await request(app).get('/mamangs/nearest').send({ location: "[106.864,-6.254]" })
        expect(res.status).toBe(200)
        expect(res.body.mamangs[0]).toHaveProperty('_id', expect.any(String))
        expect(res.body.mamangs[0]).toHaveProperty('name', expect.any(String))
        expect(res.body.mamangs[0]).toHaveProperty('email', expect.any(String))
        expect(res.body.mamangs[0]).toHaveProperty('phoneNumber', expect.any(String))
        expect(res.body.mamangs[0]).toHaveProperty('gender', expect.any(String))
        expect(res.body.mamangs[0]).toHaveProperty('address', expect.any(Object))
        expect(res.body.mamangs[0].address).toHaveProperty('type', 'Point')
        expect(res.body.mamangs[0].address).toHaveProperty('coordinates', expect.any(Array))
        expect(res.body.mamangs[0]).toHaveProperty('image', expect.any(String))
        expect(res.body.mamangs[0]).toHaveProperty('rekNumber', expect.any(String))
        expect(res.body.mamangs[0]).toHaveProperty('saldo')
    })
})

describe(`GET /mamangs/nearest --failed empty location`, () => {
    it('should return 400 ', async () => {
        await connectMongoDb()
        const res = await request(app).get('/mamangs/nearest').send({ location: "" })
        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty('message', "Invalid location")
    })
})


describe(`GET /mamangs/login --success`, () => {
    it('should return 200 ', async () => {
        await connectMongoDb()
        const body = { email: "mamang123@mail.com", password: "12345" }
        const res = await request(app).post('/mamangs/login').send(body)
        expect(res.status).toBe(200)
        expect(res.body).toHaveProperty('_id', expect.any(String))
        expect(res.body).toHaveProperty('email', "mamang123@mail.com")
        expect(res.body).toHaveProperty('name', expect.any(String))
        expect(res.body).toHaveProperty('phoneNumber', expect.any(String))
        expect(res.body).toHaveProperty('gender', expect.any(String))
        expect(res.body).toHaveProperty('address', expect.any(Object))
        expect(res.body.address).toHaveProperty('type', 'Point')
        expect(res.body.address).toHaveProperty('coordinates', expect.any(Array))
        expect(res.body).toHaveProperty('image', expect.any(String))
        expect(res.body).toHaveProperty('rekNumber', expect.any(String))
        expect(res.body).toHaveProperty('saldo')
    })
})

describe(`GET /mamangs/login --failed invalid password`, () => {
    it('should return 400 ', async () => {
        await connectMongoDb()
        const body = { email: "mamang123@mail.com", password: "1234" }
        const res = await request(app).post('/mamangs/login').send(body)
        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty('message', "invalid email or password")
    })
})

describe(`GET /mamangs/login --failed invalid email`, () => {
    it('should return 400 ', async () => {
        await connectMongoDb()
        const body = { email: "mamang122223@mail.com", password: "12345" }
        const res = await request(app).post('/mamangs/login').send(body)
        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty('message', "invalid email or password")
    })
})
//empty email and passord
describe(`GET /mamangs/login --failed empty password`, () => {
    it('should return 400 ', async () => {
        await connectMongoDb()
        const body = { email: "mamang122223@mail.com", password: "" }
        const res = await request(app).post('/mamangs/login').send(body)
        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty('message', "email or password are required")
    })
})

describe(`GET /mamangs/login --failed empty email`, () => {
    it('should return 400 ', async () => {
        await connectMongoDb()
        const body = { email: "", password: "12345" }
        const res = await request(app).post('/mamangs/login').send(body)
        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty('message', "email or password are required")
    })
})

describe(`GET /mamangs/register --success`, () => {
    it('should return 201 ', async () => {
        await connectMongoDb()
        const body = {
            email: 'testMamang@mail.com',
            password: "12345",
            phoneNumber: '0822123456',
            name: 'testingMamang',
            gender: 'male',
            address: "[107.01118835699735,-6.269429087104287]",
            image: "https://i1.sndcdn.com/avatars-000009789474-uztegm-t500x500.jpg",
            rekNumber: "82292838"
        }
        const res = await request(app).post('/mamangs/register').send(body)
        expect(res.status).toBe(201)
        expect(res.body).toHaveProperty('_id', expect.any(String))
        expect(res.body).toHaveProperty('email', 'testMamang@mail.com')
        expect(res.body).toHaveProperty('name', 'testingMamang')
        expect(res.body).toHaveProperty('phoneNumber', '0822123456')
        expect(res.body).toHaveProperty('gender', 'male')
        expect(res.body).toHaveProperty('address', expect.any(Object))
        expect(res.body.address).toHaveProperty('type', 'Point')
        expect(res.body.address).toHaveProperty('coordinates', [107.01118835699735,-6.269429087104287])
        expect(res.body).toHaveProperty('image', "https://i1.sndcdn.com/avatars-000009789474-uztegm-t500x500.jpg")
        expect(res.body).toHaveProperty('rekNumber', "82292838")
        expect(res.body).toHaveProperty('saldo',0)
    })
})

describe(`GET /mamangs/register --failed email empty`, () => {
    it('should return 400 ', async () => {
        await connectMongoDb()
        const body = {
            email: '',
            password: "12345",
            phoneNumber: '0822123456',
            name: 'testingMamang',
            gender: 'male',
            address: "[107.01118835699735,-6.269429087104287]",
            image: "https://i1.sndcdn.com/avatars-000009789474-uztegm-t500x500.jpg",
            rekNumber: "82292838"
        }
        const res = await request(app).post('/mamangs/register').send(body)
        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty('message', 'please fill all the form registration')
    })
})

describe(`GET /mamangs/register --failed password empty`, () => {
    it('should return 400 ', async () => {
        await connectMongoDb()
        const body = {
            email: 'testMamang@mail.com',
            password: "",
            phoneNumber: '0822123456',
            name: 'testingMamang',
            gender: 'male',
            address: "[107.01118835699735,-6.269429087104287]",
            image: "https://i1.sndcdn.com/avatars-000009789474-uztegm-t500x500.jpg",
            rekNumber: "82292838"
        }
        const res = await request(app).post('/mamangs/register').send(body)
        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty('message', 'please fill all the form registration')
    })
})

describe(`GET /mamangs/register --failed phoneNumber empty`, () => {
    it('should return 400 ', async () => {
        await connectMongoDb()
        const body = {
            email: 'testMamang@mail.com',
            password: "12345",
            phoneNumber: '',
            name: 'testingMamang',
            gender: 'male',
            address: "[107.01118835699735,-6.269429087104287]",
            image: "https://i1.sndcdn.com/avatars-000009789474-uztegm-t500x500.jpg",
            rekNumber: "82292838"
        }
        const res = await request(app).post('/mamangs/register').send(body)
        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty('message', 'please fill all the form registration')
    })
})

describe(`GET /mamangs/register --failed name empty`, () => {
    it('should return 400 ', async () => {
        await connectMongoDb()
        const body = {
            email: 'testMamang@mail.com',
            password: "12345",
            phoneNumber: '0822123456',
            name: '',
            gender: 'male',
            address: "[107.01118835699735,-6.269429087104287]",
            image: "https://i1.sndcdn.com/avatars-000009789474-uztegm-t500x500.jpg",
            rekNumber: "82292838"
        }
        const res = await request(app).post('/mamangs/register').send(body)
        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty('message', 'please fill all the form registration')
    })
})

describe(`GET /mamangs/register --failed gender empty`, () => {
    it('should return 400 ', async () => {
        await connectMongoDb()
        const body = {
            email: 'testMamang@mail.com',
            password: "12345",
            phoneNumber: '0822123456',
            name: 'testingMamang',
            gender: '',
            address: "[107.01118835699735,-6.269429087104287]",
            image: "https://i1.sndcdn.com/avatars-000009789474-uztegm-t500x500.jpg",
            rekNumber: "82292838"
        }
        const res = await request(app).post('/mamangs/register').send(body)
        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty('message', 'please fill all the form registration')
    })
})

describe(`GET /mamangs/register --failed address empty`, () => {
    it('should return 400 ', async () => {
        await connectMongoDb()
        const body = {
            email: 'testMamang@mail.com',
            password: "12345",
            phoneNumber: '0822123456',
            name: 'testingMamang',
            gender: 'male',
            address: "",
            image: "https://i1.sndcdn.com/avatars-000009789474-uztegm-t500x500.jpg",
            rekNumber: "82292838"
        }
        const res = await request(app).post('/mamangs/register').send(body)
        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty('message', 'please fill all the form registration')
    })
})

describe(`GET /mamangs/register --failed image empty`, () => {
    it('should return 400 ', async () => {
        await connectMongoDb()
        const body = {
            email: 'testMamang@mail.com',
            password: "12345",
            phoneNumber: '0822123456',
            name: 'testingMamang',
            gender: 'male',
            address: "[107.01118835699735,-6.269429087104287]",
            image: "",
            rekNumber: "82292838"
        }
        const res = await request(app).post('/mamangs/register').send(body)
        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty('message', 'please fill all the form registration')
    })
})

describe(`GET /mamangs/register --failed rekNumber empty`, () => {
    it('should return 400 ', async () => {
        await connectMongoDb()
        const body = {
            email: 'testMamang@mail.com',
            password: "12345",
            phoneNumber: '0822123456',
            name: 'testingMamang',
            gender: 'male',
            address: "[107.01118835699735,-6.269429087104287]",
            image: "https://i1.sndcdn.com/avatars-000009789474-uztegm-t500x500.jpg",
            rekNumber: ""
        }
        const res = await request(app).post('/mamangs/register').send(body)
        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty('message', 'please fill all the form registration')
    })
})

describe(`DELETE /mamangs/:id --success`, () => {
    it('should return 200 ', async () => {
        const res = await request(app).delete('/mamangs/625b9a51f58c2b1e38ee21f4')
        expect(res.status).toBe(200)
        expect(res.body).toHaveProperty('message', 'success deleting mamang')
    })
})

describe(`PATCH /mamangs/address/:id --success`, () => {
    it('should return 200 ', async () => {
        const res = await request(app).patch('/mamangs/address/62559dcfc9054d53a273fb14')
            .send({ address: "[107.01118835699735,-6.269429087104287]" })
        expect(res.status).toBe(200)
        expect(res.body).toHaveProperty('_id', expect.any(String))
        expect(res.body).toHaveProperty('email', expect.any(String))
        expect(res.body).toHaveProperty('name', expect.any(String))
        expect(res.body).toHaveProperty('phoneNumber', expect.any(String))
        expect(res.body).toHaveProperty('gender', expect.any(String))
        expect(res.body).toHaveProperty('address', expect.any(Object))
        expect(res.body.address).toHaveProperty('type', 'Point')
        expect(res.body.address).toHaveProperty('coordinates', expect.any(Array))
        expect(res.body).toHaveProperty('image', expect.any(String))
        expect(res.body).toHaveProperty('rekNumber', expect.any(String))
        expect(res.body).toHaveProperty('saldo')
    })
})

describe(`PATCH /mamangs/address/:id --failed empty address`, () => {
    it('should return 400 ', async () => {
        const res = await request(app).patch('/mamangs/address/62559dcfc9054d53a273fb14')
            .send({ address: "" })
        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty('message', 'newest coordinates required')
    })
})

describe(`PATCH /mamangs/:id --success`, () => {
    it('should return 200 ', async () => {
        const res = await request(app).patch('/mamangs/62559dcfc9054d53a273fb14')
            .send({ saldo: 5000 })
        expect(res.status).toBe(200)
        expect(res.body).toHaveProperty('_id', expect.any(String))
        expect(res.body).toHaveProperty('email', expect.any(String))
        expect(res.body).toHaveProperty('name', expect.any(String))
        expect(res.body).toHaveProperty('phoneNumber', expect.any(String))
        expect(res.body).toHaveProperty('gender', expect.any(String))
        expect(res.body).toHaveProperty('address', expect.any(Object))
        expect(res.body.address).toHaveProperty('type', 'Point')
        expect(res.body.address).toHaveProperty('coordinates', expect.any(Array))
        expect(res.body).toHaveProperty('image', expect.any(String))
        expect(res.body).toHaveProperty('rekNumber', expect.any(String))
        expect(res.body).toHaveProperty('saldo', 5000)
    })
})

describe(`PATCH /mamangs/:id --failed empty saldo`, () => {
    it('should return 400 ', async () => {
        const res = await request(app).patch('/mamangs/62559dcfc9054d53a273fb14')
            .send({ saldo: "" })
        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty('message', 'newest saldo required')
    })
})
