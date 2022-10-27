const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3002;

// app.get('/', (req, res) => {
//     res.send('hellooo testing world')
// })
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(require('./routes'));

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/social-network', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.set('debug', true);


app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));


