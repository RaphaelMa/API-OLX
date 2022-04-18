const express = require('express');
const router = express.Router();

const Auth = require('./middleware/Auth');

const AuthValidator = require('./validators/AuthValidator');

const AuthController = require('./controllers/AuthController');
const UserController = require('./controllers/UserController');
const AdsController = require('./controllers/AdsController');

router.get('/ping', (req, res) => {
    res.json({ pong: true });
});

// Users
router.get('/states', UserController.getStates);

router.post('/user/signin', AuthValidator.signin, AuthController.signin);
router.post('/user/signup', AuthValidator.signup, AuthController.signup);

router.get('/user/me', Auth.private, UserController.info);
router.put('/user/me', Auth.private, UserController.editAction);

router.get('/categories', AdsController.getCategories);

router.post('/ads/add', Auth.private, AdsController.addAction);
router.get('/ads/list', AdsController.getList);
router.get('/ads/item', AdsController.getItem);
router.post('/ads/:id', Auth.private, AdsController.editAction);



module.exports = router;