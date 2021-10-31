const selectItem = (el) => { return document.querySelector(el); }
const selectAll = (el) => {return document.querySelectorAll(el);}


let modalQty = 1;
let cart = [];
let modalKey = 0;
// make loop for pizzas items
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
        modalQty = 1;
        modalKey = key;
        
        selectItem('.pizzaInfo h1').innerHTML = pizzaJson[key].name;
        selectItem('.pizzaBig img').src = pizzaJson[key].img;
        selectItem('.pizzaInfo--desc').innerHTML = pizzaJson[key].description;

        selectItem('.pizzaInfo--size.selected').classList.remove('selected')

        selectAll('.pizzaInfo--size').forEach((size, sizeIndex) => {
            if(sizeIndex == 2){
                size.classList.add('selected')
            }

            size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex];
        })

        // quantity default of modal
        selectItem('.pizzaInfo--qt').innerHTML = modalQty;

        selectItem('.pizzaInfo--actualPrice').innerHTML = `${pizzaJson[key].price.toFixed(2)}`;

        selectItem('.pizzaWindowArea').style.opacity = 0;
        selectItem('.pizzaWindowArea').style.display = 'flex';
        setTimeout(()=> {
            selectItem('.pizzaWindowArea').style.opacity = 1;
        }, 200)  
    })
    selectItem('.pizza-area').append(pizzaSingle);

});

//modal events
function closeModal(){
    
    selectItem('.pizzaWindowArea').style.opacity = '0';
    setTimeout(() => {
        selectItem('.pizzaWindowArea').style.display = 'none';
    }, 500)


}
selectAll('.cpizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach((item) => {
    item.addEventListener('click', closeModal);
});



selectItem('.pizzaInfo--qtmenos').addEventListener('click', () => {
    if(modalQty > 1){
        modalQty -= 1;
        selectItem('.pizzaInfo--qt').innerHTML = modalQty;
    }
});


selectItem('.pizzaInfo--qtmais').addEventListener('click', () => {
    modalQty += 1;
    selectItem('.pizzaInfo--qt').innerHTML = modalQty;
});

// select pizzas sizes
selectAll('.pizzaInfo--size').forEach((size, sizeIndex) => {
    size.addEventListener('click', () => {
        selectItem('.pizzaInfo--size.selected').classList.remove('selected');
        size.classList.add('selected');
    })
})

selectItem('.pizzaInfo--addButton').addEventListener('click', () => {
    let size = parseInt(selectItem('.pizzaInfo--size.selected').getAttribute('data-key'));
    cart.push({
        id: pizzaJson[modalKey].id,
        size,
        qty: modalQty
    })
    closeModal();
})