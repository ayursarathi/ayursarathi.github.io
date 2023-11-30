// script.js

document.addEventListener('DOMContentLoaded', function () {
    const symptoms = ['Fever', 'Headache', 'Cough', 'Fatigue'];

    for (let i = 1; i <= 5; i++) {
        const selectElement = document.getElementById(`selectedSymptom${i}`);

        // Populate options
        symptoms.forEach(symptom => {
            const option = document.createElement('option');
            option.value = symptom.toLowerCase();
            option.text = symptom;
            selectElement.add(option);
        });

        // Add change event listener to disable selected option
        selectElement.addEventListener('change', function () {
            const selectedValue = this.value;

            // Disable selected option
            symptoms.forEach(symptom => {
                const option = selectElement.querySelector(`option[value="${symptom.toLowerCase()}"]`);
                option.disabled = (symptom.toLowerCase() === selectedValue);
            });
        });
    }
});

// Get form and result elements
const form = document.getElementById('symptomForm');
const result = document.getElementById('predictionResult');

// Add submit event listener 
form.addEventListener('submit', evt => {

    // Prevent default form submission
    evt.preventDefault();

    // Get data from form
    const formData = {
        symptom1: form.selectedSymptom1.value,
        symptom2: form.selectedSymptom2.value,
        symptom3: form.selectedSymptom3.value,
        symptom4: form.selectedSymptom4.value,
        symptom5: form.selectedSymptom5.value
    };

    // Make POST request
    fetch('http://localhost:8000/predict', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
        .then(response => response.json())
        .then(data => {
            // Display result 
            result.innerHTML = `<p>Prediction: <b>${data.prediction}</b></p>`;
        });

});
