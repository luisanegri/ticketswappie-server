const { Router } = require('express');
const Ticket = require('./model');
const router = new Router();
const auth = require('../auth/middleware');

router.post('/event/:eventId/ticket', auth, (req, res, next) => {
  Ticket.create({
    ...req.body,
    // eventId is undefined on the frontend but not on the
    // backend database
    eventId: req.params.eventId
  })
    .then(event => {
      res.json(event);
    })
    .catch(error => next(error));
});

// get all tickets from specific event
router.get('/event/:eventId/ticket', auth, (req, res, next) => {
  Ticket.findAll({ where: { eventId: req.params.eventId } })
    .then(ticket => res.send(ticket))
    .catch(error => next(error));
});

// get single ticket
router.get('/ticket/:ticketId', auth, (req, res, next) => {
  Ticket.findOne({
    where: { id: req.params.ticketId }
  })
    .then(ticket => {
      if (!ticket) {
        res.status(404).end();
      } else {
        res.status(201).json(ticket);
      }
    })
    .catch(error => next(error));
});

router.put('/event/:eventId/ticket/:ticketId', (req, res, next) => {
  Ticket.findByPk({
    where: { id: req.params.ticketId, eventId: req.params.eventId }
  })
    .then(ticket => ticket.update(req.body))
    .then(ticket => res.send(ticket))
    .catch(error => next(error));
});

router.delete('/ticket/:id', (req, res, next) => {
  Ticket.destroy({ where: { id: req.params.id } })
    .then(number => res.send({ number }))
    .catch(error => next(error));
});

module.exports = router;
