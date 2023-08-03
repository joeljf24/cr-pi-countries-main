const { fetchCountries } = require("../controllers/fetchCountriesToDb")

const fetchCountriesHandler = async () => {
    try {
        const response = await fetchCountries()
        if(!response) return console.log("Countries already exist in the database.");
        return  console.log("Countries uploaded to database successfully");  
    } catch (error) {
        console.error(error.message)
    }
};

module.exports ={ 
    fetchCountriesHandler
};