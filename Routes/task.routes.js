const express = require('express');
const auth = require('../middleware/userAuth');

const { Task, taskDue, Project } = require('../models/');

const taskValidator = require('../validate/task.validate');
let task = express.Router();

task.post('/task', auth, taskValidator, async (req, res) => {
  let { content, color, string, project_id } = req.body;
  let is_inbox_project = null;
  const creator_id = req.user_id;

  let date = new Date();

  if (project_id == undefined) {
    let inbox = await Project.findOne({
      where: {
        name: 'inbox',
        userId: req.user_id,
      },
    });
    project_id = inbox.id;
    is_inbox_project = true;
  }

  try {
    let re = await Task.create({
      content,
      color,
      project_id,
      creator_id,
      is_inbox_project,
      created_at: date.toISOString(),
    });

    let data = await taskDue.create({
      string,
      taskid: re.id,
    });

    res.json(re);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Name cannot be empty' });
  }
});

task.get('/task', auth, async (req, res) => {
  const creator_id = req.user_id;

  try {
    let re = await Task.findAll({
      include: taskDue,
      where: { creator_id },
    });
    res.json(re);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'something went wrong' });
  }
});

task.put('/tasks/:id', auth, async (req, res) => {
  let userid = req.user_id;

  let taskinfo = Task.update(req.body, {
    where: {
      id,
      userid,
    },
  });

  return res.status(204).json();
});

task.put('/tasks/:id/close', async (req, res) => {
  let taskinfo = await Task.findByPk(req.params.id);

  if (!taskinfo.is_completed) {
    taskinfo.is_completed = true;
    taskinfo.save();
    res.status(204).json();
  } else {
    res.status(500).json({ msg: 'alreday closed' });
  }
});

task.put('/tasks/:id/reopen', async (req, res) => {
  let taskinfo = await Task.findByPk(req.params.id);

  if (taskinfo.is_completed) {
    taskinfo.is_completed = false;
    taskinfo.save();
    res.status(204).json();
  } else {
    res.status(500).json({ msg: 'alreday open' });
  }
});

task.delete('/task/:id', async (req, res) => {
  try {
    let re = await Task.destroy({
      where: {
        id: req.params.id,
      },
    });

    res.status(204).json([]);
  } catch (error) {
    res.status(500).json({ error: 'something went wrong' });
  }
});

module.exports = task;
