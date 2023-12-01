// script.js

document.addEventListener('DOMContentLoaded', function () {
    const symptoms = ['itching','skin_rash','nodal_skin_eruptions','continuous_sneezing','shivering','chills','joint_pain',
    'stomach_pain','acidity','ulcers_on_tongue','muscle_wasting','vomiting','burning_micturition','spotting_ urination','fatigue',
    'weight_gain','anxiety','cold_hands_and_feets','mood_swings','weight_loss','restlessness','lethargy','patches_in_throat',
    'irregular_sugar_level','cough','high_fever','sunken_eyes','breathlessness','sweating','dehydration','indigestion',
    'headache','yellowish_skin','dark_urine','nausea','loss_of_appetite','pain_behind_the_eyes','back_pain','constipation',
    'abdominal_pain','diarrhoea','mild_fever','yellow_urine','yellowing_of_eyes','acute_liver_failure','fluid_overload',
    'swelling_of_stomach','swelled_lymph_nodes','malaise','blurred_and_distorted_vision','phlegm','throat_irritation',
    'redness_of_eyes','sinus_pressure','runny_nose','congestion','chest_pain','weakness_in_limbs','fast_heart_rate',
    'pain_during_bowel_movements','pain_in_anal_region','bloody_stool','irritation_in_anus','neck_pain','dizziness','cramps',
    'bruising','obesity','swollen_legs','swollen_blood_vessels','puffy_face_and_eyes','enlarged_thyroid','brittle_nails',
    'swollen_extremeties','excessive_hunger','extra_marital_contacts','drying_and_tingling_lips','slurred_speech','knee_pain','hip_joint_pain',
    'muscle_weakness','stiff_neck','swelling_joints','movement_stiffness','spinning_movements','loss_of_balance','unsteadiness','weakness_of_one_body_side',
    'loss_of_smell','bladder_discomfort','foul_smell_of urine','continuous_feel_of_urine','passage_of_gases','internal_itching','toxic_look_(typhos)',
    'depression','irritability','muscle_pain','altered_sensorium','red_spots_over_body','belly_pain','abnormal_menstruation','dischromic _patches',
    'watering_from_eyes','increased_appetite','polyuria','family_history','mucoid_sputum','rusty_sputum','lack_of_concentration','visual_disturbances',
    'receiving_blood_transfusion','receiving_unsterile_injections','coma','stomach_bleeding','distention_of_abdomen','history_of_alcohol_consumption',
    'fluid_overload','blood_in_sputum','prominent_veins_on_calf','palpitations','painful_walking','pus_filled_pimples','blackheads','scurring','skin_peeling',
    'silver_like_dusting','small_dents_in_nails','inflammatory_nails','blister','red_sore_around_nose','yellow_crust_ooze'];

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
            // console.log(data);
            // Assuming data.ayurvedic_cure is an array of strings
const ayurvedicCuresHTML = data.ayurvedic_cure.map(cure => {
    const iParts = cure.split(":", 1);
    const searchUrl = encodeURIComponent(iParts[0]);
    const googleLink = `https://www.google.com/search?q=${searchUrl}`;
    return `<li><a href="${googleLink}" target="_blank">${cure}</a></li>`;
}).join('');

            // Display result 
            result.innerHTML = `<p>Prediction: <b>${data.disease}</b></p>
                    <p>Ayurvedic Cure:</p>
                    <ul>${ayurvedicCuresHTML}</ul>`;

        });

});
