// index.js

function submitLoginForm() {
    const username = document.querySelector('input[name="username"]').value;
    const password = document.querySelector('input[name="password"]').value;

    console.log('Submitting login form:', { username, password });

    $.ajax({
        type: 'POST',
        url: '/api/login',
        data: { username, password },
        success: function (response) {
            console.log('Login response:', response);

            if (response.success) {
                window.location.href = '/dashboard';
            } else {
                alert('Wrong Credentials');
            }
        },
        error: function (error) {
            console.error('Ajax request failed', error);
            alert('Error occurred. Please try again later.');
        }
    });
}
