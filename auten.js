

let notificationCount = 0;

function showAlertWarning(message) {
    
    let alertElement = document.createElement("div");
    alertElement.classList.add("error-message", "position-fixed", "end-12", "m-0", "text-center");
    alertElement.textContent = message;

    
    let alertContainer = document.createElement("div");
    alertContainer.classList.add("alert-container");
    alertContainer.appendChild(alertElement);

    let passwordInput = document.querySelector("#password");
    passwordInput.parentNode.insertBefore(alertContainer, passwordInput.nextSibling);

    
    setTimeout(function () {
        alertContainer.remove();
    }, 2000);
}

document.getElementById("login-button").addEventListener("click", function () {
    const username = document.querySelector("#username").value;
    const password = document.querySelector("#password").value;

    if (username.trim() === "" && password.trim() === "") {
        showAlertWarning("Введите логин и пароль");
    } else if (username.trim() === "") {
        showAlertWarning("Введите логин");
    } else if (password.trim() === "") {
        showAlertWarning("Введите пароль");
    } else {
        const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers")) || [];
        const userExists = registeredUsers.some(user => user.username === username && user.password === password);

        if (userExists) {
            alert("Данный пользователь уже существует");
        } else {
            registeredUsers.push({ username, password });
            localStorage.setItem("registeredUsers", JSON.stringify(registeredUsers));
            localStorage.setItem("loggedIn", "true");
            localStorage.setItem("username", username);
            window.location.href = "registred.html";
        }
    }
});

document.getElementById('useful_btn').addEventListener('click', function(){localStorage.clear();});

