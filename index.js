import {menuArray} from '/data.js'
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';
let orderArray = []
let hasOrder = false
let orderListHtml = ''
let totalAmount = 0
const payForm = document.getElementById('pay-form')


document.addEventListener('click', function(e){
     if (e.target.dataset.item) {
         addItemToOrder(e.target.dataset.item)
     } else if (e.target.dataset.remove) {
         removeItemFromOrder(e.target.dataset.remove)
     } else if (e.target.dataset.checkout) {
         checkoutOrder()
     }
})

payForm.addEventListener('submit', function(e){
    e.preventDefault()
    document.getElementById('pay-modal').style.display = 'none'
    orderArray = []
    render()
    const payFormData = new FormData(payForm)
    const name = payFormData.get('customer-name')
    showConfirm(name)
    payForm.reset()
    
})

function showConfirm(customerName){
    const confirm = document.getElementById('confirm')
    confirm.classList.toggle('hidden')
    confirm.innerHTML = `Thanks, ${customerName}. Your order is on its way!`
    setTimeout(function(){
    confirm.classList.toggle('hidden')
}, 3000)
}

function checkoutOrder(){
    document.getElementById('pay-modal').style.display = 'flex'
}


function getOrderHtml(){
   orderListHtml = ''
    orderArray.forEach(function(orderItem){
   orderListHtml += `<section class='items-ordered'>
                <div class='item-name'>${orderItem.name}</div>
                <div class='remove-container'>
                    <button class='remove' data-remove='${orderItem.uuid}'>Remove</button>
                </div>
                <div class='item-price'>${'$'+orderItem.price}</div>
                </section>
                `
   })
   return orderListHtml
}

function getTotalPrice(){
    totalAmount = 0
    orderArray.forEach(function(orderItem){
                totalAmount += orderItem.price
   })
   return totalAmount
}
   
   
   
function addItemToOrder(itemId){
       const targetItemObj = menuArray.filter(function(item){
           return `${item.id}` === itemId
       })[0]
      
       orderArray.push({
           name: targetItemObj.name,
           price: targetItemObj.price,
           uuid: uuidv4()
       })
        render() 
      } 
        
      
function removeItemFromOrder(itemUuid){
    let index = 0
        orderArray.forEach(function (item){
      if (itemUuid === item.uuid){
           index = orderArray.indexOf(item);
      }}
      )   
    orderArray.splice(index,1)
    render()
}

       
  
       
   


const menuListHtml = menuArray.map(function(item){
    return `<section class='card'>
    <div class='card-start'>
        <p class='emoji'>${item.emoji}</p>
        </div>
    <div class='card-mid'>
        <h5>${item.name}</h5>
        <p class='ingredients'>${item.ingredients.join(', ')}</p>
        <p class='price'>${'$'+item.price}</p>
    </div>
    <div class='card-end'>
        <button class='add-item' data-item= '${item.id}'>+</button>
    </div>
    
    </section>
    `
    
}).join('')




document.getElementById('menu-container').innerHTML = menuListHtml


function render() {
    document.getElementById('order-container').innerHTML = getOrderHtml()
       document.getElementById('total-price').innerHTML = '$' + getTotalPrice()
       
      if (!hasOrder){
          document.getElementById(`order`).classList.toggle('hidden')
          hasOrder = !hasOrder
          } else if (orderArray.length === 0){
            document.getElementById(`order`).classList.toggle('hidden')
            hasOrder = !hasOrder
          }
}