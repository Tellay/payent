const Client = require('../../client/index');
const { Message } = require('discord.js');

module.exports = {
    name: 'products',
    
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    
    run: async (client, message, args, i = 1) => {
        client.fetch(`http://localhost:${process.env.PORT}/api/products`)
        .then(result => result.json())
        .then(function(data) {
            if(data.msg != 'No products available!') {
                products = data.map(product => `**${i++}** - [${product.title}](${product.imgUrl}) (${product.price}$) (${product.discount ? product.discount + "% OFF" : '0% OFF'}) \n∟ ${product.description}`).join("\n\n")
                const productsEmbed = new client.discord.MessageEmbed()
                .setTitle('✨ Our incridible products!')
                .setDescription(`${products}`)
                .setColor('#7289DA')
    
                return message.channel.send(productsEmbed);
            }

            const productsEmbed = new client.discord.MessageEmbed()
            .setTitle('✨ Our incridible products!')
            .setDescription(`${data.msg}`)
            .setColor('#7289DA')

            message.channel.send(productsEmbed);
        });
    }
}