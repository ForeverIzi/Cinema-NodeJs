import user from "../models/user.js";
import bcrypt from "bcrypt";

export const getAllUsers = async(req, res) => {
    try {
        const users = await user.find().select("-password");
        return res.json(users);
    } catch (err) {
        return res.status(500).json({error: err.message});
    }
}

export const getUserById = async(req, res) => {
    try {
        const {id} = req.params;
        const userDoc = await user.findById(id);
        if (!userDoc) {
            return res.status(404).json({message: "Usuário não encontrado"});
        };
        res.json(userDoc);
    } catch (err) {
        console.log("Erro ao encontrar usuário: ", err);
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
        console.log("Erro ao cadastrar usuário: ",err)
        res.status(500).json({message: err.message});
    };
};

export const updateUser = async(req,res) => {
    try {
        const updateUser = await user.findByIdAndUpdate(req.params.id, req.body, {new: true});
        return res.json(updateUser);
    } catch (err) {
        console.log("Erro ao atualizar: ", err);
        res.status(500).json({message: err.message});
    };
};

export const deleteUser = async(req,res) => {
    try {
        await user.findByIdAndDelete(req.params.id);
        return res.json({message: "Usuário deletado com sucesso"});
    } catch (err) {
        console.log("Erro ao Deletar Usuário: ", err);
        res.status(500).json({message: err.message});
    };
};
