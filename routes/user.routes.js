const userController = require('../controllers/user.controller');
const { verifyUserReqBody, authJwt } = require("../middlewares");


module.exports = function (app) {

    app.put("/mba/api/v1/users/", [authJwt.verifyToken], userController.update);
    app.put("/mba/api/v1/users/:userId", [authJwt.verifyToken, authJwt.isAdmin, verifyUserReqBody.validateUserStatusAndUserType], userController.updateUser);
}