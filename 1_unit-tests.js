const chai = require('chai');
const assert = chai.assert;

const server = require('../server');

const Translator = require('../components/translator.js');
//let Translator = require('../components/translator.js');
let translator = new Translator();


let testingArray =[];

testingArray.push(['Mangoes are my favorite fruit.' , 'Mangoes are my <span class="highlight">favourite</span> fruit.']);
testingArray.push(['I ate yogurt for breakfast.' , 'I ate <span class="highlight">yoghurt</span> for breakfast.']);
testingArray.push(['We had a party at my friend\'s condo.' , 'We had a party at my friend\'s <span class="highlight">flat</span>.']);
testingArray.push(['Can you toss this in the trashcan for me?' , 'Can you toss this in the <span class="highlight">bin</span> for me?']);
testingArray.push(['The parking lot was full.' , 'The <span class="highlight">car park</span> was full.']);
testingArray.push(['Like a high tech rube goldberg machine.' , 'Like a high tech <span class="highlight">Heath Robinson device</span>.']);
testingArray.push(['To play hooky means to skip class or work.' , 'To <span class="highlight">bunk off</span> means to skip class or work.']);
testingArray.push(['No Mr. Bond, I expect you to die.' , 'No <span class="highlight">Mr</span> Bond, I expect you to die.']);
testingArray.push(['Dr. Grosh will see you now.' , '<span class="highlight">Dr</span> Grosh will see you now.']);
testingArray.push(['Lunch is at 12:15 today.' , 'Lunch is at <span class="highlight">12.15</span> today.']);
testingArray.push(['We watched the footie match for a while.' , 'We watched the <span class="highlight">soccer</span> match for a while.']);
testingArray.push(['Paracetamol takes up to an hour to work.' , '<span class="highlight">Tylenol</span> takes up to an hour to work.']);
testingArray.push(['First, caramelise the onions.' , 'First, <span class="highlight">caramelize</span> the onions.']);
testingArray.push(['I spent the bank holiday at the funfair.' , 'I spent the <span class="highlight">public holiday</span> at the <span class="highlight">carnival</span>.']);
testingArray.push(['I had a bicky then went to the chippy.' , 'I had a <span class="highlight">cookie</span> then went to the <span class="highlight">fish-and-chip shop</span>.']);
testingArray.push(['I\'ve just got bits and bobs in my bum bag.' , 'I\'ve just got <span class="highlight">odds and ends</span> in my <span class="highlight">fanny pack</span>.']);
testingArray.push(['The car boot sale at Boxted Airfield was called off.' , 'The <span class="highlight">swap meet</span> at Boxted Airfield was called off.']);
testingArray.push(['Have you met Mrs Kalyani?' , 'Have you met <span class="highlight">Mrs.</span> Kalyani?']);
testingArray.push(['Prof Joyner of King\'s College, London.' , '<span class="highlight">Prof.</span> Joyner of King\'s College, London.']);
testingArray.push(['Tea time is usually around 4 or 4.30.' , 'Tea time is usually around 4 or <span class="highlight">4:30</span>.']);


suite('Unit Tests', () => {
   
    suite("Translate to British English", function () {
        test("Translate Mangoes are my favorite fruit. to British English", function (done) {
          assert.equal(
            translator.usToUk("Mangoes are my favorite fruit."),
            'Mangoes are my <span class="highlight">favourite</span> fruit.'
          );
          done();
        });

    }); //end of sub-suite
    suite("Translate to British English Array", function () {
            for (let i = 0; i<10; i++){ //0-<10
                test("Translate Mangoes are my favorite fruit. to British English"+i, function (done) {
                    assert.equal(translator.usToUk(testingArray[i][0]), testingArray[i][1]);
                    done();
                });
            }
        }); //end of sub-suite

    suite("Translate to American English Array", function () {
                for (let i = 10; i<testingArray.length; i++){
                    test(testingArray[i][0]+" to american English"+i, function (done) {
                        assert.equal(translator.ukToUs(testingArray[i][0]), testingArray[i][1]);
                        done();
                    });
                }
}); //end of sub-suite
    

suite("Test Highlighting", function () {
    
        test("Highlighting Test 1", function (done) {
            assert.equal(translator.usToUk(testingArray[0][0]), testingArray[0][1]);
            done();
        });
    
        test("Highlighting Test 2", function (done) {
            assert.equal(translator.usToUk(testingArray[1][0]), testingArray[1][1]);
            done();
        });
    
        test("Highlighting Test 3", function (done) {
            assert.equal(translator.ukToUs(testingArray[10][0]), testingArray[10][1]);
            done();
        });
    
        test("Highlighting Test 14", function (done) {
            assert.equal(translator.ukToUs(testingArray[11][0]), testingArray[11][1]);
            done();
        });
    
}); //end of sub-suite


});
