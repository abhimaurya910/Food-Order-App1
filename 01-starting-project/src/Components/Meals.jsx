
import useHttp from "../hooks/useHttp.js";
import MealsItem from "./MealsItem.jsx";
import Error from "./Error.jsx";

const requestConfig ={};
export default function  Meals() {
    const {
      data: loadMeals,
      isLoading,
      error,
    } =useHttp('http://localhost:3000/meals' , requestConfig , []);

    if(isLoading){
      return<p>Fetching meals...</p>;
    }

    if(error)
    {
      return <Error title="Failed to fetch meals" message={error}/>;
    }
    return (
        <>
          <ul id="meals">
            {loadMeals.map((meal) => (
             <MealsItem key={meal.id} meal={meal}/>
            ))}
          </ul>
        </>
      );
    }


