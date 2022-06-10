let change = (str) => {

let newStr = "";
for (var i = 0; i < str.length; i++) {
 str[i].toLowerCase() ? str[i].toUpperCase() && newStr += str[i] : str[i];
console.log(newStr)
i++;
str[i].toUpperCase() ? str[i].toLowerCase() : str[i];
newStr+=str[i];
}

  return newStr;
}


change("helloW");
