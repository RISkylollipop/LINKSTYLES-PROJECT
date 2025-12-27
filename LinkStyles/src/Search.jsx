import { useState } from "react";
import logo from './assets/logo.png'
function SearchBtn() {


    const [search, setSearch] = useState();

    function searchWords(e) {
        setSearch(e.target.value)
    }



    return (
        <>
            <span className="searchcontainer">
                <span className="logoimage"><img src={logo} alt="Our Logo"  /> &nbsp; LinkStyle &trade;</span>
                <input type="search" name={search} onChange={searchWords} value={search} placeholder="Search" className="searchbar" id="" />
                <i className="bi bi-search"></i>
            </span>
        </>
    );
}


export default SearchBtn