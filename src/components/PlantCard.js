import React, {useState} from "react";

function PlantCard({plant, onUpdate, onDelete}){
  const {name, image, price} = plant
  const [isInStock, setInStock] = useState(true)
  const [newPrice, setPrice] = useState(price)

  function handleStockClick(){
    // setInStock((inStock) => !inStock)
    setInStock(!isInStock)
  }
  function handleSubmit(e){
    e.preventDefault()
    fetch(`http://localhost:6001/plants/${plant.id}`, {
      method: "PATCH",
      headers:{"Content-Type": "application/json"},
      body: JSON.stringify({price: newPrice})
    })
    .then(res => res.json())
    .then(updatePlant => {
       onUpdate(updatePlant)
    })
  }

  function handleDelete(){
    fetch(`http://localhost:6001/plants/${plant.id}`, {
      method:"DELETE",
    })
    onDelete(plant.id)
  }
  return (
    <li className="card">
      <img src={image} alt={name} />
      <h4>{name}</h4>
      <p>Price: {price}</p>
      {isInStock ? (
        <button className="primary" onClick={handleStockClick}>In Stock</button>
      ) : (
        <button onClick={handleStockClick}>Out of Stock</button>
      )}
      <button onClick = {handleDelete}>Delete</button>
      <form onSubmit = {handleSubmit}>
        <input type="number" name="price" placeholder="Price" value = {newPrice} onChange={(e)=> setPrice(parseFloat(e.target.value))}/>
        <button>Update Price</button>
      </form>
    </li>
  );
}

export default PlantCard;
