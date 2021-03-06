const Discord = require('discord.js');
const client = new Discord.Client();

const path = require("path");
global.rootDir = path.resolve(__dirname) + "/";
const config = require(rootDir + "config.json");
const fs = require('fs')
client.commands = new Discord.Collection()
client.commandss = [];

//Loading Modules
fs.readdir(rootDir + 'commands', (err, file) =>{
  if(err) console.log(err)
  let jsfile = file.filter(f => f.split(".").pop() === 'js')
  if(jsfile.length <= 0){
    console.log('Could not find commands')
    return;
  }
  jsfile.forEach((f, i) =>{
    let props = require(rootDir + `commands/${f}`);
    console.log(`${f} loaded...`);
    client.commandss[f] = {
      name: props.help.name
    }
    client.commands.set(props.help.name, props)
  });
});

client.on('ready', () => {
  console.log(`\nLogged in as ${client.user.tag}. No errors present.`);
  client.user.setActivity('anime alone', {type: 'WATCHING'});
});



//Commands
client.on('message', async message => {
  if(message.author.bot || !message.author || !message.guild) return;
  let prefix = config.prefix;
  if(!message.content.startsWith(config.prefix)) return;
  let messageArray = message.content.split(" ");
  let command = messageArray[0];
  let args = messageArray.slice(1);
  let cmd = command.slice(config.prefix.length);

  //Command File
  let commandfile = client.commands.get(command.slice(prefix.length));
  if(commandfile){ commandfile.run(client,message,args)}

});



//Welcome Message
client.on('guildMemberAdd', member => {
  const welcChannel = member.guild.channels.find(ch => ch.name === 'welcome');
  if (!welcChannel) return message.channel.send('Plase create a valid welcome channel');
  welcChannel.send(`Welcome to the official server for the Anime/Manga club ${member}. If you need help, simply type _help. For bot info type _botinfo.`);
});

//Leaving Message
client.on('guildMemberRemove', member =>{
  const leaveChannel = member.guild.channels.find(ch => ch.name === 'welcome');
  if (!leaveChannel) return;
  leaveChannel.send(`Goodbye ${member}. Your legacy will remain forevermore.`);
})


//Login Token
client.login(config.token);
