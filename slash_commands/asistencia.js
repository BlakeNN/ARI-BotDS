import { SlashCommandBuilder } from 'discord.js';
import { slashGetPlayersOfBattle } from '../battle_log/commands.js';

export const command = {
    // Datos del comando
    data: new SlashCommandBuilder()
        .setName("asistencia")
        .setDescription("Muestra la asistencia a una pelea")
        .addStringOption(option =>
            option.setName('battle_id')
                .setDescription('ID de la Pelea, ej "1198000596"')
                .setRequired(true)),
    // Ejecución del comando
    async execute(interaction) {
        // Obtener datos de la interacción
        const id = interaction.options.getString('battle_id');
        // Ejecutar Consulta
        const res = await slashGetPlayersOfBattle(id);
        let cant = res.length;
        // Confirmar al usuario
        await interaction.reply(`<@${interaction.user.id}>\n**Asistencia: ${cant} Players**\n${res.map(name => `- ${name}`).join('\n')}`);
    },
};
