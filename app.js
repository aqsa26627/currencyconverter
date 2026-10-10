
const Base_URL = "https://open.er-api.com/v6/latest";

const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");
const dropdowns = document.querySelectorAll(".dropdown select");

const updateExchangeRate = async () => {
  if (!fromCurr.value || !toCurr.value) return;
  
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;
  
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }

  const URL = `${Base_URL}/${fromCurr.value.toUpperCase()}`;

  try {
    let response = await fetch(URL);
    if (!response.ok) throw new Error("Failed to fetch data");

    let data = await response.json();
    let rate = data.rates[toCurr.value.toUpperCase()];
    
    if (!rate) {
      msg.innerText = "Exchange rate not available.";
      return;
    }

    let finalAmount = (amtVal * rate).toFixed(2);
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
    
  } catch (error) {
    msg.innerText = "Failed to fetch exchange rate.";
    
  }
};

for (let select of dropdowns) {
  if (typeof countryList === "undefined") {

    break;
  }

  for (let currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "PKR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }

  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
    updateExchangeRate();
  });
}

const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  if (!countryCode) return;
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  if (img) img.src = newSrc;
};

btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateExchangeRate();
});

window.addEventListener("load", () => {
  updateExchangeRate();
});