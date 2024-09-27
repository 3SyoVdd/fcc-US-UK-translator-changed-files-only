const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

class Translator {

    usToUk(initString){
        console.log ("usToUk:" + initString)
        let newString = initString
    //american to british         


    //time
    

    //HH:MM 24-hour format, optional leading 0
    //source: https://stackoverflow.com/questions/7536755/regular-expression-for-matching-hhmm-time-format
// /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/
const regexForTime = /([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]/g

let timeFound = newString.match(regexForTime)

        if (timeFound){//if time found (one oder more times)
            for (let i = 0; i< timeFound.length; i++){
                let foundVal = timeFound[i];
                let repVal = foundVal.replace(":",".");//replace in the replace term
                repVal = '<span class="highlight">' + repVal + "</span>"; //add span for Highlighting
                newString = newString.replace(foundVal, repVal)
            }
        }


    //console.log(americanToBritishSpelling);

    for (const [key, value] of Object.entries(americanToBritishSpelling)) {
        //console.log(`${key}: ${value}`);
       // console.log(key, " und ", value);
       
        newString = newString.replaceAll(key, '<span class="highlight">'+value+'</span>')
    }

//titles
    for (const [key, value] of Object.entries(americanToBritishTitles)) {
        //American: mr. british: mr --> always upper case at the beginning
        let searchValue = key;
        searchValue = searchValue[0].toUpperCase() + searchValue.slice(1);//First Letter of Title is always upper case
        let repValue = value;
        repValue = repValue[0].toUpperCase() + repValue.slice(1);

        console.log ("repl:" , searchValue, repValue )
       
       //regex notwendig wg beginn und ende. Ebenso handling groß und kleinschreibung

        newString = newString.replaceAll( searchValue+" ", '<span class="highlight">'+ repValue+'</span> ')

    }//end of titles
    //console.log ("workaround for sentences ending with ms.?")  no. schould work bekause of first capital

//dirty: Add leerzeichen zu satzzeichen
    newString = " " + newString;
    newString = newString.replaceAll(".", " .");
    newString = newString.replaceAll(",", " ,");
    newString = newString.replaceAll(":", " :");
    newString = newString.replaceAll("?", " ?");
    
    
    //american-only: key= american. value = british
    for (const [key, value] of Object.entries(americanOnly)) {
        if (key == "Rube Goldberg device" || key== "Rube Goldberg machine"){
            console.log ("american only", key, value, newString);
        }
            newString = newString.replaceAll(" " + key + " ", ' <span class="highlight">'+value+'</span> ')
     }
    
     //rewind:
     if (newString.charAt(0)== " "){
        newString = newString.slice(1);
     }

//dirty: Remove leerzeichen zu satzzeichen
    newString = newString.replaceAll(" .", ".");
    newString = newString.replaceAll(" ,", ",");
    newString = newString.replaceAll(" :", ":");
    newString = newString.replaceAll(" ?", "?");


        return newString    

    }//end of us to UK





    ukToUs(initString){
         //american to british         
        console.log ("ukToUs" + initString)

        let newString = initString
       
    
   //HH:MM 24-hour format, optional leading 0
        //source: https://stackoverflow.com/questions/7536755/regular-expression-for-matching-hhmm-time-format
        // /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/
        const regexForTime = /([0-9]|0[0-9]|1[0-9]|2[0-3]).[0-5][0-9]/g

        let timeFound = newString.match(regexForTime)
        console.log ("timeFound");
        console.log (timeFound);
            if (timeFound){
                for (let i = 0; i< timeFound.length; i++){
                    let foundVal = timeFound[i];
                    let repVal = foundVal.replace(".",":");
                    repVal = '<span class="highlight">' + repVal + "</span>";
                    console.log (foundVal, repVal)
                    newString = newString.replace(foundVal, repVal)
                }
                
            }


        //console.log(americanToBritishSpelling);
    
        for (const [key, value] of Object.entries(americanToBritishSpelling)) {
            //console.log(`${key}: ${value}`);
           // console.log(key, " und ", value);
            newString = newString.replaceAll(value, '<span class="highlight">'+key+'</span>')
        }
    
    //titles
        for (const [key, value] of Object.entries(americanToBritishTitles)) {
            //American: mr. british: mr --> always upper case at the beginning
            let searchValue = value;
            searchValue = searchValue[0].toUpperCase() + searchValue.slice(1);//First Letter of Title is always upper case
            let repValue = key;
            repValue = repValue[0].toUpperCase() + repValue.slice(1);
    
            //console.log ("repl:" , searchValue, repValue )
           
           //regex notwendig wg beginn und ende. Ebenso handling groß und kleinschreibung
    
            newString = newString.replaceAll( searchValue+" ", '<span class="highlight">'+ repValue+'</span> ')
    
        }//end of titles
        //console.log ("workaround for sentences ending with ms.?")  no. schould work bekause of first capital
    
    
        
        //american-only: key=british. value = american
        //Problem: identify word.

        newString = " " + newString[0].toLowerCase() + newString.slice(1);//add Space at beginning. First letter lower case
        newString = newString.replaceAll(".", " .");
        newString = newString.replaceAll(",", " ,");
        newString = newString.replaceAll(":", " :");
        newString = newString.replaceAll("?", " ?");

        for (const [key, value] of Object.entries(britishOnly)) {
                newString = newString.replaceAll(" " + key + " ", ' <span class="highlight">'+value+'</span> ')
         }
    
          //rewind:
     if (newString.charAt(0)== " "){
        newString = newString.slice(1);
     }
    newString = newString[0].toUpperCase() + newString.slice(1)
    newString = newString.replaceAll(" .", ".");
    newString = newString.replaceAll(" ,", ",");
    newString = newString.replaceAll(" :", ":");
    newString = newString.replaceAll(" ?", "?");

         return newString;

    }// end of uk to us

}//end of class

module.exports = Translator;