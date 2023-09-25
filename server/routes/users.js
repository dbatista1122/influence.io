var express = require('express');
const db = require('../../db/db');
var router = express.Router();


/* GET users async req. */
router.get('/getUsers', async(req, res) => {
    try {
        var result = await db.query('SELECT * FROM users');
        res.send(result.rows);
    }
    catch {
        res.status(400).json("Unsuccessful Request");
    }

});


module.exports = router;
