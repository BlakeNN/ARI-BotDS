import { SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
    .setName('todos')
    .setDescription('Mueve a todos los usuarios con voz al canal de voz donde estás.');

export async function execute(interaction) {
    const member = interaction.member;

    // Verifica si el usuario está en un canal de voz
    if (!member.voice.channel) {
        return await interaction.reply({
            content: 'Debes estar en un canal de voz para usar este comando.',
            ephemeral: true
        });
    }

    const channel = member.voice.channel;

    // Filtra a los miembros conectados a un canal de voz (excepto el que ejecuta)
    const miembrosAMover = interaction.guild.members.cache.filter(m => 
        m.voice.channel && m.id !== member.id
    );

    for (const [_, miembro] of miembrosAMover) {
        try {
            await miembro.voice.setChannel(channel);
        } catch (error) {
            console.error(`❌ Error al mover a ${miembro.user.tag}:`, error);
        }
    }

    await interaction.reply({
        content: `Todos los usuarios fueron movidos al canal de voz: **${channel.name}**`,
        ephemeral: false
    });
}
