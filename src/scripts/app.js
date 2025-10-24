document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------------------------
    // 1. Lógica do Menu Lateral (Side-Menu - Correção UX Mobile)
    // ----------------------------------------------------------------------

    const sideMenuToggle = document.getElementById('side-menu-toggle');
    const sideMenuCloseBtn = document.getElementById('side-menu-close-btn');
    const sideMenuLinks = document.querySelectorAll('.side-menu__list a');
    const sideMenuOverlay = document.querySelector('.side-menu-overlay');

    // Função para fechar o menu
    const closeSideMenu = () => {
        if (sideMenuToggle) {
            sideMenuToggle.checked = false;
        }
    };

    // 1.1. Fechar ao clicar no botão 'X'
    if (sideMenuCloseBtn) {
        sideMenuCloseBtn.addEventListener('click', closeSideMenu);
    }

    // 1.2. Fechar ao clicar em um link
    sideMenuLinks.forEach(link => {
        link.addEventListener('click', closeSideMenu);
    });

    // 1.3. Fechar ao clicar no overlay escuro
    if (sideMenuOverlay) {
        sideMenuOverlay.addEventListener('click', closeSideMenu);
    }
    

    // ----------------------------------------------------------------------
    // 2. Lógica do Formulário de Cadastro (Validação Mínima)
    // ----------------------------------------------------------------------
    const form = document.getElementById('volunteer-form');
    const submitBtn = document.getElementById('submit-btn');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const successAlert = document.getElementById('success-alert');

    if (form && submitBtn && nameInput && emailInput) {
        
        // Função para checar a validade dos campos críticos
        const checkValidity = () => {
            const isNameValid = nameInput.value.trim() !== '';
            const isEmailValid = emailInput.value.includes('@') && emailInput.value.includes('.');

            if (isNameValid && isEmailValid) {
                submitBtn.removeAttribute('disabled');
            } else {
                submitBtn.setAttribute('disabled', 'disabled');
            }
        };

        // Adicionar o evento de input para checar a validade em tempo real
        nameInput.addEventListener('input', checkValidity);
        emailInput.addEventListener('input', checkValidity);

        // Lógica de Submissão do Formulário (Apenas demonstração)
        form.addEventListener('submit', (event) => {
            event.preventDefault(); // Impede o envio real
            
            // Simular envio de dados
            console.log('Formulário enviado (simulação):', new FormData(form));

            // Resetar o formulário e mostrar a mensagem de sucesso
            form.reset();
            submitBtn.setAttribute('disabled', 'disabled');
            
            if (successAlert) {
                successAlert.style.display = 'block';
                // Ocultar a mensagem após 5 segundos
                setTimeout(() => {
                    successAlert.style.display = 'none';
                }, 5000);
            }
        });
    }
});
