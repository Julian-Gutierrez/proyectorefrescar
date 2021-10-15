const models = require('../models');

module.exports = {

    add: async(req, res, next) => {
        try {
            let checkName = await models.Categoria.findOne({
                nombre: req.body.nombre
            });
            if(checkName){
                res.status(404).send({
                message: 'el usuario ya existe'
                })
            }else{
                const reg = await models.Categoria.create(req.body);
                res.status(200).json(reg);
            } 
        } catch (error) {
            res.status(500).send({
                message: 'Ocurrio un error interno'
            });
            next();
        }
    },

    enabled: async(req, res, next) =>{
        try {
            const reg = await models.Categoria.findByIdAndUpdate({_id: req.body._id},{estado: 1});
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
            const reg = await models.Categoria.findByIdAndUpdate({_id: req.body._id},{estado: 0});
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
            let checkName = await models.Categoria.findOne({
                nombre: req.body.nombre
            });
            if (checkName) {
                const reg = await models.Categoria.findByIdAndUpdate({_id: req.body._id},{
                    descripcion: req.body.descripcion,
                });
                res.status(200).json(reg);
            }else{
                const reg = await models.Categoria.findByIdAndUpdate({_id: req.body._id},{
                    nombre: req.body.nombre,
                    descripcion: req.body.descripcion,
                });
                res.status(200).json(reg);
            }
        } catch (error) {
            res.status(500).send({
                message: 'Ocurrio un error interno'
            });
            next();
        }
    },

    list: async (req, res, next) =>{
        try {
            const reg = await models.Categoria.find({
                $or : [{'nombre': new RegExp(req.query.valor,'i')},
                        {'descripcion': new RegExp(req.query.valor,'i')}
                        ]}, {createdAt: 0, __v:0}).sort({'createAt': -1}
            );
            res.status(200).json(reg);
        } catch (error) {
            res.status(500).send({
                message: 'Ocurrio un error interno'
            });
            next();
        }
    },

    listActive: async (req, res, next) =>{
        try {
            const reg = await models.Categoria.find({'estado': 1})
            .sort({'createdAt': 1})
            res.status(200).json(reg);
        } catch (error) {
            res.status(500).send({
                message: 'Ocurrio un error interno'
            });
            next();
        }
    }
}