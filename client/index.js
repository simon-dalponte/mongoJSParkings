const router = require('express').Router();

router.get('/', (req, res) => {
    res.sendFile('./client/views/test.html', { root: '.' });
});

module.exports = router;
