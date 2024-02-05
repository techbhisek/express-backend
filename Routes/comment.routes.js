const express = require('express');
const auth = require('../middleware/userAuth');
const { Comment, Project, Task } = require('../models/');

const commnetValidator = require('../validate/comment.validate');

let comment = express.Router();

comment.post('/comment', auth, commnetValidator, async (req, res) => {
  const userId = req.user_id;
  const { project_id, task_id } = req.body;

  await commentAuth(project_id, task_id, userId);

  let date = new Date();
  try {
    let re = await Comment.create({
      ...req.body,
      posted_at: date.toISOString(),
    });

    if (project_id) {
      let project = await Project.findByPk(project_id);
      project.comment_count += 1;
      project.save();
    }
    if (task_id) {
      let task = await Task.findByPk(task_id);
      task.comment_count += 1;
      task.save();
    }
    res.json(re);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Name cannot be empty' });
  }
});

comment.get('/comment', auth, async (req, res) => {
  const { project_id, task_id } = req.body;
  const userId = req.user_id;

  if (project_id && task_id) {
    return res
      .status(500)
      .json({ msg: 'please provide only project_id or task_id' });
  }
  await commentAuth(project_id, task_id, userId);
  try {
    let re = await Comment.findAll({
      where: { ...req.body },
    });
    return res.json(re);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'something went wrong' });
  }
});

comment.delete('/comment/:id', auth, async (req, res) => {
  const userId = req.user_id;
  console.log(userId);
  let commentData = await Comment.findByPk(req.params.id);

  let project_id = commentData.project_id;
  let task_id = commentData.task_id;

  if (commentData) {
    await commentAuth(project_id, task_id, userId);

    await Comment.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (project_id) {
      let project = await Project.findByPk(project_id);
      project.comment_count -= 1;
      project.save();
    }
    if (task_id) {
      let task = await Task.findByPk(task_id);
      task.comment_count -= 1;
      task.save();
    }

    return res.status(204).json();
  }

  return res.status(400).json({ msg: 'something went wrong' });
});

module.exports = comment;

async function commentAuth(project_id, task_id, userId) {
  if (project_id && task_id) {
    return res
      .status(500)
      .json({ msg: 'cannot assign both same comment' });
  }

  if (task_id) {
    let task = await Task.findByPk(task_id);
    if (task.creator_id != userId) {
      return res.status(503).json({ msg: 'unauthorize user' });
    }
  }
  if (project_id) {
    let project = await Project.findByPk(project_id);
    if (project.userId != userId) {
      return res.status(503).json({ msg: 'unauthorize user' });
    }
  }
}
