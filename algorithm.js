// TASK 1:
// relate user to ticket - find all tickets of specific user
const userTickets = await Ticket.findAll({
  where: { user: ticket.userId }
});
// count the amount of tickets a user has
const countUserTickets = userTickets.length;
// if user has only one ticket add 10 of risk
if (countUserTickets === 1) {
  risk.ticket += 10;
}
// TASK 2:
// find tickets of specific event
const eventTickets = Ticket.findAll({ where: { event: ticket.eventId } });
// map price of all event tickets
//const eventTicketsPrice = eventTickets.map(ticket => ticket.price);
// find amount of tickets
//const countEventTickets = eventTicketsPrice.length;
// calculate average sum of all tickets price divided by amount of tickets
const avgTicketPrice =
  eventTickets.reduce((a, b) => {
    return a + b.price;
  }, 0) / eventTickets.length;

if (ticket.price > avgTicketPrice) {
  const difference1 = ticket.price - avgTicketPrice;
  const diffPercentage = ((difference1 / avgTicketPrice) * 100).toFixed(2);
  if (diffPercentage > 10) {
    risk -= 10;
  } else {
    risk -= diffPercentage;
  }
} else if (ticket.price < avgTicketPrice) {
  const difference2 = avgTicketPrice - ticket.price;
  const diffPercentage = ((difference2 / avgTicketPrice) * 100).toFixed(2);
  ticket.risk += diffPercentage;
}

// if (ticket.price < diffPercentage) {
//   ticket.risk += diffPercentage;
// } else if (ticket.price > diffPercentage) {
//   ticket.risk -= diffPercentage;
// }

// TASK 3:
// find how to get only the time as there is also date in value
const timeCreated = ticket.createdAt;
if (timeCreated >= 9 && timeCreated <= 17) {
  ticket.risk -= 10;
} else {
  ticket.risk += 10;
}

// TASK 4:
const countComments = ticket.comment;
if (countComments.length > 3) {
  ticket.risk += 5;
}

return ticket;
