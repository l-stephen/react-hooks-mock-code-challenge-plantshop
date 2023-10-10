import React from "react";
import PlantCard from "./PlantCard";

function PlantList({plants, onUpdate, onDelete}) {
  console.log(plants)
  return (
    <ul className="cards">{
      plants.map((plant) =>{
        return (<PlantCard key ={plant.id} plant = {plant} onUpdate={onUpdate} onDelete={onDelete}/>)
      })
    }</ul>
  );
}

export default PlantList;
