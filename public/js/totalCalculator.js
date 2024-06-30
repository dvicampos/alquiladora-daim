// document.addEventListener('DOMContentLoaded', function() {
//     const productosInput = document.getElementById('productosInput');
//     if (!productosInput) {
//         console.error('No se encuentra el elemento con id "productosInput"');
//         return;
//     }

//     const checkboxes = document.querySelectorAll('.producto');
//     const cantidades = document.querySelectorAll('.cantidad');
//     const totalElement = document.getElementById('total');
//     let total = 0;

//     checkboxes.forEach((checkbox, index) => {
//         checkbox.addEventListener('change', function() {
//             if (this.checked) {
//                 cantidades[index].disabled = false;
//                 const precio = parseFloat(this.dataset.precio);
//                 const cantidad = parseInt(cantidades[index].value);
//                 total += precio * cantidad;
//             } else {
//                 cantidades[index].disabled = true;
//                 const precio = parseFloat(this.dataset.precio);
//                 const cantidad = parseInt(cantidades[index].value);
//                 total -= precio * cantidad;
//             }
//             totalElement.innerText = total.toFixed(2);
//             actualizarTotal();
//             updateProductosInput();
//         });

//         cantidades[index].addEventListener('input', function() {
//             if (checkboxes[index].checked) {
//                 const precio = parseFloat(checkboxes[index].dataset.precio);
//                 const cantidad = parseInt(this.value);
//                 total -= precio * (parseInt(this.dataset.previousValue) || 1); // Restar el precio anterior
//                 total += precio * cantidad;
//                 totalElement.innerText = total.toFixed(2);

//                 this.dataset.previousValue = cantidad;

//                 updateProductosInput();
//             }
//         });
//     });

//     function updateProductosInput() {
//         const productos = [];
//         checkboxes.forEach((checkbox, index) => {
//             if (checkbox.checked) {
//                 productos.push({
//                     tipo: checkbox.value,
//                     precio: parseFloat(checkbox.dataset.precio),
//                     cantidad: parseInt(cantidades[index].value)
//                 });
//             }
//         });
//         productosInput.value = JSON.stringify(productos);
//     }
//     document.querySelectorAll('.cantidad').forEach(input => {
//         input.addEventListener('input', actualizarTotal);
//     });

//     function actualizarTotal() {
//         let total = 0;
//         checkboxes.forEach(checkbox => {
//             if (checkbox.checked) {
//                 const cantidadInput = document.getElementById(`cantidad-${checkbox.id.split('-')[0]}-${checkbox.id.split('-')[1]}`);
//                 total += checkbox.dataset.precio * cantidadInput.value;
//             }
//         });
//         totalElement.textContent = total.toFixed(2);
//     }
// });

document.addEventListener('DOMContentLoaded', function() {
    const productosInput = document.getElementById('productosInput');
    if (!productosInput) {
        console.error('No se encuentra el elemento con id "productosInput"');
        return;
    }

    const checkboxes = document.querySelectorAll('.producto');
    const cantidades = document.querySelectorAll('.cantidad');
    const totalElement = document.getElementById('total');
    let total = 0;

    checkboxes.forEach((checkbox, index) => {
        checkbox.addEventListener('change', function() {
            if (this.checked) {
                cantidades[index].disabled = false;
                const precio = parseFloat(this.dataset.precio);
                const cantidad = parseInt(cantidades[index].value);
                total += precio * cantidad;
            } else {
                cantidades[index].disabled = true;
                const precio = parseFloat(this.dataset.precio);
                const cantidad = parseInt(cantidades[index].value);
                total -= precio * cantidad;
            }
            totalElement.innerText = total.toFixed(2);
            actualizarTotal()
            updateProductosInput();
        });

        cantidades[index].addEventListener('input', function() {
            if (checkboxes[index].checked) {
                const precio = parseFloat(checkboxes[index].dataset.precio);
                const cantidad = parseInt(this.value);
                total -= precio * (parseInt(this.dataset.previousValue) || 1); // Restar el precio anterior
                total += precio * cantidad;
                totalElement.innerText = total.toFixed(2);

                this.dataset.previousValue = cantidad;

                updateProductosInput();
            }
        });
    });

    function updateProductosInput() {
        const productos = [];
        checkboxes.forEach((checkbox, index) => {
            if (checkbox.checked) {
                productos.push({
                    tipo: checkbox.value,
                    categoria: checkbox.dataset.categoria,
                    // categoria: "cat",
                    precio: parseFloat(checkbox.dataset.precio),
                    cantidad: parseInt(cantidades[index].value)
                });
            }
        });
        productosInput.value = JSON.stringify(productos);
    }

    document.querySelectorAll('.cantidad').forEach(input => {
        input.addEventListener('input', actualizarTotal);
    });

    function actualizarTotal() {
        let total = 0;
        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                const cantidadInput = document.getElementById(`cantidad-${checkbox.id.split('-')[0]}-${checkbox.id.split('-')[1]}`);
                total += checkbox.dataset.precio * cantidadInput.value;
            }
        });
        totalElement.textContent = total.toFixed(2);
    }
});
