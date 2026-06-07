const http = require('http');
const mineflayer = require('mineflayer');

let bot = null;

const server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Para permitir acesso de qualquer site
    
    if (req.url === '/start') {
        if (!bot) {
            bot = mineflayer.createBot({ host: 'MakerLN.aternos.me', port: 21198, username: 'lunactive2' });
            bot.on('end', () => bot = null);
            res.end('Bot Ligado');
        } else {
            res.end('Bot ja esta rodando');
        }
    } else if (req.url === '/stop') {
        if (bot) {
            bot.quit();
            bot = null;
            res.end('Bot Desligado');
        } else {
            res.end('Bot ja esta desligado');
        }
    } else {
        res.end('Servidor Ativo');
    }
});

server.listen(process.env.PORT || 3000);
