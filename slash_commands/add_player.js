import { SlashCommandBuilder } from 'discord.js';
import { slashAdd } from '../bot.js';

export const command = {
    // Datos
    data: new SlashCommandBuilder()
        .setName("añadir_player") //obj
        .setDescription("Añade un player a la blacklist")
        .addStringOption(option =>
            option.setName('nombre')
                .setDescription('Nombre a añadir en la blacklist')
                .setRequired(true)), // Required
    // Ejecución
    async execute(interaction) {
        // Autenticacion
        const rolId = "1017153663015325738";
        const rol2Id = "936719819842129940";
        const tieneRol = interaction.member.roles.cache.has(rolId);
        const tieneRol2 = interaction.member.roles.cache.has(rol2Id);
        if (tieneRol || tieneRol2) {
            const name = interaction.options.getString('nombre');
            const añadir = await slashAdd(name);
            await interaction.reply(añadir);
        } else {
            await interaction.reply("No tienes permiso para ejecutar este comando (Solo disponible en el servidor de ArGentiNidad)");
        }
    }
}