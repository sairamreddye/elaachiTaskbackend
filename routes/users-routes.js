const express = require('express');

const { check } = require('express-validator');

const router = express.Router();

const usersControllers = require('../controllers/users-controllers');

router.get('/', usersControllers.getUsers);
router.post('/signup',
    [check('username').not().isEmpty(), check('email').normalizeEmail().isEmail(), check('description').not().isEmpty()], usersControllers.signup);
module.exports = router;