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

document.getElementById('auth-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const login = document.getElementById('login').value;
    const password = document.getElementById('password').value;
    const agreement = document.getElementById('agreement').checked;

    const user = new UserAuth(login, password, agreement);

    console.log(user.formatOutput());

    alert('Data submitted! Check console for details.');
});