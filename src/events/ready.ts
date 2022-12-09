import { Color } from '../utils/Colors';
import { Event } from '../structures/Event';
import Logger from '../utils/Logger';
import cron from 'node-cron';
import getEdt from '../utils/edt';
import { TextChannel, EmbedBuilder, Client } from 'discord.js';

const send = (embed: EmbedBuilder, client: Client) => {
    if (
        process.env.CHANNEL_ID !== undefined &&
        process.env.CHANNEL_ID_DEV !== undefined
    ) {
        let channel;
        if (process.argv.includes('--DEV')) {
            channel = client.channels.cache.get(process.env.CHANNEL_ID_DEV);
        } else {
            channel = client.channels.cache.get(process.env.CHANNEL_ID);
        }

        if (channel instanceof TextChannel) {
            channel
                .send({
                    embeds: [embed],
                })
                .then(() => Logger.info('EDT sent to the channel'))
                .catch((e) => Logger.error('Error : ', e));
        }
    }
};

export default new Event('ready', (client) => {
    Logger.info('Bot is online ! ' + client.user?.tag, 'READY', Color.FgGreen);

    cron.schedule('59 22 * * *', () => {
        const date = new Date();

        getEdt(date, '1').then((embedTp1) => {
            if (
                embedTp1.data.fields !== undefined &&
                embedTp1.data.fields.length > 0
            )
                send(embedTp1, client);
        });
        getEdt(date, '2').then((embedTp2) => {
            send(embedTp2, client);
        });
    });
});
