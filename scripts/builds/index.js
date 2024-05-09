const { Client, Collection, Guild } = require('discord.js');
const axios = require('axios');
const fs = require('fs');
const config = require('./config.json');

const client = new Client({
    intents: 3276799,
});

const tokenGist = config.tokenGist;
const gistId = config.gistId;
const gistId2 = config.gistId2;
const gistFilename = 'nombres.json';
const gistFilename2 = 'mashBlacklist.json';
const prefix = '$';
const id_canal = '936708400945971233';
const hora = 10; // Hora 
const minutos = 30; // Minutos
const id_canal2 = '1219801234270060596';


// DB de las imgs
const database = {
    "ava-buff": ["arco.jpg", "corta-curas.jpg", "enigmatico.jpg", "flamigero.jpg", "frost.jpg", "healer-party.jpg", "main-healer.jpg", "main-tank.jpg", "monje-negro.jpg", "prisma.jpg", "sc.jpg", "set-skip.jpg", "xbow.jpg"],
    "ava-full": ["1h-arcano.jpg", "arco.jpg", "flamigero.jpg", "frost.jpg", "gran-arcano.jpg", "healer-party1.jpg", "healer-party2.jpg", "ironroot.jpg", "main-heal.jpg", "main-tank.jpg", "off-tank.jpg", "rompe-reinos.jpg", "sc-dps.jpg", "sc-supp.jpg", "xbow.jpg"],
    "gank": ["ballesta-oneshot.jpg", "concedemuertes.jpg", "doble-daga.jpg", "doble-filo.jpg", "fuego-1h.jpg", "garza.jpg", "gran-arcano.jpg", "grito-gelido.jpg", "lanza.jpg", "martillo-de-forja.jpg", "maza.jpg", "saetas.jpg", "susurrante.jpg", "vara-ava.jpg"],
    "wb": ["healers.jpg", "pierce.jpg", "rdps.jpg", "tanques.jpg", "utilidades.jpg"],
    "zvz": ["zvz.jpg"],
    "pvp": ["pvp.jpg"]
};

// Función para obtener la lista de nombres desde el Gist
async function getNames(serverId) {
    if (serverId == '936708400367169577') {
        try {
            const response = await axios.get(`https://api.github.com/gists/${gistId}`, {
                headers: {
                    Authorization: `token ${tokenGist}`,
                },
            });
            const content = response.data.files[gistFilename].content;
            return JSON.parse(content);
        } catch (error) {
            console.error('Error al obtener la lista de nombres:', error);
            return [];
        }
    } else if (serverId == '1219175921345364020') {
        try {
            const response = await axios.get(`https://api.github.com/gists/${gistId2}`, {
                headers: {
                    Authorization: `token ${tokenGist}`,
                },
            });
            const content = response.data.files[gistFilename2].content;
            return JSON.parse(content);
        } catch (error) {
            console.error('Error al obtener la lista de nombres:', error);
            return [];
        }
    } else {
        return(`Servidor no válido`)
    }
}

// Función para guardar la lista de nombres actualizada en el Gist
async function saveNames(names, serverId) {
    if (serverId == '936708400367169577') {
        try {
            await axios.patch(
                `https://api.github.com/gists/${gistId}`,
                {
                    files: {
                        [gistFilename]: {
                            content: JSON.stringify(names),
                        },
                    },
                },
                {
                    headers: {
                        Authorization: `token ${tokenGist}`,
                    },
                }
            );
            return true;
        } catch (error) {
            console.error('Error al guardar la lista de nombres:', error);
            return false;
        }
    } else if (serverId == '1219175921345364020') {
        try {
            await axios.patch(
                `https://api.github.com/gists/${gistId2}`,
                {
                    files: {
                        [gistFilename2]: {
                            content: JSON.stringify(names),
                        },
                    },
                },
                {
                    headers: {
                        Authorization: `token ${tokenGist}`,
                    },
                }
            );
            return true;
        } catch (error) {
            console.error('Error al guardar la lista de nombres:', error);
            return false;
        }
    } else {
        return(`Servidor no valido`)
    }
}

// Función para mostrar toda la lista de nombres
async function showAllNames(message) {
    try {
        const serverId = message.guild.id;
        const names = await getNames(serverId);
        message.channel.send(`La Blacklist es:\n${names.map(name => `- ${name}`).join('\n')}`);
    } catch (error) {
        console.error('Error al mostrar la lista de nombres:', error);
        message.channel.send('Hubo un error al mostrar la lista de nombres.');
    }
}

// Función para buscar un nombre en la lista
async function searchName(message, nameToSearch) {
    try {
        const serverId = message.guild.id;
        const names = await getNames(serverId);
        const found = names.includes(nameToSearch);
        message.channel.send(found ? `${nameToSearch} está en la Blacklist.` : `${nameToSearch} no está en la Blacklist.`);
    } catch (error) {
        console.error('Error al buscar el nombre:', error);
        message.channel.send('Hubo un error al buscar el nombre.');
    }
}

// Función para agregar un nombre a la lista
async function addName(message, nameToAdd, args) {
    try {
        const serverId = message.guild.id;
        const names = await getNames(serverId);
        names.push(nameToAdd);
        const saved = await saveNames(names, serverId);
        if (serverId == "936708400367169577") {
            if (saved) {
                message.channel.send(`${nameToAdd} agregado a la Blacklist.`);
                const logChannelId = '967450894524358686';
                const logChannel = await message.client.channels.fetch(logChannelId);
                const motivo = args.slice(1)
                const motivoCon = motivo.join(" ")
                // Enviar el nombre del miembro al canal de registro
                logChannel.send(args[0] + " " + motivoCon);
            } else {
                message.channel.send(`Error al agregar ${nameToAdd} a la Blacklist.`);
            }
        } else if (serverId == "1219175921345364020") {
            if (saved) {
                message.channel.send(`${nameToAdd} agregado a la Blacklist.`);
            } else {
                message.channel.send(`Error al agregar ${nameToAdd} a la Blacklist.`);
            }
        } else {
            message.reply('Servidor no valido')
        }
    } catch (error) {
        console.error('Error al agregar el nombre:', error);
        message.channel.send('Hubo un error al agregar el nombre.');
    }
}

// Función para eliminar un nombre de la lista
async function deleteName(message, nameToDelete) {
    try {
        const serverId = message.guild.id;
        const names = await getNames(serverId);
        const index = names.indexOf(nameToDelete);
        if (index !== -1) {
            names.splice(index, 1);
            const saved = await saveNames(names, serverId);
            if (saved) {
                message.channel.send(`${nameToDelete} eliminado de la Blacklist.`);
            } else {
                message.channel.send(`Error al eliminar ${nameToDelete} de la Blacklist.`);
            }
        } else {
            message.channel.send(`${nameToDelete} no encontrado en la Blacklist.`);
        }
    } catch (error) {
        console.error('Error al eliminar el nombre:', error);
        message.channel.send('Hubo un error al eliminar el nombre.');
    }
}

client.on('error', console.error);

client.on('ready', async () => { //Funcion para mandar los mensajes diarios
    console.log('¡El bot está listo!');
    // Obtener el canal por ID
    const channel = await client.channels.fetch(id_canal);
    const channel2 = await client.channels.fetch(id_canal2);
    // Función para enviar mensaje
    const sendMessage = () => {
        // Obtener hora y minutos actuales
        const currentHour = new Date().getHours();
        const currentMinute = new Date().getMinutes();
        // Verificacion
        if (currentHour === hora && currentMinute === minutos) {
            // Enviar mensaje 
            channel.send('||@here ||\n**Desde el staff del gremio les deseamos buenos días a todos **\n:small_blue_diamond:Recuerden que nadie del staff les va a pedir por susurro que les presten su mamut o algún otro ítem de alto valor\n**Eviten caer en estafas** \n:small_blue_diamond:También recordarles que se lean el canal de <#936713325348270121>, en el mismo encontraran las normas del **Gremio** \n**Buena suerte a todos**');
            channel2.send(':scroll: **M A S H L E**:scroll:\n\n **¿Quiénes somos?**\nSomos un gremio que busca jugadores para contenido en general\n\n**¿Qué ofrecemos?**\n:white_check_mark:Guild Bomb\n:white_check_mark:Word Boss / Faccion / Gank / Avalonianas\n:white_check_mark:Comunidad para jugar\n:white_check_mark:Contenido  18/20/22/04 UTC)\n:white_check_mark:0% Tax / No cuotas\n\n**¿Qué buscamos?**\n:shield: PC Player\n:shield: Ser Activo\n\n**Para finalizar, estamos ubicados en ThetFort** https://discord.gg/mashleao ||@here||');
        }
    };
    // Verificar la hora cada minuto
    setInterval(sendMessage, 60000);
    client.commands = new Collection();
    //SlashCommands - Import 
    fs.readdirSync("./slash_commands").forEach((commandFile) => {
        const command = require(`./slash_commands/${commandFile}`);
        client.commands.set(command.data.name, command);
    });
    (async () => {
        try {
            await client.application.commands.set(client.commands.map(cmd => cmd.data.toJSON()));
            console.log(`Loaded ${client.commands.size} slash commands {/}`);
        } catch (error) {
            console.error('Error loading commands:', error);
        }
    })();
});
//Slash Commands - Evento
client.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error('Error executing command:', error);
    }
});
//Comandos - Declaracion
client.on('messageCreate', async (message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    console.log('Mensaje recibido:', message.content);
    const args = message.content.slice(prefix.length).split(' ');
    const command = args.shift().toLowerCase();
    if (command === 'builds') {
        execute(message, args);
    } else if (command === 'mostrar') {
        choose(message, args);
    } else if (command === 'cats') {
        listCats(message, args);
    } else if (command === 'all') {
        listAll(message, args);
    } else if (command == 'hora') {
        horario(message, args);
    } else if (command == 'bs') {
        await showAllNames(message);
    } else if (command === 's') {
        const nameToSearch = args.join(' ');
        await searchName(message, nameToSearch);
    } else if (command === 'blacklist') {
        const nameToAdd = args.join(' ');
        await addName(message, nameToAdd);
    } else if (command === 'del') {
        const nameToDelete = args.join(' ');
        await deleteName(message, nameToDelete);
    } else {
        message.channel.send('Juani es un pelotudo y no codeo tu comando, o lo estas poniendo mal y sos mas pelotudo que Juani');
    }
});

async function execute(message, args) { //$builds
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
function listCats(message) { //$cats
    let cats = []
    for (const index in database) {
        cats.push(`- ` + index);
    }
    message.channel.send("Las categorias disponibles son: \n" + cats.join('\n'));
}
function listAll(message) { //$all
    let all = []
    for (const index in database) {
        database[index].forEach(option => all.push(`${`- `} ${index} - ${option}`));
    }
    message.channel.send("Las categorias y opciones disponibles son: \n" + all.join('\n'));
}
function horario(message) { //$hora
    // Hora UTC
    const horaUTC = new Date();
    // Hora Argentina (UTC -3)
    const horaARG = new Date(horaUTC);
    horaARG.setUTCHours(horaARG.getUTCHours());
    // Hora España (UTC +1)
    const horaESP = new Date(horaUTC);
    horaESP.setUTCHours(horaESP.getUTCHours());
    // Formateamos las horas y minutos
    const formatAR = horaARG.toLocaleTimeString('es-AR', { timeZone: 'America/Argentina/Buenos_Aires', hour12: false });
    const formatES = horaESP.toLocaleTimeString('es-ES', { timeZone: 'Europe/Madrid', hour12: false });
    const formatUTC = horaUTC.toISOString().slice(11, 19);
    // Msg
    message.channel.send("Son las: \n" + formatAR + "hs en :flag_ar: \n" + formatES + "hs en :flag_es: \n" + formatUTC + "UTC");
}

async function choose(message, args) { //$mostrar
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
            // Descargar la img
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
            message.channel.send(`Categoría o imagen no encontrada.\n Poné bien el comando salame ($mostrar "categoria" "build")`);
        }
    } catch (error) {
        console.error(error);
        message.channel.send(`Hubo un error: ${error.message}\n Poné bien el comando salame ($mostrar "categoria" "build")`);
    }
}
//SlashCommands
async function bsSlash() { //bs
    const names = await getNames("936708400367169577");
    return `La Blacklist es:\n${names.map(name => `- ${name}`).join('\n')}`;
}

async function slashSearch(nameToSearch) { //$s
    const names = await getNames("936708400367169577");
    const found = names.includes(nameToSearch.toLowerCase());
    return found ? `${nameToSearch} está en la Blacklist.` : `${nameToSearch} no está en la Blacklist.`;
}

async function slashAdd(nameToAdd, motivo) { //$blacklist
    const names = await getNames("936708400367169577");
    if (names.includes(nameToAdd.toLowerCase())) {
        return `${nameToAdd} ya está en la Blacklist`;
    } else {
        names.push(nameToAdd.toLowerCase());
        const saved = await saveNames(names, serverId);
        if (saved) {
            // Obtener el canal por ID
            const logChannelId = '967450894524358686';
            const logChannel = await interaction.client.channels.fetch(logChannelId);
            logChannel.send(`${nameToAdd} Motivo: ${motivo}`);
            return `${nameToAdd} agregado a la Blacklist.`;
        } else {
            return `Error al agregar ${nameToAdd} a la Blacklist.`;
        }
    }
}

async function slashDel(nameToDelete) { //$del
    const names = await getNames("936708400367169577");
    const index = names.indexOf(nameToDelete.toLowerCase());
    if (index !== -1) {
        names.splice(index, 1);
        const saved = await saveNames(names, serverId);
        if (saved) {
            return `${nameToDelete} eliminado de la Blacklist.`;
        } else {
            return `Error al eliminar ${nameToDelete} de la Blacklist.`;
        }
    } else {
        return `${nameToDelete} no encontrado en la Blacklist.`;
    }
}

module.exports = { slashSearch, bsSlash, slashAdd, slashDel };
const token = "MTIwNTkyNzc1Nzk1MTc5NTMwMA.GVDWX7.vJkZXSG8QNI5_fUlFo0byVBoYqDsezpeypGVRM"; //token
client.login(token);