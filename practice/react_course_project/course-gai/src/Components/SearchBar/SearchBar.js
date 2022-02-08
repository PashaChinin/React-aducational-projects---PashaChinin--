import { useState } from "react";



const SearchBar = (props) => {
   const [searchValue, setSearchValue] = useState(null)



  const  onChangeEventHandler  = async (event) => {

       console.log(event.target.value + " VALUE")
       await setSearchValue(event.target.value)
        console.log(searchValue + " STATE")
  }


    return (
    <div>
        <input type={"search"} id={"page-search"} onChange={onChangeEventHandler}/>
        <button onClick={() => {props.onSubmitHandler(searchValue)}}>Search</button>
    </div>
 )
}
export default SearchBar