const {User} = require ("../models");
const bcrypt = require("bcryptjs");
const { Op } = require("sequelize");

const AuthController = {
     login: (req, res)=>{

     },
     store: async (req, res)=>{
          const {name, email, nickname, password} = req.body;
          const hashPassword = bcrypt.hashPassword(password, 10);

          const veriryIfUserExists = await User.findOne({
               where:{
                    [Op.or]:[{nickname}, {email}]
               }
          });

          if(veriryIfUserExists){
               return res.status(400).json({error:true, message: "Não foi possível realizar o cadastro."});
          }

          const newUser = await User.create({
               name,
               email,
               nickname,
               password: hashPassword
          });

          return res.status(201).json({data: newUser});
     }     

}

module.exports = AuthController;