//const {model} = require('mongoose');
const models = require('../models');
const bcrypt = require('bcrypt');
const token = require('../services/token');

module.exports = {

    add: async(req, res, next) => {
        try {
            let checkemail = await models.Usuario.findOne({
                correo: req.body.correo
            });
            if(checkemail){
                res.status(404).send({
                    message: 'el usuario ya existe'
                })
            }else{
                req.body.password = await bcrypt.hash(req.body.password, 10);
                const reg = await models.Usuario.create(req.body);
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
            const reg = await models.Usuario.findByIdAndUpdate({_id: req.body._id},{estado: 1});
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
            const reg = await models.Usuario.findByIdAndUpdate({_id: req.body._id},{estado: 0});
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
            console.log(req.body);
            let auxPassword = req.body.password;
            const auxReg = await models.Usuario.findOne({correo: req.body.correo});
            if (auxPassword !== auxReg.password) {
                req.body.password = await bcrypt.hash(req.body.password, 10);
            }
                const reg = await models.Usuario.updateOne({correo: req.body.correo},{
                    rol: req.body.rol,
                    nombre: req.body.nombre,
                    password: req.body.password
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
            const reg = await models.Usuario.find({$or : [{'nombre': new RegExp(req.query.valor,'i')},
                                                        {'correo': new RegExp(req.query.valor,'i')},
                                                        {'rol': new RegExp(req.query.valor,'i')}]},
                                                        {createdAt: 0, __v:0}).sort({'createAt': -1});
            res.status(200).json(reg);
        } catch (error) {
            res.status(500).send({
                message: 'Ocurrio un error interno'
            });
            next();
        }
    },

    login: async(req, res, next) =>{
        try {
            let user = await models.Usuario.findOne({
                correo: req.body.correo,
                estado: 1
            });
            if (user) {
                let match = await bcrypt.compare(req.body.password, user.password);
                if (match) {
                    console.log(user);
                    const tokenReturn = await token.encode(user);
                    res.status(200).json({user, tokenReturn});
                }else{
                    res.status(401).send({
                        message: "password incorrect!"
                    })
                }
                
            } else {
                res.status(404).send({
                    message: "user not found!"
                })
            }
            
        } catch (error) {
            res.status(500).send({
                message: "error!"
            })
            next(error);
        }
    }
}