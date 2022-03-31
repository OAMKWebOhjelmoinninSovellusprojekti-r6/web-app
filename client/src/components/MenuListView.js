import React from 'react';
import Menu from './Menu'
import axios from 'axios' 
import { useState, useEffect} from 'react';

export default function MenuListView( {props} ) {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const getItems = async () => {
            const results = await axios.get('http://www.localhost:3001/item/3');
            console.log(results.data.itemInfo);
                setItems([results.data.itemInfo]);
        }
        getItems();
        console.log(items);
    },[]);

    return (
        <div>
            {items.map(i=>
            <Menu key={i.iditem} name={i.name} description={i.description}/>)
}
        </div>
            
    )
}
