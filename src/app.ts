import express from 'express'

const app = express()

app.use('/', (req, res) => {
  res.send('I got in!')
})

app.listen(3001, () => {
  console.log("WZQ.Socket is running on port 3001")
})