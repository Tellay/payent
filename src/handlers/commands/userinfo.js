const Client = require('../../client/index');
const { Message } = require('discord.js');
const Users = require('../../models/user');

module.exports = {
    name: 'userinfo',
    
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    
    run: async (client, message, args) => {
        const user = await message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;

        const userIsBotEmbed = new client.discord.MessageEmbed()
        .setTitle(`<:no:725678613390819388> ${message.author.tag}, you mentioned a bot, and bots are not available in the system.`)
        .setColor('#f04747')

        if(user.bot) return message.channel.send(userIsBotEmbed);
        const findingUser = await Users.findOne({ id: user.id });
        if(!findingUser) return Users.create({ id: user.id  });

        const userInfoEmbed = new client.discord.MessageEmbed()
        .setAuthor(user.tag, user.displayAvatarURL({ dynamic: true, size: 2048 }))
        .setDescription(findingUser.description || 'No known description.')
        .addField('👷🏽‍♂️ Profession', findingUser.profession || 'No know profession.', true)
        .addField('📚 Portfolio', findingUser.portfolio ? `**[[Click Here]](${findingUser.portfolio})**` : 'No know porfolio.', true)
        .addField('🪙 Money', findingUser.money ? findingUser.money.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 }) : '$0.00', true)
        .setColor('#7289DA');
        
        if(!findingUser.stars || findingUser.stars < 2) return userInfoEmbed.addField(`🌠 Assessment (${findingUser.stars || 0})`, '⭐ (Silver <:silver:838204196858888293>)', true) && message.channel.send(userInfoEmbed);
        if(findingUser.stars && findingUser.stars < 3) return userInfoEmbed.addField(`🌠 Assessment (${findingUser.stars || 0})`, '⭐⭐ (Iron <:iron:838204196528455680>)', true) && message.channel.send(userInfoEmbed);
        if(findingUser.stars && findingUser.stars < 4) return userInfoEmbed.addField(`🌠 Assessment (${findingUser.stars || 0})`, '⭐⭐⭐ (Gold <:gold:838204196138254337>)', true) && message.channel.send(userInfoEmbed);
        if(findingUser.stars && findingUser.stars < 5) return userInfoEmbed.addField(`🌠 Assessment (${findingUser.stars || 0})`, '⭐⭐⭐⭐ (Diamond <:diamond:838204196494245928>)', true) && message.channel.send(userInfoEmbed);
        if(findingUser.stars && findingUser.stars < 6 || findingUser.stars >= 6) return userInfoEmbed.addField('🌠 Assessment', '⭐⭐⭐⭐⭐ (Netherite <:netherite:838204196632789003>)', true) && message.channel.send(userInfoEmbed);
    }
}