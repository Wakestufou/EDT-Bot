import { Color } from '../utils/Colors';
import { Event } from '../structures/Event';
import Logger from '../utils/Logger';
import cron from 'node-cron';
import myCache from '../utils/Cache';
import { AdeOption } from '../types/ade';
import { EmbedBuilder } from 'discord.js';

export default new Event('ready', (client) => {
    Logger.info('Bot is online ! ' + client.user?.tag, 'READY', Color.FgGreen);
});
