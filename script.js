const tabuleiro = document.getElementById("tabuleiro");
const cronometroEl = document.getElementById("cronometro");

let primeiraCarta = null;
let segundaCarta = null;
let bloqueio = false;
let paresEncontrados = 0;
let tempo = 0;
let intervalo;

// Pares (palavra ↔ imagem)
const cardsArray = [
    { type: "img", content: "elefante.png" },
    { type: "img", content: "esponja.png" },
    { type: "img", content: "flor.png" },
    { type: "img", content: "abelha.png" },
    { type: "img", content: "peixe.png" },
    { type: "img", content: "estrela.png" }
];

// DUPLICA as cartas para formar pares
let gameGrid = [...cardsArray, ...cardsArray];


// Duplicar e embaralhar
let cartas = [...cartasArray];
cartas = cartas.sort(() => Math.random() - 0.5);

// Criar cartas no tabuleiro
function criarTabuleiro() {
    cartas.forEach((carta, index) => {
        const card = document.createElement("div");
        card.classList.add("carta");
        card.dataset.tipo = carta.tipo;
        card.dataset.conteudo = carta.conteudo;
        card.dataset.index = index;
        card.innerText = "?";
        card.addEventListener("click", virarCarta);
        tabuleiro.appendChild(card);
    });
}

// Virar carta
function virarCarta() {
    if (bloqueio || this.classList.contains("virada")) return;

    if (this.dataset.tipo === "palavra") {
        this.innerText = this.dataset.conteudo;
    } else {
        this.innerHTML = `<img src="${this.dataset.conteudo}" alt="">`;
    }
    this.classList.add("virada");

    if (!primeiraCarta) {
        primeiraCarta = this;
    } else {
        segundaCarta = this;
        verificarPar();
    }
}

// Verificar par
function verificarPar() {
    if (
        (primeiraCarta.dataset.tipo === "palavra" && segundaCarta.dataset.tipo === "imagem" &&
        primeiraCarta.dataset.conteudo.toLowerCase() === segundaCarta.dataset.conteudo.split("/").pop().split(".")[0]) ||
        (primeiraCarta.dataset.tipo === "imagem" && segundaCarta.dataset.tipo === "palavra" &&
        segundaCarta.dataset.conteudo.toLowerCase() === primeiraCarta.dataset.conteudo.toLowerCase())
    ) {
        paresEncontrados++;
        resetarCartas();
        if (paresEncontrados === cartasArray.length / 2) {
            clearInterval(intervalo);
            setTimeout(() => alert(`Parabéns! Você venceu em ${tempo} segundos!`), 300);
        }
    } else {
        bloqueio = true;
        setTimeout(() => {
            primeiraCarta.innerText = "?";
            segundaCarta.innerText = "?";
            primeiraCarta.classList.remove("virada");
            segundaCarta.classList.remove("virada");
            resetarCartas();
        }, 1000);
    }
}

// Resetar variáveis
function resetarCartas() {
    [primeiraCarta, segundaCarta] = [null, null];
    bloqueio = false;
}

// Cronômetro
function iniciarCronometro() {
    intervalo = setInterval(() => {
        tempo++;
        cronometroEl.textContent = `Tempo: ${tempo}s`;
    }, 1000);
}

// Iniciar jogo
criarTabuleiro();
iniciarCronometro();
