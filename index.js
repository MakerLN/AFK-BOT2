const http = require('http');
const mineflayer = require('mineflayer');

// Mantém o servidor HTTP vivo para o Render não matar o bot
http.createServer((req, res) => res.end('Bot Online')).listen(process.env.PORT || 3000);

function createBot() {
    const bot = mineflayer.createBot({
        host: 'MakerLN.aternos.me',
        port: 21198,
        username: 'lunactive2'
    });

    bot.on('end', () => {
        console.log('Bot desconectado. Reconectando em 5 segundos...');
        setTimeout(createBot, 5000);
    });

    bot.on('error', (err) => console.log('Erro:', err));
    
    bot.on('spawn', () => {
        console.log('lunactive2 entrou no servidor!');
    });
}

createBot();
