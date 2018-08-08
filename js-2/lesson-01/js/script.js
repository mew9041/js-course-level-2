function CoffeeMachine(power, capacity) {
  var waterAmount = 0;
  var coffeeAmount = 0;
  var maxTemp = 90;
  var waterHeatCapacity = 4200;
  var enable = false;
  var timer;

  this.addWater = function(newAmount) {
    if (newAmount < 50) {
      throw new Error('Слишком мало воды!');
    }
    if (newAmount > capacity) {
      throw new Error(`Нельзя залить больше, чем ${capacity} мл!`);
    }

    waterAmount += newAmount;
    console.log(`В машине ${waterAmount} мл воды.`);
  };

  this.addCoffee = function(newAmount) {
    if (newAmount < 5) {
      throw new Error('Слишком мало кофе!');
    }

    coffeeAmount += newAmount;
    console.log(`В машине ${coffeeAmount} гр кофе.`);
  };

  this.enableMachine = function() {
    console.log("Кофеварка включена.");
    return enable = true;
  };

  var calcBoilTime = function() {
    return (waterAmount * waterHeatCapacity * maxTemp) / power;
  };

  this.getBoilTime = function() {
    return calcBoilTime();
  };

  this.launch = function() {
    if (enable === false) {
      throw new Error("Кофеварка выключена.");
    }
    if (waterAmount === 0) {
      throw new Error("Не добавили воду.");
    }
    if (coffeeAmount === 0) {
      throw new Error("Не добавили кофе.");
    }

    console.log(vitek.getBoilTime(), " - время приготовления.");

    timer = setTimeout(function() {
      console.log('Кофе готов!');
      var coffeeImg = document.getElementById("coffee-img");
      coffeeImg.classList.add("display-block");
    }, calcBoilTime());
  }

  this.stop = function() {
    clearTimeout(timer);
    console.log("Кофеварка остановлена.");
  };
}

var vitek = new CoffeeMachine(3500, 400);

// --------------------------------------------------------

document.addEventListener("DOMContentLoaded", function() {
  var powerBtn = document.getElementById("power-button");
  powerBtn.innerText = "Вкл/Выкл";
  powerBtn.addEventListener("click", function() {
    vitek.enableMachine();
    powerBtn.classList.add("button-active");
  });

  var coffeeBtn = document.getElementById("coffee-button");
  coffeeBtn.innerText = "Добавить 5 гр кофе";
  coffeeBtn.addEventListener("click", function() {
    vitek.addCoffee(5);
  });

  var waterBtn = document.getElementById("water-button");
  waterBtn.innerText = "Добавить 50 мл воды";
  waterBtn.addEventListener("click", function() {
    vitek.addWater(50);
  });

  var launchBtn = document.getElementById("launch-button");
  launchBtn.innerText = "Запустить";
  launchBtn.addEventListener("click", function() {
    vitek.launch();
  });

  var stopBtn = document.getElementById("stop-button");
  stopBtn.innerText = "Остановить";
  stopBtn.addEventListener("click", function() {
    vitek.stop();
  });
});