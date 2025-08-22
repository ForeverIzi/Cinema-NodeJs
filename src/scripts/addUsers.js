import mongoose from "mongoose";
import User from "../models/user.js";

const MONGO_URI = "mongodb://127.0.0.1:27017/cinema";

function generateCPF() {
  const randomNum = () => Math.floor(Math.random() * 10);
  let cpf = '';
  for (let i = 0; i < 11; i++) {
    cpf += randomNum();
  }
  return cpf;
};

function generateBirthDate() {
  const data = new Date();
  const anos = Math.floor(Math.random() * (70 - 18 + 1)) + 18;
  data.setFullYear(data.getFullYear() - anos);
  data.setMonth(Math.floor(Math.random() * 12));
  data.setDate(Math.floor(Math.random() * 28) + 1);
  return data;
};

function generatePhone() {
  const ddd = ['11', '21', '31', '41', '51', '61', '71', '81', '91'];
  const randomDDD = ddd[Math.floor(Math.random() * ddd.length)];
  const numero = Math.random().toString().substring(2, 11);
  return randomDDD + numero;
};

function generateZip() {
  return Math.random().toString().substring(2, 10);
};

const users = [];

const firstNames = ['João', 'Maria', 'Pedro', 'Ana', 'Carlos', 'Juliana', 'Paulo', 'Fernanda', 'Ricardo', 'Camila', 'Lucas', 'Patrícia', 'Marcos', 'Amanda', 'Rafael', 'Letícia', 'Diego', 'Bruna', 'Thiago', 'Tatiane', 'Davi', 'Kadu', 'Alex', 'Mariana', 'Lisangela', 'Lucas', 'Laila', 'Jaime', 'Gabriel', 'Matheus', 'Nicolas', 'Bruno', 'Matteo', 'Giovanna'];
const lastNames = ['Silva', 'Santos', 'Oliveira', 'Souza', 'Rodrigues', 'Ferreira', 'Alves', 'Pereira', 'Lima', 'Costa', 'Gomes', 'Martins', 'Rocha', 'Ribeiro', 'Carvalho', 'Monteiro', 'Mendes', 'Nascimento', 'Moreira', 'Barbosa', 'Moura', 'Dias', 'Tavares', 'Silvio', 'Fagundes', 'Furtado'];

const estados = ["AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS","MG","PA","PB","PR","PE","PI","RJ","RN","RS","RO","RR","SC","SP","SE","TO"];

for (let i = 0; i < 50; i++) {
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i}@email.com`;
  
  users.push({
    firstName: firstName,
    lastName: lastName,
    cpf: generateCPF(),
    birthDate: generateBirthDate(),
    email: email,
    phone: generatePhone(),
    address: {
      street: `Rua ${firstName} ${lastName}`,
      city: 'São Paulo',
      state: estados[Math.floor(Math.random() * estados.length)],
      zipCode: generateZip()
    },
    password: 'Senha123@', // Senha padrão para testes
    createdAt: new Date()
  });
}

async function run() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ Conectado ao MongoDB local!");

    await User.deleteMany({});
    console.log("Coleção limpa");

    await User.insertMany(users);
    console.log("50 usuários inseridos com sucesso!");

    await mongoose.disconnect();
    console.log("Desconectado do MongoDB");
  } catch (err) {
    console.error("❌ Erro ao conectar ou adicionar usuários:", err.message);
  }
}

run();