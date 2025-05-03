const { SlashCommandBuilder } = require('discord.js');
const Discord = require('discord.js');
const { bsSlash } = require('../index.js');

module.exports = {
    //Datos
    data: new SlashCommandBuilder()
        .setName("ver_blacklist")
        .setDescription("Muestra toda la blacklist"),
    //Ejecucion
    async execute(interaction) {
        // Autenticacion
        const rolId = "1017153663015325738";
        const rol2Id = "936719819842129940";
        const tieneRol = interaction.member.roles.cache.has(rolId);
        const tieneRol2 = interaction.member.roles.cache.has(rol2Id);
        if (tieneRol || tieneRol2) {
            try {
                const msg = await bsSlash(); // Espera la respuesta de la función bsSlash
                // Envía el mensaje
                await interaction.reply(msg);
            } catch (error) {
                console.error('Error al ejecutar el comando:', error);
                await interaction.reply('Ocurrió un error al ejecutar el comando.');
            }
        } else {
            await interaction.reply("No tienes permiso para ejecutar este comando (Solo disponible en el servidor de ArGentiNidad)");
        }
    }
}