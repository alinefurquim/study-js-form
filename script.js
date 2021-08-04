let validatorFunction = {
    handleSubmit:(event) => {
        event.preventDefault();

        let send = true;
        let inputs = form.querySelectorAll('input');

        validatorFunction.clearErrors();

        for(let i=0; i < inputs.length; i++) {
            let input = inputs[i];
            let check = validatorFunction.checkInput(input);
            if(check !== true) {
                send = false;
                validatorFunction.showError(input, check);
            }
        }        
        //send = false;
        if(send) {
            form.submit();
        }
    },
    checkInput:(input) => {
        let rules = input.getAttribute('data-rules');
        if (rules !== null) {
            rules = rules.split('|');
            for(let k in rules) {
                let rulesDetails = rules[k].split('=');
                switch(rulesDetails[0]) {
                    case 'required':
                        if(input.value == '') {
                            return 'Campo obrigatório'
                        }
                    break
                    case 'min':
                        if(input.value.length < rulesDetails[1]) {
                            return 'Campo deve ter pelo menos '+rulesDetails[1]+' caracteres';
                        }
                    break;
                    case 'email':
                        if(input.value != '') {
                            let regex = /^([\w\-]+\.)*[\w\- ]+@([\w\- ]+\.)+([\w\-]{2,3})$/
                            if(!regex.test(input.value.toLowerCase())) {
                                return 'E-mail inválido';
                            }
                        }
                    break;
                }
            }
        }
        return true;
    },
    showError:(input, error) => {
        input.style.borderColor = '#FF0000';

        let errorElement = document.createElement('div');
        errorElement.classList.add('error');
        errorElement.innerHTML = error;

        input.parentElement.insertBefore(errorElement, input.ElementSibling);
    },
    clearErrors:() => {
        let inputs = form.querySelectorAll('input');
        for(let i=0; i < inputs.length; i++) {
            inputs[i].styles = '';
        }

        let errorElements = document.querySelectorAll('.error');
        for(let i=0; i < errorElements.length; i++) {
            errorElements[i].remove();
        }
    }
};

let form = document.querySelector('.validator');
form.addEventListener('submit', validatorFunction.handleSubmit);