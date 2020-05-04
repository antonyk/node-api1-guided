// import express from 'express'  // ES2015 modules
const express = require('express'); // CommonJS modules

const server = express();
server.use(express.json()); // teaches express how to read JSON from the body

let myId = 0;

let lessons = [
  {
    id: ++myId,
    name: 'Introduction to HTTP APIs with Node and Express'
  },
];

server.get('/', (req, res) => {
  res.json({ api: "Up and running! Hello World" })
})

// LESSONS
server.get('/api/lessons', function(req, res) {
  // return an array of lessons (id, name)

  // res.send()
  res.json(lessons);

  // res.json({ api: "Up and running! Hello World" })
})

server.post('/api/lessons', function(req, res) {
  const lessonsInfo = req.body;
  lessonsInfo.id = ++myId;
  lessons.push(lessonsInfo);

  res.status(201).json(lessons[lessons.length-1])
})

server.delete('/api/lessons/:id', function(req, res) {
  const id = Number(req.params.id);

  lessons = lessons.filter(item => item.id !== id);

  res.status(200).json(lessons);
})

server.listen(5000, () => console.log('\n== API is up ==\n'))