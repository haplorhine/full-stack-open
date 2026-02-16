const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

test('all blogs are returned in json format', async () => {
  const initialBlogs = helper.initialBlogs

  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  assert.strictEqual(response.body.length, initialBlogs.length)
})

test('unique identifier property of the blog posts is named "id"', async () => {
  const response = await api.get('/api/blogs')
  const blogs = response.body
  assert(blogs.every((blog) => Object.hasOwn(blog, 'id')))
})

test('a blog post can be added ', async () => {
  const newBlog = {
    title: 'First class something',
    author: 'Bro C. Olive',
    url: 'https://example.com/geniuspost',
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsInitial = helper.initialBlogs
  const blogsAfter = await helper.blogsInDb()
  assert.strictEqual(blogsAfter.length, blogsInitial.length + 1)
})

test.only('deletion of a blog post succeeds with status code 204 if id is valid', async () => {
  const blogsBefore = await helper.blogsInDb()
  const blogToDelete = blogsBefore[0]
  console.log('toDelete', blogToDelete)
  await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

  const blogsAfterDelete = await helper.blogsInDb()

  const ids = blogsAfterDelete.map((blog) => blog.id)

  assert(!ids.includes(blogToDelete.id))

  assert.strictEqual(blogsAfterDelete.length, helper.initialBlogs.length - 1)
})

after(async () => {
  await mongoose.connection.close()
})
