const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./mongo.router');

const app = express();
app.use(express.json());
app.use('/api', userRoutes);

mongoose.connect(process.env.MONGO_URI, {
}).then(() => {
    console.log('Connected to MongoDB');
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((err) => {
    console.error('MongoDB connection failed:', err);
});