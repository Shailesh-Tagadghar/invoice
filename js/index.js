document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.add-row').addEventListener('click', function() {
        const newRow = `<tr>
                            <td><input type="text" name="sr_no[]" class="sr-no"></td>
                            <td><input type="text" name="product_desc[]" class="product-desc"></td>
                            <td><input type="number" name="quantity[]" class="quantity"></td>
                            <td><input type="number" name="price[]" class="price"></td>
                            <td><input type="number" name="total[]" class="total" readonly></td>
                            <td><span class="add-row">+</span></td>
                        </tr>`;
        document.querySelector('#invoice-table tbody').insertAdjacentHTML('beforeend', newRow);
    });

    document.querySelector('#invoice-table').addEventListener('input', function(event) {
        if (event.target.classList.contains('quantity') || event.target.classList.contains('price')) {
            updateTotal();
        }
    });
});

function updateTotal() {
    const rows = document.querySelectorAll('#invoice-table tbody tr');
    rows.forEach(row => {
        const quantity = parseFloat(row.querySelector('.quantity').value) || 0;
        const price = parseFloat(row.querySelector('.price').value) || 0;
        const total = quantity * price;
        row.querySelector('.total').value = total.toFixed(2);
    });
}

function downloadPDF() {
    document.querySelectorAll('.hide-pdf').forEach(btn => {
        btn.style.display = 'none';
    });

    const element = document.body;
    const options = {
        margin: 0.5,
        filename: 'invoice.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    html2pdf().from(element).set(options).save();
    
    document.querySelectorAll('.hide-pdf').forEach(btn => {
        btn.style.display = 'block';
    });
}

function printInvoice() {
    document.querySelectorAll('.hide-print').forEach(btn => {
        btn.style.display = 'none';
    });

    window.print();
    
    document.querySelectorAll('.hide-print').forEach(btn => {
        btn.style.display = 'block';
    });
}

function downloadExcel() {
    const rows = document.querySelectorAll('#invoice-table tbody tr');
    let csvContent = "data:text/csv;charset=utf-8,Sr No,Product Desc,Quantity,Price,Total\n";
    rows.forEach(row => {
        const srNo = row.querySelector('.sr-no').value;
        const productDesc = row.querySelector('.product-desc').value;
        const quantity = row.querySelector('.quantity').value;
        const price = row.querySelector('.price').value;
        const total = row.querySelector('.total').value;
        const rowData = [srNo, productDesc, quantity, price, total].join(",");
        csvContent += rowData + "\n";
    });
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "invoice.csv");
    document.body.appendChild(link);
    link.click();
}
