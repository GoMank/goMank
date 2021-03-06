if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
  }
const express = require('express')
const app = express()
const port = process.env.PORT || 4000
const allRoutes = require('./routes/index.js')
const cors = require('cors')
const { connection } = require('./config/mongoDb.js')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/', allRoutes)

connection()
.then(() => {
    app.listen(port, () => {
        console.log(`Gas keun ${port}`)
    })
})

module.exports = {app}

