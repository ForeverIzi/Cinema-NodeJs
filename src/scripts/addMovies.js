import mongoose from "mongoose";
import Movie from "../models/movie.js"; 

const MONGO_URI = "mongodb://127.0.0.1:27017/cinema";

const movies = [
  { name: "Matrix", ageRating: "16+", duration: 136, description: "Um hacker descobre a verdade sobre a realidade e a Matrix." },
  { name: "Toy Story", ageRating: "Livre", duration: 81, description: "História de brinquedos que ganham vida quando ninguém está olhando." },
  { name: "Inception", ageRating: "12+", duration: 148, description: "Um ladrão invade sonhos para plantar ideias na mente das pessoas." },
  { name: "Avengers: Endgame", ageRating: "12+", duration: 181, description: "Os heróis tentam desfazer o caos causado por Thanos." },
  { name: "The Lion King", ageRating: "Livre", duration: 88, description: "Um jovem leão aprende a assumir seu lugar como rei." },
  { name: "Titanic", ageRating: "12+", duration: 195, description: "Um romance a bordo do fatídico navio Titanic." },
  { name: "Jurassic Park", ageRating: "12+", duration: 127, description: "Dinossauros são trazidos de volta à vida em um parque temático." },
  { name: "The Dark Knight", ageRating: "16+", duration: 152, description: "Batman enfrenta o Coringa em Gotham City." },
  { name: "Forrest Gump", ageRating: "12+", duration: 142, description: "A vida de um homem simples que presencia eventos históricos." },
  { name: "Interstellar", ageRating: "12+", duration: 169, description: "Exploração espacial para salvar a humanidade." },
  { name: "Gladiator", ageRating: "16+", duration: 155, description: "Um general romano busca vingança contra o imperador corrupto." },
  { name: "The Shawshank Redemption", ageRating: "16+", duration: 142, description: "Amizade e esperança dentro de uma prisão." },
  { name: "Avatar", ageRating: "12+", duration: 162, description: "Humano interage com a população de Pandora." },
  { name: "Frozen", ageRating: "Livre", duration: 102, description: "Duas irmãs tentam salvar seu reino do gelo eterno." },
  { name: "The Godfather", ageRating: "18+", duration: 175, description: "Família mafiosa enfrenta desafios e traições, com violência explícita." },
  { name: "Star Wars: A New Hope", ageRating: "12+", duration: 121, description: "Luke Skywalker começa sua jornada para salvar a galáxia." },
  { name: "The Avengers", ageRating: "12+", duration: 143, description: "Heróis se unem para derrotar Loki." },
  { name: "Finding Nemo", ageRating: "Livre", duration: 100, description: "Um peixe-palhaço atravessa o oceano para encontrar seu filho." },
  { name: "The Incredibles", ageRating: "Livre", duration: 115, description: "Família de super-heróis tenta viver normalmente." },
  { name: "Guardians of the Galaxy", ageRating: "12+", duration: 121, description: "Grupo de desajustados protege a galáxia." },
  { name: "Harry Potter and the Sorcerer's Stone", ageRating: "12+", duration: 152, description: "O menino que sobreviveu descobre magia e aventura." },
  { name: "Pirates of the Caribbean", ageRating: "12+", duration: 143, description: "Jack Sparrow enfrenta piratas e mistérios no mar." },
  { name: "Wonder Woman", ageRating: "12+", duration: 141, description: "Uma princesa amazona luta pela justiça." },
  { name: "Deadpool", ageRating: "16+", duration: 108, description: "Anti-herói irreverente enfrenta criminosos." },
  { name: "Black Panther", ageRating: "12+", duration: 134, description: "Herói de Wakanda protege seu reino e o mundo." },
  { name: "Doctor Strange", ageRating: "12+", duration: 115, description: "Mago mestre enfrenta ameaças místicas." },
  { name: "Thor: Ragnarok", ageRating: "12+", duration: 130, description: "Thor precisa salvar Asgard de Hela." },
  { name: "Ant-Man", ageRating: "12+", duration: 117, description: "Homem diminuto usa habilidades para salvar o mundo." },
  { name: "Spider-Man: Homecoming", ageRating: "12+", duration: 133, description: "Peter Parker lida com ser herói adolescente." },
  { name: "Coco", ageRating: "Livre", duration: 105, description: "Um menino descobre a história de sua família no mundo dos mortos." },
  { name: "Moana", ageRating: "Livre", duration: 107, description: "Jovem aventureira tenta salvar sua ilha." },
  { name: "It", ageRating: "18+", duration: 135, description: "Crianças enfrentam o palhaço aterrorizante, muita violência e terror psicológico." },
  { name: "The Conjuring", ageRating: "18+", duration: 112, description: "Casal de investigadores enfrenta entidade demoníaca, terror intenso." },
  { name: "Hereditary", ageRating: "18+", duration: 127, description: "Família enfrenta acontecimentos horríveis e violentos." },
  { name: "A Quiet Place", ageRating: "16+", duration: 90, description: "Família sobrevive em mundo com monstros que caçam pelo som." },
  { name: "Get Out", ageRating: "16+", duration: 104, description: "Jovem negro descobre segredos sinistros na família de sua namorada." },
  { name: "Halloween", ageRating: "18+", duration: 106, description: "Serial killer aterrorizando adolescentes, muito gore e tensão." },
  { name: "Scream", ageRating: "18+", duration: 111, description: "Assassinato e suspense com violência explícita." },
  { name: "Shrek", ageRating: "Livre", duration: 90, description: "Ogro vive aventuras para salvar princesa." },
  { name: "Despicable Me", ageRating: "Livre", duration: 95, description: "Vilão se torna pai de três meninas." },
  { name: "Minions", ageRating: "Livre", duration: 91, description: "Minions fazem travessuras pelo mundo." },
  { name: "Kung Fu Panda", ageRating: "Livre", duration: 92, description: "Panda desajeitado aprende artes marciais." },
  { name: "Ice Age", ageRating: "Livre", duration: 81, description: "Animais pré-históricos enfrentam aventuras." },
  { name: "Madagascar", ageRating: "Livre", duration: 86, description: "Animais de zoológico chegam à ilha de Madagascar." },
  { name: "Jumanji", ageRating: "12+", duration: 104, description: "Jogo de tabuleiro liberta aventuras perigosas." },
  { name: "The Shining", ageRating: "18+", duration: 146, description: "Família isolada em hotel assombrado, terror psicológico intenso." },
  { name: "The Exorcist", ageRating: "18+", duration: 122, description: "Exorcismo de menina possuída, muito terror e violência." },
  { name: "Psycho", ageRating: "18+", duration: 109, description: "Clássico suspense com assassinato e tensão extrema." },
  { name: "The Silence of the Lambs", ageRating: "18+", duration: 118, description: "Agente do FBI enfrenta assassino canibal, muito suspense e violência." },
  { name: "It Follows", ageRating: "16+", duration: 100, description: "Jovem perseguida por entidade sobrenatural." },
  { name: "Coraline", ageRating: "12+", duration: 100, description: "Menina descobre mundo alternativo assustador." }
];

async function run() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ Conectado ao MongoDB local!");

    await Movie.insertMany(movies);
    console.log("🍿 Filmes inseridos com sucesso!");

    await mongoose.disconnect();
  } catch (err) {
    console.error("❌ Erro ao conectar ou adicionar filmes:", err.message);
  }
}

run();
