import { EmbedBuilder } from 'discord.js';
import path from 'path';
import { Command } from '../../structures/Command';
import myCache from '../../utils/Cache';
import { AdeOption } from '../../types/ade';
import Logger from '../../utils/Logger';

export default new Command({
    name: 'edt',
    description: 'Show EDT !',
    categories: path.dirname(__filename).split(path.sep).pop() as string,
    options: [
        {
            name: 'group',
            description: 'Your group',
            type: 3,
            required: true,
            choices: [
                {
                    name: 'TP 1',
                    value: '1',
                },
                {
                    name: 'TP 2',
                    value: '2',
                },
                {
                    name: 'TP 3',
                    value: '3',
                },
                {
                    name: 'TP 4',
                    value: '4',
                },
                {
                    name: 'TP 5',
                    value: '5',
                },
            ],
        },
        {
            name: 'date',
            description: 'Date (JJ/MM/YYYY)',
            type: 3,
        },
    ],
    run: async ({ interaction, args }) => {
        const group = args.getString('group');
        const dateString = args.getString('date');
        let date;

        if (dateString !== null) {
            if (dateString.split('/').length !== 3) {
                return interaction
                    .reply({
                        content: 'Date Format : JJ/MM/YYYY',
                        ephemeral: true,
                    })
                    .catch((e) => Logger.error('Error : ', e));
            }

            date = new Date(
                Number(dateString.split('/')[2]),
                Number(dateString.split('/')[1]) - 1,
                Number(dateString.split('/')[0])
            );
        } else {
            date = new Date();
        }

        if (typeof group === 'string') {
            await interaction.deferReply();

            const dateFinal = date;
            console.log(dateFinal);
            const data = myCache.getCacheAde() as AdeOption[];

            const embed = new EmbedBuilder()
                .setTitle(
                    `Cours TP ${args.getString(
                        'group'
                    )} - ${dateFinal.getDate()}/${
                        dateFinal.getMonth() + 1
                    }/${dateFinal.getFullYear()}`
                )
                .setColor('#5865F2');

            for (const k in data) {
                if (
                    data[k].start.getMonth() === dateFinal.getMonth() &&
                    data[k].start.getDate() === dateFinal.getDate()
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
                        data[k].description.includes(`BUT S3`) ||
                        data[k].description.includes(td)
                    ) {
                        embed.addFields({
                            name: `**•\t${data[k].start.toLocaleTimeString(
                                'fr-FR',
                                {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                }
                            )}\t->\t${data[k].end.toLocaleTimeString('fr-FR', {
                                hour: '2-digit',
                                minute: '2-digit',
                            })}**`,
                            value: `>>> **${data[k].summary}**\n${
                                data[k].location.split('(')[0]
                            }\n${descriptionString}`,
                        });
                    }
                }
            }

            await interaction.followUp({ embeds: [embed] });
        } else {
            await interaction.reply({
                content: 'Please choose your group',
                ephemeral: true,
            });
        }
    },
});
