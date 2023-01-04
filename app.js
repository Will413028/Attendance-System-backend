const express = require('express')
const cors = require('cors')

const routes = require('./routes')
const app = express()

require('dotenv').config()
const port = process.env.PORT || 3000


app.use(cors())

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(routes)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})