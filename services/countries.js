const axios = require("axios");
require("dotenv").config();

const countriesApi = axios.create({
    baseURL: process.env.COUNTRIES_API_BAE_URL
});

const methods = {
    getByAlphaCode: async (code)=>{
        try {
            const response = await countriesApi.get(`alpha/${code}`);

            if(response.status !== 200){
                return response.status(response.status).json({ message: "A requisição não deu certo" })
            }

            return response.data;

        } catch (error) {
            console.log(error)
        }
    }
};

module.exports = methods;