const { Client, GatewayIntentBits } = require('discord.js');
const axios = require('axios');
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildVoiceStates,
    ],
});

const prefix = '!';

client.on('error', console.error);

client.on('ready', () => {
    console.log('¡Bot listo!');
});

client.on('messageCreate', async (message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    console.log('Mensaje recibido:', message.content);
    const args = message.content.slice(prefix.length).split(' ');
    const command = args.shift().toLowerCase();

    if (command === 'pelucheo') {
        execute(message,  args);
    } else {
        message.channel.send('Juani es un pelotudo y no codeo tu comando');
    }
});

async function execute(message, args) {
    console.log('Buscando nuevo evento asesino', message);

    try {
        const event = await eventFinder(args.join(' '));
        console.log("evento", event);
        
        const participantsList = event[0].map(participant => `Nombre: ${participant.name}, Poder Promedio: ${participant.number}`).join('\n');
        const groupMembersList = event[1].map(member => `- ${member}`).join('\n');

        const embedMessage = `
        **ID del Evento:** ${args.join(' ')}
        **Asistencias:**
        ${participantsList}

        **Grupo:**
        ${groupMembersList}
        `;

        message.channel.send(embedMessage);
    } catch (error) {
        console.error(error);
        message.channel.send(`Hubo un error: ${error.message}`);
    }
}


const eventFinder = async (query) => {
  const url = `https://gameinfo.albiononline.com/api/gameinfo/events/${query}`;

  try {
      const respuesta = await axios.get(url);
        const eventData = respuesta.data
        // Obtener el listado de participantes
        const participants = eventData.Participants.map(participant => ({
            name: participant.Name,
            number: participant.AverageItemPower
        }));
        console.log('Listado de Participantes:', participants);

        // Obtener el listado de miembros del grupo
        const groupMembers = eventData.GroupMembers.map(member => member.Name);
        console.log('Listado de Miembros del Grupo:', groupMembers);

        return [participants, groupMembers];
    } catch ( err) {
        console.error('Error al hacer la solicitud HTTP:', err.message);
    };
};

client.login('MTIwNTY4NzY4MDk4MjE5MjE1OA.GhLsXk.tFMO46HxQaLqY1bbAjR7gtDQanQuwA8gT7YVr0');