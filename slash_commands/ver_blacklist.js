const { SlashCommandBuilder } = require('discord.js');
const Discord = require('discord.js');
const { bsSlash } = require('../index.js');

module.exports = {
    //Datos
    data: new SlashCommandBuilder()
        .setName("ver_blacklist")
        .setDescription("Muestra toda la blacklist"),
    //Ejecucion
    execute(interaction) {
            const msg = bsSlash();
        //Rta
        interaction
            .reply(msg)
            .catch(console.error);
    }
}