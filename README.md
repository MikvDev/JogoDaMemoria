# 🃏 JoJo's Memory Game

Jogo da memória temático de **JoJo's Bizarre Adventure**, desenvolvido com HTML, CSS e JavaScript puro como projeto de aprendizado de desenvolvimento web.

##  Como Jogar

1. Digite seu nome na tela inicial e clique em **Jogar**
2. Clique em duas cartas para tentar encontrar o par
3. Se as cartas forem iguais, elas ficam viradas ✅
4. Se forem diferentes, elas voltam para baixo após meio segundo ❌
5. Complete todos os pares no menor tempo e número de tentativas possível!

##  Como Rodar o Projeto

Não precisa instalar nada. Basta abrir o arquivo `index.html` no navegador.

## 📁 Estrutura do Projeto

```
├── index.html              # Página de login
├── assets/
│   ├── pages/
│   │   └── game.html       # Página do jogo
│   ├── css/
│   │   └── style.css       # Estilos
│   ├── js/
│   │   ├── login.js        # Lógica da tela de login
│   │   └── game.js         # Lógica do jogo
│   ├── images/             # Imagens dos personagens
│   └── audio/              # Sons do jogo
```

## ⚙️ Funcionalidades

- ✅ Tela de login com validação de nome
- ✅ Cartas embaralhadas a cada nova partida
- ✅ Cronômetro em tempo real
- ✅ Contador de tentativas e pontuação
- ✅ Bloqueio de clique durante animação de erro
- ✅ Sons de acerto e erro
- ✅ Música de fundo
- ✅ Botão de reiniciar
- ✅ Nome do jogador salvo entre páginas via `localStorage`

##  Conceitos de JavaScript Aplicados

- Manipulação do DOM com `querySelector` e `createElement`
- Eventos com `addEventListener`
- `localStorage` para persistência de dados entre páginas
- `setTimeout` para atraso de animações
- `setInterval` e `clearInterval` para o cronômetro
- Spread operator `...` para duplicar arrays
- Embaralhamento com `sort(() => Math.random() - 0.5)`
- Gerenciamento de estado com variáveis `let`
- Atributos customizados `data-*` para identificar cartas

## 👾 Personagens

O jogo conta com 10 personagens de JoJo's Bizarre Adventure...

`Dio` • `Iggy` • `Joseph` • `Jotaro` • `Polnareff` • `Hol Horse` • `Morte Treze` e mais!

##  Tecnologias

- HTML5
- CSS3
- JavaScript 

## 👤 Autores

Miguel e Henrique