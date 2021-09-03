
var altura = 0
var largura = 0
var vidas = 1
var tempo = 30


var criaMosquitoTempo = 2000

var nivel = window.location.search
nivel = nivel.replace('?', '') //replace: substituir um caracter por outro.

if(nivel === 'normal') {
	criaMosquitoTempo = 2000
} else if(nivel === 'medio') {
	criaMosquitoTempo = 1500
} else if(nivel === 'dificil') {
	criaMosquitoTempo = 1000
}

function ajustaTamanhoPalcoJogo() {
	altura = window.innerHeight
	largura = window.innerWidth

	console.log(largura, altura)
}

ajustaTamanhoPalcoJogo()

var cronometro = setInterval(function() {
	
	tempo -= 1

	if (tempo < 0) {
		clearInterval(cronometro)
		clearInterval(criaMosquito)
		window.location.href = 'vitoria.html'
	} else {
		document.getElementById('cronometro').innerHTML = tempo  //innerHTMl: o que está contido entre as tags
	}	

}, 1000)

function posicaoRandomica() {

	//remover o mosquito anterior (caso exista)
	if(document.getElementById('mosquito')) {
		document.getElementById('mosquito').remove()

		if(vidas > 3) {
			window.location.href ='fim_de_jogo.html'
		} else {
            document.getElementById('v' + vidas).src="imagens/coracao_vazio.png"

			vidas++
		}
	}
	
	var posicaoX = Math.floor(Math.random() * largura) - 90 //Gerar posiçõs aleatórias, randomicas do mosquito
	var posicaoY = Math.floor(Math.random() * altura) - 90 //Math.floor: arredondar as casas decimais

	posicaoX = posicaoX < 0 ? 0 : posicaoX //para evitar que a imagem desapareca da tela caso uma das posições seja menor que zero
	posicaoY = posicaoY < 0 ? 0 : posicaoY //< 0 ? 0 : se for menor que zero recebe zero, senão , recebe ela mesmo 

	console.log(posicaoX, posicaoY)

	//criar o elemento html
	var mosquito = document.createElement('img')
	mosquito.src = 'imagens/mosquito.png'
	mosquito.className = tamanhoAleatorio() + ' ' + ladoAleatorio() //atribuir a classe mosquito1, que tem as definições de tamanho da imagem
	mosquito.style.left = posicaoX + 'px' //formar a coordenada em pixels que nós queremos formar a esquerda do navegador
	mosquito.style.top = posicaoY + 'px' //formar a coordenada em pixels que nós queremos formar no topo do navegador
	mosquito.style.position = 'absolute' //para que essas coordendas acima possam ser aplicadas, é preciso que o meu elemento seja absoluto.
	mosquito.id = 'mosquito'
	mosquito.onclick = function() {
		this.remove()
		var audio1 = new Audio();
	    audio1.src = "barulho.mp3";
	    audio1.play();
	}


	document.body.appendChild(mosquito) //adicionando um filho para o body

	console.log(ladoAleatorio())
}
//Math.random: produz um numero de 0 a um muito próximo de 1.
function tamanhoAleatorio() {
	var classe = Math.floor(Math.random() * 3)

	switch(classe) {
		case 0:
			return 'mosquito1' 

		case 1: 
			return 'mosquito2'	

		case 2:
			return 'mosquito3'	

	}
}

function ladoAleatorio() {
	var classe = Math.floor(Math.random() * 2)

	switch(classe) {
		case 0:
			return 'ladoA' 

		case 1: 
			return 'ladoB'		

	}
}