const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema({
    room: {
        type: String,
        required: true
    },
    roomId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    checkInDate: {
        type: String,
        required: true
    },
    checkOutDate: {
        type: String,
        required: true
    },
    totalAmount: {
        type: Number,
        required: true
    },
    duration:{
        type: Number,
        required: true
    }, 
    paymentId: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: "Booked"
    }

    
},{
    timestamps: true
})

const bookingModel = mongoose.model('booking', bookingSchema);

module.exports = bookingModel;