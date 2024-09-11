const Inflable = require('../models/Inflable');
const Lona = require('../models/Lona');
const Silla = require('../models/Silla');
const Mesa = require('../models/Mesa');
const Manteleria = require('../models/Manteleria');
const Venta = require('../models/Venta');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const pdf = require('html-pdf');

function generatePDFfromHTML(htmlContent, callback) {
  pdf.create(htmlContent).toBuffer((err, buffer) => {
    if (err) return callback(err);
    callback(null, buffer);
  });
}

// exports.generarPDF = async (req, res) => {
//     if (!req.session.user) {
//       return res.redirect('/login');
//     }
//     try {
//       const ventaId = req.params.id;
//       const venta = await Venta.findById(ventaId);
  
//       if (!venta) {
//         return res.status(404).send('Venta no encontrada');
//       }
      
//     const fecha = new Date(venta.fecha_entrega);
//     const dia = fecha.getDate();
//     const mes = fecha.getMonth() + 1;
//     const anio = fecha.getFullYear();

//     const fechaFormateada = `${dia}/${mes}/${anio}`; 
//       let productosHtml = venta.productos.map(producto => `
//         <tr>
//           <td>${fechaFormateada}</td>
//           <td>${producto.categoria}</td>
//           <td>${producto.tipo}</td>
//           <td>${producto.cantidad}</td>
//           <td>$${producto.precio.toFixed(2)}</td>
//           <td>$${(producto.precio * producto.cantidad).toFixed(2)}</td>
//         </tr>
//       `).join('');
  
//       const subtotal = venta.productos.reduce((total, producto) => total + (producto.precio * producto.cantidad), 0);
      
//       const htmlContent = `
//         <!DOCTYPE html>
//   <html lang="en">
//   <head>
//       <meta charset="UTF-8">
//       <meta name="viewport" content="width=device-width, initial-scale=1.0">
//       <title>Document</title>
//       <style>
//           body {
//               font-family: Arial, sans-serif;
//               margin: 0;
//               padding: 0;
//               background-color: #e0f2f7;
//           }
  
//           .container {
//               width: 95%;
//               margin: 0 auto;
//               padding: 20px;
//               background-color: #fff;
//               box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
//               border-radius: 5px;
//           }
  
//           h1, h2, h3, h4, h5, h6 {
//               color: #333;
//               margin-bottom: 10px;
//           }
  
//           table {
//               width: 100%;
//               border-collapse: collapse;
//               margin-top: 20px;
//           }
  
//           th, td {
//               padding: 10px;
//               border: 1px solid #ddd;
//               text-align: left;
//           }
  
//           th {
//               background-color: #f2f2f2;
//               font-weight: bold;
//           }
  
//           .total {
//               background-color: #f5f5f5;
//               font-weight: bold;
//           }
  
//           .nota {
//               background-color: #f5f5f5;
//               font-weight: bold;
//               text-align: center;
//           }
          
//           table {
//               width: 100%;
//               border-collapse: collapse;
//           }
//           th {
//               background-color: #1E90FF;
//               color: white;
//               padding: 10px;
//           }
//           td {
//               border: 1px solid #ddd;
//               padding: 8px;
//           }
//       </style>
  
//   </head>
//   <body>
//       <div class="container">
//           <h1>ALQUILADORA DAIM</h1>
  
//           <div class="info">
//           <table>
//               <tr>
//                   <th colspan="6">ALQUILADORA DAIM</th>
//               </tr>
  
//               <tr>
//                   <td>Dirección postal</td>
//                   <td>CALLE REFORMA #15</td>
//                   <td>Número de teléfono</td>
//                   <td>246 170 2872</td>
//                   <td>Correo electrónico</td>
//                   <td>ixtlapalejic@gmail.com</td>
//               </tr>
//               <tr>
//                   <td>Ciudad, estado, código</td>
//                   <td colspan="5">Tlaxcala, Tlax. 90180 Sn Cosme Atlamaxad Fax: Número de fax</td>
//               </tr>
//               <tr>
//                   <td>Sitio web</td>
//                   <td colspan="5"><a href="https://alquiladora-daim.onrender.com/login" target="_blank">https://alquiladora-daim.onrender.com/</a></td>
//               </tr>
//               <tr>
//                   <td>NOTA para</td>
//                   <td>${venta.nombre}</td>
//                   <td>Teléfono</td>
//                   <td>${venta.telefono}</td>
//                   <td>N.º de nota</td>
//                   <td>${venta.id}</td>
//               </tr>
//               <tr>
//                   <td>Dirección</td>
//                   <td colspan="5">${venta.domicilio}</td>
//               </tr>
//               <tr>
//                   <td>Fecha de la nota</td>
//                   <td colspan="5">${fechaFormateada}</td>
//               </tr>
//           </table>
              
//           </div>
          
//           <table>
//               <thead>
//                   <tr>
//                       <th>Fecha de Entrega</th>
//                       <th>Categoria</th>
//                       <th>Tipo</th>
//                       <th>Cant.</th>
//                       <th>Precio por unidad</th>
//                       <th>Precio</th>
//                   </tr>
//               </thead>
//               <tbody>
//                   ${productosHtml}
//               </tbody>
//               <tfoot>
//                   <tr>
//                       <td colspan="5" class="nota">Subtotal de la NOTA</td>
//                       <td class="nota">$${subtotal.toFixed(2)}</td>
//                   </tr>
//                   <tr>
//                       <td colspan="5" class="nota">Tipo impositivo</td>
//                       <td class="nota"></td>
//                   </tr>
//                   <tr>
//                       <td colspan="5" class="nota">Impuesto sobre las ventas</td>
//                       <td class="nota">$0.00</td>
//                   </tr>
//                   <tr>
//                       <td colspan="5" class="nota">Otros</td>
//                       <td class="nota"></td>
//                   </tr>
//                   <tr>
//                       <td colspan="5" class="nota">Depósito recibido</td>
//                       <td class="nota"></td>
//                   </tr>
//                   <tr>
//                       <td colspan="5" class="total">TOTAL</td>
//                       <td class="total">$${subtotal.toFixed(2)}</td>
//                   </tr>
//               </tfoot>
//           </table>
  
//           <p>Derechos reservados ALQUILADORA DAIM.</p>
//           <p>Total a pagar $${subtotal.toFixed(2)}</p>
//       </div>
//   </body>
//   </html>
//       `;
  
//       generatePDFfromHTML(htmlContent, (err, buffer) => {
//         if (err) {
//           return res.status(500).send(`Error al generar el PDF: ${err.message}`);
//         }
  
//         res.setHeader('Content-Disposition', `attachment;filename=venta_${venta.nombre}.pdf`);
//         res.setHeader('Content-Type', 'application/pdf');
//         res.send(buffer);
//       });
//     } catch (error) {
//       res.status(500).send(`Error al generar el PDF: ${error.message}`);
//     }
//   };
  

exports.generarPDF = async (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }

    try {
        const ventaId = req.params.id;
        const venta = await Venta.findById(ventaId);

        if (!venta) {
            return res.status(404).send('Venta no encontrada');
        }

        // Genera HTML
        const fechaFormateada = venta.fecha_entrega.toDateString();
        const productosHtml = venta.productos.map(producto => `
            <tr>
                <td>${venta.fecha_entrega.toDateString()}</td>
                <td>${producto.categoria}</td>
                <td>${producto.tipo}</td>
                <td>${producto.cantidad}</td>
                <td>${producto.precio.toFixed(2)}</td>
                <td>${(producto.precio * producto.cantidad).toFixed(2)}</td>
            </tr>
        `).join('');
        const subtotal = venta.productos.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);

        const html = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Venta ${venta.nombre}</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #e0f2f7; }
                .container { width: 95%; margin: 0 auto; padding: 20px; background-color: #fff; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); border-radius: 5px; }
                table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                th, td { padding: 10px; border: 1px solid #ddd; text-align: left; }
                th { background-color: #1E90FF; color: white; }
                .total { background-color: #f5f5f5; font-weight: bold; }
                .nota { background-color: #f5f5f5; font-weight: bold; text-align: center; }
                a { color: #1E90FF; text-decoration: none; }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>ALQUILADORA DAIM</h1>
                <div class="info">
                    <table>
                        <tr>
                            <th colspan="6">ALQUILADORA DAIM</th>
                        </tr>
                        <tr>
                            <td>Dirección postal</td>
                            <td>CALLE REFORMA #15</td>
                            <td>Número de teléfono</td>
                            <td>246 170 2872</td>
                            <td>Correo electrónico</td>
                            <td>ixtlapalejic@gmail.com</td>
                        </tr>
                        <tr>
                            <td>Ciudad, estado, código</td>
                            <td colspan="5">Tlaxcala, Tlax. 90180 Sn Cosme Atlamaxad Fax: Número de fax</td>
                        </tr>
                        <tr>
                            <td>Sitio web</td>
                            <td colspan="5"><a href="https://alquiladora-daim.onrender.com/login">https://alquiladora-daim.onrender.com/</a></td>
                        </tr>
                        <tr>
                            <td>NOTA para</td>
                            <td>${venta.nombre}</td>
                            <td>Teléfono</td>
                            <td>${venta.telefono}</td>
                            <td>N.º de nota</td>
                            <td>${ventaId}</td>
                        </tr>
                        <tr>
                            <td>Dirección</td>
                            <td colspan="5">${venta.domicilio}</td>
                        </tr>
                        <tr>
                            <td>Fecha de la nota</td>
                            <td colspan="5">${fechaFormateada}</td>
                        </tr>
                    </table>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Fecha de Entrega</th>
                            <th>Categoria</th>
                            <th>Tipo</th>
                            <th>Cant.</th>
                            <th>Precio por unidad</th>
                            <th>Precio</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${productosHtml}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colspan="5" class="nota">Subtotal de la NOTA</td>
                            <td class="nota">$${subtotal.toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td colspan="5" class="nota">Tipo impositivo</td>
                            <td class="nota"></td>
                        </tr>
                        <tr>
                            <td colspan="5" class="nota">Impuesto sobre las ventas</td>
                            <td class="nota">$0.00</td>
                        </tr>
                        <tr>
                            <td colspan="5" class="nota">Otros</td>
                            <td class="nota"></td>
                        </tr>
                        <tr>
                            <td colspan="5" class="nota">Depósito recibido</td>
                            <td class="nota"></td>
                        </tr>
                        <tr>
                            <td colspan="5" class="total">TOTAL</td>
                            <td class="total">$${subtotal.toFixed(2)}</td>
                        </tr>
                    </tfoot>
                </table>
                <p>Derechos reservados ALQUILADORA DAIM.</p>
                <p>Total a pagar $${subtotal.toFixed(2)}</p>
            </div>
        </body>
        </html>
        `;

        // Generate PDF from HTML
        pdf.create(html).toBuffer((err, buffer) => {
            if (err) {
                return res.status(500).send(`Error al generar el PDF: ${err.message}`);
            }
            res.writeHead(200, {
                'Content-Length': buffer.length,
                'Content-Type': 'application/pdf',
                'Content-Disposition': `attachment; filename=venta_${venta.nombre}.pdf`,
            }).end(buffer);
        });
    } catch (error) {
        res.status(500).send(`Error al generar el PDF: ${error.message}`);
    }
};


exports.mostrarFormulario = async (req, res) => {
    // cuidar que se haya iniciado sesion para entra a vista
    if (!req.session.user) {
        return res.redirect('/login');
    }
    try {
        const inflables = await Inflable.find();
        const lonas = await Lona.find();
        const sillas = await Silla.find();
        const mesas = await Mesa.find();
        const mantelerias = await Manteleria.find();

        res.render('ventas', {
            inflables,
            lonas,
            sillas,
            mesas,
            mantelerias
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al cargar el formulario');
    }
};
// controllers/ventasController.js

exports.realizarVenta = async (req, res) => {
    // cuidar que se haya iniciado sesion para entra a vista
    if (!req.session.user) {
        return res.redirect('/login');
    }
    try {
        const { nombre, telefono, domicilio, fecha_entrega, fecha_fin, productos } = req.body;

        if (!productos) {
            throw new Error('No se han seleccionado productos');
        }

        // Asegúrate de que `productos` sea un array válido
        let productosArray;
        try {
            productosArray = JSON.parse(productos);
        } catch (error) {
            throw new Error('Productos no válidos');
        }

        const total = productosArray.reduce((acc, prod) => acc + prod.precio * prod.cantidad, 0);

        const nuevaVenta = new Venta({
            nombre,
            telefono,
            domicilio,
            fecha_entrega,
            fecha_fin,
            productos: productosArray,
            total
        });

        await nuevaVenta.save();
        res.redirect('/ventas');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al realizar la venta: ' + error.message);
    }
};


exports.listarVentas = async (req, res) => {
    // cuidar que se haya iniciado sesion para entra a vista
    if (!req.session.user) {
        return res.redirect('/login');
    }
    try {
        const ventas = await Venta.find();
        res.render('lista', { ventas });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al listar las ventas');
    }
};