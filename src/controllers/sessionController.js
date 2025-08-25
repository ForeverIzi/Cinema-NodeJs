import Session from "../models/session.js";
import User from "../models/user.js";
import { generateFreeSeatNumbers } from "../utils/sessionFunctions.js";

export const getAvailableSeats = async(req,res) => {
    try {
        const session = await Session.findById(req.params.id).populate("occupiedSeats.user");
        if (!session) {
            return res.status(404).json({ message: "Sessão não encontrada" });
        }
        const freeSeats = generateFreeSeatNumbers(session.totalSeats, session.occupiedSeats);
        return res.status(200).json({sessionId: session._id, freeSeats, reservedSeats: session.occupiedSeats});

    } catch (err) {
        console.log("Erro: ", err);
        return res.status(500).json({ message: err.message });
    };
};

export const getSessionSeats = async(req,res) => {
    const session = Session.findById(rq.params.id);
    if (!session) {
        return res.status(404).json({message: "Sessão não encontrada"});
    };
    const availableSeats  = session.getAvailableSeats();
    const freeSeatNumbers = generateFreeSeatNumbers(session.totalSeats, session.occupiedSeats);
    res.json({avalableSeats, freeSeatNumbers});
}