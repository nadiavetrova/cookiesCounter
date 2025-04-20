function counterInit() {

  function getAllCookie() {
    const cookies = decodeURIComponent(document.cookie);
    const splitedCookie = cookies.split('; ');
    const mapedCookie = splitedCookie.map((cookiePair) => {
      const splitedCookiePair = cookiePair.split('=');
      let obj = {
        name: splitedCookiePair[0],
        value: splitedCookiePair[1]
      }
      return obj
    })
    return mapedCookie
  }

  const showAllCookie = getAllCookie();
  console.log(showAllCookie);


  function getCookieByName(keyName) {
    const allCookies = getAllCookie();

    const foundedCookie = allCookies.find((cookieObj) => {
      if (cookieObj.name === keyName) {
        return true
      }
    })

    if (foundedCookie) {
      return foundedCookie.value;
    } else {
      return undefined
    }
  }





  class Counter {
    constructor(config) {
      this.count = config.initValue;
      this.stepSize = config.stepSize;
      this.name = config.name;

      this.counterShower = document.querySelector('.counterShower');
      const buttonsParent = document.querySelector('.counter');

      this.loadStateFromCookie();

      buttonsParent.addEventListener('click', this.clickHandler.bind(this))

      this.updateCounter();
    }


    updateCounter() {
      if (this.counterShower) {
        this.counterShower.textContent = this.count;
      }
    }

    clickHandler(e) {
      const target = e.target;
      const isBtn = target.tagName === 'BUTTON';

      if (isBtn) {
        if (target.classList.contains('plus')) {
          this.count += this.stepSize;
        } else if (target.classList.contains('minus')) {
          this.count -= this.stepSize;
        }
        this.updateCounter()
        this.saveState()
      }
    }


    saveState() {
      let state = {
        name: this.name,
        count: this.count,
        stepSize: this.stepSize
      }
      console.log(state);
      const stateJSON = JSON.stringify(state)
      console.log(stateJSON);


      document.cookie = 'stateCounter' + '=' + encodeURIComponent(stateJSON);
    }

    loadStateFromCookie() {
      const stateCounter = getCookieByName('stateCounter');

      if (stateCounter) {
        const parsed = JSON.parse(stateCounter);
        this.count = parsed.count;
        this.stepSize = parsed.stepSize;
        this.name = parsed.name;

        console.log(this);
        this.updateCounter()
      }
    }
  }

  const myCounterConfig = {
    name: 'Nadia',
    initValue: 20,
    stepSize: 3
  }

  const myCounter = new Counter(myCounterConfig);
  console.log(myCounter);




























}

counterInit()