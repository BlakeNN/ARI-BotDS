const { SlashCommandBuilder } = require('discord.js');
const { slashAdd } = require('../index.js');

module.exports = {
    // Datos
    data: new SlashCommandBuilder()
        .setName("añadir_player")
        .setDescription("Añade un player a la blacklist")
        .addStringOption(option =>
            option.setName('nombre')
                .setDescription('Nombre a añadir en la blacklist')
                .setRequired(true)) // Required
        .addStringOption(option =>
            option.setName('motivo')
                .setDescription('Motivo para añadir a la blacklist')
                .setRequired(true)), // Required
    // Ejecución
    async execute(interaction) {
        // Autenticacion
        const rolId = "1017153663015325738";
        const tieneRol = interaction.member.roles.cache.has(rolId);
        if (tieneRol) {
            const name = interaction.options.getString('nombre');
            const motivo = interaction.options.getString('motivo');
            const añadir = await slashAdd(name, motivo); // Corrección aquí
            await interaction.reply(añadir);
        } else {
            await interaction.reply("No tienes permiso para ejecutar este comando.");
        }
    }
}