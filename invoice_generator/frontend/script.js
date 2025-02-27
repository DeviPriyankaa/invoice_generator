document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("invoice-number").value = generateInvoiceNumber();
});

function generateInvoiceNumber() {
    let invoices = JSON.parse(localStorage.getItem("invoices")) || [];
    return `INV-${invoices.length + 1}`;
}

function addItem() {
    let row = document.createElement("tr");
    row.innerHTML = `
        <td><input type="text" class="form-control item-name"></td>
        <td><input type="number" class="form-control item-qty" value="1" min="1" onchange="updateTotal()"></td>
        <td><input type="number" class="form-control item-price" value="0" min="0" onchange="updateTotal()"></td>
        <td><button class="btn btn-danger" onclick="removeItem(this)">Delete</button></td>
    `;
    document.getElementById("items").appendChild(row);
}

function removeItem(btn) {
    btn.parentElement.parentElement.remove();
    updateTotal();
}

function updateTotal() {
    let subtotal = 0;
    document.querySelectorAll(".item-qty").forEach((qty, i) => {
        let price = document.querySelectorAll(".item-price")[i].value;
        subtotal += qty.value * price;
    });

    let discount = document.getElementById("discount").value;
    let tax = document.getElementById("tax").value;
    let total = subtotal - (subtotal * discount / 100) + (subtotal * tax / 100);

    document.getElementById("subtotal").innerText = `$${subtotal.toFixed(2)}`;
    document.getElementById("total").innerText = `$${total.toFixed(2)}`;
}

function saveInvoice() {
    let invoice = {
        number: document.getElementById("invoice-number").value,
        staff: document.getElementById("staff").value,
        client: document.getElementById("client").value,
        total: document.getElementById("total").innerText
    };

    let invoices = JSON.parse(localStorage.getItem("invoices")) || [];
    invoices.push(invoice);
    localStorage.setItem("invoices", JSON.stringify(invoices));

    alert("Invoice Saved!");
    window.location.href = "dashboard.html";
}
