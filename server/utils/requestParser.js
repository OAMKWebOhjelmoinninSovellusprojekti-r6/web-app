module.exports = {
    parsePrice(value){
        try {
            value = parseFloat(value);
            if(isNaN(value)){
                return null;
            } else {
                return value;
            }
        } catch (err){
            console.log(err);
        }
    },

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
                return value;
            }
        } catch (err) {
            console.log(err);
        }
        return null;
    },

    parseUserType(value){
        try {
            if(value === 0 || value === 1){
                return value
            }
        } catch (err) {
            console.log(err);
        }
        return null;
    },

    parseId(value){
        try {
            value = parseInt(value)
            if(isNaN(value)){
                return null;
            } else {
                return value;
            }
        } catch (err){
            console.log(err);
        }
        return null;
    },

    parseString(value, maxLength){
        if(typeof value === "string" && value.length <= maxLength && value !== ''){
            return value;
        }
        return null;
    },

    parsePathInteger(value){
        try {
            value = parseInt(value);
            if(isNaN(value)){
                return null;
            } else {
                return value;
            }
        } catch {}
        return null;
    }
};