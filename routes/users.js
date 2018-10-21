"use strict";

const express = require('express');
const router  = express.Router();
const knex    = require('../lib/database-connection');
const bcrypt  = require('bcryptjs');


module.exports = router;

router.get("/:id", (req, res) => {
  knex
    .select("*")
    .from("resources")
    .join('categories', 'resources.category_id', '=', 'categories.id')
    .select('resources')
    .where({user_id: '1'})
    .then((results) => {
      let templateVars= {
        articles: results,
        user: req.session.id
      }
      res.render("mydashboard", templateVars);
    })
})

router.get("/:id/profile", (req, res) => {
  let templateVars= {
    user: req.session.id
  }
  res.render("profile", templateVars);
});

//Register a new User
router.post("/register", (req, res) => {
  const password = req.body.password;
  const hashedPassword = bcrypt.hashSync(password,10);
  knex('users')
    .insert({
      email: req.body.email,
      name: req.body.username,
      password: hashedPassword
    })
    .returning('id')
    .then((id) => {
      console.log("successfully inserted the record ");
      console.log(id);
      res.json({result: "True"});
    })
})
