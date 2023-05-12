const Booking = require("../models/booking.model");
const Payment = require("../models/payment.model");
const constants = require("../utils/constants");

exports.getAllPayments = async(req, res) => {

    const queryObj = {};
    if(user.userType  = constants.userTypes.admin) {

    }else{
        const bookings = await Booking.find({
            _id: req.userId
        });

        const bookingIds = booking.map(b => b._id);
        queryObj._id = { $in: bookingIds}
    };

    const payments = await Payment.find(queryObj);
    res.status(200).send(payments);
}

exports.getPaymentOnId = async (req, res) => {

    try {
        const payments = await Payment.findOne({
            _id: req.params.id
        });
        res.status(200).send(payments);

    }catch(err) {
        res.status(500).send({
            message: "Internal error while searching for the payments"
        })
    }
}

exports.createPayment = async(req, res) => {

    const booking = await Booking.findOne({
        _id: req.body.bookingId
    });

    var bookingTime = booking.createdAt;
    var currentTime = Date.now();

    var minutes = Math.floor(((currentTime - bookingTime) / 1000) / 60);
    if(minutes > 5) {
        booking.status = constants.bookingStatus.expired;
        await booking.save();
        return res.status(200).send({
            message: "Can't do the payment as the booking is delayed and expired"
        })
    }

    var paymentObject = {
        bookingId: req.body.bookingId,
        amount: req.body.amount,
        status: constants.paymentStatus.success,
    }

    try {
        const payment = await Payment.create(paymentObject);
        booking.status = constants.bookingStatus.completed;
        await booking.save();
        return res.status(201).send(payment);
    }catch(err) {
        res.status(500).send({
            message: "Internal error while creating the booking"
        })
    }
}

