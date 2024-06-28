document.addEventListener('DOMContentLoaded', function() {
    const coletas = JSON.parse(localStorage.getItem('coletas')) || [];
    const calendar = document.getElementById('calendar');
    const monthDisplay = document.getElementById('monthDisplay');
    const weekdays = document.getElementById('weekdays');
    const eventModal = document.getElementById('eventModal');
    const eventText = document.getElementById('eventText');
    const modalBackDrop = document.getElementById('modalBackDrop');
    const closeButton = document.getElementById('closeButton');
    const clearButton = document.getElementById('clearButton');

    let nav = 0;
    let clicked = null;

    const load = () => {
        const dt = new Date();

        if (nav !== 0) {
            dt.setMonth(new Date().getMonth() + nav);
        }

        const day = dt.getDate();
        const month = dt.getMonth();
        const year = dt.getFullYear();

        const firstDayOfMonth = new Date(year, month, 1);
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        const dateString = firstDayOfMonth.toLocaleDateString('pt-br', {
            weekday: 'long',
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
        });

        const paddingDays = weekdaysList.indexOf(dateString.split(', ')[0]);
        
        const monthName = dt.toLocaleDateString('pt-br', { month: 'long' });
        const monthNameCapitalized = monthName.charAt(0).toUpperCase() + monthName.slice(1);

        monthDisplay.innerText = `${monthNameCapitalized} ${year}`;

        calendar.innerHTML = '';

        for(let i = 1; i <= paddingDays + daysInMonth; i++) {
            const daySquare = document.createElement('div');
            daySquare.classList.add('day');

            if (i > paddingDays) {
                const dayString = `${year}-${(month + 1).toString().padStart(2, '0')}-${(i - paddingDays).toString().padStart(2, '0')}`;

                daySquare.innerText = i - paddingDays;

                const dayColetas = coletas.filter(e => e.date.split('T')[0] === dayString);

                if (dayColetas.length > 0) {
                    const eventDiv = document.createElement('div');
                    eventDiv.classList.add('event');
                    eventDiv.innerText = `Coletas: ${dayColetas.length}`;
                    daySquare.appendChild(eventDiv);
                }

                daySquare.addEventListener('click', () => openModal(dayString));
            } else {
                daySquare.classList.add('padding');
            }

            calendar.appendChild(daySquare);    
        }
    }

    const weekdaysList = ['domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado'];

    const openModal = (date) => {
        clicked = date;

        const dayColetas = coletas.filter(e => e.date.split('T')[0] === clicked);

        if (dayColetas.length > 0) {
            eventText.innerHTML = dayColetas.map(e => `
                <div class="event">
                    <p>Email: ${e.email}</p>
                    <p>Endereço: ${e.endereco}</p>
                    <p>Modelo de Resíduo: ${e.residuo}</p>
                    <p>Peso: ${e.peso}</p>
                    <p>Quantidade: ${e.quantidade}</p>
                    <p>Observações: ${e.observacoes}</p>
                </div>
            `).join('');
        } else {
            eventText.innerHTML = '<p>Sem coletas para este dia.</p>';
        }

        eventModal.classList.add('open');
        modalBackDrop.classList.add('open');
       /*  closeButton.classList.remove('hidden'); */ // Mostra o botão quando o modal é aberto
    };

    const closeModal = () => {
        eventModal.classList.remove('open');
        modalBackDrop.classList.remove('open');
        eventText.innerHTML = '';
        closeButton.classList.add('hidden'); // Esconde o botão quando o modal é fechado
    };

    const initButtons = () => {
        document.getElementById('backButton').addEventListener('click', () => {
            nav--;
            load();
        });

        document.getElementById('nextButton').addEventListener('click', () => {
            nav++;
            load();
        });

        clearButton.addEventListener('click', () => {
            localStorage.removeItem('coletas');
            coletas.length = 0;
            load();
        });

        // Adiciona os event listeners de fechamento de modal aqui
        closeButton.addEventListener('click', closeModal);
        modalBackDrop.addEventListener('click', closeModal);
    };

    initButtons();
    load();
});
