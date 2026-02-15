const express = require('express')
const cors = require('cors')
const app = express()
require('dotenv').config()

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))
import { AppRoute } from './AppRoute'
app.get('/', (req, res) => {
  res.send('Hello World! this is my first shop app')
})
const port = process?.env?.PORT ?? 3000
AppRoute(app)
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})