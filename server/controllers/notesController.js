const router = require('express').Router();

const notes = [];

router.post('/', async (req, res) => {
    try {
        notes.push(req.body);
    } catch (error) {
        console.log(error)
        res.status(400).json({
            message: 'Cannot create Note'
        });
    }
});

module.exports = router;