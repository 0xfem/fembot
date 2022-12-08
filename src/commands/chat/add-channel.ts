import { ChatInputCommandInteraction, GuildMember, PermissionsString } from 'discord.js';
import { RateLimiter } from 'discord.js-rate-limiter';

import { Language } from '../../models/enum-helpers/index.js';
import { EventData } from '../../models/internal-models.js';
import { Lang } from '../../services/index.js';
import { InteractionUtils } from '../../utils/index.js';
import { Command, CommandDeferType } from '../index.js';

export class TestCommand implements Command {
    public names = [Lang.getRef('chatCommands.test', Language.Default)];
    public cooldown = new RateLimiter(1, 5000);
    public deferType = CommandDeferType.PUBLIC;
    public requireClientPerms: PermissionsString[] = [];

    public async execute(intr: ChatInputCommandInteraction, data: EventData): Promise<void> {
        let args = {
            option: intr.options.getChannel(Lang.getRef('arguments.option', Language.Default)),
        };
        if (!args.option || !intr.guild) return;
        // const channel = await intr.client.channels.f
        // const ch = await intr.client.channels.fetch('');
        // intr.memberPermissions.
        // console.log(`Got Args ${args}`);
        console.log(`Trying to edit channel ${args.option.name}`);
        const channel = intr.guild.channels.resolve(args.option.id);
        const errchan = intr.guild.channels.resolve(`abc`);
        console.log(`channel? ${errchan}`);
        console.log(`Resolved channel ${channel.name}`);

        const callerPermissions = channel.permissionsFor(intr.member as GuildMember);
        console.log(`Caller has access? ${callerPermissions.has('ViewChannel')}`);
        console.log(`Caller ? ${(intr.member as GuildMember).displayName}`);
        await intr.guild.channels.edit(args.option.id, {
            topic: 'Test Topic',
        });
        await InteractionUtils.send(
            intr,
            Lang.getEmbed('displayEmbeds.test', data.lang, {
                CHANNEL_NAME: args.option.name,
            })
        );
    }
}
