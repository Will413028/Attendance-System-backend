require('dotenv').config()
const port = process.env.PORT
const express = require('express')
const routes = require('./routes')
const app = express()

app.use(routes)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})