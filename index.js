document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("foodDeliveryForm");
    const foodItemsSelect = document.getElementById("foodItems");
    const summaryName = document.getElementById("summaryName");
    const summaryAddress = document.getElementById("summaryAddress");
    const summaryPhoneNumber = document.getElementById("summaryPhoneNumber");
    const summaryEmail = document.getElementById("summaryEmail");
    const summaryDeliveryDate = document.getElementById("summaryDeliveryDate");
    const summaryDeliveryTime = document.getElementById("summaryDeliveryTime");
    const summaryFoodItems = document.getElementById("summaryFoodItems");
    const summaryTotalPrice = document.getElementById("summaryTotalPrice");
    const orderSummary = document.getElementById("orderSummary");

    form.addEventListener("submit", function (event) {
        event.preventDefault();


        if (!validateForm()) {
            return;
        }

        const selectedFoodItems = Array.from(foodItemsSelect.selectedOptions, option => option);

        if (selectedFoodItems.length === 0) {
            alert("Please select at least one food item.");
            return;
        }
        let total = 0;
        selectedFoodItems.forEach(option => {
            const price = parseFloat(option.getAttribute("data-price"));
            total += price;
        });

        summaryName.textContent = form.elements.name.value;
        summaryAddress.textContent = form.elements.address.value;
        summaryPhoneNumber.textContent = form.elements.phoneNumber.value;
        summaryEmail.textContent = form.elements.email.value;
        summaryDeliveryDate.textContent = form.elements.deliveryDate.value;
        summaryDeliveryTime.textContent = form.elements.deliveryTime.value;
        summaryFoodItems.textContent = selectedFoodItems.map(option => option.textContent).join(", ");
        summaryTotalPrice.textContent = `₹${total.toFixed(2)}`;


        orderSummary.style.display = "block";
    });

    function validateForm() {
        // Name validation
        const nameInput = form.elements.name;
        const namePattern = /^[A-Za-z\s]+$/; 

        if (!namePattern.test(nameInput.value.trim())) {
            alert("Name should contain only alphabetic characters.");
            nameInput.focus();
            return false;
        }

        // Address validation
        const addressInput = form.elements.address;
        if (addressInput.value.trim() === "") {
            alert("Address is required.");
            addressInput.focus();
            return false;
        }

        // Phone number validation
        const phoneNumberInput = form.elements.phoneNumber;
        const phoneNumberPattern = /^[0-9]{10}$/;
        if (!phoneNumberPattern.test(phoneNumberInput.value)) {
            alert("Please enter a valid 10-digit phone number.");
            phoneNumberInput.focus();
            return false;
        }

        // Email validation
        const emailInput = form.elements.email;
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(emailInput.value)) {
            alert("Please enter a valid email address.");
            emailInput.focus();
            return false;
        }

        // Delivery date validation
        const deliveryDateInput = form.elements.deliveryDate;
        const today = new Date();
        const selectedDate = new Date(deliveryDateInput.value);
        if (selectedDate < today) {
            alert("Please select a future delivery date.");
            deliveryDateInput.focus();
            return false;
        }
        return true;
    }
});
