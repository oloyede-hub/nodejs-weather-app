const weatherForm = document.querySelector("form");
const input = document.querySelector("input");
const loading = document.querySelector("#loading_status");
const address = document.querySelector("#address");

weatherForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const location = input.value;
    loading.textContent = "Loading...";
    address.textContent = "";
    fetch(`http://localhost:3000/weather?address=${location}`).then((response) => response.json()).then((data) => {
         if(data.error) {
            loading.textContent = data.error;;
         }else {
            loading.textContent = data.location;
            address.textContent = data.forecast;
         }
    })

});