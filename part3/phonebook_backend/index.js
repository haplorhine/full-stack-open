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
    response.json(result)
  })
})

app.get('/info', (request, response) => {
  Person.find({}).then(result => {
    const message = `Phonebook has info for ${result.length} people`
    const dateOfRequest = Date()
    response.send(`<p>${message}</p><p>${dateOfRequest}</p>`)
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

  const errors = []

  if (!body.name) {
    errors.push('name missing')
  }
  if (!body.number) {
    errors.push('number missing')
  }

  // if (persons.some(person => person.name === body.name)) {
  //   errors.push('name must be unique')
  // }

  if (errors.length > 0) {
    return response.status(400).json({
      errors: errors
    })
  }

  const person = new Person({ ...body })

  person.save().then(person => {
    response.json(person)

  })

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
