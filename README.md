# 🛡️ ARI - Discord Bot

Un bot de Discord diseñado para una comunidad del juego *Albion Online*, que permite gestionar listas negras de jugadores (blacklist) y obtener información sobre asistencia a eventos del juego, ademas permite programar eventos a modo de *Recordatorio*.

---

## 📚 Índice

- [Características](#características)
- [Comandos Disponibles](#comandos-disponibles)
- [Guía de Instalación](#guía-de-instalación)
- [Licencia](#licencia)

---

## ✨ Características

- ✅ Gestión de blacklist (agregar, eliminar, buscar, mostrar nombres)
- 📜 Compatible con Comandos Slash {/}
- 🧠 Consulta de asistencia a eventos del juego.
- 🔔 Sistema de Recordatorios Programados para eventos varios.

---

## 📦 Comandos Disponibles

### 🔧 Prefix `$`

- `$blacklist <nombre>` – Agrega un nombre a la blacklist.
- `$del <nombre>` – Elimina un nombre de la blacklist.
- `$search <nombre>` – Busca si el nombre está en la blacklist.
- `$verBlacklist` – Muestra todos los nombres en la blacklist.
- `$asist <battleId> <nombre de guild>` – Muestra los jugadores de una Guild que asistieron a una batalla específica.
- `$ping` – Comando para corroborar que el Bot este Online.

### ⚙️ Slash Commands

- `/blacklist` – Agrega un nombre a la blacklist.
- `/del` – Elimina un nombre de la blacklist.
- `/search` – Busca un nombre en la blacklist.
- `/verblacklist` – Muestra toda la blacklist.
- `/asistencia` – Consulta asistencia por ID de pelea.
- `/obj` - Programar Recordatorio para un Evento/Objetivo

---

## ⚙️ Guía de Instalación

1. **Clona el repositorio**
   ```bash
   git clone https://github.com/BlakeNN/ARI-BotDS.git
   cd ARI-BotDS
   ```

2. **Instala las dependencias**
   ```bash
   npm install
   ```

3. **Configura las variables de entorno**

   Crea un archivo `.config.js` con tu token de bot, los comandos de Blacklist usan un Gist, por lo que deberás de proveer un gistId y un tokenGist
   ```
   {
    "token": "tu_token_aqui",
    "tokenGist": "token_gist_aqui",
    "gistId": "id_gist_aqui"
   }
   ```

4. **Ejecuta el bot**
   ```bash
   node bot.js
   ```

> Asegurate de tener Node.js 18 o superior instalado.

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.  
Podés usarlo, modificarlo o distribuirlo libremente con reconocimiento adecuado.  
Para más información, leé el archivo [LICENSE](./LICENSE).
