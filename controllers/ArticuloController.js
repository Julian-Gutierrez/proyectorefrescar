const models = require('../models');

module.exports = {

    add: async(req, res, next) => {
        try {
            const reg = await models.Articulo.create(req.body);
            res.status(200).json(reg);
        } catch (error) {
            res.status(500).send({
                message: 'Ocurrio un error interno'
            });
            next();
        }
    },

    enabled: async(req, res, next) =>{
        try {
            const reg = await models.Articulo.findByIdAndUpdate({_id: req.body._id},{estado: 1});
            res.status(200).json(reg);
        } catch (error) {
            res.status(500).send({
                message: 'Ocurrio un error interno'
            });
            next();
        }
    },

    disabled: async(req, res, next) =>{
        try {
            const reg = await models.Articulo.findByIdAndUpdate({_id: req.body._id},{estado: 0});
            res.status(200).json(reg);
        } catch (error) {
            res.status(500).send({
                message: 'Ocurrio un error interno'
            });
            next();
        }
    },

    update: async(req, res, next) =>{
        try {
            const reg = await models.Articulo.findByIdAndUpdate({_id: req.body._id},{
                nombre: req.body.nombre,
                descripcion: req.body.descripcion,
                categoria: req.body.categoria,
                codigo: req.body.codigo,
            });
                res.status(200).json(reg);
        } catch (error) {
            res.status(500).send({
                message: 'Ocurrio un error interno'
            });
            next();
        }
    },

    list: async (req, res, next) =>{
        try {
            const reg = await models.Articulo.find({
                $or : [{'nombre': new RegExp(req.query.valor,'i')},
                        {'descripcion': new RegExp(req.query.valor,'i')},
                        {'codigo': new RegExp(req.query.valor,'i')}
                        ]}, {__v:0})
                        .populate('categoria',{
                            nombre: 1,
                            descripcion: 1
                        })
                        .sort({'createAt': 1}
            );
            res.status(200).json(reg);
        } catch (error) {
            res.status(500).send({
                message: 'Ocurrio un error interno'
            });
            next();
        }
    },
    remove: async(req, res, next) => {
        try {
            const reg = await models.Articulo.findByIdAndDelete({_id: req.body._id});
            res.status(200).json(reg);
        } catch (error) {
            res.status(500).send({
                message: 'Ocurrio un error interno'
            });
            next();
        }
    }
}