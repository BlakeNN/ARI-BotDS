const { Client, GatewayIntentBits } = require('discord.js');
const axios = require('axios'); 

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,   //"intenciones" del bot
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildVoiceStates,
    ],
});

const prefix = '$';
const id_canal = '936708400945971233';
const hora = 10; // Hora 
const minutos = 30; // Minutos
const id_canal2 = '1219801234270060596';
const hora2 = 21; // Hora2 
const minutos2 = 59; // Minutos2 
// DB de indice
const database = {
    "ava-buff": ["arco.jpg", "corta-curas.jpg", "enigmatico.jpg", "flamigero.jpg", "frost.jpg", "healer-party.jpg", "main-healer.jpg", "main-tank.jpg", "monje-negro.jpg", "prisma.jpg", "sc.jpg", "set-skip.jpg", "xbow.jpg"],
    "ava-full": ["1h-arcano.jpg", "arco.jpg", "flamigero.jpg", "frost.jpg", "gran-arcano.jpg", "healer-party1.jpg", "healer-party2.jpg", "ironroot.jpg", "main-heal.jpg", "main-tank.jpg", "off-tank.jpg", "rompe-reinos.jpg", "sc-dps.jpg", "sc-supp.jpg", "xbow.jpg"],
    "gank": ["ballesta-oneshot.jpg", "concedemuertes.jpg", "doble-daga.jpg", "doble-filo.jpg", "fuego-1h.jpg", "garza.jpg", "gran-arcano.jpg", "grito-gelido.jpg", "lanza.jpg", "martillo-de-forja.jpg", "maza.jpg", "saetas.jpg", "susurrante.jpg", "vara-ava.jpg"],
    "wb": ["healers.jpg", "pierce.jpg", "rdps.jpg", "tanques.jpg", "utilidades.jpg"],
    "zvz": ["zvz.jpg"], 
    "pvp": ["pvp.jpg"]
};
let blacklist = ["razieck", "tryhardocasuall", "curamectm", "rodrigo98", "masterbum", "elsaid", "nandinblack", "haromathieu", "xchino12", "yamrtekudasai", "lildeath", "mrpeco", "zeusgaming", "kekles", "guawe", "kitten", "saethary", "easyone", "christian287", "razhot", "masterbun", "vampirodoidao", "ano1998", "ano1988", "mestrerafa33", "carrasco666", "mayoperalta", "heroargentina", "xexenco", "zitarex", "nashungho", "xwxenko", "tokitoxk", "de1v1d", "zawkl", "rosamelano123", "darkclementy", "dovad", "davruk", "wanter20", "gamacu", "xlengo", "elmechs", "jugodelucuma", "argtomas", "maup1", "nrnanito", "astaroth18", "xhakaa", "dalxe", "reneperez", "relivex", "zsend", "xdariusx", "lauty48", "xsautox", "xtaukox", "imprudence", "aeav", "noodleg", "morph33us", "therippertsa", "haromathieu", "kore52", "sluxs", "zoemm7", "eljerry", "jappipapu", "tknobi", "unno", "soyosio", "clotario", "solovinowe", "mataviejitas2mil", "manuchiliz", "garuu18", "fioreyo", "yomihira", "xeroxernes", "nachoguaca10", "shezwyk", "rlam18", "cotox3d", "topsito1", "tdxxxx", "lordleyendari", "villuca96", "merequetengue", "snoopywoow", "djwtech", "nairev", "pacsz", "maverickz121", "elmerlusa", "elmacho25", "holydps", "mateogox", "moshoxxx"];

client.on('error', console.error);

client.on('ready', async () => {
    console.log('¡El bot está listo!');
    // Obtener el canal por ID
    const channel = await client.channels.fetch(id_canal);
    const channel2 = await client.channels.fetch(id_canal2);
    // Función para enviar mensaje
    const sendMessage = () => {
        // Obtener hora y minutos actuales
        const currentHour = new Date().getHours();
        const currentMinute = new Date().getMinutes();
        // Verificacion
        if (currentHour === hora && currentMinute === minutos) {
            // Enviar mensaje 
            channel.send('||@here ||\n**Desde el staff del gremio les deseamos buenos días a todos **\n:small_blue_diamond:Recuerden que nadie del staff les va a pedir por susurro que les presten su mamut o algún otro ítem de alto valor\n** Eviten caer en estafas ** \n:small_blue_diamond:También recordarles que se lean el canal de <#936713325348270121>, desconocer las mismas no los hace inocentes si incumplen alguna \n** Buena suerte a todos **');
        }
        //--2 Obtener hora y minutos actuales
        const currentHour2 = new Date().getHours();
        const currentMinute2 = new Date().getMinutes();
        // Verificacion
        if (currentHour2 === hora2 && currentMinute2 === minutos2) {
            // Enviar mensaje 
            channel2.send(':scroll: **M A S H L E**:scroll:\n\n **¿Quiénes somos?**\nSomos un gremio que busca jugadores para contenido en general\n\n**¿Qué ofrecemos?**\n:white_check_mark:Word Boss/ Faccion / Gank\n:white_check_mark:Comunidad para jugar\n:white_check_mark:Contenido  21/00/03/05 UTC)\n:white_check_mark:0% Tax / No cuotas\n\n**¿Qué buscamos?**\n:shield: PC Player\n:shield: Ser Activo\n\n**Para finalizar, estamos ubicados en Lymhurst** https://discord.gg/mashleguild ||@here||');
        }
    };
    // Verificar la hora cada minuto
    setInterval(sendMessage, 60000); 
});

client.on('messageCreate', async (message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    console.log('Mensaje recibido:', message.content);
    const args = message.content.slice(prefix.length).split(' ');
    const command = args.shift().toLowerCase();
    //Comandos
    if (command === 'builds') {
        execute(message, args);
    } else if (command === 'mostrar') {
        choose(message, args);
    } else if (command === 'cats') {
        listCats(message, args);
    } else if (command === 'all') {
        listAll(message, args);
    } else if (command == 'hora') {
        horario(message,args);
    } else if (command == 's'){
        listSearch(message, args);
    } else if (command == 'blacklist') {
        listAdd(message, args);
    } else if (command == 'bs') {
        bs(message, args);
    } else if (command == 'del') {
        listDel(message, args)
    } else {
        message.channel.send('Juani es un pelotudo y no codeo tu comando');
    }
});

async function execute(message, args) {
    console.log('Buscando imagen', args);
    try {
        // Obtener categoria
        const categoria = args[0];
        if (categoria in database) {
            // Enviar cada opcion
            const opciones = database[categoria].map(opcion => `- ${opcion}`).join('\n');
            message.channel.send(`Elige una opción de ${categoria}:\n${opciones}`);
        } else {
            message.channel.send("Categoría no encontrada.");
        }
    } catch (error) {
        console.error(error);
        message.channel.send(`Hubo un error: ${error.message}`);
    }
}
function listCats(message, args) {
    let cats = [] 
    for (const index in database) {
        cats.push(`- ` + index);
    }
    message.channel.send("Las categorias disponibles son: \n" + cats.join('\n'));
}
function listAll(message, args) {
    let all = [] 
    for (const index in database) {
        database[index].forEach(option => all.push(`${`- `} ${index} - ${option}`));
    }
    message.channel.send("Las categorias y opciones disponibles son: \n" + all.join('\n'));
}
function horario(message, args) {
    // Hora UTC
    const horaUTC = new Date();
    // Hora Argentina (UTC -3)
    const horaARG = new Date(horaUTC);
    horaARG.setUTCHours(horaARG.getUTCHours());
    // Hora España (UTC +1)
    const horaESP = new Date(horaUTC);
    horaESP.setUTCHours(horaESP.getUTCHours());
    // Formateamos las horas y minutos
    const horaFormatoARG = horaARG.toLocaleTimeString('es-AR', { timeZone: 'America/Argentina/Buenos_Aires', hour12: false });
    const horaFormatoESP = horaESP.toLocaleTimeString('es-ES', { timeZone: 'Europe/Madrid', hour12: false });
    const horaFormatoUTC = horaUTC.toISOString().slice(11, 19);
    // Msg
    message.channel.send("Son las: \n" + horaFormatoARG + "hs en :flag_ar: \n" + horaFormatoESP + "hs en :flag_es: \n" + horaFormatoUTC + "UTC");
}

async function choose(message, args) {
    console.log('Eligiendo imagen', args);

    try {
        console.log('Argumentos completos:', args);

        const categoria = args[0].toLowerCase(); // La categoría es el primer elemento 
        let imagen = args[1].toLowerCase(); // El nombre de la imagen es el segundo elemento 
        
        console.log('Categoría:', categoria);
        console.log('Imagen:', imagen);
        if (imagen.endsWith(".jpg")) {
            console.log("Ya tiene la extension")
        } else {
            imagen = imagen + ".jpg"
        }
        if (categoria in database && database[categoria].includes(imagen)) {
            const url = `https://github.com/BlakeNN/ARI-Builds/blob/main/imagenes/${categoria}/${imagen}?raw=true`; //"?raw=true" para que sea el link de la img y no dle html
            
            // Descargar de la img
            const response = await axios.get(url, {
                responseType: 'arraybuffer' // No se que puta hace esto
            });

            message.channel.send({
                files: [{
                    attachment: response.data,
                    name: imagen
                }]
            });
            console.log(response);
        } else {
            message.channel.send("Categoría o imagen no encontrada.");
        }
    } catch (error) {
        console.error(error);
        message.channel.send(`Hubo un error: ${error.message}`);
    }
}
async function listSearch(message, args) {
    console.log('Buscando en la blacklist', args);
    try {
        // Obtener categoria
        const name = args[0].toLowerCase();
        if (blacklist.includes(name)) {
            message.channel.send("El pete si ta en la blacklist");
        } else {
            message.channel.send("El pete no ta en la blacklist");
        }
    } catch (error) {
        console.error(error);
        message.channel.send(`Hubo un error: ${error.message}`);
    }
}
async function listAdd(message, args) {
    console.log("Añadiendo player a la blacklist", args);
    const member = args[0].toLowerCase();
    if (blacklist.includes(member)) {
        message.channel.send("El player ya esta en la blacklist");
    } else {
        blacklist.push(member);
        message.channel.send("Player añadido con exito\nEse pete no vuelve");
        // Obtener el canal por ID
        const logChannelId = '967450894524358686';
        const logChannel = await message.client.channels.fetch(logChannelId);
        const motivo = args.slice(1)
        const motivoCon = motivo.join(" ")
        // Enviar el nombre del miembro al canal de registro
        logChannel.send(args[0] + " " + motivoCon);
    }
}
function bs(message, args) {
    const players = blacklist.map(player => `- ${player}`).join('\n');
    message.channel.send("La blacklit actual es:\n" + players);
}
function listDel(message, args) {
    const name = args[0].toLowerCase();
    if (blacklist.includes(name)) {
        blacklist = blacklist.filter(player => player !== name);
        message.channel.send("Se ha eliminado al player de la blacklist");
    }
}
const token = "MTIwNTkyNzc1Nzk1MTc5NTMwMA.GVDWX7.vJkZXSG8QNI5_fUlFo0byVBoYqDsezpeypGVRM"; //token
client.login(token);
