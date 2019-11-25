const { Router } = require('express');
const Event = require('./model');
const router = new Router();

router.post('/event', (req, res, next) => {
  Event.create(req.body)
    .then(event => res.send(event))
    .catch(error => next(error));
});

router.get('/event', (req, res, next) => {
  Event.findAll()
    .then(event => res.send(event))
    .catch(error => next(error));
});

router.get('/event/:id', (req, res, next) => {
  Event.findByPk(req.params.id)
    .then(event => {
      if (!event) {
        res.status(404).end();
      } else {
        res.status(201).json(event);
      }
    })
    .catch(error => next(error));
});

router.put('/event/:id', (req, res, next) => {
  Event.findByPk(req.params.id)
    .then(event => event.update(req.body))
    .then(event => res.send(event))
    .catch(error => next(error));
});

router.delete('/event/:id', (req, res, next) => {
  // pass the event id to where object
  Event.destroy({ where: { id: req.params.id } })
    .then(number => res.send({ number }))
    .catch(error => next(error));
});

module.exports = router;
