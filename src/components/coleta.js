document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('enviarColeta').addEventListener('click', function() {
        const cnpj_cpf = document.getElementById('cnpj_cpf').value.trim();
        const email = document.getElementById('email').value.trim();
        const endereco = document.getElementById('endereco').value.trim();
        const residuo = document.getElementById('residuo').value.trim();
        const peso = document.getElementById('peso').value.trim();
        const quantidade = document.getElementById('quantidade').value.trim();
        const observacoes = document.getElementById('observacoes').value.trim();
        const data = document.getElementById('data').value;

        if (cnpj_cpf === '' || email === '' || endereco === '' || residuo === '' || peso === '' || quantidade === '' || data === '') {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        const coletaData = {
            cnpj_cpf: cnpj_cpf,
            email: email,
            endereco: endereco,
            residuo: residuo,
            peso: peso,
            quantidade: quantidade,
            observacoes: observacoes,
            date: data
        };

        let coletas = JSON.parse(localStorage.getItem('coletas')) || [];
        coletas.push(coletaData);
        localStorage.setItem('coletas', JSON.stringify(coletas));

        enviarEmail(coletaData);

        limparCampos();
        alert('Coleta enviada com sucesso!');
    });

    function enviarEmail(coletaData) {
        fetch('http://localhost:5174/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: coletaData.email,
                subject: 'Nova Coleta Agendada',
                text: `Uma nova coleta foi agendada com os seguintes detalhes:
                CNPJ/CPF: ${coletaData.cnpj_cpf}
                Endereço: ${coletaData.endereco}
                Resíduo: ${coletaData.residuo}
                Peso: ${coletaData.peso}
                Quantidade: ${coletaData.quantidade}
                Observações: ${coletaData.observacoes}
                Data: ${coletaData.date}`
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Email enviado com sucesso:', data);
        })
        .catch(error => {
            console.error('Erro ao enviar email:', error);
        });
    }

    function limparCampos() {
        document.getElementById('cnpj_cpf').value = '';
        document.getElementById('email').value = '';
        document.getElementById('endereco').value = '';
        document.getElementById('residuo').value = '';
        document.getElementById('peso').value = '';
        document.getElementById('quantidade').value = '';
        document.getElementById('observacoes').value = '';
        document.getElementById('data').value = '';
    }
});
