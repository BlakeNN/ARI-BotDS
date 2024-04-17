const { SlashCommandBuilder } = require('discord.js');
const { slashDel } = require('../index.js');

module.exports = {
    // Datos
    data: new SlashCommandBuilder()
        .setName("eliminar_player")
        .setDescription("Elimina un player de la blacklist")
        .addStringOption(option =>
            option.setName('nombre')
                .setDescription('Nombre a añadir en la blacklist')
                .setRequired(true)), // Required
    // Ejecución
    async execute(interaction) {
        // Autenticacion
        const rolId = "1017153663015325738";
        const tieneRol = interaction.member.roles.cache.has(rolId);
        if (tieneRol) {
            const name = interaction.options.getString('nombre');
            const eliminar = slashDel(name); // Corrección aquí
            await interaction.reply(eliminar);
        } else {
            await interaction.reply("No tenes acceso"); // Ajusta ephemeral según lo necesites
        }
    }
}