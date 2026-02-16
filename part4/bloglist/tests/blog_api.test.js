const { test, after } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('all blogs are returned in json format', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  assert.strictEqual(response.body.length, 2)
})

test.only('unique identifier property of the blog posts is named "id"', async () => {
  const response = await api.get('/api/blogs')
  const blogs = response.body
  assert(blogs.every((blog) => Object.hasOwn(blog, 'id')))
})

after(async () => {
  await mongoose.connection.close()
})
