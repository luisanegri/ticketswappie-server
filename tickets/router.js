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
router.get('/event/:eventId/ticket', (req, res, next) => {
  Ticket.findAll({ include: [Comment], where: { eventId: req.params.eventId } })
    .then(ticket => res.send(ticket))
    .catch(error => next(error));
});

// get single ticket
router.get('/ticket/:ticketId', async (req, res) => {
  try {
    risk = 0;

    const ticket = await Ticket.findOne({
      include: [Comment],
      where: { id: req.params.ticketId }
    });

    const userTickets = await Ticket.findAll({
      where: { userId: ticket.userId }
    });

    const countUserTickets = userTickets.length;
    if (countUserTickets > 1) {
      risk += 10;
    }

    console.log('risk first', risk);

    // segunda tarefa
    const eventTickets = await Ticket.findAll({
      where: { eventId: ticket.eventId }
    });

    const avgTicketPrice =
      eventTickets.reduce((a, b) => {
        return (a += b.price);
      }, 0) / eventTickets.length;

    console.log('avg ticket price', avgTicketPrice);
    console.log('risk before second conditions', risk);

    if (ticket.price <= avgTicketPrice) {
      const difference2 = avgTicketPrice - ticket.price;
      const diffPercentage = ((difference2 / avgTicketPrice) * 100).toFixed(2);
      console.log('typeof', typeof diffPercentage);
      risk = Number(risk) + Number(diffPercentage);
      console.log('total', risk);
    } else if (ticket.price > avgTicketPrice) {
      const difference1 = ticket.price - avgTicketPrice;
      const diffPercentage = ((difference1 / avgTicketPrice) * 100).toFixed(2);
      if (diffPercentage > 10) {
        risk = Number(risk) - 10;
      } else {
        risk = Number(risk) - Number(diffPercentage);
      }
    }

    // terceira tarefa
    const timeCreated = ticket.createdAt.getHours();
    console.log('time create', timeCreated);
    if (timeCreated >= 9 && timeCreated <= 17) {
      risk = Number(risk) - 10;
    } else {
      risk = Number(risk) + 10;
    }

    // quarta tarefa
    const ticketComments = ticket.comments;
    console.log('ticket comments', ticketComments);
    if (ticketComments.length === 1) {
      risk = Number(risk) + 60;
    }

    // console.log('ticket comment risk', risk);

    // quinta tarefa
    if (risk < 5) {
      risk = 5;
    } else if (risk > 95) {
      risk = 95;
    }

    // console.log('end', risk);

    ticket.risk = risk;
    res.json(ticket);
  } catch (err) {
    console.log(err);
  }
});

router.put('event/eventId/ticket/:ticketId', (req, res, next) => {
  Ticket.findByPk(req.params.ticketId)
    .then(ticket => ticket.update(req.body))
    .then(ticket => res.send(ticket))
    .catch(error => next(error));
});

router.delete('/ticket/:ticketId', auth, (req, res, next) => {
  Ticket.destroy({ where: { id: req.params.ticketId } })
    .then(number => res.send({ number }))
    .catch(error => next(error));
});

module.exports = router;
