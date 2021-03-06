const Discord = require('discord.js');
const config = require(rootDir + "config.json");
const errors = require(rootDir + "utilities/errors.js");

module.exports.run = async(client, message, args) =>{
    let ePermission = message.member.hasPermission('ADMINISTRATOR', require, true, true)
    console.log(ePermission)
    if(!ePermission) return errors.noPerms(message, 'ADMINISTRATOR');
    let exilechan = message.guild.channels.find('name','reports')
    if (!reportchan){}
        try{
            reportcreate = await message.guild.createChannel({
                name: 'reports'//,
                //permissions:[]
            })}
        catch(e){
            console.log(e.stack)
        }
    let eUser = message.mentions.members.first()
    console.log(eUser)
    let ePermission2 = eUser.hasPermission('ADMINISTRATOR', require, true, true)
    console.log(ePermission2)
    if(ePermission2) return errors.hasPerms(message, 'ADMINISTRATOR')
    if(!eUser) return errors.noUser(message)
    let ereason = args.join(' ').slice(22)
    const embed7 = new Discord.RichEmbed()
      .setDescription ("Exile Performed")
      .setColor (config.red)
      .setAuthor (`${message.author.username}#${message.author.discriminator}`, message.author.avatarURL)
      .addField ('Exiled User', `${eUser} whose ID is ${eUser.id}`)
      .addField ('Reason Exiled', ereason)
      .addField ('Exiled By', `${message.author} whose ID is ${message.author.id}`)
      .addField ('Exiled In', message.channel)
      .addField ('Exiled At', message.createdAt)
      message.delete().catch(console.error);
      exilechan.send(embed7)
      eUser.ban(ereason)
}

module.exports.help = {
    name:'exile'
}
