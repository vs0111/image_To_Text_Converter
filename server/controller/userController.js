const Tesseract = require('tesseract.js');
const path = require('path');
const Convert=require('../model/convertModel')

const userController={
  uploadImage: async (req, res) => {
    if (req.file) {
      const imagePath = path.join(__dirname, '../uploads', req.file.filename);
      const fileExtension = path.extname(req.file.originalname).toLowerCase();

      if (fileExtension === '.jpg' || fileExtension === '.png') {
        Tesseract.recognize(
          imagePath,
          'eng', 
          { logger: (info) => console.log(info) } 
        )
          .then(async ({ data: { text } }) => {
            console.log(text);

            const convert = new Convert({
              OgImage: req.file.filename,
              extractText: text,
            });

            // Save the document to the database
            await convert.save();

            res.status(200).json({ text });
          })
          .catch((error) => {
            console.error(error);
            res.status(500).json({ error: 'Error extracting text from the image' });
          });
      } else {
        res.status(400).json({ error: 'Uploade a Image File' });
      }
    } else {
      res.status(400).json({ error: 'No file uploaded' });
    }
  },
};

module.exports=userController;