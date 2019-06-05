import React from 'react';

import './newevent.css';

const NewEvent = ({newEvent, onChangeInput, onSubmitChange, errorsCreate}) =>{

    return (
        <form onSubmit={onSubmitChange} className='formNewEvent'>
            <h3 className='formTitle'>Добавить мероприятие</h3>

            <div className='bodyForm'>
                <div className='divNew'>
                    <label htmlFor="title" className='label'>Название</label>
                    <br/>
                    <input
                        type="text"
                        id='title'
                        name='title'
                        onChange={onChangeInput}
                        value={newEvent.title}
                        className={errorsCreate.title.length !== 0?'newInputError':'newInput'}
                    />
                    {errorsCreate.title.length !== 0 && errorsCreate.title.map((item, i)=>(
                        <i key={i} className='errorMsgForm'>{item}</i>
                    ))}
                </div>

                <div className='divNew'>
                    <label htmlFor="dateEvent" className='label'>Дата</label>
                    <br/>
                    <input
                        type="text"
                        id='dateEvent'
                        name='dateEvent'
                        onChange={onChangeInput}
                        value={newEvent.dateEvent}
                        className={errorsCreate.dateEvent.length !== 0?'newInputError':'newInput'}
                        placeholder='DD.MM.YYYY'
                    />
                    {errorsCreate.dateEvent.length !== 0 && errorsCreate.dateEvent.map((item, i)=>(
                        <i key={i} className='errorMsgForm'>{item}</i>
                    ))}
                </div>

                <div className='divNew'>
                    <label htmlFor="timeStart" className='label'>Время начала</label>
                    <br/>
                    <input
                        type="text"
                        id='timeStart'
                        name='timeStart'
                        onChange={onChangeInput}
                        value={newEvent.timeStart}
                        className={errorsCreate.timeStart.length !== 0?'newInputError':'newInput'}
                        placeholder='HH.MM'
                    />
                    {errorsCreate.timeStart.length !== 0 && errorsCreate.timeStart.map((item, i)=>(
                        <i key={i} className='errorMsgForm'>{item}</i>
                    ))}
                </div>

                <div className='divNew'>
                    <label htmlFor="timeEnd" className='label'>Время конца</label>
                    <br/>
                    <input
                        type="text"
                        id='timeEnd'
                        name='timeEnd'
                        onChange={onChangeInput}
                        value={newEvent.timeEnd}
                        className={errorsCreate.timeEnd.length !== 0?'newInputError':'newInput'}
                        placeholder='HH.MM'
                    />
                    {errorsCreate.timeEnd.length !== 0 && errorsCreate.timeEnd.map((item, i)=>(
                        <i key={i} className='errorMsgForm'>{item}</i>
                    ))}
                </div>

            </div>

            <input type="submit" value='ДОБАВИТЬ' className='btnNewEvent'/>
        </form>
    )
};

export {NewEvent};
