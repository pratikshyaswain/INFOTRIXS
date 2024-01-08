const search = document.querySelector(".btn");
const input = document.querySelector(".name");
const weatherCard = document.querySelector(".card");
const current = document.querySelector(".current");

const key = "e98624ad12f8fc6de941d713e2ba5134";

const card = (city, item, index) => {
  if (index === 0) {
    return `<div class="details">
    <h3>${city}</h3>
  <h4>Temperature: ${(item.main.temp - 273.15).toFixed(2)} ℃</h4>
  </div>
  <h5 class="h5">${item.dt_txt.split(" ")[0]}</h5>
  <div class="img">
  <img src="http://openweathermap.org/img/wn/${
    item.weather[0].icon
  }@4x.png" alt="" />
  </div>`;
  } else {
    return ` 
    <li class="cards">
  <h3>${item.dt_txt.split(" ")[0]}</h3>
   <img src="http://openweathermap.org/img/wn/${
     item.weather[0].icon
   }@2x.png" alt="" />
   <h4 class="temp">${item.weather[0].description}</h4>
  <h4 class="temp">Temperature: ${(item.main.temp - 273.15).toFixed(2)} ℃</h4>
</li>
`;
  }
};

const getDetails = (lat, lon, city) => {
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key}`;
  fetch(apiUrl)
    .then((res) => res.json())
    .then((data) => {
      // console.log(data);
      const days = [];
      const sixDays = data.list.filter((forecast) => {
        const date = new Date(forecast.dt_txt).getDate();
        if (!days.includes(date)) {
          return days.push(date);
        }
      });
      input.value = "";
      current.innerHTML = "";
      weatherCard.innerHTML = "";

      console.log(sixDays);
      sixDays.forEach((item, index) => {
        if (index === 0) {
          current.insertAdjacentHTML("beforeend", card(city, item, index));
        } else {
          weatherCard.insertAdjacentHTML("beforeend", card(city, item, index));
        }
      });
    })
    .catch(() => {
      alert("Network Issue!");
    });
};
const cityName = () => {
  const city = input.value.trim();
  if (city == 0) return;
  //   console.log(city);
  const api = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${key}`;
  fetch(api)
    .then((res) => res.json())
    .then((data) => {
      // console.log(data);
      if (data.length == 0) return alert(`No data found for ${city}`);
      const { lat, lon, name } = data[0];
      getDetails(lat, lon, name);
    })
    .catch(() => {
      alert("Network Issue!");
    });
};
search.addEventListener("click", cityName);
