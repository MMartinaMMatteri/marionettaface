SUPSI 2022-23  
Corso d’interaction design, CV427.01  
Docenti: A. Gysin, G. Profeta  

Elaborato 1: Marionetta digitale  

# Marcuso lo smile confuso
Autore: Martina Matteri  
[MediaPipe demo-ES6](https://ixd-supsi.github.io/2023/esempi/mp_hands/es6/1_landmarks)


## Introduzione e tema
Lo scopo del progetto è stato quello di progettare un sistema di
interfaccia che permettesse di generare una marionetta in realtà
aumentata (AR) applicata sulla mano. La marionetta, a scelta nostra,
si poteva estendere sull’intera mano o in parte. Graficamente, essa
doveva rappresentare un personaggio reale o inventato, con un proprio
carattere. Durante la presentazione finale del progetto la marionetta è
stata presentata alla classe mostrandone le proprie peculiarità.
Modalità del lavoro: individuale.


## Riferimenti progettuali
Come punto di partenza e quindi come concetto base, il mio progetto si
sviluppa prendendo spunto delle emoji. Il mio obiettivo infatti era quello
di isolare una singola parte del “volto” e di focalizzare tutta l’attenzione
dell’osservatore proprio lì, in un punto specifico dove potessero
convergere insieme più emozioni e stati d’animo possibili. Mi sono
imposta il limite di utilizzare forme semplici, e di non importare immagini
dall’esterno in modo da ottenere come risultato finale un design pulito ed
essenziale. Dopo una fase iniziale di ricerca e pianificazione, ho creato
la mia marionetta, nominata successivamente come “Marcuso, lo smile
confuso”, che grazie alle sue imponenti sopracciglia ed un’espressione
apparentemente anonima riesce a far trasparire più stati d’animo,
suggerendo un vero e proprio carattere.





## Design dell’interfraccia e modalià di interazione
Il design della mia marionetta si basa su quattro principali keypoint. Ogni
keypoint è associato per mia scelta alla punta di un dito. In sequenza
troviamo quindi il keypoint n°8 per la punta dell’indice, 12 per il medio, 16
per l’anulare e 20 per il mignolo. Questi punti vanno a costituire la parte
focale della marionetta ovvero le sue sopracciglia, focus dell’interazione.
La restante parte del design è stata creata tutta intorno. L’interazione
quindi è abbastanza intuitiva. Una volta infatti che si è compreso che le
sopracciglia corrispondono alle quattro dita tenute orizzontali, ci si può
divertire e sperimentare facendo assumere a Marcuso diverse
espresioni facciali. Per rendere tutto un po’ più dinamico, la marionetta è
anche libera di spostarsi all’interno del canvas.




## Tecnologia usata
All’interno del progetto si sono susseguiti in più punti diversi passaggi di
ragionamento, in cui ho davvero avuto la possibilità di mettere in gioco
le poche basi a mia disposizione a livello di conoscenza del linguaggio
dei codici. In particolare vorrei mettere un focus sul come è stato creato
uno dei due sopraccigli, e sul come ho trovato il punto medio di quest’ultimo
per formare poi l’occhio. Credo siano stati i due passaggi forse di
maggiore difficoltà all’interno del progetto. Di seguito a destra si possono
vedere trascritte alcune righe esplicative di codice.


```JavaScript
 if (idx === 16) {
				     const nextKeypoint = hand.keypoints[idx + 4]; // KeyPoint 20 è 4 posizioni più avanti
					 ctx.beginPath();
					 ctx.moveTo(keypoint.x, keypoint.y);
					 ctx.lineTo(nextKeypoint.x, nextKeypoint.y);
					 ctx.strokeStyle = 'black';
					 ctx.lineWidth = 25;
					 ctx.stroke();




					  // Cerchio nel punto medio tra i keypoint 20 e 16, spostato verso il basso di 50 pixel
					  const middleX = (keypoint.x + nextKeypoint.x) / 2;
					  const middleY = (keypoint.y + nextKeypoint.y) / 2 + 30;
					  ctx.beginPath();
					  ctx.arc(middleX, middleY, 6, 0, 2 * Math.PI);
					  ctx.fillStyle = 'black';
					  ctx.fill()

				    }
```

## Target e contesto d’uso
Marcuso, lo smile confuso, è un progetto che purtroppo non si addice a
tutti i tipi di target. Necessita infatti di essere compreso a pieno per poter
anche essere testato a 360°. Dopo aver riscontrato in alcuni test che non
è subito intuitivo e immediato il suo funzionamento, o per meglio dire il
come posizionare le dita per farlo funzionare, escluderei definitivamente
un utenza di banbini o ragazzini. Come target definitivo propongo quindi
ragazzi e adulti che siano in grado di comprenderne anche se in piccola
parte il funzionamento, in modo tale da potersi intrattenere meglio con
questa piccola marionetta.

[<img src="C:\Users\marti\OneDrive\Documenti\SUPSI CV2\Interaction design\matteri_marcusoLoSmileConfuso\marionettaface\0_template_README\doc\imgg1.png" width="300" >]()


## Link al progetto

https://mmartinammatteri.github.io/marionettaface/
