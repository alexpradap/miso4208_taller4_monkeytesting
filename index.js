const child_process = require('child_process');
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Server is up.');
});

app.get('/start', (req, res) => {
    child_process.exec('npx cypress run --quiet --headless --spec "cypress/integration/monkey_testing_ripper.spec.js"').toString('utf8');
    res.send('Test started');
});

app.get('/result', (req,res) => {
    res.sendFile('cypress/screenshots/monkey_testing_ripper.spec.js/Wikipedia under monkeys -- visits wikipedia and survives monkeys (failed).png', {root: __dirname});
});
    
app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});