// * * * * * * * * * * * * * * * * * * * * * * * * *
// * * * * * * * *  Ejercicio 1º * * * * * * * * * *
// * * * * * * * * * * * * * * * * * * * * * * * * *

// Constantes
var WORK_HOURS = [
  "08:00 - 09:00",
  "09:00 - 10:00",
  "10:00 - 11:00",
  "11:00 - 12:00",
  "12:00 - 13:00",
  "13:00 - 14:00",
  "15:00 - 16:00",
  "16:00 - 17:00"
];

// Datos
var myTeam = [
  {
    name: "María",
    availability: new Array(8).fill(true)
  },
  {
    name: "Pedro",
    availability: new Array(8).fill(true)
  },
  {
    name: "Esther",
    availability: new Array(8).fill(true)
  },
  {
    name: "Marcos",
    availability: new Array(8).fill(true)
  },
];

// 1. Generación aleatoria de la disponibilidad

var getRandom = (a, b) => (Math.random() < 0.5 ? a : b);

var availability = () => {
  for (user of myTeam) {
    console.log("Disponobilidad de:", user.name);
    for (var i = 0; i < WORK_HOURS.length; i++) {
      user.availability[i] = WORK_HOURS[i] + ': ' + getRandom("Si", "No");
      console.log(user.availability[i]);
    }
    console.log('');
  }
}

availability();

// 2. Buscar hueco libre

console.log(" * * * ¿Hay hueco libre? * * * ");

var availableTime = () => {
  for (i=0; i < WORK_HOURS.length; i++) {
    var temp = 0;
    for (e=0; e < myTeam.length; e++) {
      myTeam[e].availability[i].indexOf('Si') > -1 ? temp++ : (temp = temp + 0);
      if (temp === 4) {
        return console.log("Hay un hueco de: ", myTeam[e].availability[i].substr(0,13));
      }
    }
  }
  return console.log("NO hay hueco");
}

availableTime();

// * * * * * * * * * * * * * * * * * * * * * * * * *
// * * * * * * * *  Ejercicio 2º * * * * * * * * * *
// * * * * * * * * * * * * * * * * * * * * * * * * *

const billsCoinsInBox = [
  {
    name: "200",
    type: "billetes",
    amount: 4
  },
  {
    name: "100",
    type: "billetes",
    amount: 4
  },
  {
    name: "50",
    type: "billetes",
    amount: 15
  },
  {
    name: "20",
    type: "billetes",
    amount: 20
  },
  {
    name: "10",
    type: "billetes",
    amount: 15
  },
  {
    name: "5",
    type: "billetes",
    amount: 10
  },
  {
    name: "2",
    type: "monedas",
    amount: 25
  },
  {
    name: "1",
    type: "monedas",
    amount: 30
  },
  {
    name: "0.5",
    type: "monedas",
    amount: 40
  },
  {
    name: "0.2",
    type: "monedas",
    amount: 45
  },
  {
    name: "0.1",
    type: "monedas",
    amount: 40
  },
  {
    name: "0.05",
    type: "monedas",
    amount: 50
  },
  {
    name: "0.02",
    type: "monedas",
    amount: 50
  },
  {
    name: "0.01",
    type: "monedas",
    amount: 50
  },
]

var billsCoins = [200, 100, 50, 20, 10, 5, 2, 1, 0.5, 0.2, 0.1, 0.05, 0.02, 0.01]
var box = document.getElementById("box");
var result = document.getElementById("result");
var totalValue = document.getElementById('total');
var moneyDeliveredValue = document.getElementById('moneyDelivered');
var btnCalculate = document.getElementById('calculate');

var moneyToReturn = (total, moneyDelivered) => (moneyDelivered - total).toFixed(2);

var removeElements = (id) => {
  while (id.firstChild) {
    id.removeChild(id.firstChild);
  }
}

var typeMoney = (value) => value > 2 ? "billete" : "moneda";

var billsCoinsToReturn = (refundAmount) => {
  removeElements(box);
  removeElements(result);
  for (var i = 0; i < billsCoins.length; i++) {
    if (Math.floor(refundAmount / billsCoins[i]) > 0) {
      var quantity = Math.floor(refundAmount / billsCoins[i])
      var dineroTem = quantity * billsCoins[i];
      refundAmount = (refundAmount - dineroTem).toFixed(2);
      var li = document.createElement("li");
      li.appendChild(document.createTextNode('Te tengo que devolver ' + quantity + ' ' + typeMoney(billsCoins[i]) + (quantity > 1 ? 's':'') + ' de ' + billsCoins[i] + '€'));
      document.getElementById("result").appendChild(li);
      newMoneyInBox(i, quantity);
    }
  };
  moneyInBox();
}

var calculate = () => billsCoinsToReturn(moneyToReturn(totalValue.value, moneyDeliveredValue.value));

var moneyInBox = () => { 
  for (money of billsCoinsInBox) {
    var li = document.createElement("li");
    li.appendChild(document.createTextNode('Hay ' + money.amount + ' ' + money.type + ' de ' + money.name + '€'));
    box.appendChild(li);
  }
}

var newMoneyInBox = (index, quantity) => {
    billsCoinsInBox[index].amount = billsCoinsInBox[index].amount - quantity;
}

moneyInBox();

btnCalculate.addEventListener("click", calculate);