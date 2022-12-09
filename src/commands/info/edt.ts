import { Command } from '../../structures/Command';
import Logger from '../../utils/Logger';
import getEdt from '../../utils/edt';

export default new Command({
    name: 'edt',
    description: 'Show EDT !',
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
        let date: Date;

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

            getEdt(date, group).then(async (embed) => {
                if (
                    embed.data.fields !== undefined &&
                    embed.data.fields.length > 0
                )
                    await interaction.followUp({ embeds: [embed] });
                else
                    await interaction.followUp({
                        content: `TP${group} : No classes on ${date.getDate()}/${
                            date.getMonth() + 1
                        }/${date.getFullYear()}`,
                    });
            });
        } else {
            await interaction.reply({
                content: 'Please choose your group',
                ephemeral: true,
            });
        }
    },
});
