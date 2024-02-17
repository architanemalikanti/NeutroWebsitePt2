import express from 'express'
import {generateUploadURL} from './s3.js'

const app = express()

app.use(express.static('front'))

//create a new endpoint that will allow a client to get a url

app.get('/s3Url', (req, res) => {
  const url = await s3.generateUploadURL()
  res.send({url})
})


app.listen(8080, () => console.log("listening port on 8080"))