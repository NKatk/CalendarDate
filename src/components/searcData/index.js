import React from 'react';

import './search.css';

const SearchData = ({active, onChangeFilter, events}) =>{

    return (
        <div className='searchData'>
            <select onChange={onChangeFilter} value={active} className='selectData'>
                <option className='optionsData' value={false}>Дата</option>
                {
                    events.map((item, i)=>(
                        <option className='optionsData' key={i} value={item.dateEvent}>{item.dateEvent}</option>
                    ))
                }
            </select>
        </div>
    )
};

export {SearchData};
