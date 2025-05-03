import { Client, Collection } from 'discord.js';
import axios from 'axios';
import fs from 'fs';
import config from './config.json';

const client = new Client({
    intents: 3276799,
})

// Vars - Consts
const prefix = '$';
const tokenGist = config.tokenGist;
const gistId = config.gistId;
const gistFilename = 'nombres.json';
