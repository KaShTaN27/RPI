const nameRegExp = /^[a-z]+$/i;
const emailRegExp = /^\w[\w-.]*@[\w-]+\.[a-z]{2,5}$/i;
const phoneRegExp = /^[+]375(29|44|33|25|23|17)[0-9]{7}$/;

function validateInputs() {
    document.getElementById('edit1')
        .addEventListener('input', checkValidity);

    document.getElementById('edit2')
        .addEventListener('input', checkValidity);

    document.getElementById('edit3')
        .addEventListener('input', checkValidity);
}

function checkValidity() {
    let submitButton = document.getElementById('test_button');
    let name = document.getElementById('edit1').value;
    let email = document.getElementById('edit2').value;
    let phone = document.getElementById('edit3').value;

    submitButton.disabled = !nameRegExp.test(name) ||
                            !emailRegExp.test(email) ||
                            !phoneRegExp.test(phone);
}

validateInputs();

function showAlert() {
    let alert = document.getElementById('alert');
    alert.style.display = 'block';
    setTimeout(function (){
            document.getElementById('alert').style.display = 'none';
    }, 5000);
    document.getElementById('edit1').value = '';
    document.getElementById('edit2').value = '';
    document.getElementById('edit3').value = '';
    checkValidity();
}

document.getElementById('test_button')
    .addEventListener('click', showAlert);