var express = require('express');
var cors = require('cors');
const multer = require('multer');
require('dotenv').config()

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Configura multer para manejar la carga de archivos
const storage = multer.memoryStorage(); // Almacenamos el archivo en memoria
const upload = multer({ storage: storage });


app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No se ha proporcionado ningún archivo' });
    }

    const { originalname, mimetype, size } = req.file;
    
    res.json({ 
      name: originalname, 
      type: mimetype, 
      size: size 
    });
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ha ocurrido un error en el servidor' });
  }
});



  const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});