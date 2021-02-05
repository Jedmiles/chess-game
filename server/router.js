const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('server is up and running');
})

router.get('/game', (req, res) => {
  res.send('game');
})

module.exports = router;