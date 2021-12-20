let length = 8;
let flagSymbols = true;// from 33 to 47, 58 to 64, 91 to 96, 123 to 126
let flagNumbers = true;// from 48 to 57
let flagUppercase = true;//from 65 to 90
let flagLowercase = true;//from 97 to 122
let flagAmbiguous = true;

let ambiguousChars = ["{","}","[","]","(",")","/","\\","\'","\"",
                "\`","~", ",", ";", ":", "." , "<", ">"];

function generatingPassword(){
  let passwordInput = document.getElementById("password")
  let passwordGenerated = [];
  let isOk = false;
  if (!trackOptions()){passwordInput.value ="Escoge alguna opcion"; return 0;};

  /*Solucion momentanea costosa pero facil de implementar */ ////////////////////////TODO
  // tipo genera muchas contraseñas hasta que una cumpla con todas las flags.
  // aunque no se si identificar que flags cumplen y se repiten, 
  // para luego cambiar la repetida por las flags que no cumplen, sea mas eficiente

  while(!isOk){
    passwordGenerated = generator();
    isOk = validatePass(passwordGenerated);
  }
  /*Show password */
  passwordInput.value = String.fromCharCode(...passwordGenerated);
}

/* tracking options selected */
function trackOptions() {
  /*tracking length */
  let select = document.getElementById('length');
  length = select.options[select.selectedIndex].value;
  /*tracking has symbols */
  flagSymbols = document.getElementById("allowSymbols").checked;
  /*tracking has numbers */
  flagNumbers = document.getElementById("allowNumbers").checked;
  /*tracking has uppercase */
  flagUppercase = document.getElementById("allowUppercase").checked;
  /*tracking has lowercase */
  flagLowercase = document.getElementById("allowLowercase").checked;
  /*tracking has ambiguous */
  flagAmbiguous = document.getElementById("allowAmbiguous").checked;

  return  flagSymbols || flagNumbers || flagUppercase 
          || flagLowercase || flagAmbiguous;
}

/* generate a n length password */
function generator(){
  let pass = [];
  for (let i = 0; i < length; i++) {
    randomCode = getRandom();
    if (validateCode(randomCode)) { 
      pass.push(randomCode);
    }else{ 
      i--; 
    }
  }
  return pass;
}

/* give a random code ascii from 33 to 126 */
function getRandom(){
  return 33 + Math.round(Math.random()*93);
}

/* validate agree with options selected */
function validateCode(code) {
  if(flagSymbols && isSymbolCode(code)){
    if(flagAmbiguous){
      return true;
    }else{
      if(!isAmbiguousCode(code)) return true;
    }
  }

  if(flagNumbers && isNumberCode(code)) return true;
  if(flagUppercase && isUppercaseCode(code)) return true;
  if(flagLowercase && isLowercaseCode(code)) return true;

  return false
}

function validatePass(password){
  tempPass = password.slice();

  let hasSymbols = !!(tempPass.filter(x => isSymbolCode(x)).length);
  let hasNumbers = !!(tempPass.filter(x => isNumberCode(x)).length);
  let hasUppercase = !!(tempPass.filter(x => isUppercaseCode(x)).length);
  let hasLowercase = !!(tempPass.filter(x => isLowercaseCode(x)).length);
  let hasAmbiguous = !!(tempPass.filter(x => isAmbiguousCode(x)).length);

  console.group("Reporte de validacion para: " +  String.fromCharCode(...tempPass));
  console.log("Type character: Has Value? == Option Selected?");
  console.log("Symbols Validated: ", hasSymbols, " == ", flagSymbols," -> ", hasSymbols == flagSymbols);
  console.log("Numbers Validated: ", hasNumbers, " == ", flagNumbers," -> ", hasNumbers == flagNumbers);
  console.log("Uppercase Validated: ", hasUppercase, " == ", flagUppercase," -> ", hasUppercase == flagUppercase);
  console.log("LowerCase Validated: ", hasLowercase, " == ", flagLowercase," -> ", hasLowercase == flagLowercase);
  console.log("Ambiguous Validated: ", hasAmbiguous, " == ", flagAmbiguous," -> ", hasAmbiguous == flagAmbiguous);
  console.groupEnd();

  let validated =  hasSymbols == flagSymbols && hasNumbers == flagNumbers 
              && hasUppercase == flagUppercase && hasLowercase == flagLowercase
              && hasAmbiguous == flagAmbiguous;

  console.log("Resultado: ", validated)
  return validated;
}

function isSymbolCode(n){ 
  return  (n >= 37 && n <= 47) || 
          (n >= 58 && n <= 64) || 
          (n >= 91 && n <= 96) || 
          (n >= 123 && n <= 126)
}

function isNumberCode(n){ return (n >= 48 && n <= 57) }
function isUppercaseCode(n){ return (n >= 65 && n <= 90) }
function isLowercaseCode(n){ return (n >= 97 && n <= 122) }

function isAmbiguousCode(n){
  return ambiguousChars.includes(String.fromCharCode(n));
}