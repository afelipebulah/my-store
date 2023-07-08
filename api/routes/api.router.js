const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.json({
        "route":"/api",
        "version":"v0.0.1"
    });
});

module.exports = router;