const { test, after, beforeEach, describe } = require('node:test')
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

describe('deletion of a blog post', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsBefore = await helper.blogsInDb()
    const blogToDelete = blogsBefore[0]
    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

    const blogsAfterDelete = await helper.blogsInDb()

    const ids = blogsAfterDelete.map((blog) => blog.id)

    assert(!ids.includes(blogToDelete.id))

    assert.strictEqual(blogsAfterDelete.length, helper.initialBlogs.length - 1)
  })
})

describe('updating of a blog post', () => {
  test('succeeds with status code 200 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogBeforeUpdate = blogsAtStart[0]

    const blogId = blogBeforeUpdate.id

    const updatedContent = {
      likes: 9,
    }

    await api.put(`/api/blogs/${blogId}`).send(updatedContent).expect(200)

    const blogsAtEnd = await helper.blogsInDb()

    const blogAfterUpdate = blogsAtEnd.find((blog) => blog.id === blogId)

    assert.strictEqual(blogAfterUpdate.likes, updatedContent.likes)
  })
  test.only('fails with status code 404 blog when blog id does not exist', async () => {
    const id = await helper.nonExistingId()
    await api.put(`/api/blogs/${id}`).send({ likes: 2 }).expect(404)
  })
})

after(async () => {
  await mongoose.connection.close()
})
