const express = require('express');
const router = express.Router();

const AuthController = require('./controllers/AuthController');
const UserController = require('./controllers/UserController');
const AdsController = require('./controllers/AdsController');

// Users
router.get('/states', UserController.getStates);

router.post('/user/signin', UserController.signin);
router.post('/user/signup', UserController.signup);

router.get('/user/me', UserController.info);
router.put('/user/me', UserController.editAction);

router.get('/categories', AdsController.getCategories);

// router.post('/ads/add', AdsController.addAction);
// router.get('/ads/list', AdsController.getList);
// router.get('/ads/item', AdsController.getItem);
// router.post('/ads/:id', AdsAdsController.editAction);


router.get('/ping', (req, res) => {
    res.json({pong: true});
});

module.exports = router;