import axios from 'axios';
import { readFile } from 'fs/promises';

const raw = await readFile('./config.json', 'utf-8');
const config = JSON.parse(raw);
const tokenGist = config.tokenGist;
const gistId = config.gistId;
const gistFilename = 'nombres.json';

// Función para obtener la lista de nombres desde el Gist
async function getNames(serverId) {
    if (serverId == '936708400367169577') {
        try {
            const response = await axios.get(`https://api.github.com/gists/${gistId}`, {
                headers: {
                    Authorization: `token ${tokenGist}`,
                },
            });
            const content = response.data.files[gistFilename].content;
            return JSON.parse(content);
        } catch (error) {
            console.error('Error al obtener la lista de nombres:', error);
            return [];
        }
    } else {
        return (`Servidor no válido`)
    }
}

// Función para guardar la lista de nombres actualizada en el Gist
async function saveNames(names, serverId) {
    if (serverId == '936708400367169577') {
        try {
            await axios.patch(
                `https://api.github.com/gists/${gistId}`,
                {
                    files: {
                        [gistFilename]: {
                            content: JSON.stringify(names),
                        },
                    },
                },
                {
                    headers: {
                        Authorization: `token ${tokenGist}`,
                    },
                }
            );
            return true;
        } catch (error) {
            console.error('Error al guardar la lista de nombres:', error);
            return false;
        }
    } else {
        return (`Servidor no valido`)
    }
}

// Función para mostrar toda la lista de nombres
export async function showAllNames(message) {
    try {
        const names = await getNames(serverId);
        message.channel.send(`La Blacklist es:\n${names.map(name => `- ${name}`).join('\n')}`);
    } catch (error) {
        console.error('Error al mostrar la lista de nombres:', error);
        message.channel.send('Hubo un error al mostrar la lista de nombres.');
    }
}

// Función para buscar un nombre en la lista
export async function searchName(message, nameToSearch) {
    try {
        const names = await getNames(serverId);
        const found = names.includes(nameToSearch);
        message.channel.send(found ? `${nameToSearch} está en la Blacklist.` : `${nameToSearch} no está en la Blacklist.`);
    } catch (error) {
        console.error('Error al buscar el nombre:', error);
        message.channel.send('Hubo un error al buscar el nombre.');
    }
}

// Función para agregar un nombre a la lista
export async function addName(message, nameToAdd, args) {
    try {
        const names = await getNames(serverId);
        names.push(nameToAdd);
        const saved = await saveNames(names, serverId);
        if (serverId == "936708400367169577") {
            if (saved) {
                message.channel.send(`${nameToAdd} agregado a la Blacklist.`);
            } else {
                message.channel.send(`Error al agregar ${nameToAdd} a la Blacklist.`);
            }
        } else {
            message.reply('Servidor no valido')
        }
    } catch (error) {
        console.error('Error al agregar el nombre:', error);
        message.channel.send('Hubo un error al agregar el nombre.');
    }
}

// Función para eliminar un nombre de la lista
export async function deleteName(message, nameToDelete) {
    try {
        const names = await getNames(serverId);
        const index = names.indexOf(nameToDelete);
        if (index !== -1) {
            names.splice(index, 1);
            const saved = await saveNames(names, serverId);
            if (saved) {
                message.channel.send(`${nameToDelete} eliminado de la Blacklist.`);
            } else {
                message.channel.send(`Error al eliminar ${nameToDelete} de la Blacklist.`);
            }
        } else {
            message.channel.send(`${nameToDelete} no encontrado en la Blacklist.`);
        }
    } catch (error) {
        console.error('Error al eliminar el nombre:', error);
        message.channel.send('Hubo un error al eliminar el nombre.');
    }
}