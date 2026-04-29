const input = document.querySelector('.loginInput');
const button = document.querySelector('.loginButton');

const validateInput = ({ target }) => {
    // Verificamos se o comprimento do texto é maior que 2
    if (target.value.trim().length > 2) {
        // Remove o atributo para habilitar o botão
        button.removeAttribute('disabled');
    } else {
        // Adiciona o atributo para desabilitar o botão
        button.setAttribute('disabled', '');
    }
}

input.addEventListener('input', validateInput);