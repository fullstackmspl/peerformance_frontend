// todo - old code(unused)
import {useState} from "react";

let searchedSIC = [];
let searchedCategory = [];

function checkLevel(SICCode) {
    let sic_Code_splitter = SICCode.split(".");

    if (sic_Code_splitter.length < 5) {
        return sic_Code_splitter.length
    }
}

function searchListClicked(e) {
    let SICCode = e.target.id;
    checkLevel(searchedSIC[SICCode])
}


function SearchObject() {

    let dataStringify = JSON.stringify(localStorage.getItem('categories')).replace(/\\"/g, '"');
    let [results, setResults] = useState([]);


    function searchForString() {
        let userInput = document.getElementById("searchBox").value;

        // let userInput = document.getElementById("searchBox").value;
        let regex = new RegExp(`"SIC":"(?<sic>[A-Z]\\.[0-9]+\\.[0-9]+\\.[0-9]+(?:\\.[0-9]+){0,2})",` +
            `"Category":"(?<category>[a-zA-Z0-9 ,;\\/\\(\\)\\.-]*`
            + userInput + `[a-zA-Z0-9 ,;\\/\\(\\)\\.-]*)"`, "g")

        let output;
        while (output = regex.exec(dataStringify)) {
            searchedSIC.push(output.groups.sic);
            searchedCategory.push(output.groups.category);
        }
        setResults(searchedCategory);
    }


    return (

        <div className="container">
            <br/>
            <div className="input-group mb-3">
                <input id="searchBox" type="text" className="form-control" placeholder="Search for category"
                       aria-label="Recipient's username" aria-describedby="basic-addon2"/>
                <div className="input-group-append">
                    <button className="btn btn-outline-primary" type="button" onClick={searchForString}>Button</button>
                </div>
            </div>
            <ul id="results">

                {results.map((result, index) => (
                    <li key={index} id={index} style={{color: "blue"}} onClick={searchListClicked}>
                        {result}
                        <hr/>
                    </li>
                ))}

            </ul>
        </div>
    )
}

export default SearchObject;
