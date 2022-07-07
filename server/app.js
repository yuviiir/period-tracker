const { response } = require('express');
const express = require('express');
const app = express();

const PORT = process.env.PORT || 80;

//ROUTER TO API
const historyRouter = require('./routes/history');
const calendarRouter = require('./routes/calendar');
const journalRouter = require('./routes/history');
const predictionRouter = require('./routes/prediction')

//Home page static files
app.get('/', (req, res) => {
    console.log('IT IS WORKING!');
    res.sendStatus(200)

    //SEND FILE FOR ROUTING HERE (THE PAGE YOU WOULD LIKE TO DISPLAY)
    //res.sendFile(__dirname + 'where the file is in the file directory');
});

app.use('/history', historyRouter);
app.use('/calendar', calendarRouter);
app.use('/journal', journalRouter);
app.use('/prediction', predictionRouter)

app.all('*', (req, res) => {
    res.status(400).send('<h1> PAGE NOT FOUND! </h1>')
})

app.listen(PORT, () =>{
    console.log(`Listening on port ${PORT}`);
})
