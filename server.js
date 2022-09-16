const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3001;

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

app.use(require('./api/routes'));

app.listen(port, () => {
    console.log(`${port}`)
})

app.listen(PORT, () => console.log(`Connected on localhost:${PORT}`));

