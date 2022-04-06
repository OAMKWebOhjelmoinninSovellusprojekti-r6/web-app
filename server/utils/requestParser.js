module.exports = {
    parsePriceLevel(value){
        try {
            value = parseInt(value);
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
            value = parseInt(value);
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

    parseUserType(value){
        try {
            if(value === 0 || value === 1){
                return true
            }
        } catch (err) {
            console.log(err);
        }
        return false;
    },

    parseString(value, maxLength){
        if(typeof value === "string" && value.length <= maxLength){
            return value;
        }
        return null;
    }
};