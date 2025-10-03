require('dotenv').config()
const Person = require('./models/person')
const express = require('express')
const morgan = require('morgan')
const app = express()


app.use(express.json())
app.use(express.static('dist'))

morgan.token('body', function (req, res) { return JSON.stringify(req.body) })
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.get('/', (request, response) => {
  response.send('<h1>Hello Phonebook!</h1>')
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(result => {

    result.forEach(person => {
      console.log(person)

    })
    mongoose.connection.close()
  })
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id

  const person = persons.find(person => person.id === id)
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name) {
    return response.status(400).json({
      error: 'name missing'
    })
  }
  if (!body.number) {
    return response.status(400).json({
      error: 'number missing'
    })
  }

  if (persons.some(person => person.name === body.name)) {
    return response.status(400).json({
      error: 'name must be unique'
    })
  }

  const id = String(Math.floor(Math.random() * (6000 - 1000) + 1000))

  const person = { id: id, ...body }

  persons = persons.concat(person)

  response.json(person)

})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id

  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
