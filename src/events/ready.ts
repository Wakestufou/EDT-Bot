import { Color } from '../utils/Colors';
import { Event } from '../structures/Event';
import Logger from '../utils/Logger';
import cron from 'node-cron';
import getEdt from '../utils/edt';
import { TextChannel } from 'discord.js';

export default new Event('ready', (client) => {
    Logger.info('Bot is online ! ' + client.user?.tag, 'READY', Color.FgGreen);

    cron.schedule('0 8 * * *', () => {
        const date = new Date();

        const embedTp1 = getEdt(date, '1');
        const embedTp2 = getEdt(date, '2');

        if (process.env.CHANNEL_ID !== undefined) {
            const channel = client.channels.cache.get(process.env.CHANNEL_ID);
            console.log('oui\n');

            if (channel instanceof TextChannel) {
                console.log('ouiiiiiiii\n');
                channel
                    .send({
                        embeds: [embedTp1, embedTp2],
                    })
                    .then(() => Logger.info('EDT sent to the channel'))
                    .catch((e) => Logger.error('Error : ', e));
            }
        }
    });
});
