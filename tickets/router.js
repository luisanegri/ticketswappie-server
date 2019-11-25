const { Router } = require('express');
const Ticket = require('./model');
const router = new Router();

router.post('/ticket', (req, res, next) => {
  Ticket.create(req.body)
    .then(ticket => res.send(ticket))
    .catch(error => next(error));
});

router.get('/ticket', (req, res, next) => {
  Ticket.findAll()
    .then(ticket => res.send(ticket))
    .catch(error => next(error));
});

router.get('/ticket/:id', (req, res, next) => {
  Ticket.findByPk(req.params.id)
    .then(ticket => {
      if (!ticket) {
        res.status(404).end();
      } else {
        res.status(201).json(ticket);
      }
    })
    .catch(error => next(error));
});

router.put('/ticket/:id', (req, res, next) => {
  Ticket.findByPk(req.params.id)
    .then(ticket => ticket.update(req.body))
    .then(ticket => res.send(ticket))
    .catch(error => next(error));
});

router.delete('/event/:id', (req, res, next) => {
  // pass the event id to where object
  Ticket.destroy({ where: { id: req.params.id } })
    .then(number => res.send({ number }))
    .catch(error => next(error));
});

module.exports = router;
