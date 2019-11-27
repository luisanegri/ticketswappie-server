const { Router } = require('express');
const Event = require('./model');
const router = new Router();
const Ticket = require('../tickets/model');
const auth = require('../auth/middleware');

router.post('/event', auth, (req, res, next) => {
  Event.create(req.body)
    .then(event => res.send(event))
    .catch(error => next(error));
});

router.get('/event', auth, (req, res, next) => {
  Event.findAll({ include: [Ticket] })
    .then(event => res.send(event))
    .catch(error => next(error));
});

router.get('/event/:eventId', auth, (req, res, next) => {
  Event.findByPk(req.params.eventId)
    .then(event => {
      if (!event) {
        res.status(404).end();
      } else {
        res.status(201).json(event);
      }
    })
    .catch(error => next(error));
});

router.put('/event/:eventId', auth, (req, res, next) => {
  Event.findByPk(req.params.eventId)
    .then(event => event.update(req.body))
    .then(event => res.send(event))
    .catch(error => next(error));
});

router.delete('/event/:eventId', auth, (req, res, next) => {
  Event.destroy({ where: { id: req.params.eventId } })
    .then(number => res.send({ number }))
    .catch(error => next(error));
});

module.exports = router;
