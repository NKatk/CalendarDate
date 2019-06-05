import React from 'react';
import FeatherIcon from 'feather-icons-react';

import './event.css';

const Events = ({events, changeEvent, onDeleteEvent, onChangeEvent, onChangeInputData, onChangeEventInputSave, errorsChange}) =>{
    return(
        <div className='container'>
            {
                events.map((items,i)=>(
                    <div key={i} className='content'>
                        <table className='tableData'>
                            <tbody>
                            <tr key='0' className='trData'>
                                <th colSpan={6} className='thData'>{items.dateEvent}</th>
                            </tr>
                            {
                                items.eventsData.map((item,y)=> {
                                    if (!item.change) {
                                        return (
                                            <tr key={y} className='trData'>
                                                <td className='tdData'>{item.title}</td>
                                                <td style={{visibility: 'hidden'}}
                                                    className='tdData'>{item.dateEvent}</td>
                                                <td className='tdData'>{item.timeStart}</td>
                                                <td className='tdData'>{item.timeEnd}</td>
                                                <td className='tdData'>
                                                    <FeatherIcon onClick={() => onChangeEvent(items.dateEvent, item.id)} icon="edit" className='buttonTableChange'/></td>
                                                <td className='tdData'>
                                                    <FeatherIcon onClick={() => onDeleteEvent(items.dateEvent, item.id)} icon="x" className='buttonTableDelete'/></td>
                                            </tr>
                                        )
                                    }
                                    return (
                                        <tr key={y} className='trData'>
                                            <td className='tdData'>
                                                <input
                                                    type="text"
                                                    name='title'
                                                    onChange={onChangeInputData}
                                                    value={changeEvent.title}
                                                    className='changeInput'
                                                />
                                            </td>
                                            <td className='tdData'>
                                                <input
                                                    type="text"
                                                    name='dateEvent'
                                                    onChange={onChangeInputData}
                                                    value={changeEvent.dateEvent}
                                                    className='changeInput'
                                                />
                                            </td>
                                            <td className='tdData'>
                                                <input
                                                    type="text"
                                                    name='timeStart'
                                                    onChange={onChangeInputData}
                                                    value={changeEvent.timeStart}
                                                    className='changeInput'
                                                />
                                            </td>
                                            <td className='tdData'>
                                                <input
                                                    type="text"
                                                    name='timeEnd'
                                                    onChange={onChangeInputData}
                                                    value={changeEvent.timeEnd}
                                                    className='changeInput'
                                                />
                                            </td>
                                            <td className='tdData'>
                                                <FeatherIcon onClick={() => onChangeEventInputSave(items.dateEvent, item.id)} icon="check" className='buttonTableOk'/></td>
                                            <td className='tdData'>
                                                <FeatherIcon onClick={() => onDeleteEvent(items.dateEvent, item.id)} icon="x" className='buttonTableDelete'/></td>
                                        </tr>
                                    )
                                })
                            }
                            </tbody>
                        </table>
                    </div>

                ))
            }
            <div>
                {errorsChange.title.length !== 0 && errorsChange.title.map((item, i)=>(
                    <i key={i} className='errorMsgForm'>{item}</i>
                ))}
                {errorsChange.timeStart.length !== 0 && errorsChange.timeStart.map((item, i)=>(
                    <i key={i} className='errorMsgForm'>{item}</i>
                ))}
                {errorsChange.timeEnd.length !== 0 && errorsChange.timeEnd.map((item, i)=>(
                    <i key={i} className='errorMsgForm'>{item}</i>
                ))}
                {errorsChange.dateEvent.length !== 0 && errorsChange.dateEvent.map((item, i)=>(
                    <i key={i} className='errorMsgForm'>{item}</i>
                ))}
            </div>
        </div>
    )
};

export {Events};
