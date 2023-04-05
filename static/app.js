/* 
Things Javascript does:
- When JS is enabled (so always when this runs):
- Hide the "submit" buttons on every form, except the last one
- Every time the user types, save the form state in localstorage
- When they "navigate" to a form that has a localstorage cache associated with it, this gets placed into the form's input values.
- When the user has finally filled in everything, the submit button on the last page gets taken over by Javascript and submits every form (async) and then finally submits the last confirmation.
*/

const allForms = document.querySelectorAll('form');

// Is related to the progress bar
// Update when you add or remove forms.
// Includes all forms, including personal-info and submit!!
const maxForms = 8;

// FIRST!!!!
// Change all fallback input type "text" score fields to "range".
const allScoreFieldLabels = document.querySelectorAll('.score-labels');
const hideOnJSElements = document.querySelectorAll('.hide-on-js');

hideOnJSElements.forEach(elem => {
	elem.classList.add('invisible');
})

// inputName = the "name" attribute on the range
// required = bool
// label = the text in the label
function makeRangeElement(inputName, required, label) {
	const labelText = document.createElement('span');
	labelText.insertAdjacentText('afterbegin', label + ' ');

	// If required is true, then append the required thingy
	if (required) {
		const strongElement = document.createElement('strong');
		const spanElement = document.createElement('span');
		spanElement.ariaLabel = 'required';
		spanElement.textContent = '*';
		strongElement.appendChild(spanElement);

		labelText.insertAdjacentElement("beforeend", strongElement);
	}

	const rubyElement = document.createElement('ruby');
	const rpElement1 = document.createElement('rp');
	const rpElement2 = document.createElement('rp');
	const rtElement = document.createElement('rt');
	const rangeElement = document.createElement('input');

	rangeElement.type = 'range';
	rangeElement.setAttribute('list', 'range-values')
	rangeElement.name = inputName;
	rangeElement.min = '1';
	rangeElement.max = '10';
	if (required) {
		rangeElement.setAttribute('required', '');
		rangeElement.ariaRequired = 'true';
	}

	rubyElement.appendChild(rangeElement);
	rpElement1.textContent = '(';
	rpElement2.textContent = ')';
	rtElement.textContent = '1 5 10';
	rubyElement.appendChild(rpElement1);
	rubyElement.appendChild(rtElement);
	rubyElement.appendChild(rpElement2);

	// const div = document.createElement('div');
	// div.appendChild(labelText);
	// div.appendChild(rubyElement);

	return {
		labelText: labelText,
		ruby: rubyElement
	}
}

function changeTextInputsToRangeInputs() {
	allScoreFieldLabels.forEach(elem => {
		const labelSpan = elem.querySelector('span');
		const labelText = labelSpan.firstChild.textContent.trim();
		// if (labelSpan.firstElementChild && labelSpan.firstElementChild.tagName == 'STRONG') {
		// 	const strongInLabel = labelSpan.firstElementChild;
		// 	console.log(strongInLabel)
		// 	// strongInLabel.innerHTML = '';
		// 	const labelSpanWithoutStrong = labelSpan.removeChild(strongInLabel);
		// 	const labelText = labelSpanWithoutStrong.textContent;
		// 	console.log(labelSpanWithoutStrong);
		// 	console.log(labelText);

		// }
		const inputElement = elem.querySelector('input');
		const inputName = inputElement.name;
		const required = inputElement.required;

		const fullLabelContent = makeRangeElement(inputName, required, labelText);

		elem.replaceChildren(fullLabelContent.labelText, fullLabelContent.ruby);
	})
}
changeTextInputsToRangeInputs();


// SECOND
// Handle local storage!!
if (window.localStorage) {

	computeProgress();

	// This is only all of the input submits in the individual forms, because the final one is a button
	const allSubmitInputs = document.querySelectorAll('input[type="submit"]');

	allSubmitInputs.forEach(elem => {
		elem.classList.add("invisible");
	});

	// const allInputElements = document.querySelectorAll('input[type="text"], input[type="number"], input[type="email"] input[type="checkbox"], ')

	/*
	Form data storage format
	{
		forms: {
			<formid>: {
				<elementname>: <value>
			},
			<formid>: {
				<elementname>: <value>
			},
		}
	}

	*/

	var formData = {
		forms: {}
	}

	// formID is a string, the ID attribute of the form
	function generateJsonFromForm(formID) {
		var form = {}
		const elements = Array.from(document.querySelectorAll(`#${formID} input:not([type="submit"]), #${formID} select`));
		elements.forEach(elem => {
			const elementName = elem.getAttribute('name');
			const elementValue = elem.value;
			form[elementName] = elementValue;
		})

		formData.forms[formID] = form;
		// console.log(formData);

		const formJSON = JSON.stringify(form);
		return formJSON;
	}

	// Check beforehand whether localStorage works or not!
	async function putFormDataInLocalStorage(key, formJSON) {
		window.localStorage.setItem(key, formJSON);
	}

	// Check beforehand whether or not localStorage is enabled
	function putFormInputValuesBackFromLocalStorage() {
		// Take all forms from document
		// Check if the form's data is stored in localStorage already
		// If it is, put it back
		allForms.forEach(elem => {
			const formID = elem.getAttribute('id');
			if (window.localStorage.getItem(formID)) {
				/*
				The same format as a singular "form" element from formData above.
				*/
				const localStorageData = JSON.parse(window.localStorage.getItem(formID));
				// const elements = Array.form(document.querySelectorAll(`#${formID} input:not([type="submit"]), #${formID} select`));
				// elements.forEach(elem2 => {
				// 	if(elem2.)
				// })
				Object.keys(localStorageData).forEach(key => {
					// inputElement is the actual input/select element that "key" is the name of.
					const inputElement = document.querySelector(`#${formID} input[name="${key}"], #${formID} select[name="${key}"]`);

					inputElement.value = localStorageData[key];
				})
				
			}
		})
	}
	putFormInputValuesBackFromLocalStorage()

	function computeProgress() {
		var amountOfStores = window.localStorage.length;
		const progress = amountOfStores / maxForms;

		document.querySelector('progress').value = progress;
	}

	allForms.forEach(elem => {
		elem.addEventListener('input', event => {
			const formID = elem.getAttribute('id');
			const formJSON = generateJsonFromForm(formID);
			// console.log(formJSON);
			// Set the entire element
			putFormDataInLocalStorage(formID, formJSON);

			// Also, this is a convenient place to update the progress bar
			computeProgress();
		})
	})

	
}

// Handle final submit
const finalSubmitForm = document.querySelector('#submit-form');
finalSubmitForm.addEventListener('submit', event => {
	// Do not submit the form yet
	event.preventDefault();

	// Submit each form to the server
	const submitAll = async () => {
		allForms.forEach(elem => {
			if (elem.getAttribute('id') != "submit-form") {
				elem.onsubmit = (event) => {
					event.preventDefault();
				}
				elem.submit();
			}
		})
	}

	if (window.localStorage) {
		window.localStorage.clear();
	}

	submitAll().then(() => {
		// finalSubmitForm.submit();
	}) 
	// Now finally submit yourself
	// finalSubmitButton.submit();
	return false;
}) 
