const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.static('public')); // HTML-Datei dort rein
app.use(express.json());

app.post('/save-order', (req, res) => {
    const data = req.body;
    const line = `${data.timestamp} | ${data.name} | ${data.email} | ${data.slides} Folien | Qualität ${data.quality} | ${data.totalPrice}€ | ${data.description}\n`;

    fs.appendFile(path.join(__dirname, 'info.txt'), line, (err) => {
        if (err) {
            console.error('Fehler beim Schreiben in info.txt:', err);
            return res.status(500).json({ success: false });
        }
        res.json({ success: true });
    });
});

app.listen(PORT, () => console.log(`Server läuft auf http://localhost:${PORT}`));
