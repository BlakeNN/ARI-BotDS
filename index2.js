const { Client, GatewayIntentBits } = require('discord.js');
const axios = require('axios'); //No se si se usa esto, creo que no

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildVoiceStates,
    ],
});

const prefix = '$';

// Simulación de la db
const database = {
    "Ava-Buff": ["Arco.jpg", "Corta-Curas.jpg", "Enigmatico.jpg", "Flamigero.jpg", "Frost.jpg", "Healer-Party.jpg", "Main-Healer.jpg", "Main-Tank.jpg", "Monje-Negro.jpg", "Prisma.jpg", "SC.jpg", "Set-Skip.jpg", "xBow.jpg"],
    "Ava-Full": ["1H-Arcano.jpg", "Arco.jpg", "Flamigero.jpg", "Frost.jpg", "Gran-Arcano.jpg", "Healer-Party1.jpg", "Healer-Party2.jpg", "IronRoot.jpg", "Main-Heal.jpg", "Main-Tank.jpg", "Off-Tank.jpg", "Rompe-Reinos.jpg", "SC-DPS.jpg", "SC-SUPP.jpg", "xBow.jpg"],
    "Gank": ["Ballesta-OneShot.jpg", "Concedemuertes.jpg", "Doble-Daga.jpg", "Doble-Filo.jpg", "Fuego-1H.jpg", "Garza.jpg", "Gran-Arcano.jpg", "Grito-Gelido.jpg", "Lanza.jpg", "Martillo-de-Forja.jpg", "Maza.jpg", "Saetas.jpg", "Susurrante.jpg", "Vara-Ava.jpg"],
    "WB": ["Healers.jpg", "Pierce.jpg", "RDPS.jpg", "Tanques.jpg", "Utilidades.jpg"],
    "ZvZ": ["ZvZ.jpg"]
};

client.on('error', console.error);

client.on('ready', () => {
    console.log('¡Bot listo!');
});

client.on('messageCreate', async (message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    console.log('Mensaje recibido:', message.content);
    const args = message.content.slice(prefix.length).split(' ');
    const command = args.shift().toLowerCase();

    if (command === 'builds') {
        execute(message, args);
    } else if (command === 'mostrar') {
        choose(message, args);
    } else {
        message.channel.send('Juani es un pelotudo y no codeo tu comando');
    }
});

async function execute(message, args) {
    console.log('Buscando imagen', args);

    try {
        // Obtener categoria
        const categoria = args[0];
        if (categoria in database) {
            // Enviar cada opcion
            const opciones = database[categoria].map(opcion => `- ${opcion}`).join('\n');
            message.channel.send(`Elige una opción de ${categoria}:\n${opciones}`);
        } else {
            message.channel.send("Categoría no encontrada.");
        }
    } catch (error) {
        console.error(error);
        message.channel.send(`Hubo un error: ${error.message}`);
    }
}

async function choose(message, args) {
    console.log('Eligiendo imagen', args);

    try {
        console.log('Argumentos completos:', args);

        const categoria = args[0]; // La categoría es el primer elemento 
        let imagen = args[1]; // El nombre de la imagen es el segundo elemento 
        
        console.log('Categoría:', categoria);
        console.log('Imagen:', imagen);
        if (imagen.endsWith(".jpg")) {
            console.log("Ya tiene la extension")
        } else {
            imagen = imagen + ".jpg"
        }
        if (categoria in database && database[categoria].includes(imagen)) {
            const url = `https://github.com/BlakeNN/ARI-Builds/blob/main/imagenes/${categoria}/${imagen}?raw=true`; //"?raw=true" para que sea el link de la img y no dle html
            
            // Descargar de la img
            const response = await axios.get(url, {
                responseType: 'arraybuffer' // No se que puta hace esto
            });

            message.channel.send({
                files: [{
                    attachment: response.data,
                    name: imagen
                }]
            });
            console.log(response);
        } else {
            message.channel.send("Categoría o imagen no encontrada.");
        }
    } catch (error) {
        console.error(error);
        message.channel.send(`Hubo un error: ${error.message}`);
    }
}

const token = "MTIwNTkyNzc1Nzk1MTc5NTMwMA.G3MY4v.GYjbAe7ot9d5ZCUvSKcPOWmWlZ2X668eWwGbAU"; //token
client.login(token);
