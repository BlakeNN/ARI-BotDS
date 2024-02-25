const { Client, GatewayIntentBits } = require('discord.js');
const axios = require('axios'); 

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,   //"intenciones" del bot
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildVoiceStates,
    ],
});

const prefix = '$';
const CHANNEL_ID = '936708400945971233';
const HOUR_TO_SEND = 10; // Hora 
const MINUTE_TO_SEND = 30; // Minutos

// DB de indice
const database = {
    "ava-buff": ["arco.jpg", "corta-curas.jpg", "enigmatico.jpg", "flamigero.jpg", "frost.jpg", "healer-party.jpg", "main-healer.jpg", "main-tank.jpg", "monje-negro.jpg", "prisma.jpg", "sc.jpg", "set-skip.jpg", "xbow.jpg"],
    "ava-full": ["1h-arcano.jpg", "arco.jpg", "flamigero.jpg", "frost.jpg", "gran-arcano.jpg", "healer-party1.jpg", "healer-party2.jpg", "ironroot.jpg", "main-heal.jpg", "main-tank.jpg", "off-tank.jpg", "rompe-reinos.jpg", "sc-dps.jpg", "sc-supp.jpg", "xbow.jpg"],
    "gank": ["ballesta-oneshot.jpg", "concedemuertes.jpg", "doble-daga.jpg", "doble-filo.jpg", "fuego-1h.jpg", "garza.jpg", "gran-arcano.jpg", "grito-gelido.jpg", "lanza.jpg", "martillo-de-forja.jpg", "maza.jpg", "saetas.jpg", "susurrante.jpg", "vara-ava.jpg"],
    "wb": ["healers.jpg", "pierce.jpg", "rdps.jpg", "tanques.jpg", "utilidades.jpg"],
    "zvz": ["zvz.jpg"]
};

client.on('error', console.error);

client.on('ready', async () => {
    console.log('¡El bot está listo!');

    // Obtener el canal por ID
    const channel = await client.channels.fetch(CHANNEL_ID);

    // Función para enviar mensaje
    const sendMessage = () => {
        // Obtener hora y minutos actuales
        const currentHour = new Date().getHours();
        const currentMinute = new Date().getMinutes();
        
        // Verificacion
        if (currentHour === HOUR_TO_SEND && currentMinute === MINUTE_TO_SEND) {
            // Enviar mensaje 
            channel.send('@here Desde el staff del gremio les deseamos buenos dias a todos \nRecuerden que nadie del staff les va a pedir por susurro que les presten su mamut u algun otro item de alto valor \nEviten caer en estafas :3 ');
        }
    };

    // Verificar la hora cada minuto
    setInterval(sendMessage, 60000); 
});

client.on('messageCreate', async (message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    console.log('Mensaje recibido:', message.content);
    const args = message.content.slice(prefix.length).split(' ');
    const command = args.shift().toLowerCase();
    //Comandos
    if (command === 'builds') {
        execute(message, args);
    } else if (command === 'mostrar') {
        choose(message, args);
    } else if (command === 'cats') {
        listCats(message, args);
    } else if (command === 'all') {
        listAll(message, args);
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
function listCats(message, args) {
    let cats = [] 
    for (const index in database) {
        cats.push(`- ` + index);
    }
    message.channel.send("Las categorias disponibles son: \n" + cats.join('\n'));
}
function listAll(message, args) {
    let all = [] 
    for (const index in database) {
        database[index].forEach(option => all.push(`${`- `} ${index} - ${option}`));
    }
    message.channel.send("Las categorias y opciones disponibles son: \n" + all.join('\n'));
}
async function choose(message, args) {
    console.log('Eligiendo imagen', args);

    try {
        console.log('Argumentos completos:', args);

        const categoria = args[0].toLowerCase(); // La categoría es el primer elemento 
        let imagen = args[1].toLowerCase(); // El nombre de la imagen es el segundo elemento 
        
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

const token = "MTIwNTkyNzc1Nzk1MTc5NTMwMA.GVDWX7.vJkZXSG8QNI5_fUlFo0byVBoYqDsezpeypGVRM"; //token
client.login(token);
