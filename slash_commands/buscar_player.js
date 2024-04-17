const { SlashCommandBuilder } = require('discord.js');
const { slashSearch } = require('../index.js');
const config = require('../config.json');

module.exports = {
    // Datos
    data: new SlashCommandBuilder()
        .setName("buscar_player")
        .setDescription("Busca si un player esta o no en la blacklist")
        .addStringOption(option =>
            option.setName('nombre')
                .setDescription('Nombre a buscar en la blacklist')
                .setRequired(true)), // Required
    // Ejecución
    async execute(interaction) {
        // Autenticacion
        const rolId = "1017153663015325738";
        const tieneRol = interaction.member.roles.cache.has(rolId);
        if (tieneRol) {
            const name = interaction.options.getString('nombre');
            const resultado = slashSearch([name]);
            await interaction.reply(resultado);
        } else {
            await interaction.reply("No tienes permiso para ejecutar este comando.");
        }
    }
}