const { Router } = require('express');
const Ticket = require('./model');
const router = new Router();
const auth = require('../auth/middleware');
const Comment = require('../comment/model');
const calcTicket = require('./algorithm');

router.post('/event/:eventId/ticket', auth, (req, res, next) => {
  Ticket.create({
    ...req.body,
    eventId: req.params.eventId
  })
    .then(event => {
      res.json(event);
    })
    .catch(error => next(error));
});

// get all tickets from specific event
router.get('/event/:eventId/ticket', async (req, res, next) => {
  try {
    const tickets = await Ticket.findAll({
      include: [Comment],
      where: { eventId: req.params.eventId }
    });
    // inject risk to each ticket
    const ticketsMapped = tickets.map(ticket => {
      let item = calcTicket(ticket);
      //console.log('promise intern', typeof item);
      return item;
    });
    // resolve an array of promisses use promise.all
    Promise.all(ticketsMapped).then(result => res.json(result));
  } catch (err) {
    next(err);
  }
});

// get single ticket
router.get('/ticket/:ticketId', async (req, res, next) => {
  try {
    const ticket = await Ticket.findOne({
      include: [Comment],
      where: { id: req.params.ticketId }
    });

    let calc = await calcTicket(ticket);

    res.json(calc);
  } catch (err) {
    next(err);
  }
});

router.put('event/eventId/ticket/:ticketId', (req, res, next) => {
  Ticket.findByPk(req.params.ticketId)
    .then(ticket => ticket.update(req.body))
    .then(ticket => res.send(ticket))
    .catch(error => next(error));
});

router.delete('/ticket/:ticketId', (req, res, next) => {
  Ticket.destroy({ where: { id: req.params.ticketId } })
    .then(number => res.send({ number }))
    .catch(error => next(error));
});

module.exports = router;
