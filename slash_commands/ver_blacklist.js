import { SlashCommandBuilder } from 'discord.js';
import { verBlacklistSlash } from '../bot.js';

export const command = {
    //Datos
    data: new SlashCommandBuilder()
        .setName("ver_blacklist")
        .setDescription("Muestra toda la blacklist"),
    //Ejecucion
    async execute(interaction) {
        // Autenticacion
        const rolId = "1350534225748820191";
        const rol2Id = "1350534225748820189";
        const tieneRol = interaction.member.roles.cache.has(rolId);
        const tieneRol2 = interaction.member.roles.cache.has(rol2Id);
        if (tieneRol || tieneRol2) {
            try {
                const msg = await verBlacklistSlash(); // Espera la respuesta de la función bsSlash
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