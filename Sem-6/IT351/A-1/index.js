const container = document.querySelector('.container');
const message = document.querySelector('.message');
const button = document.querySelector('button');
const area = document.querySelector('.area');
const conclusion = document.querySelector('.conclusion');
// const directions = document.querySelector('.directions');
const infoTableBody = document.getElementById('info-table-body');
const infoGraph = document.getElementById('info-graph');
const infoGraph2 = document.getElementById('info-graph2');
const variables = document.querySelector('.variables');
const label1 = document.querySelector('.label1');
const label2 = document.querySelector('.label2');


let inPlay = false;
let playArea = {};
// Change the below value to change the number of circles
let circleCount = 5;
let count = 0;
let mouseX = 0;
let mouseY = 0;
let diameter = [];
let distance = [];
let time = [];
let graph;

function showMessage(notification) {
  message.innerHTML = `<h3>${notification}</h3>`;
}


function showBox() {
  playArea.timer = setTimeout(myBox, random(1));
}

function calcuDist(x1, y1, x2, y2) {
  let xDist = x2 - x1;
  let yDist = y2 - y1;
  return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
}

function myBox() {
  let element = document.createElement('div');
  var num = Math.floor(Math.random() * (100 - 10)) + 20;
  diameter.push(num);
  element.classList.add('round');
  element.style.marginTop = random(setTopMargin()) + 'px';
  element.style.marginLeft = random(setLeftMargin()) + 'px';
  var x=Math.round(0xffffff * Math.random()).toString(16);
  var y=(6-x.length);
  var z="000000";
  var z1 = z.substring(0,y);
  var color= "#" + z1 + x;
  element.style.backgroundColor = color;
  element.style.height = num + 'px';
  element.style.width = num + 'px';
  element.start = new Date().getTime();
  element.addEventListener('click', hit);
  area.appendChild(element);
}

function setTopMargin() {
  let maxHeight = area.clientHeight;
  if (maxHeight <= 100) {
    maxHeight = maxHeight + 200;
  } else {
    maxHeight = maxHeight - 200;
  }
  return maxHeight;
}

function setLeftMargin() {
  let maxWidth = area.clientWidth;
  if (maxWidth <= 100) {
    maxWidth = maxWidth + 200;
  } else {
    maxWidth = maxWidth - 200;
  }

  return maxWidth;
}

function hit(e) {
  let start = e.target.start;
  let end = new Date().getTime();
  let duration = (end - start) / 1000;

  clearTimeout(playArea.timer);
  time.push(duration);

  let currRad = diameter[diameter.length - 1];
  let currDist = calcuDist(
    mouseX,
    mouseY,
    e.target.offsetLeft + currRad,
    e.target.offsetTop + currRad
  );
  distance.push(currDist);
  mouseX = e.clientX;
  mouseY = e.clientY;

  area.children[0].remove();
  playArea.timer = setTimeout(myBox, random(4000));
  count++;
  if (count === circleCount) {
    conclusion.style.display = 'block';
    area.style.display = 'none';
    showMessage('Congratulations!!');
    for (let i = 0; i < distance.length; i++) {
      let row = document.createElement('tr');
      let cell1 = document.createElement('th');
      let cell2 = document.createElement('td');
      let cell3 = document.createElement('td');
      let cell4 = document.createElement('td');
      cell1.innerHTML = i + 1;
      cell1.scope = 'row';
      cell2.innerHTML = time[i];
      cell3.innerHTML = distance[i].toFixed(2);
      cell4.innerHTML = diameter[i];
      row.appendChild(cell1);
      row.appendChild(cell2);
      row.appendChild(cell3);
      row.appendChild(cell4);
      infoTableBody.appendChild(row);
    }


    let dataset = [];
    diameter.forEach((d, i) => {
      dataset.push({
        x: d,
        y: time[i],
      });
    });

    new_data = [];
    diameter.forEach((r, i) => {
      new_data.push({
        x: getBaseLog(2,(distance[i]/r)),
        y: time[i]
      });
    });
    // console.log(new_data);
    const line = lineOfBestFit(new_data);
    const line2 = lineOfBestFit(dataset);
    variables.innerHTML = `<h3>${`a = ${line[1].toFixed(2)} ,  b = ${line[0].toFixed(2)}`}</h3>`;

    regression = []
    for (var x = -4; x < 10; x++) {
      var y = line[0] * x + line[1];
      regression.push({ x: x, y: y });
    }

    regression2 = []
    for (var x = 0; x < 180; x++) {
      var y = line2[0] * x + line2[1];
      regression2.push({ x: x, y: y });
    }
    console.log(regression2);

    label1.innerHTML = `<h4>${`Diameter vs Time`}</h4>`;
    var graph = new Chart(infoGraph, {
      type: "scatter",
      data: {
        datasets: [
          {
            label: "Scatter",
            data: dataset,
            borderColor: "#100f0f",
            backgroundColor: "#100f0f",
            pointRadius: 5
          },
          {
            label: "Line",
            data: regression2,
            type: "line",
            borderColor: "#f4062e",
            backgroundColor: "transparent",
            fill: false,
            pointRadius: 0
          }
        ]
      },
      options: {
        scales: {
          xAxes: [
            {
              type: "linear",
              position: "bottom"
            }

          ],
          yAxes: [
            {
              type: "linear"
            }
          ]
        }
      }
    });

    label2.innerHTML = `<h4>${`ID vs Time`}</h4>`;
    var graph2 = new Chart(infoGraph2, {
      type: "scatter",
      data: {
        datasets: [
          {
            label: "Scatter",
            data: new_data,
            borderColor: "#100f0f",
            backgroundColor: "#100f0f",
            pointRadius: 5
          },
          {
            label: "Line",
            data: regression,
            type: "line",
            borderColor: "#f4062e",
            backgroundColor: "transparent",
            fill: false,
            pointRadius: 0
          }
        ]
      },
      options: {
        scales: {
          xAxes: [
            {
              type: "linear",
              position: "bottom"
            }

          ],
          yAxes: [
            {
              type: "linear"
            }
          ]
        }
      }
    });

    container.style.height = 'auto';
    resetGame();
    time = [];
    diameter = [];
    distance = [];
  } else {
    showMessage(`Circle: ${count + 1}/30`);
  }
}

function getBaseLog(x, y) {
  return Math.log(y) / Math.log(x);
}

function lineOfBestFit(data) {
  // console.log(data);
  let xSum = 0;
  let ySum = 0;
  let xSquaredSum = 0;
  let xySum = 0;
  let n = data.length;

  data.forEach((point )=> {
    xSum = xSum  + point['x'];
    ySum = ySum + point['y'];
    xSquaredSum += point['x'] ** 2;
    xySum += point['x'] * point['y'];
  });
  console.log(xSum);
  console.log(ySum);

  let slope = (n * xySum - xSum * ySum) / (n * xSquaredSum - xSum ** 2);
  let intercept = (ySum - slope * xSum) / n;

  return [slope, intercept];
}

function random(number) {
  let tempVal = Math.floor(Math.random() * number);
  return tempVal;
}

function resetGame() {
  clearTimeout(playArea.timer);
  inPlay = false;
  button.style.display = 'block';
  area.style.display = 'block';
}

button.addEventListener('click', function () {
  inPlay = true;
  button.style.display = 'none';
  // directions.style.display = 'none';
  conclusion.style.display = 'none';
  infoTableBody.innerHTML = '';
  graph ? graph.destroy() : null;
  count = 0;
  showMessage('Circle: 1/30');
  showBox();
  container.style.height = '600px';
});
