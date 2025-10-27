document.addEventListener('DOMContentLoaded', function() {
    
    // ------------------------------------------------
    // 1. FUNCIONALIDADE DO MENU RESPONSIVO (HAMBÚRGUER)
    // ------------------------------------------------
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.getElementById('main-nav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', function() {
            // Lógica para alternar o estado do menu
            const isExpanded = this.getAttribute('aria-expanded') === 'true' || false;
            
            this.setAttribute('aria-expanded', !isExpanded);
            mainNav.classList.toggle('is-open'); // Classe CSS para mostrar/ocultar o menu
            
            // Bloqueia o scroll do body em mobile (para menus de tela cheia)
            if (window.innerWidth < 768) {
                document.body.classList.toggle('no-scroll', !isExpanded);
            }
        });
    }

    // ------------------------------------------------
    // 2. VALIDAÇÃO E INTERATIVIDADE DO FORMULÁRIO (cadastro.html)
    // ------------------------------------------------
    const form = document.getElementById('volunteer-form');
    const submitBtn = document.getElementById('submit-btn');
    const termosCheckbox = document.getElementById('termos');

    // Se não estiver na página de cadastro, a validação é ignorada.
    if (!form || !submitBtn || !termosCheckbox) {
        return; 
    }

    // Campos obrigatórios que precisam ser validados dinamicamente
    const requiredInputs = [
        document.getElementById('nome'),
        document.getElementById('email'),
        document.getElementById('interesse')
    ];

    /**
     * Valida se o email tem um formato básico.
     */
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    /**
     * Verifica se todos os campos obrigatórios e os termos estão preenchidos.
     * Adiciona/remove classes de erro e atributos ARIA para feedback visual e acessibilidade.
     * @returns {boolean}
     */
    function validateForm() {
        let isFormValid = true;

        requiredInputs.forEach(input => {
            const value = input.value.trim();
            const parentField = input.closest('.form-field');
            // Busca a mensagem de validação associada ao campo
            const validationMessage = parentField ? parentField.querySelector('.validation-message') : null;

            let fieldValid = true;
            
            // 1. Validação de Preenchimento Básico (incluindo o select)
            if (value === '' || (input.tagName === 'SELECT' && value === 'Selecione a área')) {
                fieldValid = false;
            } 
            
            // 2. Validação de Email
            if (input.id === 'email' && value !== '' && !isValidEmail(value)) {
                fieldValid = false;
            }

            // Aplica Feedback Visual e ARIA
            if (!fieldValid) {
                isFormValid = false;
                input.classList.add('is-invalid');
                input.setAttribute('aria-invalid', 'true');
                if (validationMessage) validationMessage.style.display = 'block';
            } else {
                input.classList.remove('is-invalid');
                input.setAttribute('aria-invalid', 'false');
                if (validationMessage) validationMessage.style.display = 'none';
            }
        });

        // 3. Validação do Checkbox de Termos (crucial)
        if (!termosCheckbox.checked) {
             isFormValid = false;
        }

        return isFormValid;
    }

    /**
     * Habilita/desabilita o botão de envio baseado na validação do formulário.
     */
    function toggleSubmitButton() {
        // Remove a classe de erro do checkbox caso ele seja marcado
        if (termosCheckbox.checked) {
            termosCheckbox.closest('.checkbox-group').classList.remove('is-invalid');
        } else {
            termosCheckbox.closest('.checkbox-group').classList.add('is-invalid');
        }

        if (validateForm()) {
            submitBtn.removeAttribute('disabled');
        } else {
            submitBtn.setAttribute('disabled', 'disabled');
        }
    }
    
    // Listeners para monitorar mudanças nos campos e no checkbox
    requiredInputs.forEach(input => {
        input.addEventListener('input', toggleSubmitButton);
        input.addEventListener('change', toggleSubmitButton);
    });
    termosCheckbox.addEventListener('change', toggleSubmitButton);


    // Intercepta o envio do formulário para simular sucesso e dar feedback (sem submeter para um backend real)
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Impede o envio real
        
        // Remove alertas anteriores
        document.querySelectorAll('.alert').forEach(alert => alert.remove());

        if (validateForm()) {
            // Cria a mensagem de sucesso usando o componente de feedback (.alert-success)
            const successAlert = document.createElement('div');
            successAlert.className = 'alert alert-success';
            successAlert.setAttribute('role', 'alert');
            // Nota: O ícone '&#10003;' é o checkmark
            successAlert.innerHTML = '<span>&#10003;</span> **Sucesso!** Seu cadastro foi enviado! Você receberá um e-mail em breve.';

            // Insere o alerta no topo da seção do formulário
            const formContainer = form.closest('.container');
            if (formContainer) {
                formContainer.prepend(successAlert);
            }
            
            // Feedback Visual final: Desabilita tudo após o "envio"
            submitBtn.textContent = 'Obrigado por se cadastrar!';
            submitBtn.setAttribute('disabled', 'disabled');
            requiredInputs.forEach(input => input.setAttribute('disabled', 'disabled'));
            termosCheckbox.setAttribute('disabled', 'disabled');
            termosCheckbox.closest('.checkbox-group').classList.remove('is-invalid');


            // Opcional: Remove o alerta após 10 segundos
            setTimeout(() => {
                successAlert.remove();
            }, 10000);
            
        } else {
            // Feedback de erro (caso o botão seja ativado por algum bug/exploit)
            const errorAlert = document.createElement('div');
            errorAlert.className = 'alert alert-danger';
            errorAlert.setAttribute('role', 'alert');
            // Nota: O ícone '&#9888;' é o sinal de aviso
            errorAlert.innerHTML = '<span>&#9888;</span> **Erro!** Por favor, preencha todos os campos obrigatórios corretamente.';
            
            const formContainer = form.closest('.container');
            if (formContainer) {
                formContainer.prepend(errorAlert);
            }
            
            setTimeout(() => {
                errorAlert.remove();
            }, 5000);
        }
    });

    // Define o estado inicial do botão ao carregar a página
    toggleSubmitButton();
});