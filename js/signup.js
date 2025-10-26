// Send data to Airtable
async function sendToAirtable() {
    // Get all your form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const children = getAllChildren();

    // Your Airtable credentials
    const AIRTABLE_API_KEY = 'patFpQBG2OHpZY3Qz.5bb512c4e7add9fdf36054b28fb22f74a1cd470d595376d5a500e2b6c0bf25e7';
    const BASE_ID = 'appwTdrup8dT6Rgug';
    const TABLE_NAME = 'tblfg0Vx04jGfEkBa';

    // Prepare the data
    const data = {
        records: [
            {
                fields: {
                    'Name': name,
                    'Email': email,
                    'Phone': phone,
                    "Children": children.join(', ') // or send as array if your field supports it
                }
            }
        ]
    };

    try {
        const response = await fetch(`https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
    } catch (error) {
        alert('Network error: ' + error.message);
        console.error('Error:', error);
    }
}

// Connect to your submit button
document.getElementById('submitButton').addEventListener('click', sendToAirtable);


// Children code
const childrenContainer = document.getElementById('childrenContainer');
const addChildBtn = document.getElementById('addChild');

// Add new child input
addChildBtn.addEventListener('click', function() {
    const newEntry = document.createElement('div');
    newEntry.className = 'child-entry';
    newEntry.innerHTML = `
        <input type="text" 
               name="children[]" 
               placeholder="Enter child's name"
               class="child-input">
        <button type="button" class="remove-child">Remove</button>
    `;
    childrenContainer.appendChild(newEntry);
});

// Remove child input (using event delegation)
childrenContainer.addEventListener('click', function(e) {
    if (e.target.classList.contains('remove-child')) {
        // Only remove if there's more than one entry
        if (childrenContainer.children.length > 1) {
            e.target.parentElement.remove();
        } else {
            alert('You must have at least one child entry');
        }
    }
});

// When you need to get all children values:
function getAllChildren() {
    const childInputs = document.querySelectorAll('.child-input');
    const children = [];
    childInputs.forEach(input => {
        if (input.value.trim() !== '') {
            children.push(input.value);
        }
    });
    return children;
}

function formatArray(data) {
    let newData = "";

    for (let i = 0; i < data.length; i++) {
        newData += data[i] + "\n";
    }

    return newData;
}