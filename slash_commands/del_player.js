import { SlashCommandBuilder } from 'discord.js';
import { slashDel } from '../bot.js';

export const command = {
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
        const rol2Id = "936719819842129940";
        const tieneRol = interaction.member.roles.cache.has(rolId);
        const tieneRol2 = interaction.member.roles.cache.has(rol2Id);
        if (tieneRol || tieneRol2) {
            const name = interaction.options.getString('nombre');
            const eliminar = await slashDel(name);  
            await interaction.reply(eliminar);
        } else {
            await interaction.reply("No tienes permiso para ejecutar este comando (Solo disponible en el servidor de ArGentiNidad)"); 
        }
    }
}