const Client = require('../../client/index');
const { Message, DiscordAPIError } = require('discord.js');
const Channels = require('../../models/channel');

module.exports = {
    name: 'create',
    
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    
    run: async (client, message, args) => {
        const usingUser = await Channels.findOne({ id: message.author.id });

        const userAlreadyChannelOpenEmbed = new client.discord.MessageEmbed()
        .setTitle(`<:no:725678613390819388> ${message.author.tag}, you already have a thread open, wait it will be deleted.`)
        .setColor('#f04747')

        if(usingUser) return message.channel.send(userAlreadyChannelOpenEmbed);
        message.react('✅');

        const channel = await message.guild.channels.create(`${message.author.username}-${message.author.discriminator}`, { type: 'text', parent: process.env.THREADS_CATEGORY, topic: `📌 **${message.author.tag}** please follow the rules, and all goes right!`, permissionOverwrites: [
            {
    			id: message.guild.id,
			    deny: ['VIEW_CHANNEL']
            },

            {
                id: message.author.id,
                allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'EMBED_LINKS', 'ATTACH_FILES'],
            }
        ]});

        await Channels.create({ id: message.author.id, channel: channel.id });
        await Channels.findOne({ id: message.author.id, channel: channel.id })
        .then(user => {

            const titleEmbed = new client.discord.MessageEmbed()
            .setTitle(`⚖️ What's the title of your product?`)
            .setColor('#7289DA')
    
            channel.send(titleEmbed).then(async msg => {
                const filter = response => {
                    return response.author.id === user.id && response.channel.id === user.channel;
                }
                msg.channel.awaitMessages(filter, { max: 1, time: 60000, errors: ['time'] })
                .then(async collected => {
                    if(collected.first().content == 'cancel') return client.channels.cache.get(user.channel).delete() && await Channels.deleteOne({ id: user.id });
                    if(collected.first().content.length > 20) return client.channels.cache.get(user.channel).delete() && await Channels.deleteOne({ id: user.id });
                    Channels.updateOne({ id: user.id  }, { $push: { selling: { title: collected.first().content } }}).catch(err => console.log(err));
                    collected.first().channel.bulkDelete(2);

                    const descriptionEmbed = new client.discord.MessageEmbed()
                    .setTitle(`📕 What's the description of your product?`)
                    .setColor('#7289DA')

                    channel.send(descriptionEmbed).then(async msg => {
                        const filter = response => {
                            return response.author.id === user.id && response.channel.id === user.channel;
                        }
                        
                        msg.channel.awaitMessages(filter, { max: 1, time: 60000, errors: ['time'] })
                        .then(async collected => {
                            if(collected.first().content == 'cancel') return client.channels.cache.get(user.channel).delete() && await Channels.deleteOne({ id: user.id });
                            if(collected.first().content.length > 250) return client.channels.cache.get(user.channel).delete() && await Channels.deleteOne({ id: user.id });
                            if(collected.first().content.length < 30) return client.channels.cache.get(user.channel).delete() && await Channels.deleteOne({ id: user.id });
                            Channels.updateOne({ id: user.id  }, { $addToSet: { selling: { description: collected.first().content } }}).catch(err => console.log(err));
                            collected.first().channel.bulkDelete(2);

                            const priceEmbed = new client.discord.MessageEmbed()
                            .setTitle(`🪙 What's the price of your product?`)
                            .setColor('#7289DA')

                            channel.send(priceEmbed).then(async msg => {
                                const filter = response => {
                                    return response.author.id === user.id && response.channel.id === user.channel;
                                }
                                
                                msg.channel.awaitMessages(filter, { max: 1, time: 60000, errors: ['time'] })
                                .then(async collected => {
                                    if(collected.first().content == 'cancel') return client.channels.cache.get(user.channel).delete() && await Channels.deleteOne({ id: user.id });
                                    if(isNaN(collected.first().content)) return client.channels.cache.get(user.channel).delete() && await Channels.deleteOne({ id: user.id });
                                    Channels.updateOne({ id: user.id  }, { $addToSet: { selling: { price: parseInt(collected.first().content) } }}).catch(err => console.log(err));
                                    collected.first().channel.bulkDelete(2);

                                    const imgEmbed = new client.discord.MessageEmbed()
                                    .setTitle(`🖼️ Please give us a image link of your product!`)
                                    .setColor('#7289DA')

                                    channel.send(imgEmbed).then(async msg => {
                                        const filter = response => {
                                            return response.author.id === user.id && response.channel.id === user.channel;
                                        }
                                        
                                        msg.channel.awaitMessages(filter, { max: 1, time: 60000, errors: ['time'] })
                                        .then(async collected => {
                                            if(collected.first().content == 'cancel') return client.channels.cache.get(user.channel).delete() && await Channels.deleteOne({ id: user.id });
                                            const checkLink = collected.first().content.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
                                            if(checkLink == null) return client.channels.cache.get(user.channel).delete() && await Channels.deleteOne({ id: user.id });
                                            collected.first().channel.bulkDelete(2);
                                            Channels.updateOne({ id: user.id  }, { $addToSet: { selling: { imgUrl: collected.first().content }}}).catch(err => console.log(err));

                                            const successEmbed = new client.discord.MessageEmbed()
                                            .setTitle(`✅ This smells like success, the product was been created.`)
                                            .setColor('#7289DA')

                                            Channels.findOne({ id: user.id })
                                            .then(async (user) => {
                                                client.axios.post('http://localhost:3001/api/products/create', {
                                                    title: user.selling[0].title,
                                                    description: user.selling[1].description,
                                                    price: user.selling[2].price,
                                                    imgUrl: user.selling[3].imgUrl
                                                });
                                            });

                                            channel.setTopic(`🎉 **${client.users.cache.get(user.id).tag}** success, the channel will be deleted in 10 seconds!`)
                                            channel.send(successEmbed);
                                            client.channels.cache.get(user.channel).overwritePermissions([
                                                {
                                                    id: user.id,
                                                    deny: ['SEND_MESSAGES', 'ADD_REACTIONS']
                                                }
                                            ]);

                                            setTimeout(async () => {
                                                client.channels.cache.get(user.channel).delete();
                                                await Channels.deleteOne({ id: user.id });
                                            }, 10000);
                                        })
                                        .catch(async collected => {
                                            if(collected.size < 1) {
                                                client.channels.cache.get(user.channel).delete();
                                                await Channels.deleteOne({ id: user.id })
                                            }
                                        });
                                    });
                                })
                                .catch(async collected => {
                                    if(collected.size < 1) {
                                        client.channels.cache.get(user.channel).delete();
                                        await Channels.deleteOne({ id: user.id })
                                    }
                                });
                            });
                        })
                        .catch(async collected => {
                            if(collected.size < 1) {
                                client.channels.cache.get(user.channel).delete();
                                await Channels.deleteOne({ id: user.id })
                            }
                        });
                    });

                })
                .catch(async collected => {
                    if(collected.size < 1) {
                        client.channels.cache.get(user.channel).delete();
                        await Channels.deleteOne({ id: user.id })
                    }
                });
            });
        });
    }
}