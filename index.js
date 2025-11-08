// === KEEP ALIVE WEB SERVER ===
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => res.send('✅ Aternos Bot is running and alive!'));
app.listen(port, () => console.log(`🌐 Keep-alive server running on port ${port}`));

// === MINECRAFT BOT ===
const mineflayer = require('mineflayer');

// === CONFIG ===
const bot = mineflayer.createBot({
  host: 'NoModsFree.aternos.me', // your server IP
  port: 51271,                   // your port
  username: 'NoModsFree',        // bot username
  version: '1.21.1'              // force Minecraft version
});

// === EVENTS ===

// When the bot logs in
bot.on('login', () => {
  console.log(`✅ Logged in as ${bot.username}`);
  bot.chat('✅ Bot is online and ready!');
});

// Log errors and reconnect
bot.on('error', err => console.log('❌ Error:', err));
bot.on('end', () => {
  console.log('⚠️ Disconnected. Reconnecting in 10s...');
  setTimeout(() => process.exit(1), 10000);
});

// When someone sends a private message to the bot
bot.on('whisper', (username, message) => {
  console.log(`📩 Private message from ${username}: ${message}`);

  if (message.startsWith('!say ')) {
    const toSay = message.substring(5);
    bot.chat(toSay);
    bot.whisper(username, `✅ Sent to public: ${toSay}`);
  } else {
    bot.whisper(username, '💬 Use !say <message> to send a public chat message.');
  }
});

// Keep the bot active
bot.once('spawn', () => {
  setInterval(() => {
    bot.chat('🟢 Still alive!');
  }, 600000); // every 10 minutes
});
