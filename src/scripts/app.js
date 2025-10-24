document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------------------------
    // 1. Lógica do Menu Lateral (Side-Menu - Funcionalidade Mobile)
    // ----------------------------------------------------------------------

    const sideMenuToggle = document.getElementById('side-menu-toggle');
    const sideMenuCloseBtn = document.getElementById('side-menu-close-btn');
    const sideMenuLinks = document.querySelectorAll('.side-menu__list a');
    const sideMenuHamburguer = document.querySelector('.side-menu__hamburguer');

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

    // 1.2. Fechar ao clicar em um link (para UX de navegação)
    sideMenuLinks.forEach(link => {
        link.addEventListener('click', closeSideMenu);
    });

    // ----------------------------------------------------------------------
    // 2. Lógica do Formulário de Cadastro (Validação Visual)
    // ----------------------------------------------------------------------
    const form = document.getElementById('volunteer-form');
    const submitBtn = document.getElementById('submit-btn');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const successAlert = document.getElementById('success-alert');

    if (form && submitBtn && nameInput && emailInput) {
        
        // Função para checar a validade dos campos críticos
        const checkValidity = () => {
            const isNameValid = nameInput.value.trim().length > 2;
            const isEmailValid = emailInput.value.includes('@') && emailInput.value.includes('.');

            if (isNameValid && isEmailValid) {
                submitBtn.removeAttribute('disabled');
                submitBtn.classList.remove('btn-disabled');
            } else {
                submitBtn.setAttribute('disabled', 'disabled');
                submitBtn.classList.add('btn-disabled');
            }
        };

        // Adicionar o evento de input para checar a validade em tempo real
        nameInput.addEventListener('input', checkValidity);
        emailInput.addEventListener('input', checkValidity);

        // Inicializa o botão como desabilitado na carga da página
        checkValidity();

        // Lógica de Simulação de Submissão
        form.addEventListener('submit', (event) => {
            event.preventDefault(); 
            
            if (!submitBtn.disabled) {
                console.log('Formulário enviado (simulação):', new FormData(form));

                // Resetar o formulário e mostrar a mensagem de sucesso
                form.reset();
                checkValidity(); // Desabilita o botão novamente
                
                if (successAlert) {
                    successAlert.style.display = 'block';
                    // Ocultar a mensagem após 5 segundos
                    setTimeout(() => {
                        successAlert.style.display = 'none';
                    }, 5000);
                }
            }
        });
    }
});
