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
const hora = 10; // Hora 
const minutos = 30; // Minutos
const id_canal = '1219801234270060596';
let namesGiveaway = [];
let serverId = config.id_arg;
const mensageMashle = `
**:cityscape: Ciudad:** Thetford
**:speaking_head: Idioma:** Español - Ingles 

:house: Sandmount Ascent HO3 LV8 C2 ademas 4 HO nivel 2 y 3 calidad 4 y 5
:deciduous_tree: :axe: Mapa de farmeo: Tier 8
:moneybag:  Tax: 0% / No cuota
:scroll: CTA obligatoria

 **Contenido:**
:white_check_mark: ZVZ Mediana y gran escala - Bomb
:white_check_mark: Mentoria ZVZ
:white_check_mark: Estatica / Diveo
:white_check_mark: Avalonianas
:white_check_mark: Gankeo-Roaming-Rastreo
:white_check_mark: Crafteo - Farmeo de recursos

:sparkles: **Requisito Estándar:** 5mil Kills // 50m PVP
:headphones: Tener Micrófono y Usar Discord 
:speaking_head: Usar TeamSpeak, si no lo tienes debes instalarlo (Tanks - Suports - Healers)
:knife: Tener experiencia ZvZ, si bien ayudamos a la gente con errores, debes tener experiencia 
:scroll: Leer las reglas y respetarlas, tenemos builds especificas para cada contenido asi que deberás ocuparlas. 
:warning: **NO** ser **toxico** y **participar** en las actividades junto al GREMIO!

Mashle te ofrece una experiencia de gremio completa; sin embargo, nuestro enfoque es orientado a la ZVZ, ya que este es nuestro gran contenido gremial. ¿Quieres disfrutar de nuestra acogedora comunidad, y de los beneficios que trae estar en nuestro gremio? Debes esforzarte en las CTA, Si te gusta la ZVZ y no te quieres quemar, entonces este es tu gremio. 
@everyone

Copia el link e invita a tus amigos:
https://discord.gg/9ugANRWRqt ||@here||
`;


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
        return (`Servidor no válido`)
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
        return (`Servidor no valido`)
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
    const channel = await client.channels.fetch(id_canal);
    // Función para enviar mensaje
    const sendMessage = () => {
        // Obtener hora y minutos actuales
        const currentHour = new Date().getHours();
        const currentMinute = new Date().getMinutes();
        // Verificacion
        if (currentHour === hora && currentMinute === minutos) {
            // Enviar mensaje 
            channel.send(mensageMashle);
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
        const ganadores = args[0];
        args.shift();
        const names = args.forEach(function (argumento) {
            namesGiveaway.push(argumento);
        });
        message.channel.send(crearSorteo(names, ganadores));
    } else if (command === 'test') {
        await testeo();
    } else if (command === 'test_commit') {
        message.channel.send(verifCom());
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

async function slashAdd(nameToAdd) { //$blacklist
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
    return `${msgGanadores}`;
}

export const objetivos = [];
// Intervalo para revisar los objetivos
setInterval(() => {
    const ahora = Date.now();
    objetivos.forEach((objetivo, index) => {
        if (ahora >= objetivo.tiempoTotal - objetivo.tiempoAviso) {
            const canal = client.channels.cache.get(objetivo.canalId);
            if (canal) {
                canal.send(`<@${objetivo.usuarioId}>\nEl objetivo "${objetivo.detalle}" termina en ${Math.round(objetivo.tiempoAviso / 60000)} minutos. Amuren`);
            }
            objetivos.splice(index, 1); // Eliminar después de avisar
        }
    });
}, 5000); // Revisar cada 5 segundos

async function testeo() {
    const channel = await client.channels.fetch(id_canal);
    channel.send(mensageMashle);
}
function verifCom() {
    return `Commit Realizado con Exito`;
}
module.exports = { slashSearch, bsSlash, slashAdd, slashDel };
//client.login(config.token);