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

    // console.log('更新指令:', result);
}

export const loadCommands = async () => {

    const appStore = useAppStore();
    const commands = [];
    const actions = new Collection();
    const files = await fg('src/commands/**/index.js');
    for (const file of files) {
        const cmd = await import(file);
        // console.log('載入指令:', cmd.command);

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

// export const loadEvents = async () => { 
//     try {
//         const appStore = useAppStore();
//         const bot = appStore.bot;
        
//         if (!bot) {
//             throw new Error('Bot 實例未初始化');
//         }

//         const files = await fg('src/events/**/index.js');
//         console.log('找到的事件檔案:', files);

//         for (const file of files) {
//             try {
//                 const eventModule = await import(file);
                
//                 if (eventModule.event) {
//                     const eventName = typeof eventModule.event === 'string' 
//                         ? eventModule.event 
//                         : eventModule.event.name || '未知事件';
                        
//                     if (eventModule.once) {
//                         bot.once(eventModule.event, eventModule.action);
//                     } else {
//                         bot.on(eventModule.event, eventModule.action);
//                     }
//                     console.log(`已載入事件: ${eventName} (${eventModule.once ? 'once' : 'on'})`);
//                 }
//             } catch (error) {
//                 console.error(`載入事件 ${file} 時發生錯誤:`, error);
//             }
//         }
        
//         console.log('事件載入完成');
//     } catch (error) {
//         console.error('載入事件過程發生錯誤:', error);
//         throw error;
//     }
// };