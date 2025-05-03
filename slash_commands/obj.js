const { SlashCommandBuilder } = require('discord.js');
const { objetivos } = require('../index.js');

module.exports = {
    // Datos del comando
    data: new SlashCommandBuilder()
        .setName("obj")
        .setDescription("Programa una notificación sobre un objetivo")
        .addStringOption(option =>
            option.setName('detalle')
                .setDescription('Nombre y mapa del objetivo')
                .setRequired(true))
        .addNumberOption(option =>
            option.setName('tiempo_restante')
                .setDescription('Tiempo restante en minutos para el objetivo')
                .setRequired(true))
        .addNumberOption(option =>
            option.setName('avisar_cuando_falten')
                .setDescription('Tiempo en minutos antes para enviar el aviso')
                .setRequired(true)),
    
    // Ejecución del comando
    async execute(interaction) {
        // Obtener datos de la interacción
        const detalle = interaction.options.getString('detalle');
        const tiempoRestante = interaction.options.getNumber('tiempo_restante');
        const avisarCuandoFalten = interaction.options.getNumber('avisar_cuando_falten');

        // Validar datos
        if (tiempoRestante <= avisarCuandoFalten) {
            return interaction.reply({
                content: 'El tiempo de aviso debe ser menor al tiempo restante.',
                ephemeral: true,
            });
        }

        // Calcular tiempos en milisegundos
        const ahora = Date.now();
        const tiempoTotalMs = tiempoRestante * 60 * 1000;
        const tiempoAvisoMs = avisarCuandoFalten * 60 * 1000;

        // Crear el objetivo
        const objetivo = {
            detalle,
            tiempoTotal: ahora + tiempoTotalMs,
            tiempoAviso: tiempoAvisoMs,
            canalId: interaction.channel.id,
            usuarioId: interaction.user.id,
        };

        // Agregar al array
        objetivos.push(objetivo);

        // Confirmar al usuario
        await interaction.reply(`<@${interaction.user.id}> Objetivo Programado\n**Objetivo:** "${detalle}"\n**Tiempo Restante:** ${tiempoRestante} minutos\n**Aviso:** ${avisarCuandoFalten} minutos antes.`);
    },
};
