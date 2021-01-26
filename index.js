require('dotenv').config();
const Discord = require('discord.js');
const bot = new Discord.Client();
const TOKEN = process.env.TOKEN;

bot.login(TOKEN);

bot.on('ready', () => {
  console.info(`Logged in as ${bot.user.tag}!`);
});

bot.on('message', msg => {
  if (msg.author == client.user) {
    return;
  }

  if (msg.author.bot) {
    return;
  }

  if (msg.content.toLowerCase().includes("repost") || msg.content.toLowerCase().includes("re-post")) {
    //Ignoring since this was on purpose
    return;
  }
  //Does message contain a link?
  if(msg.includes("..")) {
    //If the string includes two . in a row, let us consider that as not valid. Even though it is technically valid in some cases, I think it is
    //exceedingly rare and I do not want a false positive

    return;
  }

  var urlRE= new RegExp(/([a-zA-Z\d]+:\/\/)?((\w+:\w+@)?([a-zA-Z\d.-]+\.[A-Za-z]{2,4})(:\d+)?(\/.\S*)?)/);
  let matches = msg.content.match(urlRE);
  if (matches && matches[0]) {
    let link = matches[0];
    console.log("Attempting to match on " + link);

    //Look for link in past messages
    let actingChannel = msg.channel;
    actingChannel.fetchMessages()
        .then(messages => {
          messages = messages.array();
          messages = messages.filter(message => message.content.includes(link) && message.id !== msg.id);
          if(messages.length > 0) {
            actingChannel.send(`Oi, <@${msg.author.id}>, scroll up. ${messages[messages.length - 1].url}`);
          }
        })
        .catch(console.error);
  }
});
