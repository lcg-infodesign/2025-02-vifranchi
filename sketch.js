let table;
let colCount = 0;
let rowCount = 0;

function preload() {
  // put preload code here
  table = loadTable ("dataset/dataset.csv", "csv", "header");
}

function setup() {
  //controllo se ho caricato i dati
  console.log (table);

  let outerPadding = 20
  let padding = 10
  let itemSize = 30
  let titleSpace = 80;

  //calcolo il numero di colonne
   let rows = floor((windowHeight - outerPadding * 2) / (itemSize + padding));
  let cols = ceil(table.getRowCount() / rows);

  let totalWidth = ceil(outerPadding * 2 + cols * itemSize + (cols - 1) * padding);

  let scaleFactor = 2;
  let canvasWidth = totalWidth;
  let canvasHeight = windowHeight + titleSpace;;

  console.log("cols:", cols, "rows:", rows);

  scale(scaleFactor);
  createCanvas(canvasWidth * scaleFactor, canvasHeight * scaleFactor);
  background("#252525ff");
  //"#e2e2e2ff"

  let colCount = 0;

  

  for (let rowNumber = 0; rowNumber < table.getRowCount(); rowNumber++) {
    
    console.log('rc', rowNumber)
    
    //carico dati della riga
    let data = table.getRow(rowNumber).obj;
    console.log (data);

let itemSizeBase = 30;
let scaleFactor = 2; // ingrandimento
let itemSize = itemSizeBase * scaleFactor;

    //valore per dimensione
    let myValue = data["column0"];

    //calcolo min e massimo
    let allValues = table.getColumn ("column0");
    let minValue = min (allValues);
    let maxValue = max (allValues);

    let scaledValue = map (myValue, minValue, maxValue, 1, itemSize);
    
    // seconda variabile per colore 
    noStroke();
    let value2 = data["column2"];
    let allValue2 = table.getColumn("column2");
    let minValue2 = min (allValue2);
    let maxValue2 = max (allValue2);
    
    let value2Mapped = map (value2, minValue2, maxValue2, 0, 1);

    let c1 = color('#d7d1b7ff'); //'#79172cff'
    let c2 = color('#949946ff'); //'#1867deff'

    let mappedColor = lerpColor(c1, c2, value2Mapped);

    console.log(value2, minValue2, maxValue2)
    
    fill(mappedColor);


    let xPos = outerPadding + colCount * (itemSize + padding);
    let yPos = titleSpace + outerPadding + rowCount * (itemSize + padding); 

    
    ellipseMode(CENTER);

// calcolo dello sharpness in base ai valori min/max
let sharpness = map(myValue, minValue, maxValue, 0, 1);

//Titolo centrato
  fill('#949946ff'); //'#636363ff'
  textAlign(RIGHT, TOP);
  textSize(40);
  text("ASSIGNMENT 2 | Glyphs System", windowWidth / 2.2, 30);

// disegna il cerchio con trasparenza variabile
drawBlurredCircle(
  xPos + itemSize / 2,
  yPos + itemSize / 2,
  scaledValue,
  mappedColor,
  sharpness
);


    //aumento colCount
    colCount++;

    //controllo se siamo a fine riga
    if (colCount == cols) {
      colCount = 0;
      rowCount ++;
    }
    }
}


function drawBlurredCircle(x, y, diameter, col, sharpness) {
  noStroke();
  let steps = 120; // numero di livelli per la sfumatura

  // Più sharpness è alto (vicino al massimo), più il cerchio è trasparente
  // Invertiamo il valore così che max → trasparente, min → opaco
  let baseTransparency = map(sharpness, 0, 1, 255, 10);
  // 255 = opaco per valori minimi, 40 = quasi invisibile per valori massimi

  for (let i = steps; i > 0; i--) {
    let inter = i / steps;

    // dimensione progressiva (più sfocato per valori bassi)
    let size = diameter * (inter + (1 - sharpness) * 0.4 * (1 - inter));

    // alpha combinato: controlla trasparenza interna e effetto bordo
    let alpha = baseTransparency * pow(inter, 4); // maggiore esponente = contrasto più forte

    fill(red(col), green(col), blue(col), alpha);
    ellipse(x, y, size, size);
  }
}

function draw() {
  // put drawing code here
  }
