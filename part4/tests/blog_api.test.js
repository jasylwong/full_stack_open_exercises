const Blog = require("../models/blog")
const mongoose = require('mongoose')
const supertest = require("supertest")
const helper = require('./test_helper')
const app = require("../app")
const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

test('blogs are returned as JSON', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('unique identifier property of blogs is named id', async () => {
  const response = await api.get('/api/blogs')
  const blog = response.body[0]
  expect(blog.id).toBeDefined();
})

test('a valid blog can be added', async () => {
  const newBlog =   {
    id: "5a422aa71b54a676234d17f9",
    title: "Testing valid blog can be added",
    author: "Jason Wong",
    url: "http://www.testingvalidblogcanbeadded.html",
    likes: 5,
    __v: 0
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
  
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(helper.initialBlogs.length + 1)

  const content = response.body.map(blog => blog.title)
  expect(content).toContain(newBlog.title)
})

afterAll(() => {
  mongoose.connection.close()
})