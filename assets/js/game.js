// --- 1. Selecionando as coisas na tela ---
const grid = document.querySelector(".grid");
const tempoNaTela = document.querySelector(".timer");
const tentativasNaTela = document.querySelector(".attempts");
const pontosNaTela = document.querySelector(".score");
const botaoReiniciar = document.getElementById("btn-reiniciar");

// --- 2. Sons do Jogo ---
const musicaFundo = new Audio("../audio/jojoOpen.mp3");
const somAcerto = new Audio("../audio/y.mp3");
const somErro = new Audio("../audio/dio-wryyy.mp3");
musicaFundo.volume = 0.1;

// --- 3. Lista de Personagens ---
const personagens = [
  "dio", "iggy", "macaco", "joseph", "jotaro",
  "veio", "senhora", "holHorse", "polnareff", "morteTreze"
];

// --- 4. Variáveis que controlam o jogo (O Estado) ---
let primeiraCarta = null;
let segundaCarta = null;
let bloqueiaClique = false; // Isso impede de clicar em 3 cartas ao mesmo tempo
let tentativas = 0;
let pontos = 0;
let tempo = 0;
let cronometro;

// --- 5. Lógica de Virar a Carta ---
function virarCarta(evento) {
  // Se o tabuleiro estiver bloqueado, não faz nada
  if (bloqueiaClique) return;

  const cartaClicada = evento.target.parentNode;

  // Se a carta já está virada, não faz nada
  if (cartaClicada.classList.contains("reveal-card")) return;

  // Vira a carta na tela
  cartaClicada.classList.add("reveal-card");

  // Se for a primeira carta do par...
  if (primeiraCarta === null) {
    primeiraCarta = cartaClicada;
    return; // Para a função aqui e espera o próximo clique
  }

  // Se chegou aqui, é porque é a segunda carta
  segundaCarta = cartaClicada;
  tentativas++;
  tentativasNaTela.innerHTML = tentativas;

  verificarPar();
}

// --- 6. Lógica de Verificar se Formou Par ---
function verificarPar() {
  const nome1 = primeiraCarta.getAttribute("data-character");
  const nome2 = segundaCarta.getAttribute("data-character");

  if (nome1 === nome2) {
    // ACERTOU O PAR!
    pontos += 1; // O trabalho pede +1 por acerto (você tinha colocado +10, ajustei para a regra)
    pontosNaTela.innerHTML = pontos;
    somAcerto.play();

    // Marca as cartas como desativadas (para não clicar mais)
    primeiraCarta.firstChild.classList.add("disabled-card");
    segundaCarta.firstChild.classList.add("disabled-card");

    // Limpa as variáveis para a próxima jogada
    primeiraCarta = null;
    segundaCarta = null;

    verificarVitoria();
  } else {
    // ERROU O PAR!
    somErro.play();
    bloqueiaClique = true; // Trava o jogo para o jogador não sair clicando

    // Espera meio segundo (500ms) para desvirar as cartas
    setTimeout(() => {
      primeiraCarta.classList.remove("reveal-card");
      segundaCarta.classList.remove("reveal-card");

      // Limpa as variáveis e destrava o jogo
      primeiraCarta = null;
      segundaCarta = null;
      bloqueiaClique = false;
    }, 500);
  }
}

// --- 7. Criar e Carregar as Cartas ---
function criarCarta(personagem) {
  const carta = document.createElement("div");
  const frente = document.createElement("div");
  const costas = document.createElement("div");

  carta.className = "card";
  frente.className = "face front";
  costas.className = "face back";

  frente.style.backgroundImage = `url('../images/${personagem}.jpg')`;

  carta.appendChild(frente);
  carta.appendChild(costas);

  carta.addEventListener("click", virarCarta);
  carta.setAttribute("data-character", personagem);

  return carta;
}

function iniciarJogo() {
  // Zera o placar e a tela
  grid.innerHTML = "";
  tentativas = 0;
  pontos = 0;
  tempo = 0;
  tentativasNaTela.innerHTML = "0";
  pontosNaTela.innerHTML = "0";
  tempoNaTela.innerHTML = "0";
  primeiraCarta = null;
  segundaCarta = null;
  bloqueiaClique = false;

  musicaFundo.play();

  // Duplica os personagens e embaralha (fórmula mágica do JS para embaralhar)
  const cartasDuplicadas = [...personagens, ...personagens];
  const cartasEmbaralhadas = cartasDuplicadas.sort(() => Math.random() - 0.5);

  // Cria e joga cada carta na tela
  cartasEmbaralhadas.forEach((personagem) => {
    const cartaNova = criarCarta(personagem);
    grid.appendChild(cartaNova);
  });

  // Reseta o cronômetro
  clearInterval(cronometro);
  cronometro = setInterval(() => {
    tempo++;
    tempoNaTela.innerHTML = tempo;
  }, 1000);
}

// --- 8. Verificar Fim de Jogo ---
function verificarVitoria() {
  const cartasDesativadas = document.querySelectorAll(".disabled-card");
  
  if (cartasDesativadas.length === personagens.length * 2) {
    clearInterval(cronometro);
    setTimeout(() => {
      alert(`Parabéns! Você venceu em ${tempo} segundos com ${tentativas} tentativas e fez ${pontos} pontos!`);
    }, 500); // Espera meio segundo para a última carta virar antes do alert
  }
}

// --- 9. Eventos Iniciais ---
botaoReiniciar.addEventListener("click", iniciarJogo);

window.onload = () => {
  const nomeJogador = localStorage.getItem("player") || "Jogador";
  document.querySelector(".player").innerHTML = nomeJogador;
  iniciarJogo();
};