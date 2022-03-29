module.exports = {
    parseString(string, maxLength){
        if(typeof string === "string" && string.length <= maxLength){
            return string
        }
        return null;
    }
};