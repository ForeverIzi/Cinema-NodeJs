import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
    movie: {type: mongoose.Schema.Types.ObjectId, ref: "movie", required: true},
    room: {type: String, required: true, trim: true, maxlength: 50},
    date: {type: Date, required: true},
    startTime: {type: Date, required: true},
    version: {type: String, required: true, enum:["2D", "3D", "IMAX"], default: "2D"},
    lenguage: {type: String, enum: ["Dublado", "Legendado"], default: "Dublado"},
    totalSeats: {type: Number, required: true},
    occupiedSeats: [{
        seatNumber: {type: String, required: true},
        user: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    }],
    price: {type: Number, required: true},
    createdAt: {type: Date, default: Date.now},
});

sessionSchema.methods.getAvailableSeats = function () {
    return this.totalSeats - this.occupiedSeats.length;
};

const Session = mongoose.model("Session", sessionSchema);

export default Session;