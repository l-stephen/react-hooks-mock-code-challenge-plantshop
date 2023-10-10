import React, {useState, useEffect} from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {

  const [plants, setPlants] = useState([])
  const [search, setSearch] = useState("")

  useEffect(()=>{
    fetch("http://localhost:6001/plants")
    .then(res => res.json())
    .then((plantsArray) => {
      setPlants(plantsArray)
      console.log(plantsArray)
    })
  }, [])

  function handleAddPlant(newPlant){
    const updatedPlants = [...plants, newPlant]
    setPlants(updatedPlants)
  }
  console.log(search)

  const displayPlants = plants.filter((plant) => {
    return plant.name.toLowerCase().includes(search.toLowerCase())
  })

  function handleUpdatePlant(newPlant){
    const updatedPlants = plants.map((plant)=> {
      if(plant.id === newPlant.id){
        return newPlant
      }
      else{
        return plant
      }
    })
    setPlants(updatedPlants)
  }

  function handleDelete(id){
    const newPlants = plants.filter((plant)=> plant.id !== id)
    setPlants(newPlants)
  }

  return (
    <main>
      <NewPlantForm handleAddPlant = {handleAddPlant} />
      <Search search = {search} onSearch = {setSearch} />
      <PlantList plants = {displayPlants} onUpdate={handleUpdatePlant} onDelete = {handleDelete}/>
    </main>
  );
}

export default PlantPage;
