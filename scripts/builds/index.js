const { Client, Collection, Guild } = require('discord.js');
const axios = require('axios');
const fs = require('fs');
const config = require('./config.json');

const client = new Client({
    intents: 3276799,
});

const tokenGist = config.tokenGist;
const gistId = config.gistId;
const gistFilename = 'nombres.json';
const prefix = '$';
const id_canal = '936708400945971233';
const hora = 10; // Hora 
const minutos = 30; // Minutos
const id_canal2 = '1219801234270060596';
const id_canal3 = '1245166385735139328';
let namesGiveaway = [];
let serverId = config.id_arg;

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
    } else {
        return(`Servidor no valido`)
    }
}

// Función para mostrar toda la lista de nombres
async function showAllNames(message) {
    try {
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
        const names = await getNames(serverId);
        names.push(nameToAdd);
        const saved = await saveNames(names, serverId);
        if (serverId == "936708400367169577") {
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
    const channel3 = await client.channels.fetch(id_canal3);
    // Función para enviar mensaje
    const sendMessage = () => {
        // Obtener hora y minutos actuales
        const currentHour = new Date().getHours();
        const currentMinute = new Date().getMinutes();
        // Verificacion
        if (currentHour === hora && currentMinute === minutos) {
            // Enviar mensaje 
            const candidatoId = '996601587277500447';
            channel.send('||@here ||\n**Desde el staff del gremio les deseamos buenos días a todos **\n:small_blue_diamond:Recuerden que nadie del staff les va a pedir por susurro que les presten su mamut o algún otro ítem de alto valor\n**Eviten caer en estafas** \n:small_blue_diamond:También recordarles que se lean el canal de <#936713325348270121>, en el mismo encontraran las normas del **Gremio** \nAnte cualquier duda, consulta o queja ya saben, el Staff esta disponible, solo manden un DM\n**Buena suerte a todos**');
            channel2.send(':scroll: **M A S H L E**:scroll:\n\n **¿Quiénes somos?**\nSomos un gremio que busca jugadores para contenido en general\n\n**¿Qué ofrecemos?**\n:white_check_mark:Guild Bomb\n:white_check_mark:Word Boss / Faccion / Gank / Avalonianas\n:white_check_mark:Comunidad para jugar\n:white_check_mark:Contenido  18/20/22/04 UTC)\n:white_check_mark:0% Tax / No cuotas\n\n**¿Qué buscamos?**\n:shield: PC Player\n:shield: Ser Activo\n\n**Para finalizar, estamos ubicados en ThetFort** https://discord.gg/mashleao ||@here||');
            channel3.send(`||<@&${candidatoId}> ||\n:flag_ar: **ArGentiNidad** :flag_ar:\n\n**¿Quiénes somos?**\nSomos un gremio de veteranos que esta en búsqueda de nuevos integrantes con ganas de jugar, reírse un rato y disfrutar.\n\n**¿Qué ofrecemos?**\n:white_check_mark: Avalonianas - Fama - Roams - Ganks.\n:white_check_mark: Comunidad sin toxicidad.\n:white_check_mark: Contenido variado en casi todos los horarios.\n:white_check_mark: 0 Tax - 0 Cuota.\n\n**Requisitos:**\n:shield: 120M de Fama general\n:shield: 20M de Fama PvP\n:shield: Ser Activo en Discord\n:shield: Respeto y Compañerismo\n\nEstamos ubicados en Lymhurst: https://discord.gg/XDJRAhfZPU`);
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
    if (command == 'bs') {
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
    } else if (command == 'sorteo') {
        namesGiveaway = [];
        // console.log(`Array vacio: ${namesGiveaway}`)
        const ganadores = args[0];
        // console.log(ganadores);
        args.shift();
        const names = args.forEach(function(argumento){
            namesGiveaway.push(argumento);
        });
        // console.log(args);
        // console.log(namesGiveaway);
        message.channel.send(crearSorteo(names, ganadores));
    } else if (command == 'test') {
        testeo();
    } else {
        message.channel.send('Juani es un pelotudo y no codeo tu comando, o lo estas poniendo mal y sos mas pelotudo que Juani');
    }
});

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
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}
function crearSorteo(names, ganadores) {
    listaOrd = `${namesGiveaway.map(name => `- ${name}`).join('\n')}`
    largo = namesGiveaway.length;
    if (ganadores > largo) {
        return `No puedes ingresar mas ganadores que participantes`;
    } else if (ganadores == largo) {
        if (ganadores == 1) {
            return `Aviso: Ingresaste la misma cantidad de ganadores y de participantes.\nLa lista de participantes es:\n${listaOrd}\nEl ganador es:\n${finalizarSorteo(names, ganadores)}`;
        } else if (ganadores != 0) {
            return `Aviso: Ingresaste la misma cantidad de ganadores y de participantes.\nLa lista de participantes es:\n${listaOrd}\nLos ganadores son:\n${finalizarSorteo(names, ganadores)}`;
        } else {
            return `No puede haber 0 ganadores`
        }
    } else {
        if (ganadores == 1) {
            return `La lista de participantes es:\n${listaOrd}\nEl ganador es:\n${finalizarSorteo(names, ganadores)}`;
        } else if (ganadores != 0) {
            return `La lista de participantes es:\n${listaOrd}\nLos ganadores son:\n${finalizarSorteo(names, ganadores)}`;
        } else {
            return `No puede haber 0 ganadores`
        }
    }

}
function finalizarSorteo(names, ganadores) {
    let i = 0;
    let msgGanadores = '';
    let listaGanadores = [];
    let yaGano = [];
    let minimo = 0;
    let largo = namesGiveaway.length;
    let maximo = largo - 1;
    let nroRandom = 0;
    while (i < ganadores) {
        if (yaGano.includes(nroRandom)) {
            console.log("Repetido");
            namesGiveaway.shift[nroRandom];
            yaGano = [];
            largo = namesGiveaway.length;
            let maximo = largo - 1;
            nroRandom = getRandomIntInclusive(minimo, maximo);
            let ganador = namesGiveaway[nroRandom];
            yaGano.push(nroRandom);
            listaGanadores.push(ganador) 
            i = i + 1;
        } else {
            nroRandom = getRandomIntInclusive(minimo, maximo);
            let ganador = namesGiveaway[nroRandom];
            yaGano.push(nroRandom);
            listaGanadores.push(ganador) 
            i = i + 1;
        }
    }
    msgGanadores = `${listaGanadores.map(name => `- ${name}`).join('\n')}`
    // console.log(listaGanadores);
    // console.log(msgGanadores);
    return `${msgGanadores}`;
}

module.exports = { slashSearch, bsSlash, slashAdd, slashDel };
const token = "MTIwNTkyNzc1Nzk1MTc5NTMwMA.GVDWX7.vJkZXSG8QNI5_fUlFo0byVBoYqDsezpeypGVRM"; //token
client.login(token);