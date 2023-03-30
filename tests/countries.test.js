const countriesApi = require("../services/countries");

const countryCode = "BR"
countriesApi.getByAlphaCode(countryCode).then(res=>console.log(res)).catch(err=> console.log(err))
