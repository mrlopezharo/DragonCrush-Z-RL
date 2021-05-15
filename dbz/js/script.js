const contenedorDimension = document.getElementById('contenedor');
console.log("width del contenedorDimension: " + contenedorDimension.clientWidth);
console.log("height del contenedorDimension: " + contenedorDimension.clientHeight);//dimenciones del contenedor padre del canvas


//canvas
var	canvas = document.getElementById('tablero');//canvas
var contexto = canvas.getContext('2d');//contexto


//matriz
let matriz = [];
let matrizTablero = [];

/*Para pintar los personajes en el tablero*/
var ControlarAnimacionPersonajesDeTablero = true;
/*Varibles en las animaciones*/
var cicloDeImagenesPersonajes = 0; //imagenes 4


if (contenedorDimension.clientWidth <= 700) {//modificar tamaño del canvas, dependiendo del tamaño de la ventana
	canvas.width  = 432;
	canvas.height = 432;
	var ancho = 4;
	var largo = 4;
	var arreglo = 6;
	var cantidadPersonajes = 3;
}else{
	canvas.width  = 648;
	canvas.height = 648;
	var ancho = 7;
	var largo = 7;
	var arreglo = 8;
	var cantidadPersonajes = 4;
}



//Personajes en el tablero
var adroide16 = [];
var recoome = [];
var adroide18 = [];
var etapauno = [];
var adroide20 = [];


/*--------Variables Seleccion de personajes--------*/
let seleccionDePersonaje = 1;//variable para detenerminar si es tu primera seleccion de personaje o la segunda
let primerPersonajeSeleccionado;//primera seleccion
let segundoPersonajeSeleccionado;//segunda seleccion

let primeraX;//variables para guardar coordenadas del primer personaje seleccionado
let primeraY;
/////////////////////////////////////////////

var combo;

var hame = [];
var hameOn = false;
var punta = [];
var cuerpo = [];
var goku = [];
var poderHame = false;
var activarhame = false;
var efectoHame;
var explotarFila = false;
var broly = [];
var BrolyAct = false;
var comboBroly = false;

var brolyExplocion = false;

//variable cambiar imagenes
var pos = 0; //imagenes 9
var pos1 = 0; //imagenes 4
var poshame= 0;
var hamePower = 0;
var vgtM = 0;
var pintarHame;
var posBroly = 0;
var posSuper = 0;
var GokuPosicionY = 0;

////////////////////////////////////////////
let bloquearTeclado = false;
////////////////////////////////////////////


//Iniciar animaciones
/*--------------------------------------------------*/
explocion = new Image();
explocion.src = "img/explocion1.png";

sinImg = new Image();
sinImg.src = "img/combos/hame0.png";

for (var i = 0; i <= 32; i++) {
  //goku hame ha
  hame[i] = new Image();
  hame[i].src = "img/combos/hame" + i + ".png";
}
//poder
for (var i = 0; i <= 3; i++) {
  punta[i] = new Image();
  punta[i].src = "img/combos/punta" + i + ".png";
  cuerpo[i] = new Image();
  cuerpo[i].src = "img/combos/cuerpo" + i + ".png";
}

for (var i = 0; i <= 8; i++) {
  //goku
  goku[i] = new Image();
  goku[i].src = "img/animacionBroly/goku" + i + ".png";
}

for (var i = 0; i <= 39; i++) {
  //broly
  broly[i] = new Image();
  broly[i].src = "img/animacionBroly/broly" + i + ".png";
}
/*--------------------------------------------------*/


//AUDIOS
music = new Audio("sonidos/2.mp3");
music.volume = 0.6;
music.load();

/*Movimientos*/
seleccionUno = new Audio("sonidos/candy1.mp3");
seleccionUno.volume = 0.7;
seleccionUno.load(); //seleccion primer dulce
seleccionDos = new Audio("sonidos/candy2.mp3");
seleccionDos.volume = 0.7;
seleccionDos.load(); //seleccion segundo dulce
error = new Audio("sonidos/error.mp3");
error.volume = 0.7;
error.load(); //error en seleccion
explotar = new Audio("sonidos/explosion5.mp3");
explotar.volume = 0.5;
explotar.load(); //explotar combo
/*Movimientos*/


/*goku especial*/
vozGokuEspecial = new Audio("sonidos/hame.wav");//elsonido
vozGokuEspecial.volume = 0.7;//volumen
vozGokuEspecial.load(); //lo cargamos
zanzoken = new Audio("sonidos/zanzoken.mp3");
zanzoken.volume = 0.5;
zanzoken.load();
/*goku especial*/

/*Audios broly*/
aura = new Audio("sonidos/aura.mp3");
aura.volume = 0.3;
aura.load();
aura1 = new Audio("sonidos/aura1.mp3");
aura1.volume = 1;
aura1.load();
brolykakaroto = new Audio("sonidos/Brolydicekakaroto.mp3");
brolykakaroto.volume = 1;
brolykakaroto.load();
tunder = new Audio("sonidos/electricidad.mp3");
tunder.volume = 0.6;
tunder.load(); 
broly2 = new Audio("sonidos/broly2.mp3");
broly2.volume = 1;
broly2.load(); 
poderBroly1 = new Audio("sonidos/poderBroly1.wav");
poderBroly1.volume = 0.8;
poderBroly1.load(); 
poderBroly2 = new Audio("sonidos/poderBroly2.wav");
poderBroly2.volume = 0.8;
poderBroly2.load();
/*Audios broly*/ 


/*Sonidos de los pj con combos*/
function sonidos() {
  	if (hameOn == true) {
	   vozGokuEspecial.play();
	   zanzoken.play();
	   
	}
	if (BrolyAct == true) {
	   brolykakaroto.play();
	   aura.play();
    }
}



inicializar();//inicializar tablero


//logico del programa
function inicializar(){

	matriz = new Array(arreglo);
	matrizTablero = new Array(arreglo);
	llenarMatriz();

}

//llenar matriz con randoms
function llenarMatriz(){
	for (var n = 0; n < matriz.length; n++) {
		matriz[n] = new Array();
		matrizTablero[n] = new Array();
	}

	for (var i = 0; i <= ancho; i++) {
		for (var j = 0; j <= largo; j++) {
			/*se llena con randoms entre 0 y 3 que es la cantidad de personajes a mostrar*/
			matriz[i][j] = Math.round(Math.random()*cantidadPersonajes);
			matrizTablero[i][j]=1;
		}
	}
}


function limpiarSelecciones(){
	for (var i = 0; i <= ancho; i++) {
		for (var j = 0; j <= largo; j++) {
			matrizTablero[i][j]=1;
		}
	}
}



function tablero(){
	
	for (var anchoTablero = 0; anchoTablero <= (ancho * 72); anchoTablero+=72) {//72pixeles cantidad de pixeles
		for (var largoTablero = 0; largoTablero <= (largo * 72); largoTablero+=72) {
			
			contexto.strokeStyle = "#000000";//color borde
			contexto.strokeRect (anchoTablero,largoTablero,71,71);

			switch(matrizTablero[anchoTablero/72][largoTablero/72]){
				case 1:
					contexto.fillStyle = "rgba(24, 13, 91,.6)";//color cuadro
					contexto.fillRect (anchoTablero,largoTablero,71,71);
				break;

				case 2:
					contexto.fillStyle = "rgba(255, 0, 0)";//color cuadro
					contexto.fillRect (anchoTablero,largoTablero,71,71);
				break;

				case 3:
					contexto.fillStyle = "rgba(0, 255, 0)";//color cuadro
					contexto.fillRect (anchoTablero,largoTablero,71,71);
				break;
				default:
				break;
			}
			



		}	
	}

}



//animaciones
for (var i = 0; i <= 3; i++) {/*cargar imagenes de las animaciones*/
  //personajes
  adroide16[i] = new Image();
  adroide16[i].src = "img/androide16" + i + ".png";
  recoome[i] = new Image();
  recoome[i].src = "img/recoome" + i + ".png";
  adroide18[i] = new Image();
  adroide18[i].src = "img/androide18" + i + ".png";
  etapauno[i] = new Image();
  etapauno[i].src = "img/etapauno" + i + ".png";
  adroide20[i] = new Image();
  adroide20[i].src = "img/androide20" + i + ".png";
}


//pintar tablero con personajes
function pintar(){
	/*coordenadas x y para pintar los cuadros en el tablero*/
	var x=0;
	var y=0;

	for (var i=0;i<=ancho;i++) {
		for (var j=0;j<=largo;j++) {

			switch(matriz[i][j]){
				case 0:contexto.drawImage(adroide16[cicloDeImagenesPersonajes],x,y);break;
				case 1:contexto.drawImage(recoome[cicloDeImagenesPersonajes],x,y);break;				
				case 2:contexto.drawImage(adroide18[cicloDeImagenesPersonajes],x,y);break;
				case 3:contexto.drawImage(etapauno[cicloDeImagenesPersonajes],x,y);break;
				case 4:contexto.drawImage(adroide20[cicloDeImagenesPersonajes],x,y);break;				
																	
				
				case 20:contexto.drawImage(explocion,x,y);break;//explocion
				case 21:contexto.drawImage(goku[pos],x,y);break;//goku 
				case 23:contexto.drawImage(broly[posBroly],x,y);break;//Broly
				case 24:contexto.drawImage(cuerpo[hamePower],x,y);break;//kameja
				case 26:contexto.drawImage(sinImg,x,y);break;//No imagen

				default:break;
			}
			x+=72;	
		}
		x=0;
		y+=72;
	}
}


var i = 0;
var cont = 0;
//Animaciones
function animacionesPersonajesTablero(){

	

	//animacion general
	if (ControlarAnimacionPersonajesDeTablero==true) {
		++cicloDeImagenesPersonajes
		if(cicloDeImagenesPersonajes==3){
			cicloDeImagenesPersonajes=0;
			ControlarAnimacionPersonajesDeTablero=false;
		}
	}

	/*----------Animacion goku poder----------*/
	//goku combo 4
	contexto.drawImage(hame[poshame], (ancho + 1) * 72, GokuPosicionY * 72);

	if (hameOn == true) {
		++poshame;

		if (poshame == 24) {
			activarhame = true;
		}
		if (poshame == 32) {
			hameOn = false;
			poshame = 0;
			activarhame = false;
			hamePower = 0;
		}
	}


	//kameja
	if (activarhame == true) {
		//contexto.drawImage(punta[hamePower], ancho * 72 - i, GokuPosicionY * 72);
		contexto.drawImage(punta[hamePower], (ancho * 72)-i-72, GokuPosicionY * 72);
		cont++;
		console.log("contador" + cont);
		i += 72;
		if (cont >= 1) {
			matriz[GokuPosicionY][ancho + 1 - cont] = 24;
		}
		if (i == (ancho + 1) * 72) {
			i = 0;
			explotarFila = true;
			activarhame = false;
			cont = 0;
		}
	}

  	if (explotarFila) {
		for (var n = ancho; n >= 0; n--) {
			matriz[GokuPosicionY][ancho-n]=20;
		}
		bloquearTeclado = false;
		explotarFila = false;
	}
	/*----------Animacion goku poder----------*/


//broly
  if (BrolyAct == false) {
    ++posBroly;
    if (posBroly == 4) posBroly = 2;
  } else {
    ++posBroly;
    if (posBroly == 12) {
      contexto.fillStyle = "rgba(60,149,21,0.4)";
      contexto.fillRect(0, 0, (ancho + 1) * 72, (largo + 1) * 72);
    }

    if (posBroly == 14) {
      contexto.fillStyle = "rgba(212,232,160,0.4)";
      contexto.fillRect(0, 0, (ancho + 1) * 72, (largo + 1) * 72);
    }
    if (posBroly == 16) {
      contexto.fillStyle = "rgba(60,149,21,0.4)";
      contexto.fillRect(0, 0, (ancho + 1) * 72, (largo + 1) * 72);
    }

    if (posBroly == 20) {
      //broly3.play();
      tunder.play();
      contexto.fillStyle = "rgba(212,232,160,0.3)";
      contexto.fillRect(0, 0, (ancho + 1) * 72, (largo + 1) * 72);
    }
    if (posBroly == 28) {
      aura.play();
      tunder.play();
      broly2.play();
      contexto.fillStyle = "rgba(60,149,21,0.3)";
      contexto.fillRect(0, 0, (ancho + 1) * 72, (largo + 1) * 72);
    }
    if (posBroly == 32) {
      tunder.play();
      //broly3.play();
      aura.play();
      tunder.play();
      contexto.fillStyle = "rgba(212,232,160,0.3)";
      contexto.fillRect(0, 0, (ancho + 1) * 72, (largo + 1) * 72);
    }
    if (posBroly == 34) {
      poderBroly1.play();
      poderBroly2.play();
      contexto.fillStyle = "rgba(60,149,21,0.3)";
      contexto.fillRect(0, 0, (ancho + 1) * 72, (largo + 1) * 72);
    }
    if (posBroly == 39) {
      posBroly = 0;
      BrolyAct = false;
      brolyExplocion = true;
      contexto.fillStyle = "rgba(233,233,233,0.3)";
      contexto.fillRect(0, 0, (ancho + 1) * 72, (largo + 1) * 72);
    }
  }

}









//pintar el cuadro seleccionado
function pintarCuadroSeleccionado(primeraX,primeraY){

	matrizTablero[primeraX][primeraY]=3;

	if (primeraX-1 >= 0 && primeraX-1 <= ancho) {
		matrizTablero[primeraX-1][primeraY]=2;
	}
	if (primeraX+1 >= 0 && primeraX+1 <= ancho) {
		matrizTablero[primeraX+1][primeraY]=2;
	}
	if (primeraY-1 >= 0 && primeraY-1 <= largo) {
		matrizTablero[primeraX][primeraY-1]=2;
	}
	if (primeraY+1 >= 0 && primeraY+1 <= largo) {
		matrizTablero[primeraX][primeraY+1]=2;
	}

}






var fps = 7;//frames por segundo

function frame(){//repintar canvas

	contexto.clearRect(0, 0, canvas.width, canvas.height);//cuadro para limpiar

	tablero();//pintar tablero
	
	animacionesPersonajesTablero();//inicializar las animaciones en el tablero
	pintar();

	/*Control de animaciones Broly*/
	if (brolyExplocion) {
		for (var i=ancho; i>=0; i--) {
			for (var j=largo; j>=0; j--) {
				matriz[i][j] = 20;
			}
		}
		bloquearTeclado = false;
		brolyExplocion = false;
	}
	/*Control animaciones Goku*/
	if (activarhame == true) {
		++hamePower;
	    if (hamePower == 3) hamePower = 1;
	}

	//Personajes variables
	++pos;if(pos== 1 ){	music.play();}
    if (pos == 9) pos = 0; //variable animaciones

	
	setTimeout(function() {
        requestAnimationFrame(frame);

    }, 1000 / fps);//frames por segundo

}

window.onload = function(){//cargar al abrir juego
	frame();
};



/*---------------------------PARTE LOGICA DEL JUEGO---------------------------*/

//evento de maus
window.onclick = function (e) {//obtener las coordenadas del canvas
  var rect = canvas.getBoundingClientRect();

  MouseX = Math.floor(event.clientX - rect.left);
  MouseY = Math.floor(event.clientY - rect.top);
  var x = Math.floor(MouseX / 72); //entre 72 por el tamaño de las celdas
  var y = Math.floor(MouseY / 72); //Math.floor() para evitar decimales

  if (x >= 0 && x <= ancho && y >= 0 && y <= largo) {

  	if (bloquearTeclado) {
  		console.log("El teclado esta bloqueado")
  	}else{
  		seleccionarPersonajes(x,y);
  	}
    
  }
};

//seleccion de personajes
function seleccionarPersonajes(x,y){

	if (x>=0 && x<=ancho && y>=0 && y<=largo) {//si la seleccion esta dentro del tablero x / y
	
		switch(seleccionDePersonaje){

			case 1: 
				if (seleccionDePersonaje<2) {//si es el movimiento 1
					seleccionUno.play();
					primeraX = x;
					primeraY = y;
					primerPersonajeSeleccionado = matriz[primeraY][primeraX];
					console.log("primerPersonajeSeleccionado: "+ primerPersonajeSeleccionado + " x: [" + primeraX +"]"+ " y: [" + primeraY+ "]" );
					seleccionDePersonaje = 2;//preparamos para el movimiento 2
					pintarCuadroSeleccionado(primeraX,primeraY);
				}

			break;

			case 2: 

				if(x == primeraX+1 && y == primeraY || x == primeraX-1 && y == primeraY ||
			    y == primeraY+1 && x == primeraX || y == primeraY-1 && x == primeraX){/*Validar movimientos dentro de una Cruz*/
					segundoPersonajeSeleccionado = matriz[y][x];
					console.log("segundoPersonajeSeleccionado: "+ segundoPersonajeSeleccionado + " x: [" + x +"]"+ " y: [" + y+ "]" );
					seleccionDePersonaje = 1;//regresar a la seleccion 1
					seleccionDos.play();
					intercambio(primeraY,primeraX,x,y,primerPersonajeSeleccionado,segundoPersonajeSeleccionado);//intercambio de personajes
					validarintercambio(primeraY,primeraX,x,y,primerPersonajeSeleccionado,segundoPersonajeSeleccionado);//validar si hay combos en los intercambios

			    }else{
			    	console.log("Seleccion fuera de rango")/*Seleccionaste fuera del area*/
					seleccionDePersonaje = 1;//regresar a la seleccion 1
					error.play();
			    }
			    limpiarSelecciones();
			break;

			default: break;				

		}

	}

}

//intercambio personajes
function intercambio(primeraY,primeraX,x,y,primerPersonajeSeleccionado,segundoPersonajeSeleccionado){
	if (primeraY < y || primeraY > y || primeraX > x || primeraX < x) {	//se intercambia el valor del personaje en las coordenadas seleccionadas
		matriz[primeraY][primeraX] = segundoPersonajeSeleccionado;
		matriz[y][x] = primerPersonajeSeleccionado;
	}
}

//valdiar intercambio de los personajes
function validarintercambio(primeraY,primeraX,x,y,primerPersonajeSeleccionado,segundoPersonajeSeleccionado){

	if (primerPersonajeSeleccionado<21) {//validamos que no sea un personaje especial(los de los combos)

		//para buscar si hay combinaciones en el intercambio
		let comboUno = validacionUno(x,y,primerPersonajeSeleccionado);
		let comboDos = validacionDos(primeraY,primeraX,segundoPersonajeSeleccionado);

		if (comboUno>2 || comboDos>2) {//si existe un combo 3 o mas personajes iguales 
			if (comboUno>comboDos) {//se realiza la combinacion mayor
				combinaciones(comboUno,x,y);//para buscar si hay combinaciones en el intercambio con el primer personaje
			}else{
				combinaciones(comboDos,x,y);//para buscar si hay combinaciones en el intercambio con el segundo personaje
			}
			limpiarSelecciones();//se limpian las seleciones
		}else{
			//los personajes regresan a su posicion antes de la seleccion
			matriz[primeraY][primeraX] = primerPersonajeSeleccionado;
			matriz[y][x] = segundoPersonajeSeleccionado;
			error.play();
			limpiarSelecciones();//se limpian las seleciones

		}
		
	}else{

		switch(primerPersonajeSeleccionado){/*Si seleccione un personaje especial para activar combos*/

			case 21://goku
				limpiarSelecciones();//se limpian las seleciones
				matriz[y][x]=26;//explota la posicion anterior al movimiento
				hameOn = true;//activar animacion goku
				GokuPosicionY = y;//mandamos la altura en la matriz
				sonidos();//activar audio
				bloquearTeclado=true;

			break;

			case 23:
				matriz[y][x] = 23;
				BrolyAct = true;
      			sonidos();
      			bloquearTeclado=true;
			break;

		}
		
	}

}

//reaccion en cadena
function validacionUno(x,y,primerPersonajeSeleccionado){

	var	contX = 0;
	var	actualX = x;
	var	contY = 0;
	var	actualY = y;

	var comboX = 0;
	var comboY = 0;
	var activarcombo = true;
	var contY = 0;

	//posicionar x 
	for (var i = x; i >= 0; i--) {	
		if (matriz[y][x-contX] == primerPersonajeSeleccionado) {
			actualX = x-contX;
			contX++;
		}
	}

	//posicionar Y 
	for (var i = y; i >= 0; i--) {	
		if (matriz[y-contY][x] == primerPersonajeSeleccionado) {
			actualY = y-contY;
			contY++;
		}
	}

	//buscar combo en x
	while(matriz[y][(actualX + comboX)] == primerPersonajeSeleccionado){
		comboX++;
	}

	//buscar combo en y
	for (var i = actualY; i <= ancho; i++) {	
		if (activarcombo==true) {
			if (matriz[i][x] == primerPersonajeSeleccionado) {
			comboY++;
			}else{
				activarcombo = false;
			}
		}
	}

	//combos
	if(comboX > 2 || comboY > 2){
		if (comboX > comboY) {
			for (var i = actualX; i <= ancho; i++) {
				if (i < actualX+comboX) {
					matriz[y][i]=20;
					explotar.play();
				}
			}
			return comboX;
		}else{
			for (var i = actualY; i <= ancho; i++) {
				if (i < actualY+comboY) {
					matriz[i][x]=20;
					explotar.play();
				}

			}
			return comboY;
		}
	}else{

		return 0;

	}

}


//reaccion en cadena
function validacionDos(primeraY,primeraX,segundoPersonajeSeleccionado){

	var	contX = 0;
	var	actualX = primeraX;
	var	contY = 0;
	var	actualY = primeraY;

	var comboX = 0;
	var comboY = 0;
	var activarcombo = true;
	var contY = 0;
	
	//posicionar x 
	for (var i = primeraX; i >= 0; i--) {	
		if (matriz[primeraY][primeraX-contX] == segundoPersonajeSeleccionado) {
			actualX = primeraX-contX;
			contX++;
		}
	}

	//posicionar Y 
	for (var i = primeraY; i >= 0; i--) {	
		if (matriz[primeraY-contY][primeraX] == segundoPersonajeSeleccionado) {
			actualY = primeraY-contY;
			contY++;
		}
	}

	//buscar combo en x
	while(matriz[primeraY][(actualX + comboX)] == segundoPersonajeSeleccionado){
		comboX++;
	}

	//buscar combo en y
	for (var i = actualY; i <= ancho; i++) {	
		if (activarcombo==true) {
			if (matriz[i][primeraX] == segundoPersonajeSeleccionado) {
			comboY++;
			}else{
				activarcombo = false;
			}
		}
	}

	//combos
	if(comboX > 2 || comboY > 2){
		if (comboX > comboY) {
			for (var i = actualX; i <= ancho; i++) {
				if (i < actualX+comboX) {
					matriz[primeraY][i]=20;
					explotar.play();
				}
			}
			return comboX;
		}else{
			for (var i = actualY; i <= ancho; i++) {
				if (i < actualY+comboY) {
					matriz[i][primeraX]=20;
					explotar.play();
				}
			}
			return comboY;
		}
	}else{

		return 0;

	}

}

/*Personajes especiales*/
function combinaciones(combo,x,y){
	//colocar personaje especial
	//4
	if (combo == 4) {
		matriz[y][x] = 21;//goku
	}
	//5
	if (combo >= 5) {
		matriz[y][x] = 23;//broly
	}

}

//rellenar matriz
function rellenarMatriz(){//rellenar cuando exista una explosion y el personaje de la Y mandarlo para abajo
	if (bloquearTeclado) {

	}else{
			for (var y=ancho; y>=0; y--) {
		for (var x=largo; x>=0; x--) {
	
			if (matriz[y][x] == 20) {
				if (matriz[0][x] == 20) {
					matriz[0][x] = Math.round(Math.random()*3);
				}else{
					matriz[y][x] = matriz[y-1][x];
					matriz[y-1][x]=20;
				}

			}
			reaccionEnCadena(y,x);//reaccion en cadena
		}
	}
	}

}
setInterval(rellenarMatriz, 300);//tiempo de las explosiones

//reaccion en cadena
function reaccionEnCadena(y,x){

	var comboX = 0;
	var comboY = 0;
	var activarcombo = true;
	var contY = 0;

	//buscar combo en x
	while(matriz[y][(x + comboX)] == matriz[y][x]){
		comboX++;
	}

	//buscar combo en y
	for (var i = y; i <= ancho; i++) {	
		if (activarcombo==true) {
			if (matriz[i][x] == matriz[y][x]) {
			comboY++;
			}else{
				activarcombo = false;
			}
		}
	}

	//combos
	if(comboX > 2 || comboY > 2){
		if (comboX > comboY) {
			for (var i = x; i <= ancho; i++) {
				if (i < x+comboX) {
					matriz[y][i]=20;
					explotar.play();
				}
			}
		}else{
			for (var i = y; i <= ancho; i++) {
				if (i < y+comboY) {
					matriz[i][x]=20;
					explotar.play();
				}
			}
		}
	}	
}