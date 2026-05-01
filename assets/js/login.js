
const input = document.querySelector(".loginInput");
const button = document.querySelector(".loginButton");
const form = document.querySelector(".login-form");




 //Função para validar o input.
 // Ela é chamada toda vez que o jogador digita algo.
 
const validateInput = ({ target }) => {
  // Verifica se o texto no input tem mais de 2 caracteres.
  if (target.value.length > 2) {
    // Se tiver, remove o atributo 'disabled' do botão, permitindo que ele seja clicado.
    button.removeAttribute("disabled");
  } else {
    // Se não tiver, adiciona o atributo 'disabled', bloqueando o botão.
    button.setAttribute("disabled", "");
  }
};

const handleSubmit = (event) => {
  event.preventDefault(); // Impede o comportamento padrão do formulário (que é recarregar a página).

  // Salva o nome do jogador no armazenamento local do navegador, para usá-lo na próxima página.
  localStorage.setItem("player", input.value);
  // Redireciona o jogador para a página do jogo.
  window.location = "assets/pages/game.html";
};

// Fica "ouvindo" o evento de 'input' (digitação) no campo de texto e chama a função validateInput.
input.addEventListener("input", validateInput);
// Fica "ouvindo" o evento de 'submit' (envio) no formulário e chama a função handleSubmit.
form.addEventListener("submit", handleSubmit);
