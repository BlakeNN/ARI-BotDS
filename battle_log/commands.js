import axios from "axios";

export async function getPlayersOfBattle(message, battleId, guild) {
    try {
        const response = await axios.get(`https://gameinfo.albiononline.com/api/gameinfo/battles/${battleId}`);
        const data = response.data;
        if(data) {
            const playersFiltered = Object.values(data.players)
            .filter(player => player.guildName === guild)
            .map(player => player.name);
            let cant = playersFiltered.length
            message.channel.send(`**Asistencia: ${cant} Players**\n${playersFiltered.map(name => `- ${name}`).join('\n')}`);
        }
    } catch (error) {
        console.log(`Error: ${error}`);
    }
}

export async function slashGetPlayersOfBattle(battleId, guild) {
    try {
        const response = await axios.get(`https://gameinfo.albiononline.com/api/gameinfo/battles/${battleId}`);
        const data = response.data;
        if (data) {
            const playersFiltered = Object.values(data.players)
                .filter(player => player.guildName === guild)
                .map(player => player.name);
                return playersFiltered;
            }
    } catch (error) {
        return `Error: ${error}`
    }
}
