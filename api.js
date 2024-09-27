'use strict';

const Translator = require('../components/translator.js');

module.exports = function (app) {
  
  const translator = new Translator();

  app.route('/api/translate')
    .post((req, res) => {
      console.log ("route /api/translate", req.body);
      let initString = req.body.text;

      if (initString==""){
        res.json({error: 'No text to translate' });
        return;
      }

      if (!req.body.locale || !initString){
        res.json({ error: 'Required field(s) missing' });
        return;
      }

      

     

      if (req.body.locale == 'american-to-british'){
       let translatedString =  translator.usToUk(initString);

       if (initString == translatedString){
        res.json({text: initString, translation: 'Everything looks good to me!'});
        return;
      }else{
        res.json({text: initString, translation: translatedString});
        return;
      }
      }
      if (req.body.locale == 'british-to-american'){
        let translatedString =  translator.ukToUs(initString);

        if (initString == translatedString){
          res.json({text: initString, translation: 'Everything looks good to me!'});
          //res.json({translation: 'Everything looks good to me!'});
          return;
        }else{
          res.json({text: initString, translation: translatedString});
          return;
        }

        
      }
      //if failed
      res.json({error: 'Invalid value for locale field' });
      return;

    });
};
