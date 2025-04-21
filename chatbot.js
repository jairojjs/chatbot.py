const qrcode = require('qrcode-terminal');
const { Client } = require('whatsapp-web.js');

const client = new Client({
    puppeteer: {
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});

const delay = ms => new Promise(res => setTimeout(res, ms));

// Exibe o QR code uma única vez
client.once('qr', qr => {
    qrcode.generate(qr, { small: true });
});

// Confirmação de conexão
client.once('ready', () => {
    console.log('✅ WhatsApp conectado com sucesso!');
});

// Inicializa o cliente
client.initialize();

// Atendimento automático
client.on('message', async msg => {
    if (!msg.from.endsWith('@c.us')) return;

    const texto = msg.body.toLowerCase();
    const chat = await msg.getChat();

    // Saudação e menu
    if (/^(menu|oi|olá|ola|bom dia|boa tarde|boa noite|a paz|jairo)/i.test(texto)) {
        const contact = await msg.getContact();
        const nome = contact.pushname ? contact.pushname.split(" ")[0] : '';

        await delay(1500);
        await chat.sendStateTyping();
        await delay(2000);
        await client.sendMessage(msg.from,
            `Olá ${nome}! 👋\n\nSou o assistente virtual da *Solução em TI*.\nComo posso te ajudar hoje?\n\nDigite o número de uma das opções:\n\n1️⃣ - Como funciona\n2️⃣ - Serviços oferecidos\n3️⃣ - Benefícios\n4️⃣ - Como aderir\n5️⃣ - Outras perguntas`
        );
        return;
    }

    // Opção 1 - Como funciona
    if (texto === '1') {
        await delay(1500);
        await chat.sendStateTyping();
        await delay(2000);
        await client.sendMessage(msg.from,
            `📌 *Como funciona*\n\nNosso serviço oferece suporte e consultoria em TI 8 horas por dia, 5 dias por semana, diretamente pelo WhatsApp.\n\nSem burocracia e com atendimento ágil para ajudar você ou sua empresa com dúvidas técnicas, manutenções, soluções e melhorias.\n\nA adesão é simples e rápida.`
        );
        return;
    }

    // Opção 2 - Serviços oferecidos
    if (texto === '2') {
        await delay(1500);
        await chat.sendStateTyping();
        await delay(2000);
        await client.sendMessage(msg.from,
            `💼 *Serviços oferecidos:*\n\n✔ Suporte técnico remoto\n✔ Manutenção preventiva\n✔ Consultoria de sistemas\n✔ Segurança da informação\n✔ Orientação para pequenos negócios digitais\n✔ Treinamento básico em tecnologia\n✔ Resolução de erros e lentidão em sistemas\n\nTudo isso com atendimento humanizado e direto pelo WhatsApp.`
        );
        return;
    }

    // Opção 3 - Benefícios
    if (texto === '3') {
        await delay(1500);
        await chat.sendStateTyping();
        await delay(2000);
        await client.sendMessage(msg.from,
            `🎯 *Benefícios do nosso atendimento:*\n\n✅ Respostas rápidas\n✅ Atendimento 8/5\n✅ Equipe especializada\n✅ Canal direto sem robô (apenas esse assistente para triagem)\n✅ Soluções personalizadas\n\nVocê fala com quem resolve!`
        );
        return;
    }

    // Opção 4 - Como aderir
    if (texto === '4') {
        await delay(1500);
        await chat.sendStateTyping();
        await delay(2000);
        await client.sendMessage(msg.from,
            `📝 *Como aderir ao nosso serviço*\n\n1️⃣ Envie seu nome completo e cidade.\n2️⃣ Informe o tipo de suporte que precisa.\n3️⃣ Nossa equipe entrará em contato em até 24h.\n\nVocê também pode iniciar pelo site: https://github.com/jairojjs/jairojjs`
        );
        return;
    }

    // Opção 5 - Outras perguntas
    if (texto === '5') {
        await delay(1500);
        await chat.sendStateTyping();
        await delay(2000);
        await client.sendMessage(msg.from,
            `❓ *Outras perguntas*\n\nSe você tiver outras dúvidas ou precisar de informações específicas, basta enviar sua mensagem aqui.\n\nResponderemos o mais rápido possível. Obrigado por contar com a Solução em TI!`
        );
        return;
    }
});
