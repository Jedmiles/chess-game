const express = require('express');
const router = express.Router();
const path = require('path');

router.get('*', (req, res) => {
  console.log(path.join(__dirname, "..", "client", "build", "index.html"))
  res.sendFile(path.join(__dirname, "..", "client", "build"));
})

module.exports = router;