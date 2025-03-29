const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');  // Import the cors package
const math = require('mathjs');
const app = express();

const PORT  = 3030;

app.use(cors());  // Use the cors middleware

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.post('/equation', (req, res) => {
    let eq = String(req.body.eq);
    let range = [];
    try {
        for (let x = 0; x < 1500; x++) {
            let y = math.evaluate(eq, {x: x});
            range.push(y);
        }
        return res.status(200).json(range);
    } catch (error) {
        return res.status(500).send("Internal Server Error");
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
