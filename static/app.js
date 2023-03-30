/* 
Things Javascript does:
- When JS is enabled (so always when this runs):
- Hide the "submit" buttons on every form, except the last one
- Every time the user types, save the form state in localstorage
- When they "navigate" to a form that has a localstorage cache associated with it, this gets placed into the form's input values.
- When the user has finally filled in everything, the submit button on the last page gets taken over by Javascript and submits every form (async) and then finally submits the last confirmation.
*/


const allForms = document.querySelectorAll('form');

if (window.localStorage) {
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

	allForms.forEach(elem => {
		elem.addEventListener('input', event => {
			const formID = elem.getAttribute('id');
			const formJSON = generateJsonFromForm(formID);
			// console.log(formJSON);
			// Set the entire element
			putFormDataInLocalStorage(formID, formJSON);
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

	submitAll().then(() => {
		// finalSubmitForm.submit();
	}) 
	// Now finally submit yourself
	// finalSubmitButton.submit();
	return false;
}) 



// window.addEventListener("load", (event) => {

// })