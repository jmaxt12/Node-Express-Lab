// import your node modules
const express = require('express');

const db = require('./data/db.js');

const server = express();

// add your server code starting here
server.get('/api/posts', (req, res) => {
    db.find()
       .then(posts => {
           res.status(200).json(posts)
       })
       .catch(err => {
           res.status(500).json({error: "The posts information could not be retrieved." });
       });
  });

  server.get('/api/posts/:id', (req, res) => {
      const id = req.params.id;

      db.findById(id)
        .then(post => {
            if (post) {
                res.status(200).json(post);
            } else {
                res.status(404).json({message: "The post with the specified ID does not exist."});
            }
        })
        .catch(err => {
            res
                .status(500)
                .json({ error: "The post information could not be retrieved."  })
        });
  });

  server.post('/api/posts', (req, res) => {
      const postData = req.body
      db.insert(postData)
        .then(post => {
            if (post) {
                res.status(201).json(post)
            } else {
                res.status(400).json({errorMessage: "Please provide title and contents for the post."})       
            }
        })
        .catch(err => {
            res.status(500).json({error: "There was an error while saving the post to the database"})
        })
  })
(
  server.delete('/api/posts/:id', (req, res) => {
      const id = req.params.id;
      db.remove(id)
        .then(remove => {
           if (remove) {
            res.status(200).json(remove)
           } else {
               res.status(404).json({message: "The post with the specified ID does not exist."})
           }
        })
        .catch(err => {
            res.status(500).json({error: "The post could not be removed" })
        })
  })
)
  server.put('/api/posts/:id', (req, res) => {
      const id = req.params.id;
      const post = req.body;
      db.update(id, post)
        .then(update => {
            if(update) {
                res.status(200).json(update)
            } else {
                res.status(404).json({message: "The post with the specified ID does not exist."})
            }
        })
        .catch(err => {
            res.status(500).json({error: "The post information could not be modified."})
        })
  })

  server.listen(9000, () => console.log('I see you!!!!'));