const mineflayer = require('mineflayer');
const express = require('express');
const app = express();

// === Keepalive server for Railway ===
const PORT = process.env.PORT || 3000;
app.get('/', (req, res) => res.send('✅ Aternos bot is running.'));
app.listen(PORT, () => console.log(`🌐 Express server online on port ${PORT}`));

// === Mineflayer Bot Config ===
const bot = mineflayer.createBot({
  host: 'NoModsFree.aternos.me', // your server IP
  port: 51271,                   // your port
  username: 'NoModsFree',        // bot username
  version: '1.21.1'              // Minecraft version
});

// === Events ===
bot.on('login', () => {
  console.log(`✅ Logged in as ${bot.username}`);
  bot.chat('✅ Bot is online and ready!');
});

bot.on('error', err => console.log('❌ Error:', err));
bot.on('end', () => {
  console.log('⚠️ Disconnected. Restarting in 10s...');
  setTimeout(() => process.exit(1), 10000);
});

// === Whisper Command ===
bot.on('whisper', (username, message) => {
  console.log(`📩 Private message from ${username}: ${message}`);
  if (message.startsWith('!say ')) {
    const toSay = message.substring(5);
    bot.chat(toSay);
    bot.whisper(username, `✅ Sent: ${toSay}`);
  } else {
    bot.whisper(username, '💬 Use !say <message> to talk in chat.');
  }
});

// === Keep Alive in Chat ===
bot.once('spawn', () => {
  setInterval(() => {
    bot.chat('🟢 Still alive!');
  }, 600000); // every 10 minutes
});
