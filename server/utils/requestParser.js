module.exports = {
    parsePriceLevel(value){
        try {
            if(
                Number.isInteger(value)
                && value > 0
                && value <= 4
            ){
                return true;
            }
        } catch (err) {
            console.log(err);
        }
        return null;
    },

    parseRestaurantType(value){
        try {
            if(
                Number.isInteger(value)
                && value > 0
                && value <= 5
            ){
                return true;
            }
        } catch (err) {
            console.log(err);
        }
        return null;
    },

    parseString(value, maxLength){
        if(typeof value === "string" && value.length <= maxLength){
            return value;
        }
        return null;
    }
};