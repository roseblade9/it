function goHome() {
    window.location.href = "index.html";
}

let orders = JSON.parse(localStorage.getItem('orders')) || [
    { id: 1, orderNumber: '01', cardNumber: '1234', amount: 1200, customerName: 'Кириешки', status: 'В обработке', comment: 'деду' },
    { id: 2, orderNumber: '02', cardNumber: '5674', amount: 150, customerName: 'Ножик', status: 'В обработке', comment: 'хз' },
    { id: 3, orderNumber: '03', cardNumber: '4892', amount: 250, customerName: 'Опорник плента', status: 'В обработке', comment: 'на Б' },
];
let deletedOrders = JSON.parse(localStorage.getItem('deletedOrders')) || [];
let originalOrders = orders.slice();

function addNewOrder() {
    const orderNumber = prompt('Введите номер заказа:');
    const cardNumber = prompt('Введите номер карты:');
    const amount = parseFloat(prompt('Введите сумму:'));
    const customerName = prompt('Введите имя клиента:');
    const status = 'В обработке';
    const comment = prompt('Введите комментарий:');
    if (!orderNumber || !cardNumber || isNaN(amount) || !customerName || !comment) {
        alert('Пожалуйста, заполните все поля корректно.');
        return;
    }
    const newOrderId = orders.length > 0 ? Math.max(...orders.map(order => order.id)) + 1 : 1;
    const newOrder = {
        id: newOrderId,
        cardNumber: cardNumber,
        orderNumber: orderNumber,
        amount: amount,
        customerName: customerName,
        status: status,
        comment: comment,
    };
    orders.push(newOrder);
    saveOrders(); // Save the changes to localStorage
    renderOrders();
}

function deleteOrder(orderId) {
    const confirmed = confirm('Вы уверены, что хотите удалить этот заказ?');
    if (confirmed) {
        const orderIndex = orders.findIndex(order => order.id === orderId);

        if (orderIndex !== -1) {
            const deletedOrder = orders.splice(orderIndex, 1)[0];
            deletedOrders.push(deletedOrder);
            saveOrders(); // Save the changes to localStorage
            saveDeletedOrders(); // Save the changes to deletedOrders in localStorage

            // Check if the deleted order is in the filtered orders
            const filteredOrderIndex = filteredOrders.findIndex(order => order.id === orderId);
            if (filteredOrderIndex !== -1) {
                filteredOrders.splice(filteredOrderIndex, 1);
            }

            renderOrders();
            renderFilteredOrders(filteredOrders);
        } else {
            alert('Не удалось найти заказ с указанным ID.');
        }
    }
}

function saveOrders() {
    localStorage.setItem('orders', JSON.stringify(orders));
}

function saveDeletedOrders() {
    localStorage.setItem('deletedOrders', JSON.stringify(deletedOrders));
}

let filteredOrders = [];

function searchOrders() {
    const searchInput = prompt('Введите критерий поиска:');

    if (!searchInput) {
        alert('Пожалуйста, введите критерий поиска.');
        return;
    }

    filteredOrders = orders.filter(order => {
        return (
            order.cardNumber.includes(searchInput) ||
            order.orderNumber.includes(searchInput) ||
            order.customerName.includes(searchInput) ||
            order.comment.includes(searchInput)
        );
    });

    if (filteredOrders.length === 0) {
        alert('Нет результатов для введенного критерия поиска.');
        return;
    }

    renderFilteredOrders();

    const backButton = document.createElement('button');
    backButton.textContent = 'Назад к заказам';
    backButton.onclick = function () {
        filteredOrders = [];
        renderOrders();
        document.getElementById('back-button-container').removeChild(backButton);
    };

    const backButtonContainer = document.getElementById('back-button-container');
    backButtonContainer.innerHTML = '';
    backButtonContainer.appendChild(backButton);
}

function editOrder(orderId) {
    const orderIndex = orders.findIndex(order => order.id === orderId);

    if (orderIndex !== -1) {
        const orderToUpdate = orders[orderIndex];

        const updatedOrderNumber = prompt(`Текущий номер заказа: ${orderToUpdate.orderNumber}\nВведите новый номер заказа:`) || orderToUpdate.orderNumber;
        const updatedCardNumber = prompt(`Текущий номер карты: ${orderToUpdate.cardNumber}\nВведите новый номер карты:`) || orderToUpdate.cardNumber;
        const updatedAmount = parseFloat(prompt(`Текущая сумма: ${orderToUpdate.amount}\nВведите новую сумму:`)) || orderToUpdate.amount;
        const updatedCustomerName = prompt(`Текущее имя клиента: ${orderToUpdate.customerName}\nВведите новое имя клиента:`) || orderToUpdate.customerName;
        const updatedComment = prompt(`Текущий комментарий: ${orderToUpdate.comment}\nВведите новый комментарий:`) || orderToUpdate.comment;

        const updatedOrder = {
            ...orderToUpdate,
            orderNumber: updatedOrderNumber,
            cardNumber: updatedCardNumber,
            amount: updatedAmount,
            customerName: updatedCustomerName,
            comment: updatedComment,
        };

        orders[orderIndex] = updatedOrder;

        // Update the order in the filteredOrders array if it exists
        const filteredOrderIndex = filteredOrders.findIndex(order => order.id === orderId);
        if (filteredOrderIndex !== -1) {
            filteredOrders[filteredOrderIndex] = updatedOrder;
        }

        renderOrders();
        saveOrders();
        
    } else {
        alert('Не удалось найти заказ с указанным ID.');
    }
}

function closeOrder(orderId) {
    const orderIndex = orders.findIndex(order => order.id === orderId);

    if (orderIndex !== -1) {
        orders[orderIndex].status = 'Выполненный';
        renderOrders();
       
    } else {
        alert('Не удалось найти заказ с указанным ID.');
    }
}

function renderFilteredOrders() {
    const ordersTableBody = document.getElementById('orders-table-body');
    ordersTableBody.innerHTML = '';
    filteredOrders.forEach(order => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${order.orderNumber}</td>
            <td>${order.cardNumber}</td>
            <td>${order.amount}</td>
            <td>${order.customerName}</td>
            <td>${order.status}</td>
            <td>${order.comment}</td>
            <td>
                
                <button onclick="deleteOrder(${order.id})">Удалить</button>
                <button onclick="closeOrder(${order.id})">Закрыть</button>
                <button onclick="editOrder(${order.id})">Изменить</button>
            </td>
        `;
        ordersTableBody.appendChild(row);
    });
}

function clearDeletedOrdersHistory() {
    if (deletedOrders.length > 0) {
        const confirmed = confirm('Вы уверены, что хотите очистить историю удаленных заказов?');
        if (confirmed) {
            deletedOrders = [];
            saveDeletedOrders(); // Save the changes to localStorage
            renderDeletedOrders();
        }
    } else {
        alert('История удаленных заказов уже пуста.');
    }
}

function toggleDeletedOrdersVisibility() {
    const deletedOrdersContainer = document.getElementById('deleted-orders-container');
    if (deletedOrdersContainer.style.display === 'none') {
        renderDeletedOrders();
        deletedOrdersContainer.style.display = 'block';
    } else {
        deletedOrdersContainer.style.display = 'none';
    }
}

function renderDeletedOrders() {
    const deletedOrdersTableBody = document.getElementById('deleted-orders-table-body');
    deletedOrdersTableBody.innerHTML = '';

    deletedOrders.forEach(order => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${order.orderNumber}</td>
            <td>${order.cardNumber}</td>
            <td>${order.amount}</td>
            <td>${order.customerName}</td>
            <td>${order.status}</td>
            <td>${order.comment}</td>
            <td>
                <button onclick="restoreOrder(${order.id})">Восстановить</button>
                <button onclick="clearSingleDeletedOrder(${order.id})">Удалить из истории</button>
            </td>
        `;
        deletedOrdersTableBody.appendChild(row);
    });
}

function restoreOrder(orderId) {
    const confirmed = confirm('Вы уверены, что хотите восстановить этот заказ?');
    if (confirmed) {
        const orderIndex = deletedOrders.findIndex(order => order.id === orderId);

        if (orderIndex !== -1) {
            const restoredOrder = deletedOrders.splice(orderIndex, 1)[0];
            orders.push(restoredOrder);

            // Save the changes to localStorage
            saveOrders();
            saveDeletedOrders();

            renderOrders();
            renderDeletedOrders();
        } else {
            alert('Не удалось найти удалённый заказ с указанным ID.');
        }
    }
}

function clearSingleDeletedOrder(orderId) {
    const confirmed = confirm('Вы уверены, что хотите удалить этот заказ из истории?');
    if (confirmed) {
        const orderIndex = deletedOrders.findIndex(order => order.id === orderId);

        if (orderIndex !== -1) {
            deletedOrders.splice(orderIndex, 1);
            renderDeletedOrders();
        } else {
            alert('Не удалось найти заказ в истории с указанным ID.');
        }
    }
}

function renderOrders() {
    const ordersTableBody = document.getElementById('orders-table-body');
    ordersTableBody.innerHTML = '';
    orders.forEach(order => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${order.orderNumber}</td>
            <td>${order.cardNumber}</td>
            <td>${order.amount}</td>
            <td>${order.customerName}</td>
            <td>${order.status}</td>
            <td>${order.comment}</td>
       
            <td>
                
                <button onclick="deleteOrder(${order.id})">Удалить</button>
                <button onclick="closeOrder(${order.id})">Закрыть</button>
                <button onclick="editOrder(${order.id})">Изменить</button>
            </td>
      
        `;
        ordersTableBody.appendChild(row);
    });
    
}

renderOrders();
