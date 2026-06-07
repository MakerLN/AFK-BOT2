const http = require('http');
const mineflayer = require('mineflayer');

let bot = null;

const server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    
    if (req.url === '/start') {
        if (!bot) {
bot = mineflayer.createBot({ 
    host: 'MakerLN.aternos.me', 
    port: 21198, 
    username: 'lunactive2',
    auth: 'offline',
    version: false, // Deixe false para autodetectar
    checkTimeoutInterval: 60000 // Aumenta o tempo limite para conexões lentas de modpacks
});
            
            bot.on('spawn', () => console.log('Bot entrou!'));
            bot.on('end', (reason) => {
                console.log('Bot desconectado. Motivo:', reason);
                bot = null;
            });
            bot.on('error', (err) => console.log('ERRO FATAL:', err));
            
            res.end('Tentando ligar...');
        } else {
            res.end('Bot ja esta rodando ou tentando conectar');
        }
    } else if (req.url === '/stop') {
        if (bot) {
            bot.quit();
            bot = null;
            res.end('Bot Desligado');
        } else {
            res.end('Bot ja esta desligado');
        }
    }
});
server.listen(process.env.PORT || 3000);
