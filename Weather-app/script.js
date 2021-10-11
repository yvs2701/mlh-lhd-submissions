/* The two APIs used are:
Autocomplete and search API from accuweather (only 50 calls/day)
Weather condition API from openweather */

var city = document.getElementById("search");
city.addEventListener("keydown", function (event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.key === "Enter")
        document.getElementById("submit-btn").click();
});

var failure = 0;
/* city.onchange(async () => {
    if (city.value.trim !== "") {
        var searchPlace = `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${$API_KEY}&q=${city.value}`;
        var data = await fetch(searchPlace);
        if (!data.ok) {
            console.error("Autocomplete API broke !");
        } else {
            var json_data = JSON.parse(data);
            var cityList = [{}, {}, {}];
            for(var i = 0; i < 3; i++) {
                cityList[i] = {
                    key: json_data[i].Key,
                    name: json_data[i].LocalizedName,
                    country: json_data[i].Country.LocalizedName
                }
            }
            // ****** COMPLETE THIS autocomplete function with datalist ******
        }
    } else {
        // reset the datalist back to empty

        // check if we surpassed the number of calls
        console.error("Autocomplete API broke !");
        failure++;
        if (failure >= 4)
            alert("The site may have crossed its 'free api trial' limit !")
    }
}); */
document.getElementById("submit-btn").addEventListener('click', async () => {
    if (city.value.trim() === "") {
        city.placeholder = "City name can't be empty :\\";
        city.value = '';
        setTimeout(() => {
            city.placeholder = "Search for your city...";
        }, 8000);
        city.focus();
        console.log("Empty search !");
    } else {
        /*** Here I was facing this http issue when the site was hosted on github...
         * To resolve this either upgrade all the requests to HTTPS or use
         * <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests"> in your html
         * which basically does the same... (BUT THE API MUST ALLOW FOR HTTPS REQUESTS !!!) ***/
        const $API_KEY = document.getElementById("key").value;
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value.trim()}&appid=${$API_KEY}&units=metric`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                const { main, name, sys, weather } = data;
                const icon = `https://openweathermap.org/img/wn/${weather[0]["icon"]}@2x.png`;
                const card = document.createElement("div");
                card.classList.add("weather-card");
                card.innerHTML = `
                <p id="city-name">${name + ", " + sys.country}</p>
                <h2 id="temperature">${main.temp} &deg;C</h2>
                <img id="weather-img" src="${icon}" alt="${weather[0]["main"]}">
                <br>
                <small id="weather">${weather[0]["description"]}</small>`;

                document.getElementById("cards").appendChild(card);
                city.value = '';
                city.focus();
            })
            .catch((err) => {
                console.error(err);
                city.placeholder = "Enter a valid city name :(";
                city.value = '';
                setTimeout(() => {
                    city.placeholder = "Search for your city...";
                }, 8000);
                city.focus();
                console.log("Invalid city name !");
            });
        /* // AccuWeather API:
        const searchPlace = `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${$API_KEY}&q=${city.value.trim()}&details=false`;
        fetch(searchPlace)
            .then(res => res.json())
            .then(json_data => {
                var location_string = json_data[0].Key;
                const url = `http://dataservice.accuweather.com/currentconditions/v1/${location_string}?apikey=${$API_KEY}`;

                fetch(url)
                    .then(res => res.json())
                    .then(json_res => {
                        document.getElementById("cards").innerHTML += `<div class="weather-card">
                        <p id="city-name">${city.value.trim()}</p>
                        <h2 id="temperature">${json_res[0].Temperature.Metric.Value} &deg;C</h2>
                        <span id="weather-img">{weather icon}</span>
                        <br>
                        <small id="weather">${json_res[0].WeatherText}</small></div>`;

                        city.value = '';
                        city.focus();
                    })
                    .catch(() => {
                        city.placeholder = "Enter a valid city name :(";
                        city.value = '';
                        setTimeout(() => {
                            city.placeholder = "Search for your city...";
                        }, 8000);
                        city.focus();
                        console.log("Invalid city name !");
                    });
            })
            .catch(() => {
                console.error("Autocomplete API broke !");
                failure++;
                if (failure >= 4)
                    alert("The site may have crossed its 'free api trial' limit !")
            }); */
    }
});