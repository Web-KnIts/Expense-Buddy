export const getInitals = (name : string)=>{
    if(!name) return "";
    const words = name.split(" ");
    let initals = "";
    for(var i = 0;i<Math.min(words.length,2);i++)
    {
        initals+=words[i][0];
    }
    return initals.toUpperCase();
} 


export const addThousandsSeparator = (value : number)=>{
    if(value == null || isNaN(value)) return "";
    const [integerPart,fractionalPart] = value.toString().split(".");
    const formattedInteger = integerPart.replace(/(\d)(?=(\d\d)+\d$)/g, "$1,");
    return fractionalPart ? `${formattedInteger}.${fractionalPart}`: formattedInteger;
}