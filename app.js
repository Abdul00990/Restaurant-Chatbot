document.addEventListener("DOMContentLoaded", () => {
    const chatBox = document.getElementById("chat-box");
    const userInput = document.getElementById("user-input");
    const sendBtn = document.getElementById("send-btn");

    const session = {
        currentOrder: [],
        orderHistory: []
    };

    const botOptions = `
        Select an option:
        1. Place an order
        99. Checkout order
        98. See order history
        97. See current order
        0. Cancel order
    `;

    const menuItems = [
        { id: 1, name: "Pizza", price: 10 },
        { id: 2, name: "Burger", price: 8 },
        { id: 3, name: "Pasta", price: 12 },
        { id: 4, name: "Salad", price: 7 }
    ];

    function appendMessage(content, type) {
        const message = document.createElement("div");
        message.className = `message ${type}-message`;
        message.innerText = content;
        chatBox.appendChild(message);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    function handleUserInput(input) {
        switch(input) {
            case "1":
                const menu = menuItems.map(item => `${item.id}. ${item.name} - $${item.price}`).join("\n");
                appendMessage(`Menu:\n${menu}\n\nSelect item number to add to order.`, "bot");
                break;
            case "99":
                if (session.currentOrder.length > 0) {
                    session.orderHistory.push(session.currentOrder);
                    session.currentOrder = [];
                    appendMessage("Order placed successfully!", "bot");
                } else {
                    appendMessage("No order to place.", "bot");
                }
                break;
            case "98":
                if (session.orderHistory.length > 0) {
                    const history = session.orderHistory.map((order, index) => `Order ${index + 1}: ${order.map(item => item.name).join(", ")}`).join("\n");
                    appendMessage(`Order history:\n${history}`, "bot");
                } else {
                    appendMessage("No order history.", "bot");
                }
                break;
            case "97":
                if (session.currentOrder.length > 0) {
                    const currentOrder = session.currentOrder.map(item => item.name).join(", ");
                    appendMessage(`Current order: ${currentOrder}`, "bot");
                } else {
                    appendMessage("No current order.", "bot");
                }
                break;
            case "0":
                if (session.currentOrder.length > 0) {
                    session.currentOrder = [];
                    appendMessage("Order canceled.", "bot");
                } else {
                    appendMessage("No order to cancel.", "bot");
                }
                break;
            default:
                const item = menuItems.find(i => i.id === parseInt(input));
                if (item) {
                    session.currentOrder.push(item);
                    appendMessage(`${item.name} added to order.`, "bot");
                } else {
                    appendMessage("Invalid option. Please try again.", "bot");
                }
        }
    }

    appendMessage(botOptions, "bot");

    sendBtn.addEventListener("click", () => {
        const userMessage = userInput.value.trim();
        if (userMessage) {
            appendMessage(userMessage, "user");
            handleUserInput(userMessage);
            userInput.value = "";
        }
    });

    userInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            sendBtn.click();
        }
    });
});
