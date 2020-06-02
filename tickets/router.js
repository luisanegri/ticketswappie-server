const { Router } = require('express');
const Ticket = require('./model');
const router = new Router();
const auth = require('../auth/middleware');
const Comment = require('../comment/model');

// put auth middleware back
router.post('/event/:eventId/ticket', auth, (req, res, next) => {
  Ticket.create({
    ...req.body,
    eventId: req.params.eventId,
  })
    .then((event) => {
      res.json(event);
    })
    .catch((error) => next(error));
});

router.get('/event/:eventId/ticket', async (req, res, next) => {
  Ticket.findAll({ include: [Comment], where: { eventId: req.params.eventId } })
    .then((ticket) => res.send(ticket))
    .catch((error) => next(error));
});

// get single ticket
router.get('/ticket/:ticketId', async (req, res) => {
  try {
    const ticket = await Ticket.findOne({
      include: [Comment],
      where: { id: req.params.ticketId },
    });

    risk = 0;

    const userTickets = await Ticket.findAll({
      where: { userId: ticket.userId },
    });

    const countUserTickets = userTickets.length;
    if (countUserTickets === 1) {
      risk += 10;
    }

    // segunda tarefa
    const eventTickets = await Ticket.findAll({
      where: { eventId: ticket.eventId },
    });

    const avgTicketPrice =
      eventTickets.reduce((a, b) => {
        return (a += b.price);
      }, 0) / eventTickets.length;

    if (ticket.price <= avgTicketPrice) {
      const difference2 = avgTicketPrice - ticket.price;
      const diffPercentage = ((difference2 / avgTicketPrice) * 100).toFixed(2);
      risk = Number(risk) + Number(diffPercentage);
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
    if (timeCreated >= 9 && timeCreated <= 17) {
      risk = Number(risk) - 10;
    } else {
      risk = Number(risk) + 10;
    }

    // quarta tarefa
    const ticketComments = ticket.comments;
    if (ticketComments.length > 3) {
      risk = Number(risk) + 10;
    }

    // quinta tarefa
    if (risk < 5) {
      risk = 5;
    } else if (risk > 95) {
      risk = 95;
    }

    ticket.dataValues.risk = Math.round(risk);
    console.log('risk', ticket.dataValues);
    return res.json(ticket);
  } catch (err) {
    console.log(err);
  }
});

router.put('/ticket/:ticketId', auth, (req, res, next) => {
  Ticket.findByPk(parseInt(req.params.ticketId))
    .then((ticket) => ticket.update(req.body))
    .then((ticket) => res.send(ticket))
    .catch((error) => next(error));
});

router.delete('/ticket/:ticketId', auth, (req, res, next) => {
  Ticket.destroy({ where: { id: req.params.ticketId } })
    .then((number) => res.send({ number }))
    .catch((error) => next(error));
});

module.exports = router;
