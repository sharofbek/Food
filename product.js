

const productToHtml = () => {
    const product_hmtl = [];

    for (let i of product) {
        product_hmtl.push(`
            <div class="menu-card">
                <img src="${i.img}" alt="">
                <div class="sena">
                    <h5>${i.title}</h5>
                    <h5>${i.price} $</h5>
                </div>
                <p>${i.text} </p>
                <div class="stars">
                <div> ${i.rate} </div>
                ${card.some(item => item.id === i.id) ?

                `<div>
                        <button class="btn" onclick="minusCount(${i.id})">-</button>
                        <b style="font-size:26px;">
                            ${getCount(i.id)}
                        </b>
                        <button  onclick="plusCount(${i.id})" class="btn  ${getCount(i.id) >= i.stock && "no_active"}" >+</button>
                    </div>`
                :
                `<button class=" btn px-3 py-2 text-white"  onclick="addToCard(${i.id})">+</button>`
            }
                
                </div>
            </div>
        
        `)
    }

    document.getElementById('menu').innerHTML = product_hmtl.join('');


}


const renderOrderPrice = () => {
    let totalPrice = card.reduce((acc, curr) => acc += curr.count * curr.price, 0);
    let tax = 2;
    const orderContent = `
        <div class="my-5 order">
            <h3 class="px-3"> Yig'ilgan narxi: ${card.reduce((acc, curr) => acc += curr.count * curr.price, 0)}$</h3>
            <h3 class="px-3"> Foiz: 2%</h3>
            <h3 class="px-3"> Product soni: ${card.reduce((acc, curr) => acc += curr.count, 0)} </h3> <br> <hr>
            <h3 class="px-3"></h3>
            <div class=" justify-content-between px-3 py-3">
            <h1> Foiz bilan:  ${totalPrice * ((100 + tax) / 100)}$</h1>
            <button onclick="sendOrder()" id="order" class="order btn btn-info px-5  text-white">Sotib olish</button>
            </div>
        </div>
    `
    document.getElementById('orderPrice').innerHTML = orderContent;
}




const productToModal = () => {
    const Modal = [];
    let index = 0;
    for (let item of card) {
        index++
        Modal.push(
            `
            <tr>
                
                <td class="text my-3"><img style="width:83.5px;border-radius:10px;" src="${item.img}" alt="nothing"></td>
                <td >${item.title}</td>
                <td >${item.count}</td>
                <td >${item.price}$</td>
                <td >${item.count * item.price}$</td>
                <td class="text-center"><button class="btn btn-danger" onclick="deleteBtn(${item.id})" id="delete">Delete</button></td>
            </tr>
            `
        )
    }
    document.getElementById('tableBody').innerHTML = Modal.join(' ');
    renderOrderPrice();
}

const productInModal = () => {
    const Modal = [];
    let index = 0;
    for (let item of card) {
        index--
        Modal.unshift(
            `
            <tr>
                
                <td class="text my-3"><img style="width:83.5px;border-radius:10px;" src="${item.img}" alt="nothing"></td>
                <td >${item.title}</td>
                <td >${item.count}</td>
                <td >${item.price}$</td>
                <td >${item.count * item.price}$</td>
                <td class="text-center"><button class="btn btn-danger" onclick="deleteBtn(${item.id})" id="delete">Delete</button></td>
            </tr>
            `
        )
    }
    document.getElementById('tableBody').innerHTML = Modal.join(' ');
    renderOrderPrice();
}
const productIn = () => {
    const Modal = [];
    let index = 0;
    for (let item of card) {
        index--
        Modal.pop(
            `
            <tr>
                
                <td class="text my-3"><img style="width:83.5px;border-radius:10px;" src="${item.img}" alt="nothing"></td>
                <td >${item.title}</td>
                <td >${item.count}</td>
                <td >${item.price}$</td>
                <td >${item.count * item.price}$</td>
                <td class="text-center"><button class="btn btn-danger" onclick="deleteBtn(${item.id})" id="delete">Delete</button></td>
            </tr>
            `
        )
    }
    document.getElementById('tableBody').innerHTML = Modal.join(' ');
    renderOrderPrice();
}

function sendOrder() {
    if (card.length === 0) {
        alert("Tanlangan Product Yo'q");
    }
    else {
        productIn()
        productToHtml();
    }
    toggleModal();
    minusCount()
}







const getCount = id => {
    return card.find(item => item.id === id)?.count;

}

const addToCard = (id) => {
    const response = product.find(i => i.id === id);
    card.push({ ...response, count: 1 });
    productToHtml();
    productToModal()


}

const plusCount = (id) => {
    const index = card.findIndex(i => i.id === id);
    card[index].count = card[index].count + 1;
    productToHtml();
    productToModal()

}
const minusCount = (id) => {
    const index = card.findIndex(i => i.id === id);
    if (card[index].count === 1) {
        card.splice(index, 1)
    } else {
        card[index].count = card[index].count - 1;
    }
    productToHtml();
    productInModal()
}



const toggleModal = () => {
    let list = document.getElementById('product-modal').classList.toggle('activ_modal');
    console.log(list);
}



const deleteBtn = (id) => {
    const index = card.findIndex(item => item.id === id);
    card.splice(index, 1);
    productToModal();
};
const deleteAllBtn = (id) => {
    const index = card.findIndex(item => item.id === id);
    card.splice(index, Infinity);
    productToModal();
};


const close = () => {
    document.getElementById('product-modal').style.display = 'none'
}




renderOrderPrice()
productToHtml()



