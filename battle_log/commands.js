import axios from "axios";

export async function getPlayersOfBattle(message, battleId) {
    try {
        const response = await axios.get(`https://gameinfo.albiononline.com/api/gameinfo/battles/${battleId}`);
        const data = response.data;
        if(data) {
            const playersFiltered = Object.values(data.players)
            .filter(player => player.guildName === "ArGentiNidad")
            .map(player => player.name);
            message.channel.send(`Participaron de esta pelea:\n${playersFiltered.map(name => `- ${name}`).join('\n')}`);
        }
    } catch (error) {
        console.log(`Error: ${error}`);
    }
}


