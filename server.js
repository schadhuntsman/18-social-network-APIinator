const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = process.env.PORT || 3001;

app.get('/', (req, res) => {
    res.send('herro testing world')
})

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/recipe-hunt', {
    useNewParser: true,
    useUnifiedTopology: true,
});
//use this to log mongo queries being executed
mongoose.set('debug', true);

app.use(require('./api/routes'));

app.listen(port, () => {
    console.log(`${port}`)
})

app.listen(PORT, () => console.log(`connected to localhost:${PORT}`));

