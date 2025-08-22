import user from "../models/user.js";
import bcrypt from "bcrypt";

export const getAllUsers = async(req, res) => {
    try {
        const users = await user.find();
        return res.json(users);
    } catch (err) {
        return res.status(500).json({error: err.message});
    }
}

export const getUserById = async(req, res) => {
    try {
        const userId = user.findById(req.params.id).select("-password");
        if (!user) {
            return res.status(404).json({message: "Usuário não encontrado"});
        };
        res.json(user);
    } catch (err) {
        res.status(500).json({message: err.message});
    };
};

export const createUser = async(req,res) => {
    try {
        const {firstName, lastName, cpf, birthDate, email, phone, address, password} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new user({
            firstName, lastName, cpf, birthDate, email, phone, address, password: hashedPassword
        });

        const returnUser = newUser.toObject();
        delete returnUser.password;

        await newUser.save();
        res.status(201).json({message: "Usuário cadastrado com sucesso!", user: returnUser});
    } catch (err) {
        res.status(500).json({message: err.message});
    };
};