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

    // PopUP 
    pizzaSingle.querySelector('a').addEventListener('click', (e) => {
        e.preventDefault();
        
        selectItem('.pizzaWindowArea').style.opacity = 0;
        setTimeout(()=> {
            selectItem('.pizzaWindowArea').style.opacity = 1;
        }, 200)
        selectItem('.pizzaWindowArea').style.display = 'flex';
        
    })

    
    
    
    
    

    selectItem('.pizza-area').append(pizzaSingle);

})