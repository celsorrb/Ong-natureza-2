document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('volunteer-form');
    const submitBtn = document.getElementById('submit-btn');
    const successAlert = document.getElementById('success-alert'); // Novo elemento de feedback

    // Verifica se o formulário e o botão existem antes de continuar
    if (!form || !submitBtn) {
        return; 
    }

    // Campos obrigatórios que precisam ser validados
    const requiredInputs = [
        document.getElementById('nome'),
        document.getElementById('email'),
        document.getElementById('interesse')
    ];

    /**
     * Valida um formato básico de e-mail usando regex.
     */
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
        return re.test(String(email).toLowerCase());
    }

    /**
     * Função que verifica se todos os campos obrigatórios estão preenchidos.
     * Adiciona/remove a classe de erro (is-invalid) para feedback visual.
     * @returns {boolean} Retorna true se todos estiverem válidos, false caso contrário.
     */
    function validateForm() {
        let isFormValid = true;

        requiredInputs.forEach(input => {
            const value = input.value.trim();

            // Lógica de validação básica (vazio ou valor padrão do select)
            if (value === '' || (input.id === 'interesse' && value === 'Selecione a área')) {
                isFormValid = false;
                input.classList.add('is-invalid');
            } else {
                input.classList.remove('is-invalid');
            }
        });

        // Validação adicional para o email (formato)
        const emailInput = document.getElementById('email');
        if (emailInput && emailInput.value.trim() !== '' && !validateEmail(emailInput.value)) {
            emailInput.classList.add('is-invalid');
            isFormValid = false;
        } 
        // Se o email não estiver vazio E for válido, garante que a classe seja removida
        else if (emailInput && emailInput.value.trim() !== '' && validateEmail(emailInput.value)) {
            emailInput.classList.remove('is-invalid');
        }

        return isFormValid;
    }

    /**
     * Função principal para habilitar ou desabilitar o botão de envio.
     */
    function toggleSubmitButton() {
        if (validateForm()) {
            submitBtn.removeAttribute('disabled');
        } else {
            submitBtn.setAttribute('disabled', 'disabled');
        }
    }

    // Adiciona o listener para monitorar mudanças nos campos obrigatórios
    requiredInputs.forEach(input => {
        input.addEventListener('input', toggleSubmitButton);
        input.addEventListener('change', toggleSubmitButton);
    });

    // Intercepta o envio do formulário para evitar o erro 405 e dar um feedback
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Impede o envio real do formulário (que daria 405)
        
        if (validateForm()) {
            // Se for válido, mostra o alerta de sucesso
            if (successAlert) {
                successAlert.style.display = 'block';
            }
            
            // Desabilitar o botão e campos após o "envio" virtual
            submitBtn.setAttribute('disabled', 'disabled');
            submitBtn.textContent = 'Enviado!'; // Feedback no próprio botão

            requiredInputs.forEach(input => input.setAttribute('disabled', 'disabled'));
        }
    });

    // Chama a função uma vez no carregamento para definir o estado inicial do botão
    toggleSubmitButton();
});
