const selectItem = (el) => {
    return document.querySelector(el)
}
const selectAll = (el) => {
    return document.querySelectorAll(el);
}


pizzaJson.map((pizza, index) => {
    //make a clone 
    let pizzaSingle = selectItem('.models .pizza-item').cloneNode(true);

    pizzaSingle.querySelector('.pizza-item--img img').src = pizza.img;
    pizzaSingle.querySelector('.pizza-item--price').innerHTML = `${pizza.price.toFixed(2)}`;
    pizzaSingle.querySelector('.pizza-item--name').innerHTML = pizza.name;
    pizzaSingle.querySelector('.pizza-item--desc').innerHTML = pizza.description;
    
    
    
    

    // fill up 
    selectItem('.pizza-area').append(pizzaSingle);

})