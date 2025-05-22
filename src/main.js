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
