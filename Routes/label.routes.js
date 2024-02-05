const express = require('express');
const { Op } = require('sequelize');
const { Label, Task } = require('../models/');
const auth = require('../middleware/userAuth');
const labelValidator = require('../validate/label.validate');
let label = express.Router();

label.post('/label', auth, labelValidator, async (req, res) => {
  const { name, color, id } = req.body;
  const userId = req.user_id;

  try {
    const Exists = await Label.findAll({
      where: {
        name,
      },
    });

    let re = { msg: 'assigbned successfully' };
    if (Exists.length == 0) {
      re = await Label.create(
        { name, color, userId },
        {
          attributes: { exclude: ['userId'] },
        }
      );
    }

    let existingTask = await Task.findByPk(id);

    if (existingTask.label.includes(name)) {
      return res.status(500).json({ msg: 'Label alreday exits' });
    }
    existingTask.label = [...existingTask.label, name];
    await existingTask.save();
    res.json(re);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Name cannot be empty' });
  }
});

label.get('/label', auth, async (req, res) => {
  const userId = req.user_id;
  try {
    let re = await Label.findAll();
    res.json(re);
  } catch (error) {
    res.status(500).json({ error: 'something went wrong' });
  }
});

label.get('/label/:id', async (req, res) => {
  try {
    let re = await Label.findOne({
      where: {
        id: req.params.id,
        userId,
      },
    });

    res.json(re);
  } catch (error) {
    res.status(500).json({ error: 'something went wrong' });
  }
});

label.put('/label/:id', auth, async (req, res) => {
  const { name, color, parent_id, is_favorite, view_style } =
    req.body;

  const userId = req.user_id;
  try {
    let re = await Label.update(
      { name, color, parent_id, is_favorite, view_style },
      {
        where: {
          id: req.params.id,
          userId,
        },
      },
      { fields: fields }
    );
    let data = await Label.findOne({
      attributes: { exclude: ['userId'] },
      where: {
        id: req.params.id,
      },
    });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'something went wrong' });
  }
});

label.delete('/label/:id', auth, async (req, res) => {
  const userId = req.user_id;
  const { name } = req.body;
  try {
    let re = await Label.destroy({
      where: {
        id: req.params.id,
        userId,
      },
    });

    await removeLabelTaskAll(name);

    res.status(204).json([]);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'something went wrong' });
  }
});

label.get('/label/getall/:name', async (req, res) => {
  try {
    const tasksWithLabel = await Task.findAll({
      where: {
        label: {
          [Op.contains]: [req.params.name],
        },
      },
    });

    return res.json(tasksWithLabel);
  } catch (error) {
    res.status(500).json({ error: 'error in data' });
  }
});

async function removeLabelTaskAll(name) {
  const tasksWithLabel = await Task.findAll({
    where: {
      label: {
        [Op.contains]: [name],
      },
    },
  });

  tasksWithLabel.map((task) => {
    remove(task.id, name);
  });
}

async function remove(id, name) {
  existingTask = await Task.findByPk(id);
  existingTask.label = existingTask.label.filter(
    (each) => each != name
  );
  await existingTask.save();
}
module.exports = label;
