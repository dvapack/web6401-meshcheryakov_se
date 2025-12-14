class UserAuth {
    constructor(login, password, agreement) {
        this.login = login;
        this.password = password;
        this.agreement = agreement;
    }

    formatOutput() {
        return `User Login: ${this.login}\nPassword: ${'*'.repeat(this.password.length)}\nAgreement: ${this.agreement ? 'Yes' : 'No'}`;
    }
}

// Validation functions
function validateLogin(login) {
    if (login.length < 3) {
        return 'Login must be at least 3 characters long.';
    }
    return '';
}

function validatePassword(password) {
    if (password.length < 6) {
        return 'Password must be at least 6 characters long.';
    }
    return '';
}

function validateAgreement(agreement) {
    if (!agreement) {
        return 'You must agree to the processing of personal data.';
    }
    return '';
}

// Show hint
function showHint(element, message) {
    let hint = element.parentElement.querySelector('.hint');
    if (!hint) {
        hint = document.createElement('div');
        hint.className = 'hint';
        hint.style.color = 'red';
        hint.style.fontSize = '0.8em';
        element.parentElement.appendChild(hint);
    }
    hint.textContent = message;
}

// Clear hint
function clearHint(element) {
    const hint = element.parentElement.querySelector('.hint');
    if (hint) {
        hint.textContent = '';
    }
}

// Event listeners for validation
document.getElementById('login').addEventListener('input', function() {
    const error = validateLogin(this.value);
    if (error) {
        showHint(this, error);
    } else {
        clearHint(this);
    }
});

document.getElementById('password').addEventListener('input', function() {
    const error = validatePassword(this.value);
    if (error) {
        showHint(this, error);
    } else {
        clearHint(this);
    }
});

document.getElementById('agreement').addEventListener('change', function() {
    const error = validateAgreement(this.checked);
    if (error) {
        showHint(this, error);
    } else {
        clearHint(this);
    }
});

document.getElementById('auth-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const login = document.getElementById('login').value;
    const password = document.getElementById('password').value;
    const agreement = document.getElementById('agreement').checked;

    // Validate all
    const loginError = validateLogin(login);
    const passwordError = validatePassword(password);
    const agreementError = validateAgreement(agreement);

    if (loginError || passwordError || agreementError) {
        alert('Please fix the errors before submitting.');
        return;
    }

    const user = new UserAuth(login, password, agreement);

    // Send POST request
    try {
        const response = await fetch('http://localhost:3000/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ login, password, agreement })
        });

        if (response.ok) {
            console.log(user.formatOutput());
            alert('Data submitted successfully!');
        } else {
            alert('Failed to submit data.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error submitting data.');
    }
});