const multer = require('multer');

// Création d'un dictionnaire pour la gestion des mime-types

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/gif': 'gif',
};

// création un objet de configuration pour multer avec deux éléments : destination & filename

const storage = multer.diskStorage({
    destination:__dirname + "/../images" ,

    
    // création un nouveau nom de fichier pour éviter que deux fichiers aient le même nom

    filename: (req, file, callback) => {
        const name = file.originalname.split('.')[0].split(' ').join('_');
      
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension)
        
    }
    
 
    
   
});

module.exports = multer({ storage: storage}).single('image');