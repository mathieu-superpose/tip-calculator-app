let bill = document.querySelector(".selection__bill__amount");
let people = document.querySelector(".selection__people__amount");
let buttonList = document.querySelectorAll("button");
let tipSelected = document.querySelector(".selection__tip__list__selected");
let tipAmount = document.querySelector(".display__tip__value");
let totalAmount = document.querySelector(".display__total__value");
let warningMessage = document.querySelector(".selection__people__top__warning");
let customBtn = document.querySelector(".selection__tip__list__custom");

const calculate = () => {
	tipSelected = document.querySelector(".selection__tip__list__selected");
	// display appropriate initial values
	bill.value = bill.value.replace(/^00/, '0').match(/[0-9]+.?[0-9]{0,2}/);
	people.value = people.value.match(/[1-9][0-9]*/);
	if (people.value == "" || people.value == "0") {
		warningMessage.style.display = "block";
		people.style.border = "2px solid orange";
		people.style.outlineColor = "orange";
	} else {
		warningMessage.style.display = "none";
		people.style.border = "2px solid white";
		people.style.outlineColor = "hsl(172, 67%, 45%)";
	} 

	// calculate values
	calcPeople = parseFloat(people.value) || 1;
	calcBill = parseFloat(bill.value) / calcPeople;
	calcTips = (calcBill * parseFloat(tipSelected.innerHTML)) / 100;
	calcTot = calcBill + calcTips;
	
	// display appropriate results
	tipAmount.innerHTML = ("" + calcTips).match(/[0-9]+.?[0-9]{0,2}/)
	totalAmount.innerHTML = ("" + calcTot).match(/[0-9]+.?[0-9]{0,2}/)
}

const reset = () => {
	bill.value = ""
	people.value = ""
	tipAmount.innerHTML = ""
	totalAmount.innerHTML = ""
}

const selectButton = (btn) => {
	const allButtons = document.querySelectorAll("button");
	console.log('coucou select');
	allButtons.forEach(element => {
		if (["1","2","3","4","5","6"].includes(element.dataset.btn)) {
			if (element.dataset.btn == btn) element.className="selection__tip__list__selected";
			if (element.dataset.btn != btn) element.className="selection__tip__list__regular";
		}
	});

	calculate();
}

const customButton = () => {
	customValue = customBtn.value.replace(/^00/, '0').match(/[0-9]+/);
	if (customValue == null) return customBtn.value = "";
	const prevBtn = document.querySelector("li:last-child");
	const newBtn = document.createElement('li');
	newBtn.innerHTML = `<button class="selection__tip__list__regular" data-btn="6" onClick="selectButton(6)">${customValue}%</button>`;
	prevBtn.parentNode.replaceChild(newBtn, prevBtn);
}

// display empty cells on first load
reset();
calculate();
