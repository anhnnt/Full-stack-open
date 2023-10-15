/* eslint-disable no-unused-vars */
require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const Person = require('./models/person')

const requestLogger = (req, res, next) => {
  console.log('Method: ', req.method)
  console.log('Path: ', req.path)
  console.log('Body: ', req.body)
  console.log('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(requestLogger)
app.use(express.static('dist'))

morgan.token('body', (req, res) => JSON.stringify(req.body)
)

app.get('/', (request, response) => {
  response.send('<h1>Phonebook data</h1>')
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons =>
  {response.json(persons)
  })
})

app.post('/api/persons', (req, res, next) => {
  const body = req.body
  if (!body.name || !body.number) {
    return res.status(400).json({
      error: 'Name or number is missing'
    })
  }

  const person = new Person({
    name: body.name,
    number: body.number
  })

  person.save()
    .then(savedPerson => {
      res.json(savedPerson)
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const person = {
    number: request.body.number
  }
  const id = request.params.id

  Person.findByIdAndUpdate(
    id,
    person,
    { new: true, runValidators: true, context: 'query' })
    .then((updatedPerson) => {
      console.log('Updated sucessfully')
      response.json(updatedPerson.toJSON())
    })
    .catch((error) => {
      console.log('there has been error', error)
      next(error)
    })
})


app.get('/info', (request, response) => {
  const date = new Date()
  Person.countDocuments({}).then(persons => {
    response.send(`<div><p>Phonebook has info for ${persons} people</p><p>${date}</p></div>`)
  })
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})