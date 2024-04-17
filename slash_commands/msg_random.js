const { SlashCommandBuilder } = require('discord.js');
const Discord = require('discord.js');

module.exports = {
    //Datos
    data: new SlashCommandBuilder()
        .setName("msg_random")
        .setDescription("Genera un msg aleatoria... felicitandote"),
    //Ejecucion
    execute(interaction) {
        const nroRandom = Math.floor(Math.random() * 5) + 1;
        if (nroRandom == 1) {
            mensaje = "un capo"
        } else if (nroRandom == 2) {
            mensaje = "un tarado"
        } else if (nroRandom == 3) {
            mensaje = "un pelotudo"
        } else if (nroRandom == 4) {
            mensaje = "un gil"
        } else {
            mensaje = "mas feo que laburar un sabado"
        }
    //Rta
    interaction
        .reply(`Sos ${mensaje}`)
        .catch(console.error);
    }
}