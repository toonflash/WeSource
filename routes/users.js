"use strict";

const express = require('express');
const router  = express.Router();
const knex    = require('../lib/database-connection');

module.exports = router;

router.get("/:id", (req, res) => {
  res.render("mydashboard");
});

router.get("/:id/profile", (req, res) => {
  res.render("profile");
});
