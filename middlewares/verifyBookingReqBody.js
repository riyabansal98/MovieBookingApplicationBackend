const constants = require("../utils/constants");
var ObjectId = require("mongoose").Types.ObjectId;
const Theatre = require("../models/theatre.model");

validateBookingRequestBody = async(req, res, next) => {

    if(!req.body.theatreId) {
        return res.status(400).send({
            message: "Failed! TheatreId is not provided"
        });
    }

    if(!ObjectId.isValid(req.body.theatreId)) {
        return res.status(400).send({
            message: "Failed! theatreId is not valid format"
        })
    }

    if(!req.body.movieId) {
        return res.status(400).send({
            message: "Failed! movieId is not provided !"
        }); 
    }

    if(!ObjectId.isValid(req.body.movieId)) {
        return res.status(400).send({
            message: "Failed! movieId is not valid format"
        })
    }

    const theatre = await Theatre.findOne({_id: req.body.theatreId});

    if(theatre == null) {
        return res.status(400).send({
            message: "Failed! Theatre passed doesn't exist !"
        });
    }

    if(!theatre.movies.includes(req.body.movieId)) {
        return res.status(400).send({
            message: "Failed! movieId passed is not available inside the theatre !"
        });
    }

    if(!req.body.timing) {
        return res.status(400).send({
            message: "Failed! timing is not provided !"
        }); 
    }

    if(!req.body.noOfSeats) {
        return res.status(400).send({
            message: "Failed! number of seats is not provided !"
        }); 
    }

    next();
}

const verifyBookingReqBody = {
    validateBookingRequestBody : validateBookingRequestBody
}

module.exports = verifyBookingReqBody;