const child_process = require('child_process');
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send(child_process.execSync("pwd").toString('utf8'));
});
    
app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});