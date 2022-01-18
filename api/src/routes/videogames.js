const {Router} = require('express');
const router = Router();

const {allGames} = require('../controllers/Videogames')
router.get('/default',allGames);

module.exports = router;