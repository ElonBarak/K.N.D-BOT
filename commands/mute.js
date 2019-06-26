const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {

  //!tempmute @user 1s/m/h/d
  message.delete().catch(O_o=>{});
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(`**${message.author} אין ברשותך מספיק פרמישן בשביל להשתמש בפקודה זו**`);
  let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  let mReason = args.slice(2).join(" ");
  if(!tomute) return message.reply("**!אנא תייג את הבנאדם שברצונך להזהיר**");
  if(tomute.hasPermission("MANAGE_MESSAGES")) return message.reply("**!איני יכול לתת מיוט לאיש צוות**");
  if(!mReason) return message.reply("**!אנא כתוב סיבה**");
  let muterole = message.guild.roles.find(`name`, "Muted");
  //start of create role
  if(!muterole){
    try{
      muterole = await message.guild.createRole({
        name: "Muted",
        color: "#838383",
        permissions:[]
      })
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(muterole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
    }catch(e){
      console.log(e.stack);
    }
  }
  //end of create role
  let mutetime = args[1];
  if(!mutetime) return message.reply("**!אנא כתוב את הזמן שברצונך לתת מיוט**");

  await(tomute.addRole(muterole.id));
  return message.channel.send(`<@${tomute.id}> has been muted for ${ms(ms(mutetime))} Because: **${mReason}**.`);

  setTimeout(function(){
    tomute.removeRole(muterole.id);
  }, ms(mutetime));


//end of module
}

module.exports.help = {
  name: "mute"
}
