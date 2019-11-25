const express = require('express');
const app = express();
const port = 4000;
const cors = require('cors');
const corsMiddleware = cors();
const bodyParser = require('body-parser');
const parserMiddleware = bodyParser.json();
const authRouter = require('./auth/router');
const userRouter = require('./user/router');
const eventsRouter = require('./events/router');
app.use(corsMiddleware);
app.use(parserMiddleware);
app.use(authRouter);
app.use(userRouter);
app.use(eventsRouter);

app.listen(port, () => console.log(`app running on port ${port}`));
