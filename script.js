const selectItem = (el) => {
    return document.querySelector(el)
}
const selectAll = (el) => {
    return document.querySelectorAll(el);
}


pizzaJson.map((pizza, index) => {
    //make a clone 
    let pizzaSingle = selectItem('.models .pizza-item').cloneNode(true);

    //id for get the data
    pizzaSingle.setAttribute('data-key', index);

    pizzaSingle.querySelector('.pizza-item--img img').src = pizza.img;
    pizzaSingle.querySelector('.pizza-item--price').innerHTML = `${pizza.price.toFixed(2)}`;
    pizzaSingle.querySelector('.pizza-item--name').innerHTML = pizza.name;
    pizzaSingle.querySelector('.pizza-item--desc').innerHTML = pizza.description;

    // PopUP show up 
    pizzaSingle.querySelector('a').addEventListener('click', (e) => {
        e.preventDefault();
        let key = e.target.closest('.pizza-item').getAttribute('data-key');
        
        selectItem('.pizzaInfo h1').innerHTML = pizzaJson[key].name;
        selectItem('.pizzaBig img').src = pizzaJson[key].img;
        selectItem('.pizzaInfo--desc').innerHTML = pizzaJson[key].description;

        selectAll('.pizzaInfo--size').forEach((size, sizeIndex) => {


            size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex];
        })


        selectItem('.pizzaInfo--actualPrice').innerHTML = `${pizzaJson[key].price.toFixed(2)}`

        selectItem('.pizzaWindowArea').style.opacity = 0;
        selectItem('.pizzaWindowArea').style.display = 'flex';
        setTimeout(()=> {
            selectItem('.pizzaWindowArea').style.opacity = 1;
        }, 200)
        
        
    })
    selectItem('.pizza-area').append(pizzaSingle);

})