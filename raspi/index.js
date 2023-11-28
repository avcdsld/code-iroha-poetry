const express = require('express');
const cors = require('cors');
const { exec } = require('child_process');
const { mac } = require('address');
const app = express();
const port = 80;

app.use(cors());

process.env.PATH = `${process.env.PATH}:/usr/local/go/bin`;

let macAddress = '';
mac(function (err, addr) {
    console.log(err);
    macAddress = addr;
});

app.get('/run', (req, res) => {
    const poem = req.query.poem;
    let command;
    switch (poem) {
        case 'i':
            command = 'node codes/interactiveArt.js';
            break;
        case 'ro':
            command = 'python3 codes/lofi_art.py';
            break;
        case 'ha':
            command = 'go run codes/hypermedia.go';
            break;
        case 'ni':
            // javac codes/NewMediaArt/Main.java
            command = 'java -cp codes/NewMediaArt Main';
            break;
        case 'ho':
            // mcs codes/PostMedium/PostMediumArt.cs
            command = 'mono codes/PostMedium/PostMediumArt.exe';
            break;
        case 'he':
            command = 'ruby codes/heliography.rb';
            break;
        case 'to':
            command = 'php codes/transmedia.php';
            break;
        default:
            res.status(500).send(`Error`);
            return;
    }

    const timeStart = process.hrtime();
    exec(command, (error, stdout, stderr) => {
        const timeResult = process.hrtime(timeStart);
        const elapsedTime = (timeResult[0] + timeResult[1] / 1e9).toString();
        if (error) {
            return res.status(500).send(`Error: ${error.message}`);
        }
        if (stderr) {
            return res.status(500).send(`Error: ${stderr}`);
        }
        console.log(stdout);
        res.send({
            elapsedTime,
            macAddress,
            timestamp: new Date().getTime()
        });
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
