import { REST, Routes, Collection } from 'discord.js';
import fg from 'fast-glob';
import { useAppStore } from '@store/app'

const updateSlashCommands = async (commands) => {

    const rest = new REST({ version: '10' }).setToken(process.env.TOKEN); 
    const result = await rest.put(
        Routes.applicationGuildCommands(
            process.env.ApplicationID,
            process.env.GUILD_TEST
        ),
        {
            body: commands
        }
    )

}

export const loadCommands = async () => {

    const appStore = useAppStore();
    const commands = [];
    const actions = new Collection();
    const files = await fg('src/commands/**/index.js');
    for (const file of files) {
        const cmd = await import(file);

        commands.push(cmd.command);
        actions.set(cmd.command.name, cmd.action);
    }

    await updateSlashCommands(commands);
    appStore.commandsActionMap = actions;
    console.log('指令載入:', appStore.commandsActionMap);
    console.log('指令載入完成');
};


export const loadEvents = async () => { 
    
    const files = await fg('src/events/**/index.js');
    const appStore = useAppStore();
    const bot = appStore.bot;

    for (const file of files) {
        const eventFile = await import(file);

        if (eventFile.event.once) {
            bot.once(
                eventFile.event.name,
                eventFile.action,
            )
            console.log(`載入事件: ${eventFile.event.name} (once)`);
        }
        else {
            bot.on(
                eventFile.event.name,
                eventFile.action,
            )
            console.log(`載入事件: ${eventFile.event.name} (on)`);
        }
    }
}
