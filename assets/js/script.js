const input = document.querySelector('input');
const buttom = document.querySelector('buttom');


const ValidateInput = ({ target }) => {
    if(target.value.length > 2){
        buttom.removeAttribute('disable');
        return;
    }
    buttom.setAttribute('disable','');
}

input.addEventListener('input',ValidateInput);