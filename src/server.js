const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const landRoutes = require('./routes/land');
const bidRoutes = require('./routes/bid');
const transactionRoutes = require('./routes/transactions');
const mongoose = require('mongoose')
require('dotenv').config();

const app = express();

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(() => { console.error('MongoDB connection error') })

app.use(cors());
app.use(express.json());

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/land', landRoutes);
app.use('/api/v1/bid', bidRoutes);
app.use('/api/v1/transaction', transactionRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server running on port ${PORT}`));     