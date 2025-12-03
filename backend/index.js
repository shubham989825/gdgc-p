const express = require('express');
const cors = require('cors');
const members = require('./members.json');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// GET /members - Returns all members
app.get('/members', (req, res) => {
    res.json(members);
});

// GET /members/:id - Returns details of one member
app.get('/members/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const member = members.find(m => m.id === id);

    if (member) {
        res.json(member);
    } else {
        res.status(404).json({ message: 'Member not found' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
