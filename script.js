document.getElementById('hw1').addEventListener('click', function() 
{document.getElementById('arrow1').classList.toggle('rotated');
});

document.addEventListener('DOMContentLoaded', function() {
    var countElement = document.getElementById('count0');
    var incrementButton = document.getElementById('increment');
    var decrementButton = document.getElementById('decrement');

    var count0 = 0;

    function updateCount() {
        countElement.textContent = count0;
    }

    incrementButton.addEventListener('click', function() {
        count0++;
        updateCount();
    });

    decrementButton.addEventListener('click', function() {
        count0--;
        updateCount();
    });

/*
    var hw1Header = document.getElementById("hw1_hd");
    hw1Header.addEventListener("click", function() {
        var alertElement = document.createElement("div");
        //alertElement.classList.add("alert", "alert-warning", "position-fixed", "top-0", "end-0", "m-4");
        alertElement.classList.add("alert", "alert-warning", "position-fixed", "top-0", "end-0", "m-4", "d-flex", "align-items-center", "justify-content-center", "text-center");
        // Добавляем иконку
        alertElement.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img" aria-label="Warning:">
                <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
            </svg>
            Первое дз не готово! 
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        `;

        alertElement.style.height = "40px";
        document.body.appendChild(alertElement);
        // Закрытие через 2 секунды
        setTimeout(function() {alertElement.remove();}, 2000);
    });
});

*/

    let notificationCount = 0;
    function showAlertWarning(message) {
        let alertElement = document.createElement("div");
        alertElement.classList.add("alert", "alert-warning", "position-fixed", "top-0", "end-0", "m-4", "d-flex", "align-items-center", "justify-content-center", "text-center");
        alertElement.dataset.notificationCount = notificationCount++;

        alertElement.innerHTML = `
            <div class="w-100">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img" aria-label="Warning:">
                    <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                </svg>
                ${message}
            </div>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        `;

        alertElement.style.height = "40px";

        document.body.appendChild(alertElement);

        setTimeout(function() {
            alertElement.remove();
        }, 2000);
    }

    function showAlertInfo(message) {
        var alertElement = document.createElement("div");
        alertElement.classList.add("alert", "alert-info", "position-fixed", "top-0", "end-0", "m-4", "d-flex", "align-items-center", "justify-content-center", "text-center");
        alertElement.dataset.notificationCount = notificationCount++;

        alertElement.innerHTML = `
            <div class="w-100">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img" aria-label="Warning:">
                    <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                </svg>
                ${message}
            </div>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        `;

        alertElement.style.height = "40px";

        document.body.appendChild(alertElement);

        setTimeout(function() {
            alertElement.remove();
        }, 2000);
    }

    var hw1Header = document.getElementById("hw1_hd");
    hw1Header.addEventListener("click", function() {
        showAlertWarning("Первая домашка не сделана");
    });

    var collapseHw1 = document.getElementById("collapse-1");
    collapseHw1.addEventListener("show.bs.collapse", function() {
        showAlertInfo("Зачем нажимать на меню?");
    });
});

var hw2Header = document.getElementById("hw2_hd");
  hw2Header.addEventListener("click", function() {
      showAlertWarning1();
  });

  var hw3Header = document.getElementById("hw3_hd");
  hw3Header.addEventListener("click", function() {
      showAlertWarning2();
  });

// Получите ссылку на кнопку Homework_2
const homework2Button = document.getElementById("hw2_hd");


homework2Button.addEventListener("click", function () {
    
    window.location.href = "auten.html";
//
});

const homework3Button = document.getElementById("hw3_hd");

homework3Button.addEventListener("click", function () {
    
    window.location.href = "scroll.html";
});
const homework4Button = document.getElementById("hw4_hd");

homework4Button.addEventListener("click", function () {
    
    window.location.href = "manager1.html";
});

// Добавьте логику для страницы авторизации и перенаправления на "Вы успешно авторизовались"
// Например, при успешной авторизации:
if (userSuccessfullyAuthenticated) {
    window.location.href = "registred.html"; // Перенаправьте на страницу с надписью "Вы успешно авторизовались"
}
//const homework2Button = document.getElementById("hw2_head");

// Добавляем обработчик событий при клике на Homework_2
homework2Button.addEventListener('click', function() {
// Проверяем, есть ли информация о пользователе в localStorage
const loggedIn = JSON.parse(localStorage.getItem("loggedIn"));

if (loggedIn) {
// Если пользователь авторизован, перенаправляем его на LOGIN1
window.location.href = "registred.html";
} else {
// Если пользователь не авторизован, перенаправляем его на LOGIN
window.location.href = "auten.html";
}
});





