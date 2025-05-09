import { SlashCommandBuilder } from 'discord.js';

export const command = {
    data: new SlashCommandBuilder()
        .setName('todos')
        .setDescription('Mueve a todos los usuarios con voz al canal de voz donde estás.'),

    async execute(interaction) {
        const member = interaction.member;

        // Verifica si el usuario está en un canal de voz
        if (!member.voice.channel) {
            return await interaction.reply({
                content: 'Debes estar en un canal de voz para usar este comando.',
                flags: 64 // Ephemeral
            });
        }

        const canalDestino = member.voice.channel;

        // Filtra a los miembros conectados a un canal de voz (excepto el que ejecuta)
        const miembrosAMover = interaction.guild.members.cache.filter(m =>
            m.voice.channel && m.id !== member.id
        );

        for (const miembro of miembrosAMover.values()) {
            try {
                await miembro.voice.setChannel(canalDestino);
            } catch (error) {
                console.error(`Error al mover a ${miembro.user.tag}:`, error);
            }
        }

        await interaction.reply({
            content: `Todos fueron movidos a **${canalDestino.name}**.`,
            flags: 64 // Ephemeral
        });
    }
};
