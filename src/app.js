const express = require('express');
const app = express();
app.use(express.json());

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const trainingRoutes = require('./routes/trainingRoutes');
const swaggerRoute = require('./routes/swaggerRoute');

app.use('/users', authRoutes);
app.use('/users', userRoutes);
app.use('/trainings', trainingRoutes);
app.use('/docs', swaggerRoute);

module.exports = app;