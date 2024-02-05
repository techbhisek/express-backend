const express = require('express');
const auth = require('../middleware/userAuth');
const logger = require('../logger');
const { Project, Task } = require('../models/');
const projectValidator = require('../validate/project.validate');

let project = express.Router();
const fields = ['name', 'color', 'view_style', 'userId'];

project.post('/post', auth, projectValidator, async (req, res) => {
  const body = req.body;
  const userId = req.user_id;

  let re = await Project.create(
    { ...body, userId },
    { fields: fields }
  );
  try {
    await Project.update(
      { url: `https://localhost:5173/showProject/${re.id}` },
      {
        where: {
          id: re.id,
        },
      }
    );

    let data = await Project.findAll({
      where: {
        id: re.id,
      },
    });

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Name cannot be empty' });
  }
});

project.get('/project', auth, async (req, res) => {
  const userId = req.user_id;

  console.log(userId);
  try {
    let re = await Project.findAll({
      where: {
        userId,
      },
      include: Task,
    });

    res.json(re);
  } catch (error) {
    res.status(500).json({ error: 'something went wrong' });
  }
});

project.get('/project/:id', auth, async (req, res) => {
  try {
    let re = await Project.findOne({
      where: {
        id: req.params.id,
      },
      include: Task,
    });

    res.json(re);
  } catch (error) {
    res.status(500).json({ error: 'something went wrong' });
  }
});

project.put('/project/:id', auth, async (req, res) => {
  const { name, color, parent_id, is_favorite, view_style } =
    req.body;
  try {
    let re = await Project.update(
      { name, color, parent_id, is_favorite, view_style },
      {
        where: {
          id: req.params.id,
        },
      },
      { fields: fields }
    );
    let data = await Project.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'something went wrong' });
  }
});

project.delete('/project/:id', async (req, res) => {
  try {
    let re = await Project.destroy({
      where: {
        id: req.params.id,
      },
    });

    res.status(204).json([]);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'something went wrong' });
  }
});

module.exports = project;
