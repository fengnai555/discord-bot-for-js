import { Client, Events, GatewayIntentBits } from 'discord.js';
import vueInit from '@core/vue';
import dotenv from 'dotenv';
import { useAppStore } from '@store/app';

import { loadCommands, loadEvents } from '@core/loader';

vueInit()
dotenv.config();

loadCommands();


const bot = new Client({ intents: [GatewayIntentBits.Guilds] });
const appStore = useAppStore();
appStore.bot = bot;

loadEvents();
bot.login(process.env.TOKEN);


// import { Client, Events, GatewayIntentBits } from 'discord.js';
// import vueInit from '@core/vue';
// import dotenv from 'dotenv';
// import { useAppStore } from '@store/app';
// import { loadCommands, loadEvents } from '@core/loader';

// dotenv.config();

// const main = async () => {
//     try {
//         // 初始化 Vue 和 Pinia
//         vueInit();
        
//         // 創建 bot 實例
//         const bot = new Client({ 
//             intents: [GatewayIntentBits.Guilds] 
//         });

//         // 設置到 store
//         const appStore = useAppStore();
//         appStore.bot = bot;

//         // 載入指令和事件
//         await loadCommands();
//         await loadEvents();

//         // 最後登入 bot
//         await bot.login(process.env.TOKEN);
        
//     } catch (error) {
//         console.error('初始化過程發生錯誤:', error);
//     }
// };

// main().catch(console.error);