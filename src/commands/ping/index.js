import { SlashCommandBuilder } from 'discord.js';


export const command = new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Ping command');

export const action = async (ctx) => { 
    ctx.reply('Pong!');
}