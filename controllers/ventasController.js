const Inflable = require('../models/Inflable');
const Lona = require('../models/Lona');
const Silla = require('../models/Silla');
const Mesa = require('../models/Mesa');
const Manteleria = require('../models/Manteleria');
const Venta = require('../models/Venta');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');


exports.generarPDF = async (req, res) => {
    // cuidar que se haya iniciado sesion para entra a vista
    if (!req.session.user) {
        return res.redirect('/login');
    }
    try {
        const ventaId = req.params.id;
        const venta = await Venta.findById(ventaId);

        if (!venta) {
            return res.status(404).send('Venta no encontrada');
        }

        const doc = new PDFDocument();
        let buffers = [];
        doc.on('data', buffers.push.bind(buffers));
        doc.on('end', () => {
            let pdfData = Buffer.concat(buffers);
            res.writeHead(200, {
                'Content-Length': Buffer.byteLength(pdfData),
                'Content-Type': 'application/pdf',
                'Content-Disposition': `attachment;filename=venta_${venta.nombre}.pdf`,
            }).end(pdfData);
        });

        doc.fontSize(25).text('Detalles de la Venta', { align: 'center' });
        doc.moveDown();
        doc.fontSize(18).text(`Cliente: ${venta.nombre}`);
        doc.text(`Teléfono: ${venta.telefono}`);
        doc.text(`Domicilio: ${venta.domicilio}`);
        doc.text(`Fecha de Entrega: ${venta.fecha_entrega.toDateString()}`);
        doc.text(`Fecha de Salida: ${venta.fecha_fin.toDateString()}`);
        doc.text(`Total: $${venta.total}`);
        doc.moveDown();
        doc.fontSize(20).text('Productos', { align: 'left' });

        venta.productos.forEach(producto => {
            // doc.fontSize(15).text(`${producto.tipo} (${producto.categoria}) - ${producto.cantidad} x $${producto.precio}`);
            doc.fontSize(15).text(` Descripcion: ${producto.categoria} , ${producto.tipo} | Cantidad: (${producto.cantidad}) | Precio por unidad: ${producto.precio} | Total de categoria: $${producto.precio * producto.cantidad}`);
        });

        doc.end();
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