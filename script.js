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
    
    let indentifier = pizzaJson[modalKey].id+'@'+size;

    let key = cart.findIndex((item) => item.indentifier == indentifier);


    if(key > -1){
        cart[key].qty += modalQty;

    }else{
        cart.push({
            indentifier,
            id: pizzaJson[modalKey].id,
            size,
            qty: modalQty
        })
    }

    updateCart();
    closeModal();
})

selectItem('.menu-openner').addEventListener('click', () => {
    if(cart.length > 0){
        selectItem('aside').style.left = '0';
    }
})
selectItem('.menu-closer').addEventListener('click', () => {
    selectItem('aside').style.left = '100vw';
})

function updateCart(){
    selectItem('.menu-openner span').innerHTML = cart.length;

    if(cart.length > 0){
        selectItem('aside').classList.add('show');
        selectItem('.cart').innerHTML = '';

        let subTotal = 0;
        let priceOff = 0;
        let total = 0;

        for(let i in cart){
            let pizzaItem = pizzaJson.find((item) => item.id == cart[i].id);
            subTotal += pizzaItem.price * cart[i].qty;
            let cartItem = selectItem('.models .cart--item').cloneNode(true);
            let pizzaSizeName;

            switch(cart[i].size){
                case 0:
                    pizzaSizeName = 'P';
                    break;
                case 1: 
                    pizzaSizeName = 'M';
                    break
                case 2:
                    pizzaSizeName = 'G';
                    break
            }

            let pizzaCart = `${pizzaItem.name} (${pizzaSizeName})`

            cartItem.querySelector('img').src = pizzaItem.img;
            cartItem.querySelector('.cart--item-name').innerHTML = pizzaCart;
            cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qty;
            cartItem.querySelector('.cart--item-qtmenos').addEventListener('click', () => {
                if(cart[i].qty > 1){
                    cart[i].qty --;
                } else{
                    cart.splice(i, 1);
                }
                updateCart();
            })

            cartItem.querySelector('.cart--item-qtmais').addEventListener('click', () => {
                cart[i].qty ++;
                updateCart();
            })

            selectItem('.cart').append(cartItem);
        }
        priceOff = subTotal * 0.1;
        total = subTotal - priceOff;

        selectItem('.subtotal span:last-child').innerHTML = `R$ ${subTotal.toFixed(2)}`;
        selectItem('.desconto span:last-child').innerHTML = `R$ ${priceOff.toFixed(2)}`;
        selectItem('.total span:last-child').innerHTML = `R$ ${total.toFixed(2)}`;

    }else{
        selectItem('aside').classList.add('show');
        selectItem('aside').style.left = '100vw';
    }
}