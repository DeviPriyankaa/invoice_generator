document.addEventListener("DOMContentLoaded", loadInvoices);

function loadInvoices() {
    let invoices = JSON.parse(localStorage.getItem("invoices")) || [];
    let invoiceList = document.getElementById("invoice-list");

    invoices.forEach((invoice, index) => {
        let row = document.createElement("tr");
        row.innerHTML = `
            <td>${invoice.number}</td>
            <td>${invoice.client}</td>
            <td>${invoice.total}</td>
            <td><button class="btn btn-danger" onclick="deleteInvoice(${index})">Delete</button></td>
        `;
        invoiceList.appendChild(row);
    });
}

function deleteInvoice(index) {
    let invoices = JSON.parse(localStorage.getItem("invoices")) || [];
    invoices.splice(index, 1);
    localStorage.setItem("invoices", JSON.stringify(invoices));
    location.reload();
}
