import { SlashCommandBuilder } from 'discord.js';
import { slashGetPlayersOfBattle } from '../battle_log/commands.js';

export const command = {
    data: new SlashCommandBuilder()
        .setName("asistencia")
        .setDescription("Muestra la asistencia a una pelea")
        .addStringOption(option =>
            option.setName('battle_id')
                .setDescription('ID de la Pelea, ej \"1198000596\"')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('guild')
                .setDescription('Nombre de la Guild de los Player(Respetar Mayus)')
                .setRequired(true)),

    async execute(interaction) {
        await interaction.deferReply(); // Espera mas de 3 segundos

        const id = interaction.options.getString('battle_id');
        const guildName = interaction.options.getString('guild');
        const res = await slashGetPlayersOfBattle(id, guildName);
        const cant = res.length;

        await interaction.editReply(
            `<@${interaction.user.id}>\n**Asistencia: ${cant} Players**\n${res.map(name => `- ${name}`).join('\n')}`
        );
    },
};

