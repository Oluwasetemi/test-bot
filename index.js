require("dotenv").config({ path: "variable.env" });
const http = require('http')
const TeleBot = require('telebot')
const bot = new TeleBot(process.env.TOKEN)

const server = http.createServer((req, res) => {
  res.end('Telegram Bot is Live 🔥');
});

bot.on('text', (msg) => {
  console.log(`[text] ${ msg.chat.id } ${ msg.text }`)
})

bot.on(['/start', '/hello'], (msg) => msg.reply.text('Welcome!'))

bot.on('/hello', (msg) => {
  return bot.sendMessage(msg.from.id, `Hello, ${ msg.from.first_name }!
  You are welcome to my test bot! on telegram.
  `);
});

bot.on('sticker', (msg) => {
  return msg.reply.sticker('http://i.imgur.com/VRYdhuD.png', { asReply: true });
});

bot.on(/(show\s)?kitty*/, (msg) => {
  return msg.reply.photo('http://thecatapi.com/api/images/get');
});

bot.on(/^\/say (.+)$/, (msg, props) => {
  const text = props.match[1];
  return bot.sendMessage(msg.from.id, text, { replyToMessage: msg.message_id });
});

bot.on('edit', (msg) => {
  return msg.reply.text('I saw it! You edited message!', { asReply: true });
});

// On command "about"
bot.on('/about', function (msg) {

  let text = '😽 This bot is powered by TeleBot library ' +
      'https://github.com/kosmodrey/telebot Go check the source code!';

  return bot.sendMessage(msg.chat.id, text);

});

bot.start()

server.listen(80, err => {
  if (!err) {
    console.log('server is listening on port 80');
  }
});