import fetch from 'node-fetch';

const handler = async (m, { conn, args }) => {
    if (!args[0]) {
        await conn.reply(m.chat, '🍭 *Ingresa el nombre de la imágen que estás buscando*', m);
        return;
    }
    const use = args[0];
    const url = `https://rule34.xxx/index.php?page=dapi&s=post&q=index&json=1&tags=${use}`;
    try {
        await conn.reply(m.chat, '🔄 Espera un momento...', m);
        
        const response = await fetch(url);
        const data = await response.json();
        if (!data || data.length === 0) {
            await conn.reply(m.chat, `🪷 No hubo resultados para *${use}*`, m);
            return;
        }
        
        const randomIndex = Math.floor(Math.random() * data.length);
        const randomImage = data[randomIndex];
        const urlimg = randomImage.file_url;

        await conn.sendFile(m.chat, urlimg, 'thumbnail.jpg', `*Resultados De:* ${use}`, m);
    } catch (error) {
        console.error(error);
        await m.reply('🌷 Ocurrió un error.');
    }
};

handler.help = ['r34 <texto>'];
handler.command = ['r34', 'rule34', 'rule'];
handler.tags = ['nsfw'];
handler.register = true;
//handler.yenes = 2;

export default handler;