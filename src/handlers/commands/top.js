const Client = require('../../client/index');
const { Message } = require('discord.js');
const User = require('../../models/user');

module.exports = {
    name: 'top',
    
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    
    run: async (client, message, args, i = 1) => {
        User.find().sort([['stars', 'descending']]).exec(async function (err, results) {
            const noUsers = new client.discord.MessageEmbed()
            .setTitle(`<:no:725678613390819388> ${message.author.tag}, no users in the system.`)
            .setColor('#f04747')

            if(results.length < 1) return message.channel.send(noUsers);

            let usersMap = results.map(result => `**${i++}** - \`${client.users.cache.get(result.id).tag}\` (${result.profession || '*No know profession*'}) (${result.stars || 0}) \n∟ ${userStars(result.stars)}`).join('\n\n')
            const usersList = new client.discord.MessageEmbed()
            .setTitle(message.guild.name)
            .setDescription(usersMap)
            .setColor('#7289DA');

            message.channel.send(usersList);
        });

        function userStars(stars) {
            if(!stars || stars < 2) return '⭐';
            if(stars && stars < 3) return '⭐⭐';
            if(stars && stars < 4) return '⭐⭐⭐';
            if(stars && stars < 5) return '⭐⭐⭐⭐';
            if(stars && stars < 6 || stars > 6) return '⭐⭐⭐⭐⭐';
        }
    }
}