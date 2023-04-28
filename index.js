const express = require('express');
const { Pool } = require('pg');
const app = express();
const port = 3000;

// створити з'днання  pool до PostgreSQL database
const pool = new Pool({
  user: 'ukd_admin',
  host: 'ep-square-mouse-262994.us-west-2.aws.neon.tech',
  database: 'ukd',
  password: 'YyfeQqL0W8uS',
  port: 5432,
});

// додати нового студента
app.post('/students', async (req, res) => {
  try {
    const { name, age } = req.body;
    const client = await pool.connect();
    const result = await client.query('INSERT INTO students (name, age) VALUES ($1, $2) RETURNING id', [name, age]);
    const id = result.rows[0].id;
    res.status(201).send(`Student added with ID: ${id}`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error adding student');
  }
});

//Додати нове завдання до таблиці tasks з посиланням на студента та предмет

app.post('/tasks', async (req, res) => {
  try {
    const { studentId, subjectId, task } = req.body;
    const client = await pool.connect();
    const result = await client.query('INSERT INTO tasks (student_id, subject_id, task) VALUES ($1, $2, $3) RETURNING id', [studentId, subjectId, task]);
    const id = result.rows[0].id;
    res.status(201).send(`Task added with ID: ${id}`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error adding task');
  }
});
// Отримати список студентів з їх завданнями
app.get('/students', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM students');
    const students = result.rows;
    for (let i = 0; i < students.length; i++) {
      const studentId = students[i].id;
      const tasksResult = await client.query('SELECT * FROM tasks WHERE student_id = $1', [studentId]);
      const tasks = tasksResult.rows;
      students[i].tasks = tasks;
    }
    res.status(200).json(students);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error getting students');
  }
});

// Отримати предмет за ID з асоційованими завданнями
app.get('/subjects/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM subjects WHERE id = $1', [id]);
    const subject = result.rows[0];
    const tasksResult = await client.query('SELECT * FROM tasks WHERE subject_id = $1', [id]);
    const tasks = tasksResult.rows;
    subject.tasks = tasks;
    res.status(200).json(subject);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error getting subject');
  }
});


app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
