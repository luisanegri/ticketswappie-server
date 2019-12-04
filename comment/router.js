const { Router } = require('express');
const Comment = require('./model');
const router = new Router();
const auth = require('../auth/middleware');

router.post('/ticket/:ticketId/comment', auth, (req, res, next) => {
  Comment.create({
    ...req.body,
    ticketId: req.params.ticketId
  })
    .then(comment => res.send(comment))
    .catch(error => next(error));
});

router.get('/:ticketId/comment', (req, res, next) => {
  Comment.findAll({ where: { ticketId: req.params.ticketId } })
    .then(comment => res.send(comment))
    .catch(error => next(error));
});

router.get('/comment/:id', (req, res, next) => {
  Comment.findByPk(req.params.id)
    .then(comment => {
      if (!comment) {
        res.status(404).end();
      } else {
        res.status(201).json(comment);
      }
    })
    .catch(error => next(error));
});

router.put('/comment/:id', auth, (req, res, next) => {
  Comment.findByPk(req.params.id)
    .then(comment => comment.update(req.body))
    .then(comment => res.send(comment))
    .catch(error => next(error));
});

router.delete('/comment/:id', auth, (req, res, next) => {
  Comment.destroy({ where: { id: req.params.id } })
    .then(number => res.send({ number }))
    .catch(error => next(error));
});

module.exports = router;
