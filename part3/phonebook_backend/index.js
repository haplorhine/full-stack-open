require('dotenv').config()
const Person = require('./models/person')
const express = require('express')
const app = express()
const morgan = require('morgan')


const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 

  next(error)
}

app.use(express.static('dist'))
app.use(express.json())
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

app.get('/api/persons/:id', (request, response, next) => {
  const id = request.params.id

  Person.findById(id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
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

app.delete('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  Person.findByIdAndDelete(id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)
app.use(errorHandler)


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
