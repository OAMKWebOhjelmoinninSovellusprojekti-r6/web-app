const path = require("path");

module.exports = class FileService {
    staticPath = path.join(__dirname, "..", "static");
    allowedFormats = ['jpg','png','jpeg'];

    file = null;
    filename = null;
    filepath = null;
    staticFolder = null;
    fileExtension = null;

    constructor(file, folderName){
        this.file = file;
        this.filename = file.name;
        let extension = file.name.split('.').pop();
        if(this.allowedFormats.includes(extension)){
            this.fileExtension = extension;
        } else {
            throw new Error('Invalid filetype');
        }
        this.staticFolder = folderName;
    }


    setFileName(filename){
        this.filename = filename;
    }

    buildFilePath(){
        try {
            this.filepath = path.join(this.staticPath, this.staticFolder, `${this.filename}.${this.fileExtension}`);
        } catch (err){
            console.log(err);
        }
    }

    buildImagePath(){
        return path.join("static", this.staticFolder, this.filename + "." + this.fileExtension);
    }

    saveFileToStatic(){
        let data = {
            errorCode: 0,
            imagePath: null
        }
        this.buildFilePath();
        if(this.filepath == null){
            data.errorCode = 1;
        } else {
            data.imagePath = this.buildImagePath();
            this.file.mv(this.filepath, (err) => {
                if (err) {
                    console.log(err);
                    data.errorCode = 2;
                }
                
            });
        }
        return data;
    }
}