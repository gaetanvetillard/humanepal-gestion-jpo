import { useEffect, useState } from "react";

import CrepesIcon from "./icons/crepe.png";
import CakeIcon from "./icons/cake.png";
import CookieIcon from "./icons/cookies.png";

import CoffeeIcon from "./icons/coffee.png";
import TeaIcon from "./icons/tea.png";
import CocaColaIcon from "./icons/cola.png";
import OrangeJuiceIcon from "./icons/orange-juice.png";
import DrinksIcon from "./icons/drinks.png";

const sellingItems = [
  {id: 0, name: "Crêpe", quantity: 0, price: 0.8, total: 0}, 
  {id: 1, name: "Quatre-Quarts", quantity: 0, price: 0.5, total: 0}, 
  {id: 2, name: "Cookie", quantity: 0, price: 0.8, total: 0}, 
  {id: 3, name: "Café", quantity: 0, price: 1.0, total: 0}, 
  {id: 4, name: "Thé", quantity: 0, price: 1.0, total: 0}, 
  {id: 5, name: "Coca", quantity: 0, price: 1.0, total: 0}, 
  {id: 6, name: "Jus d'orange", quantity: 0, price: 1.0, total: 0}, 
  {id: 7, name: "Ice Tea", quantity: 0, price: 1.0, total: 0}, 
]


function App() {
  const [orderList, setListOrder] = useState(sellingItems);
  const [total, setTotal] = useState(0);
  const [reduction, setReduction] = useState(0);



  useEffect(() => {
    let total_ = 0;
    for (let item of orderList) {
      total_ += item.total;
    }

    let reduction_ = 0;
    if (orderList[0].quantity >= 2) {
      if (orderList[0].quantity % 2 === 0)
        reduction_ = (orderList[0].quantity / 2) * 0.10
      else
        reduction_ = ((orderList[0].quantity-1) / 2) * 0.10
    }

    setTotal(total_ - reduction_);
    setReduction(reduction_);
  }, [orderList])


  const addItem = item_id => {
    let newList = [...orderList];
    newList[item_id].quantity++;
    newList[item_id].total += newList[item_id].price;
    setListOrder(newList)
  }

  const removeItem = item_id => {
    if (orderList[item_id].quantity > 0) {
      let newList = [...orderList];
      newList[item_id].quantity--;
      newList[item_id].total -= newList[item_id].price;
      setListOrder(newList)
    }
  }

  const clearOrder = () => {
    setListOrder([
    {id: 0, name: "Crêpe", quantity: 0, price: 0.8, total: 0}, 
      {id: 1, name: "Quatre-Quarts", quantity: 0, price: 0.3, total: 0}, 
      {id: 2, name: "Cookie", quantity: 0, price: 0.5, total: 0}, 
      {id: 3, name: "Café", quantity: 0, price: 1.0, total: 0}, 
      {id: 4, name: "Thé", quantity: 0, price: 1.0, total: 0}, 
      {id: 5, name: "Coca", quantity: 0, price: 1.0, total: 0}, 
      {id: 6, name: "Jus d'orange", quantity: 0, price: 1.0, total: 0}, 
      {id: 7, name: "Ice Tea", quantity: 0, price: 1.0, total: 0}, 
    ]);

    setReduction(0);
  }

  const payOrder = () => {
    let data = `${total}`
    for (let item of orderList) {
      data += `,${item.quantity}`
    }

    fetch(`http://127.0.0.1:5000/add_order?data=${data}`, {method: "POST"})
      .then(res => {
        if (res.ok) {
          console.log(res);
          clearOrder();
        } else {
          alert("Veuillez lancer le serveur.");
        }
      });
  }

  return (
    <>

      <div id="main">
        <div id="components">
          <h1>Sélectionnez un item</h1>
          <div id="categories">

            <div style={{background: "#a84250"}} onClick={() => addItem(0)} onContextMenu={() => removeItem(0)}>
              <img src={CrepesIcon} alt="crepes icon" />
              <h2>Crêpe</h2>
            </div>

            <div style={{background: "#30b5a9"}} onClick={() => addItem(1)} onContextMenu={() => removeItem(1)}>
              <img src={CakeIcon} alt="cake icon" />
              <h2>Quatre-Quarts</h2>
            </div>

            <div style={{background: "#199133"}} onClick={() => addItem(2)} onContextMenu={() => removeItem(2)}>
              <img src={CookieIcon} alt="cookie icon" />
              <h2>Cookie</h2>
            </div>

            <div style={{background: "#ca8a56"}} onClick={() => addItem(3)} onContextMenu={() => removeItem(3)}>
              <img src={CoffeeIcon} alt="coffee icon" />
              <h2>Café</h2>
            </div>

            <div style={{background: "#1c63ad"}} onClick={() => addItem(4)} onContextMenu={() => removeItem(4)}>
              <img src={TeaIcon} alt="coffee icon" />
              <h2>Thé</h2>
            </div>

            <div style={{background: "#edbf2d"}} onClick={() => addItem(5)} onContextMenu={() => removeItem(5)}>
              <img src={CocaColaIcon} alt="coca cola icon" />
              <h2>Coca Cola</h2>
            </div>

            <div style={{background: "#edaa24"}} onClick={() => addItem(6)} onContextMenu={() => removeItem(6)}>
              <img src={OrangeJuiceIcon} alt="orange juice icon" />
              <h2>Jus d'orange</h2>
            </div>

            <div style={{background: "#44359b"}} onClick={() => addItem(7)} onContextMenu={() => removeItem(7)}>
              <img src={DrinksIcon} alt="ice tea icon" />
              <h2>Ice Tea</h2>
            </div>

            <div style={{cursor: "default"}}/>
          </div>

        </div>

        <div id="list">
          <h2>Commande :</h2>
          <ul id="order_list">
            {orderList && orderList.map(item => {
              if (item.quantity > 0) {
                return (
                  <li className="order_item" key={item.id}>
                    <span className="order_item_quantity">{item.quantity} x </span>
                    <span className="order_item_name">{item.name} </span>
                    <span className="order_item_price">{item.total.toFixed(2)} €</span>
                  </li>
                )
              } else {
                return null;
              }
            })}
          </ul>
          <div id="total">
            <h2>Réduction : <span id="reduction">{reduction.toFixed(2)} €</span></h2>
            <h3>Total : <span id="total_price">{total.toFixed(2)} €</span></h3>
            <div id="buttons">
              <div id="cancel_button" onClick={() => clearOrder()}>Annuler</div>
              <div id="pay_button" onClick={() => payOrder()}>Payer</div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
