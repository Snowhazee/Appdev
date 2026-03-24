const express = require('express');
const authController = require('../controllers/auth');
const router = express.Router();

router.get('/test', (req, res) => {
  res.json({ message: 'Auth route works' });
});

router.post('/register', authController.register);
router.post('/login', authController.login);
module.exports = router;
