/* eslint-disable no-unused-vars */
const mongoose = require('mongoose')

mongoose.set('strictQuery',false)

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url)
  .then(res => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB: ', error.message)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: [ 3, 'Name must have at least three characters long']
  },
  number: {
    type: String,
    minLength: [ 8, 'A phone number must have length of 8 or more'],
    validate: {
      validator: function(v) {
        return /^\d{2}\d?-\d{5,}$/.test(v)
      },
      message: props => `${props.value} is not valid phone number`
    }
  },
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)