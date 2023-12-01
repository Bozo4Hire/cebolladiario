const express = require('express');
const router = express.Router();
const cors = require('cors');
const { test,
    getEntry,
    getEntries,
    createEntry,
    deleteEntry } = require('../controllers/entryController')

//middleware
router.use(
    cors({
        credentials: true,
        origin: 'https://main--superlative-hummingbird-ea8dbc.netlify.app'
    })
)

router.get('/test', test)

router.route('/')
    .get(getEntries)
    .post(createEntry)

router.route('/:id')
    .get(getEntry)
    .delete(deleteEntry)


module.exports = router