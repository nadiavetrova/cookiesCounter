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



































}

counterInit()