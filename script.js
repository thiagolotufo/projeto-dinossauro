const dino = document.querySelector('.dino');
const background = document.querySelector('.background');
const escrever = document.querySelector('.pontos span');
const dificuldade = document.querySelector('.dificuldade');

let pulando = false;
let position = 0;
let quantidadePulos = 0;
let velocidade = 20;

escrever.textContent = quantidadePulos;
dificuldade.textContent = 1;

function pressionarBotao(event){
    if(event.keyCode === 32){
        if(!pulando){
            pular();
        }
    }
}

function pular(){
    pulando = true;

    let intervaloSubida = setInterval(() =>{
        if(position >= 150){
            clearInterval(intervaloSubida);

            let intervaloDescida = setInterval(() =>{
                if(position <= 0){
                    clearInterval(intervaloDescida);
                    pulando = false;
                } else{ 
                    position -= 20;
                    dino.style.bottom = position + 'px';
                }
            }, 20);

        } else{
            position += 20;
            dino.style.bottom = position + 'px';
        }   
    }, 20);
}

function criarCactus(){
    const cactus =  document.createElement('section');
    let posicaoCactus = 1000;
    let randomTime = Math.random() * 6000;

    console.log(randomTime);

    cactus.classList.add('cactus');
    cactus.style.left = 1000 + 'px';
    background.appendChild(cactus);

    if(quantidadePulos >= 5 && quantidadePulos < 8){
        velocidade = 15;
        dificuldade.textContent = 2;
    } else if(quantidadePulos >= 8){
        velocidade = 10;
        dificuldade.textContent = 3;
    } else{
        velocidade = 20
    }

    let intervaloEsquerda = setInterval(() =>{
        if(posicaoCactus <= -60) {
            clearInterval(intervaloEsquerda);
            background.removeChild(cactus);
            quantidadePulos += 1;
            console.log(quantidadePulos);
            escrever.textContent = quantidadePulos;
        } else if(posicaoCactus > 0 && posicaoCactus < 60 && position < 60){
            clearInterval(intervaloEsquerda);
            document.body.innerHTML = '<h1 class="fim-de-jogo">Fim de Jogo</h1> <section class="total-pontos">Você fez '+quantidadePulos+' ponto(s)!</section>'
        }
        else{
            posicaoCactus -= 10;
            cactus.style.left = posicaoCactus + 'px';
        }
    }, velocidade);

    setTimeout(criarCactus, randomTime);
}
criarCactus();

document.addEventListener('keyup', pressionarBotao);