const express = require('express');
const app = express();
const port = 4000;
const cors = require('cors');
const corsMiddleware = cors();
const bodyParser = require('body-parser');
const parserMiddleware = bodyParser.json();
const userRouter = require('./user/router');
const authRouter = require('./auth/router');
app.use(corsMiddleware);
app.use(parserMiddleware);
app.use(authRouter);
app.use(userRouter);

app.listen(port, () => console.log(`app running on port ${port}`));
