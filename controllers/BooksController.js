const { Book } = require("../models");

const BooksController = {
  index: async (req, res)=>{
    try {
      const books = await Book.findAll();

      if(!books){
        return res.status(404).json({ messege: "Error"});
      }

      return res.status(200).json({data: books});


    } catch (error) {
      console.log(error);

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
  },
  showBook: async (req, res)=>{
    const countriesApi = require("../services/countries");
    try {
      


      const {id} = req.params;

      //console.log(id)
      const book = await Book.findByPk(id, {raw:true});

      

      if(!book){
        return res.status(404).json({message: "Error"});
      }

      //console.log(book.country_code)
      const countryCode = book.country_code;

      const country = await countriesApi.getByAlphaCode(countryCode)

      

      book.country = {
        name: country[0].name.common,
        flag: country[0].flags.svg
      }

      return res.status(200).json({data:book});
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
  },
  store: async (req, res)=>{
    try {
      
          const {title, total_pages, author, release_year, stock, country_code} = req.body;

      // const book = await Book.create({
      //   title, 
      //   total_pages, 
      //   author, 
      //   release_year, 
      //   stock: Number(stock)
      // })

      const [newBook, bookExist] = await Book.findOrCreate({
        where:{
          title, 
          total_pages: Number(total_pages), 
          author, 
          release_year, 
          stock: Number(stock),
          country_code
        }
      })
      
      if(!bookExist){
        return res.status(409).json({ message: "Produto já cadastrado" });
      }

      return res.status(201).json({ data:newBook });
      

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
  },
  edit: async (req, res)=>{
    
    try {
      const {title, total_pages, author, release_year, stock, country_code} = req.body;
      const {id} = req.params;

      const verifyBookExists = await Book.findByPk(id);

      if(!verifyBookExists){
        return res.status(404).json({ message: "Error"});
      }

      await Book.update({
        title, 
        total_pages: Number(total_pages), 
        author, 
        release_year, 
        stock: Number(stock),
        country_code
      },
      {
        where:{
          id
        }
      });

      const book = await Book.findByPk(id);
      return res.status(201).json({ data: book});

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
  },
  delete: async (req, res)=>{
    try {

      const {id} = req.params;

      const book = Book.findByPk(id);


      if(!book){
        return res.status(404).json({ message: "Livro não deletado" })
      }

      const bookId = await Book.destroy({
        where:{ id } 
      });

      return res.status(200).json({ message: `Livro de id:${bookId} deletado com sucesso`});
      
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


module.exports = BooksController;