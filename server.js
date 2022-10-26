const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3010;

app.get('/', (req, res) => {
    res.send('herro testing world')
})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/recipe-hunt', {
    useFindAndModify: false,
    useNewParser: true,
    useUnifiedTopology: true,
});

mongoose.set('debug', true);

app.use(require('./routes'));

app.listen(PORT, () => {
    console.log(`${PORT}`)
})

app.listen(PORT, () => console.log(`Connected on localhost:${PORT}`));

