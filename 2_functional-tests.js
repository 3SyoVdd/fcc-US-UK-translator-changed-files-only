const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server.js');

chai.use(chaiHttp);



const mangoes = "Mangoes are my favorite fruit.";
const mangoesTranslated = 'Mangoes are my <span class="highlight">favourite</span> fruit.';


suite('Functional Tests', () => {
    
    test('Translation with text and locale fields: POST request to /api/translate', function(done){
        chai.request(server)
         .post('/api/translate')
         .send({text:mangoes,  locale: 'american-to-british'})
         .end(function(err, res){
           assert.equal(res.status, 200);
           assert.equal(res.body.translation, mangoesTranslated)
          /*
           assert.isArray(res.body, 'response should be an array');
           assert.property(res.body[0], 'commentcount', 'Books in array should contain commentcount');
           assert.property(res.body[0], 'title', 'Books in array should contain title');
           assert.property(res.body[0], '_id', 'Books in array should contain _id');
           */
           done();
         });
     });

     test('Translation with text and invalid locale field: POST request to /api/translate', function(done){
        chai.request(server)
         .post('/api/translate')
         .send({text:mangoes,  locale: 'american-to-briXXXXtish'})
         .end(function(err, res){
           assert.equal(res.status, 200);
           assert.equal(res.body.error, 'Invalid value for locale field')
          
           done();
         });
     });

     test('Translation with missing text field: POST request to /api/translate', function(done){
        chai.request(server)
         .post('/api/translate')
         .send({/*text:mangoes,*/  locale: 'american-to-british'})
         .end(function(err, res){
           assert.equal(res.status, 200);
           assert.equal(res.body.error, 'Required field(s) missing')
          
           done();
         });
     });

     test('Translation with missing text field: POST request to /api/translate', function(done){
        chai.request(server)
         .post('/api/translate')
         .send({text:mangoes,  /*locale: 'american-to-british'*/})
         .end(function(err, res){
           assert.equal(res.status, 200);
           assert.equal(res.body.error, 'Required field(s) missing')
           done();
         });
     });


     test('Translation with empty text: POST request to /api/translate (5)', function(done){
        chai.request(server)
         .post('/api/translate')
         .send({text: "",  locale: 'american-to-british'})
         .end(function(err, res){
           assert.equal(res.status, 200);
           assert.equal(res.body.error, 'No text to translate')
           done();
         });
     });

     test('Translation with text that needs no translation: POST request to /api/translate', function(done){
        chai.request(server)
         .post('/api/translate')
         .send({text: "Hello how are you?",  locale: 'american-to-british'})
         .end(function(err, res){
           assert.equal(res.status, 200);
           assert.equal(res.body.translation, "Everything looks good to me!")
           done();
         });
     });
     
});


