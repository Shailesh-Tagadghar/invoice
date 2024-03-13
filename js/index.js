// function getTotal() {
//     var price = document.getElementById('item_price').value;
//     var qty = document.getElementById('item_qty').value;
//     var tot = price*qty;
//     document.getElementById('total').value = tot; 
//     document.getElementById('subtotal').value = tot; 
//     calculateTax()
// }

// function calculateTax(){
//     var amt = document.getElementById('subtotal').value;
//     var tax = document.getElementById('tax').value;
//     var taxAmount = (tax * amt) / 100;
//     var net = Number(amt) + Number(taxAmount);
//     document.getElementById('taxtt1').value = taxAmount;
//     document.getElementById('Nettotal').value = net;
// }

// function addRow() {
//     var table = document.getElementById("invoiceTable");
//     var row = table.insertRow(table.rows.length - 1); // Insert before the last row (before the totals row)
//     var cell1 = row.insertCell(0);
//     var cell2 = row.insertCell(1);
//     var cell3 = row.insertCell(2);
//     var cell4 = row.insertCell(3);
//     var cell5 = row.insertCell(4);
//     var cell6 = row.insertCell(5);

//     cell1.innerHTML = '<button onclick="removeRow(this)" class="btn btn-danger">-</button>';
//     cell2.innerHTML = '<input type="number" value="' + (table.rows.length - 2) + '" class="form-control" readonly>';
//     cell3.innerHTML = '<input type="text" class="form-control">';
//     cell4.innerHTML = '<input type="number" class="form-control" onkeyup="getTotal()">';
//     cell5.innerHTML = '<input type="number" value="1" class="form-control" onkeyup="getTotal()">';
//     cell6.innerHTML = '<input type="text" class="form-control" readonly>';
// }

// function removeRow(btn) {
//     var row = btn.parentNode.parentNode;
//     row.parentNode.removeChild(row);
//     updateItemNumbers();
// }

// function updateItemNumbers() {
//     var table = document.getElementById("invoiceTable");
//     for (var i = 1; i < table.rows.length - 1; i++) {
//         table.rows[i].cells[1].querySelector("input").value = i;
//     }
// }



function getTotal() {
    var table = document.getElementById('invoiceTable');
    var rows = table.getElementsByTagName('tr');
    
    for (var i = 1; i < rows.length - 1; i++) {
        var price = rows[i].querySelector('.item_price').value;
        var qty = rows[i].querySelector('.item_qty').value;
        var tot = price * qty;
        rows[i].querySelector('.total').value = tot;
    }
    
    calculateSubtotal();
}

function calculateSubtotal() {
    var table = document.getElementById('invoiceTable');
    var rows = table.getElementsByTagName('tr');
    var subtotal = 0;
    
    for (var i = 1; i < rows.length - 1; i++) {
        subtotal += parseFloat(rows[i].querySelector('.total').value);
    }
    
    document.getElementById('subtotal').value = subtotal;
    calculateTax();
}

function calculateTax() {
    var subtotal = parseFloat(document.getElementById('subtotal').value);
    var tax = parseFloat(document.getElementById('tax').value);
    var taxAmount = (tax * subtotal) / 100;
    var netTotal = subtotal + taxAmount;
    
    document.getElementById('taxtt1').value = taxAmount;
    document.getElementById('Nettotal').value = netTotal;
}

function addRow() {
    var table = document.getElementById("invoiceTable");
    var row = table.insertRow(table.rows.length - 1); // Insert before the last row (before the totals row)
    
    row.innerHTML = `
        <td><button onclick="removeRow(this)" class="btn btn-danger">-</button></td>
        <td><input type="number" value="${table.rows.length - 2}" class="form-control item_no" readonly></td>
        <td><input type="text" class="form-control item_name"></td>
        <td><input type="number" class="form-control item_price" onkeyup="getTotal()"></td>
        <td><input type="number" value="1" class="form-control item_qty" onkeyup="getTotal()"></td>
        <td><input type="text" class="form-control total" readonly></td>
    `;
}

function removeRow(btn) {
    var row = btn.parentNode.parentNode;
    row.parentNode.removeChild(row);
    calculateSubtotal();
}

function saveAndOpen() {
    var customerName = document.getElementById('customerName').value;
    var customerMobile = document.getElementById('customerMobile').value;
    var customerEmail = document.getElementById('customerEmail').value;
    var customerAddress = document.getElementById('customerAddress').value;

    var queryParams = `?customerName=${encodeURIComponent(customerName)}&customerMobile=${encodeURIComponent(customerMobile)}&customerEmail=${encodeURIComponent(customerEmail)}&customerAddress=${encodeURIComponent(customerAddress)}`;
    var newWindow = window.open(`invoice.html${queryParams}`);
}

// function downloadPDF() {
//     const doc = new jsPDF();
//     const htmlContent = document.querySelector('.container').innerHTML;
//     doc.html(htmlContent, {
//         callback: function (doc) {
//             doc.save("invoice.pdf");
//         }
//     });
// }

// function downloadExcel() {
//     const table = document.getElementById('productDetailsTable');
//     const ws = XLSX.utils.table_to_sheet(table);
//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, 'Invoice');
//     XLSX.writeFile(wb, 'invoice.xlsx');
// }
