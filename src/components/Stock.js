import React from "react";


function Stock({id, name, price}){
    return ( <li key={id}>
        {name} {price}
    </li>);   
}

export default Stock;