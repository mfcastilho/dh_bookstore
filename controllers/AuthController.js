const {User} = require ("../models");
const bcrypt = require("bcryptjs");
const { Op } = require("sequelize");

const AuthController = {
     login: (req, res)=>{

     },
     store: async (req, res)=>{
          try {

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

          } catch (error) {
               
               if (error.name === "SequelizeConnectionRefusedError"){
                    return res.status(500).json({error: true, message: "Sistema indisponível, tente novamente mais tarde!"})
                  }
            
                  if (error.name === "SequelizeUniqueConstraintError"){
                      return res.status(400).json(error.parent.sqlMessage);
                  }
            
                  if (error.name === "SequelizeValidationError"){
                      return res.status(400).json({error: true, message: `${error.errors[0].type} at ${error.errors[0].path}`})
                  }
          }
     }     

}

module.exports = AuthController;