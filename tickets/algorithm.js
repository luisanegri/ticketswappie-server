// const Ticket = require('./model');
// async function calcTicket(ticket) {
//   let risk = 0;

//   try {
//     const userTickets = await Ticket.findAll({
//       where: { userId: ticket.userId }
//     });

//     const countUserTickets = userTickets.length;
//     if (countUserTickets === 1) {
//       risk += 10;
//     }

//     console.log('risk first', risk);

//     // segunda tarefa
//     const eventTickets = await Ticket.findAll({
//       where: { eventId: ticket.eventId }
//     });

//     const avgTicketPrice =
//       eventTickets.reduce((a, b) => {
//         return (a += b.price);
//       }, 0) / eventTickets.length;

//     console.log('avg ticket price', avgTicketPrice);

//     if (ticket.price <= avgTicketPrice) {
//       const difference2 = avgTicketPrice - ticket.price;
//       const diffPercentage = ((difference2 / avgTicketPrice) * 100).toFixed(2);
//       risk = Number(risk) + Number(diffPercentage);
//     } else if (ticket.price > avgTicketPrice) {
//       const difference1 = ticket.price - avgTicketPrice;
//       const diffPercentage = ((difference1 / avgTicketPrice) * 100).toFixed(2);
//       console.log('diff per', diffPercentage);
//       if (diffPercentage > 10) {
//         risk = Number(risk) - 10;
//       } else {
//         risk = Number(risk) - Number(diffPercentage);
//       }
//     }
//     console.log('total', risk);

//     // terceira tarefa
//     const timeCreated = ticket.createdAt.getHours();
//     console.log('time create', timeCreated);
//     if (timeCreated >= 9 && timeCreated <= 17) {
//       risk = Number(risk) - 10;
//     } else {
//       risk = Number(risk) + 10;
//     }
//     console.log('risk time', risk);

//     // quarta tarefa
//     const ticketComments = ticket.comments;
//     // console.log('ticket comments', ticketComments);
//     if (ticketComments.length === 1) {
//       risk = Number(risk) + 60;
//     }

//     console.log('ticket comment risk', risk);

//     // quinta tarefa
//     if (risk < 5) {
//       risk = 5;
//     } else if (risk > 95) {
//       risk = 95;
//     }

//     // console.log('end', risk);

//     ticket.risk = Math.round(risk);
//     res.json(ticket);
//   } catch (err) {
//     console.log(err);
//   }
// }

// module.exports = calcTicket;
