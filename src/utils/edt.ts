import { EmbedBuilder } from 'discord.js';
import myCache from './Cache';
import Logger from './Logger';

export default async (date: Date, group: string): Promise<EmbedBuilder> => {
    const embed = new EmbedBuilder()
        .setTitle(
            `Cours TP ${group} - ${date.getDate()}/${
                date.getMonth() + 1
            }/${date.getFullYear()}`
        )
        .setColor('#5865F2');

    return myCache
        .getCacheAde()
        .then((data) => {
            for (const k in data) {
                if (
                    data[k].start.getMonth() === date.getMonth() &&
                    data[k].start.getDate() === date.getDate()
                ) {
                    const description = data[k].description.split('\n');
                    description.slice(1);
                    description.pop();
                    const descriptionString = description
                        .toString()
                        .replaceAll(',', ' ');

                    let td: string;

                    if (group === '1' || group === '3' || group === '5') {
                        td = `TD ${group}`;
                    } else {
                        td = `TD ${(
                            parseInt(group as string) - 1
                        ).toString()}${group}`;
                    }

                    if (
                        data[k].description.includes(`TP${group}`) ||
                        data[k].description.includes(`BUT S4`) ||
                        data[k].description.includes(td)
                    ) {
                        embed.addFields({
                            name: `**•\t${data[k].start.toLocaleTimeString(
                                'fr-FR',
                                {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    timeZone: 'Europe/Paris',
                                }
                            )}\t->\t${data[k].end.toLocaleTimeString('fr-FR', {
                                hour: '2-digit',
                                minute: '2-digit',
                                timeZone: 'Europe/Paris',
                            })}**`,
                            value: `>>> **${data[k].summary}**\n${
                                data[k].location.split('(')[0]
                            }\n${descriptionString}`,
                        });
                    }
                }
            }

            return embed;
        })
        .catch((err) => {
            Logger.error('Error', err);
            return embed;
        });
};
