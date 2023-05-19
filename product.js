console.log(product);


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


const tableToHtml = () => {
    const table_html = [];
    for (let i of product) {
        table_html.push(`
                    <tr class="tr">
                        <td class="td"> ${i.id} </td>
                        <td class="td"><img src="${i.img}" class="img"> </td>
                        <td class="td"> ${i.title} </td>
                        <td class="td"> ${i.price} $ </td>
                        <td class="td"> ${''} </td>
                        <td class="td"> <button class="btn btn-danger" onclick="deleteProduct()"> Delete </button> </td>
                    </tr>
                
        
        
        `)

    }

    document.getElementById('table').innerHTML = table_html.join('')
}



const getCount = id => {
    return card.find(item => item.id === id)?.count;

}

const addToCard = (id) => {
    const response = product.find(i => i.id === id);
    card.push({ ...response, count: 1 });   


    tableToHtml()
    productToHtml();


}

const plusCount = (id) => {
    const index = card.findIndex(i => i.id === id);
    card[index].count = card[index].count + 1;
    tableToHtml()
    productToHtml();

}
const minusCount = (id) => {
    const index = card.findIndex(i => i.id === id);
    if (card[index].count === 1) {
        card.splice(index, 1)
    } else {
        card[index].count = card[index].count - 1;
    }
    productToHtml();
}

const deleteProduct = (id) => {
    
}


const toggleModal = () => {
    let list = document.getElementById('product-modal').classList.toggle('activ_modal');
    console.log(list);
}

















productToHtml()



