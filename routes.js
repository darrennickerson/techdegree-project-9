'use strict';

const express = require('express');
const { asyncHandler } = require('./middleware/ayncHandler');
const { Users, Courses } = require('./models');

// Construct a router instance.
const router = express.Router();

// Get all users
router.get(
  '/users',
  asyncHandler(async (req, res) => {
    //select all courses with certain fields displayed - course to show user associated with it
    const users = await Users.findAll({
      attributes: ['id', 'firstName', 'lastName', 'emailAddress'],
    });

    res.status(200).json(users);
  })
);

// Create a new user

router.post(
  '/users',
  asyncHandler(async (req, res) => {
    try {
      await Users.create(req.body);
      res.status(201).location('/').json();
    } catch (error) {
      if (
        error.name === 'SequelizeValidationError' ||
        error.name === 'SequelizeUniqueConstraintError'
      ) {
        const errors = error.errors.map((err) => err.message);
        res.status(400).json({ errors });
      } else {
        throw error;
      }
    }
  })
);

// Get All Couses

router.get(
  '/courses',
  asyncHandler(async (req, res) => {
    //select all courses with certain fields displayed - course to show user associated with it
    const courses = await Courses.findAll({
      attributes: [
        'id',
        'title',
        'description',
        'estimatedTime',
        'materialsNeeded',
      ],
      include: [
        {
          model: Users,
          attributes: ['id', 'firstName', 'lastName', 'emailAddress'],
        },
      ],
    });

    res.status(200).json(courses);
  })
);

// Get Specific Course by id

router.get(
  '/courses/:id',
  asyncHandler(async (req, res) => {
    const courseId = req.params.id;
    const course = await Courses.findByPk(courseId, {
      attributes: [
        'id',
        'title',
        'description',
        'estimatedTime',
        'materialsNeeded',
      ],
      include: [
        {
          model: Users,
          attributes: ['id', 'firstName', 'lastName', 'emailAddress'],
        },
      ],
    });

    res.status(200).json(course);
  })
);

// Create a new course
router.post(
  '/courses',
  asyncHandler(async (req, res) => {
    const course = await Courses.create(req.body);
    res.status(201).location(`/courses/${course.id}`).json();
  })
);

//Updates a course
router.put(
  '/courses/:id',
  asyncHandler(async (req, res) => {
    const courseId = req.params.id;
    const course = await Courses.findByPk(courseId);
    course.update(req.body);
    res.status(204).json();
  })
);

// Deletes a course
router.delete(
  '/courses/:id',
  asyncHandler(async (req, res) => {
    const courseId = req.params.id;
    const course = await Courses.findByPk(courseId);
    course.destroy(course);

    res.status(204).json();
  })
);
module.exports = router;
