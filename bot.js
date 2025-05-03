import { Client, Collection } from 'discord.js';
import { getNames, saveNames, showAllNames, searchName, addName, deleteName} from './black_list/commands.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { readFile } from 'fs/promises';

const client = new Client({
    intents: 3276799,
})

// Vars - Consts
const prefix = '$';
const raw = await readFile('./config.json', 'utf-8');
const config = JSON.parse(raw);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

client.on('error', console.error);

client.on('ready', async () => {
    console.log('¡El bot está listo!');
    //SlashCommands - Import 
    client.commands = new Collection();
    const commandFiles = fs.readdirSync('./slash_commands').filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const filePath = path.join(__dirname, 'slash_commands', file);
        try {
            const { command } = await import(`file://${filePath}`);
            client.commands.set(command.data.name, command);
        } catch (err) {
            console.error(`Error al cargar el comando ${file}: ${err.message}`);
        }
    }
    (async () => {
        try {
            await client.application.commands.set(client.commands.map(cmd => cmd.data.toJSON()));
            console.log(`Loaded ${client.commands.size} slash commands {/}`);
        } catch (error) {
            console.error('Error loading commands:', error);
        }
    })();
});

//Comandos - Declaracion
client.on('messageCreate', async (message) => {
    // Obtener Comando
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    console.log('Comando recibido:', message.content);
    const args = message.content.slice(prefix.length).split(' ');
    const command = args.shift().toLowerCase();
    // Ejecucion
    switch (command) {
        case 'verBlacklist':
            await showAllNames(message);
            break;
        case 'search':
            const nameToSearch = args.join(' ');
            await searchName(message, nameToSearch);
            break;
        case 'blacklist':
            const nameToAdd = args.join(' ');
            await addName(message, nameToAdd);
            break;
        case 'del':
            const nameToDelete = args.join(' ');
            await deleteName(message, nameToDelete);
            break;
        case 'ping':
            console.log('Pong');
            message.channel.send('Pong');
            break;
        default:
            message.channel.send('Juani es un pelotudo y no codeo tu comando, o lo estas poniendo mal y sos mas pelotudo que Juani');
            break;
    }
});
//SlashCommands - InteractionCreate
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

//SlashCommands
export async function verBlacklistSlash() {
    const names = await getNames("936708400367169577");
    return `La Blacklist es:\n${names.map(name => `- ${name}`).join('\n')}`;
}

export async function slashSearch(nameToSearch) { 
    const names = await getNames("936708400367169577");
    const found = names.includes(nameToSearch.toLowerCase());
    return found ? `${nameToSearch} está en la Blacklist.` : `${nameToSearch} no está en la Blacklist.`;
}

export async function slashAdd(nameToAdd) { 
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

export async function slashDel(nameToDelete) { 
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

// Login Bot
client.login(config.token);