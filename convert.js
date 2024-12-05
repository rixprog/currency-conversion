

 


let dropdown = document.querySelectorAll('.dropdown select');
let flag=document.querySelectorAll('.image-container img');
let currencyValue=document.querySelector('h3');
let submit=document.querySelector('.submit');
let input=document.querySelector('.input');
let form=document.querySelector('form');

for(let i in countryList){
    
    let newOption = document.createElement('option');
    let newOption2 = document.createElement('option');
    newOption.value=countryList[i];
    newOption.innerText=i;
    console.log(newOption.innerText);
    newOption2.value=countryList[i];
    newOption2.innerText=i;
    if(i==='USD'){
        newOption.selected='selected';
    }
    if(i==='INR'){
        newOption2.selected='selected';
    }
    dropdown[0].appendChild(newOption);
    dropdown[1].appendChild(newOption2);
    
}


function flagUpdate(){
    let country_code = dropdown[0].value
    let country_code2 = dropdown[1].value
    flag[0].src=`https://flagsapi.com/${country_code}/flat/64.png`;
    flag[1].src=`https://flagsapi.com/${country_code2}/flat/64.png`;

}

let value=0;


const updateCurrencyValue = async()=>{
    let country1=dropdown[0].selectedOptions[0].innerText.toLowerCase();
    let country2=dropdown[1].selectedOptions[0].innerText.toLowerCase();
    const BASE_URL = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${country1}.json`;
    let data = await fetch(BASE_URL);
    let response = await data.json()
    value=response[country1][country2]
    let result=[value,country1,country2]
    console.log(response[country1][country2]);
    currencyValue.innerText=`1 ${country1.toUpperCase()} = ${value} ${country2.toUpperCase()}`
    
    console.log(country1);
    console.log(country2);
    return result;

    

}

updateCurrencyValue();

dropdown[0].addEventListener('change',()=>{
    flagUpdate();
    updateCurrencyValue();
});
dropdown[1].addEventListener('change',()=>{
    flagUpdate();
    updateCurrencyValue();
});

function convert(){
    updateCurrencyValue().then(arr=>{
        amount=input.value;
        conversion=arr[0]*amount;
        currencyValue.innerText=`${amount} ${arr[1].toUpperCase()} = ${conversion} ${arr[2].toUpperCase()}`;
        console.log(currencyValue.innerText);
    });;
    
    
}

input.addEventListener('input',convert);


form.addEventListener('keydown',(event)=>{
    if(event.key ==='Enter'){
        event.preventDefault();
    }
    

})

submit.addEventListener('click', (event) => {
    event.preventDefault(); // Prevents the form from submitting
    input.value = '';
    updateCurrencyValue().then(arr=>{
        amount=0;
        conversion=0
        currencyValue.innerText=`${amount} ${arr[1].toUpperCase()} = ${conversion} ${arr[2].toUpperCase()}`;
        
    });;
    
     // Clears the input field
});


