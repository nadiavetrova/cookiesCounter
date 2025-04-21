// function counterInit() {

//   function getAllCookie() {
//     const cookies = decodeURIComponent(document.cookie);
//     const splitedCookie = cookies.split('; ');
//     const mapedCookie = splitedCookie.map((cookiePair) => {
//       const splitedCookiePair = cookiePair.split('=');
//       let obj = {
//         name: splitedCookiePair[0],
//         value: splitedCookiePair[1]
//       }
//       return obj
//     })
//     return mapedCookie
//   }

//   const showAllCookie = getAllCookie();
//   console.log(showAllCookie);


//   function getCookieByName(keyName) {
//     const allCookies = getAllCookie();

//     const foundedCookie = allCookies.find((cookieObj) => {
//       if (cookieObj.name === keyName) {
//         return true
//       }
//     })

//     if (foundedCookie) {
//       return foundedCookie.value;
//     } else {
//       return undefined
//     }
//   }

//   class Counter {
//     constructor(config) {
//       this.count = config.initValue;
//       this.stepSize = config.stepSize;
//       this.name = config.name;

//       this.counterShower = document.querySelector('.counterShower');
//       const buttonsParent = document.querySelector('.counter');

//       this.loadStateFromCookie();

//       buttonsParent.addEventListener('click', this.clickHandler.bind(this))

//       this.updateCounter();
//     }


//     updateCounter() {
//       if (this.counterShower) {
//         this.counterShower.textContent = this.count;
//       }
//     }

//     clickHandler(e) {
//       const target = e.target;
//       const isBtn = target.tagName === 'BUTTON';

//       if (isBtn) {
//         if (target.classList.contains('plus')) {
//           this.count += this.stepSize;
//         } else if (target.classList.contains('minus')) {
//           this.count -= this.stepSize;
//         }
//         this.updateCounter()
//         this.saveState()
//       }
//     }


//     saveState() {
//       let state = {
//         name: this.name,
//         count: this.count,
//         stepSize: this.stepSize
//       }
//       console.log(state);
//       const stateJSON = JSON.stringify(state)
//       console.log(stateJSON);


//       document.cookie = 'stateCounter' + '=' + encodeURIComponent(stateJSON);
//     }

//     loadStateFromCookie() {
//       const stateCounter = getCookieByName('stateCounter');

//       if (stateCounter) {
//         const parsed = JSON.parse(stateCounter);
//         this.count = parsed.count;
//         this.stepSize = parsed.stepSize;
//         this.name = parsed.name;

//         console.log(this);
//         this.updateCounter()
//       }
//     }
//   }

//   const myCounterConfig = {
//     name: 'Nadia',
//     initValue: 20,
//     stepSize: 3
//   }

//   const myCounter = new Counter(myCounterConfig);
//   console.log(myCounter);

// }

// counterInit()




// ++++++++++solid++++++
//не соответствие первому принципу "Одна сущеость - одна залача!"
//Counter отвечает за:
// Управление состоянием счетчика(this.count, this.stepSize, this.name).
// обновление интерфейса через updateCounter.
// Сохранение и загрузку состояния из cookies.
// слушатель (clickHandler).




function counterInit() {
  // Класс CounterManager только для состояний счетчика

  class CounterManager {
    constructor(config) {
      this.count = config.initValue;
      this.name = config.name;
      this.stepSize = config.stepSize;
    }

    stepUp() {
      this.count += this.stepSize;
    }

    stepDown() {
      this.count -= this.stepSize;
    }

    getCount() {
      return this.count;
    }
  }

  // Класс UpdateCounter для отображения инзменений счетчика

  class UpdateCounter {
    constructor(counterManager) {
      this.counterManager = counterManager;
      this.counterShower = document.querySelector('.counterShower');
      this.updateCounter();
    }

    updateCounter() {
      if (this.counterShower) {
        this.counterShower.textContent = this.counterManager.getCount();
      }
    }
  }

  // Класс ClickHandler для слушателя

  class ClickHandler {
    constructor(counterManager, updateCounter) {
      this.counterManager = counterManager;
      this.updateCounter = updateCounter;
      const buttonsParent = document.querySelector('.counter');

      if (buttonsParent) {
        buttonsParent.addEventListener('click', this.handleCounterChange.bind(this));
      }
    }

    handleCounterChange(e) {
      const target = e.target;
      const isBtn = target.tagName === 'BUTTON';

      if (isBtn) {
        if (target.classList.contains('plus')) {
          this.counterManager.stepUp();
        } else if (target.classList.contains('minus')) {
          this.counterManager.stepDown();
        }
        this.updateCounter.updateCounter();
      }
    }
  }


  const myCounterConfig = {
    name: 'Nadia',
    initValue: 50,
    stepSize: 5,
  };


  const myCounterManager = new CounterManager(myCounterConfig);
  const myUpdateCounter = new UpdateCounter(myCounterManager);
  const myClickHandler = new ClickHandler(myCounterManager, myUpdateCounter);
  console.log(myCounterManager);
  console.log(myUpdateCounter);
  console.log(myClickHandler);
}

counterInit();










