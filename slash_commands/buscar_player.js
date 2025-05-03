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
        const rol2Id = "936719819842129940";
        const tieneRol = interaction.member.roles.cache.has(rolId);
        const tieneRol2 = interaction.member.roles.cache.has(rol2Id);
        if (tieneRol || tieneRol2) {
            // Imprimir el objeto interaction para depurar
            console.log('Objeto interaction:', interaction.toJSON());
            // Extraer el nombre de las opciones
            const name = interaction.options.getString('nombre');
            console.log('Nombre extraído:', name);
            // Llamar a la función slashSearch con el nombre extraído
            const resultado = await slashSearch(name);
            console.log('Resultado de slashSearch:', resultado);
            // Responder al usuario
            await interaction.reply(resultado);
        } else {
            await interaction.reply("No tienes permiso para ejecutar este comando (Solo disponible en el servidor de ArGentiNidad)");
        }
    }
}
