import React, {Component} from 'react';
import {NewEvent, Events, SearchData} from './components';
import uniqid from 'uniqid';

import './app.css';

class App extends Component{
    constructor(){
        super();
        this.state = {
            active: '',
            events: [],
            newEvent: {
                title: '',
                timeStart: '',
                timeEnd: '',
                dateEvent: ''
            },
            changeEvent: {
                title: '',
                timeStart: '',
                timeEnd: '',
                dateEvent: ''
            },
            errorsCreate: {title:[], dateEvent:[], timeStart:[], timeEnd:[]},
            errorsChange: {title:[], dateEvent:[], timeStart:[], timeEnd:[]}
        }
    }

    //блок фильтра
    onChangeFilter = (e) =>{
        let index = this.state.events.findIndex(item=>item.dateEvent === e.target.value);
        if(index === -1) index='';
        this.setState({
            active: index
        })
    };


    //блок событий
    onDeleteEvent = (dateEvent, id) =>{
        let items = this.state.events;
        let indexDate = this.state.events.findIndex(item=>item.dateEvent === dateEvent);
        let indexEvent = this.state.events[indexDate].eventsData.findIndex(item=>item.id === id);
        items = this.state.events[indexDate].eventsData.splice(indexEvent, 1);
        if(this.state.events[indexDate].eventsData.length === 0){
            items = this.state.events.splice(indexDate, 1)
        }
        this.setState({
            items
        })
    };

    onChangeEvent = (dateEvent, id) =>{
        let indexDate = this.state.events.findIndex(item=>item.dateEvent === dateEvent);
        let indexEvent = this.state.events[indexDate].eventsData.findIndex(item=>item.id === id);
        let items = this.state.events[indexDate].eventsData.slice(0);
        for(let i=0; this.state.events[indexDate].eventsData.length > i; i++){
            if(this.state.events[indexDate].eventsData[i].id+'' === id+''){
                items[i].change = true;
            }else{
                items[i].change = false;
            }
        }
        this.setState({
            changeEvent: items[indexEvent]
        })
    };

    onChangeInputData =(e) =>{
        const items = this.state.changeEvent;
        items[e.target.name] = e.target.value;
        if(e.target.name === 'timeStart') {
            items.timeEnd = '';
        }
        this.setState({
            items
        })

    };

    onChangeEventInputSave = (dateEvent, id) =>{
        let result = this.checkValidData(this.state.changeEvent, id);

        if(result.result){
            let items = this.state.events;
            let indexDateDelete = this.state.events.findIndex(item=>item.dateEvent === dateEvent);
            let indexEvent = this.state.events[indexDateDelete].eventsData.findIndex(item=>item.id === id);
            items = this.state.events[indexDateDelete].eventsData.splice(indexEvent, 1);
            if(this.state.events[indexDateDelete].eventsData.length === 0){
                items = this.state.events.splice(indexDateDelete, 1)
            }

            const newObj = this.state.changeEvent;
            let indexDate = this.state.events.findIndex(item=>item.dateEvent === newObj.dateEvent);
            if(indexDate === -1){
                const newDateEvent = {
                    dateEvent: newObj.dateEvent,
                    eventsData: [
                        {id: uniqid(), title: newObj.title, timeStart: newObj.timeStart, timeEnd: newObj.timeEnd, dateEvent: newObj.dateEvent}
                    ]
                };
                const item = this.state.events.concat(newDateEvent);
                this.setState({
                    events: item,
                    errorsChange: result.errorsChange,
                    newEvent: {
                        title: '',
                        timeStart: '',
                        timeEnd: '',
                        dateEvent: ''
                    }
                })
            }else{
                const newDateEvent = {id: uniqid(), title: newObj.title, timeStart: newObj.timeStart, timeEnd: newObj.timeEnd, dateEvent: newObj.dateEvent};
                const item = Object.assign({}, this.state.events[indexDate]);
                const way = Object.assign({}, this.state);
                item.eventsData.push(newDateEvent);

                function compareEvents(eventsA, eventsB) {
                    return eventsA.timeStart - eventsB.timeStart;
                }

                item.eventsData.sort(compareEvents);
                const newItem = way.events[indexDate] = item;
                this.setState({
                    newItem,
                    errorsChange: result.errorsChange,
                    newEvent: {
                        title: '',
                        timeStart: '',
                        timeEnd: '',
                        dateEvent: ''
                    }
                })
            }
        }else{
            this.setState({
                errorsChange: result.errorsChange
            })
        }
    };


    //блок нового события
    onChangeInput = (e) =>{
        const items = this.state.newEvent;
        items[e.target.name] = e.target.value;
        if(e.target.name === 'timeStart'){
            items.timeEnd = '';
        }
        this.setState({
            items
        })
    };

    onSubmitChange = (e) =>{
        e.preventDefault();
        let result = this.checkValidData(this.state.newEvent);
        if(result.result){
            const newObj = this.state.newEvent;
            let indexDate = this.state.events.findIndex(item=>item.dateEvent === newObj.dateEvent);
            if(indexDate === -1){
                const newDateEvent = {
                    dateEvent: newObj.dateEvent,
                    eventsData: [
                        {id: uniqid(), title: newObj.title, timeStart: newObj.timeStart, timeEnd: newObj.timeEnd, dateEvent: newObj.dateEvent}
                    ]
                };

                const item = this.state.events.concat(newDateEvent);


                this.setState({
                    events: item,
                    errorsCreate: result.errorsCreate,
                    newEvent: {
                        title: '',
                        timeStart: '',
                        timeEnd: '',
                        dateEvent: ''
                    }
                })
            }else{
                const newDateEvent = {id: uniqid(), title: newObj.title, timeStart: newObj.timeStart, timeEnd: newObj.timeEnd, dateEvent: newObj.dateEvent};
                const item = Object.assign({}, this.state.events[indexDate]);
                const way = Object.assign({}, this.state);
                item.eventsData.push(newDateEvent);

                function compareEvents(eventsA, eventsB) {
                    return eventsA.timeStart - eventsB.timeStart;
                }

                item.eventsData.sort(compareEvents);
                const newItem = way.events[indexDate] = item;
                this.setState({
                    newItem,
                    errorsCreate: result.errorsCreate,
                    newEvent: {
                        title: '',
                        timeStart: '',
                        timeEnd: '',
                        dateEvent: ''
                    }
                })
            }
        }else{
            this.setState({
                errorsCreate: result.errorsCreate
            })
        }
    };

    //Проверка корректности ввода и проверка на занятость времени
    checkValidData = (obj, id) =>{
        const errorsChange = {title:[], dateEvent:[], timeStart:[], timeEnd:[]};
        const errorsCreate = {title:[], dateEvent:[], timeStart:[], timeEnd:[]};
        if(obj.title.length <= 2 || obj.title.length > 16){
            (id===0||id)?errorsChange.title.push('Количество символов названия от 3-15.'):errorsCreate.title.push('Количество символов названия от 3-15.')
        }
        if(!obj.dateEvent || obj.dateEvent){
            if(!obj.dateEvent){
                (id===0||id)?errorsChange.dateEvent.push('Введите дату.'):errorsCreate.dateEvent.push('Введите дату.')
            }else{
                let arr = obj.dateEvent.split('.');
                if(arr.length !== 3){
                    (id===0||id)?errorsChange.dateEvent.push('Некорректный ввод даты, Формат "DD.MM.YYYY".'):errorsCreate.dateEvent.push('Некорректный ввод даты, Формат "DD.MM.YYYY".')
                }else{
                    for(let i=0; arr.length > i; i++){
                        if(i === 0){
                            if(+arr[i] <= 0 || isNaN(+arr[i]) || arr[i] > 31 || arr[i].length !== 2){
                                (id===0||id)?errorsChange.dateEvent.push('Некорректный ввод дня.'):errorsCreate.dateEvent.push('Некорректный ввод дня.');
                            }
                        }else if(i === 1){
                            if(+arr[i] <= 0 || isNaN(+arr[i]) || arr[i] > 12 || arr[i].length !== 2){
                                (id===0||id)?errorsChange.dateEvent.push('Некорректный ввод месяца.'):errorsCreate.dateEvent.push('Некорректный ввод месяца.')
                            }
                        }else if(i === 2){
                            if(+arr[i] <= 0 || isNaN(+arr[i]) || arr[i] > 3000 || arr[i].length !== 4){
                                (id===0||id)?errorsChange.dateEvent.push('Некорректный ввод года.'):errorsCreate.dateEvent.push('Некорректный ввод года.')
                            }
                        }
                    }
                }
            }
        }
        if(obj.timeStart || !obj.timeStart){
            if(!obj.timeStart) {
                (id===0||id)?errorsChange.timeStart.push('Введите время начала.'):errorsCreate.timeStart.push('Введите время начала.')
            }else{
                let arr = obj.timeStart.split('.');
                if(arr.length !== 2) {
                    (id===0||id)?errorsChange.timeStart.push('Некорректный ввод время начала, Формат "HH.MM".'):errorsCreate.timeStart.push('Некорректный ввод время начала, Формат "HH.MM".')
                }else{
                    for(let i=0; arr.length > i; i++){
                        if(i === 0){
                            if(isNaN(+arr[i]) || arr[i].length !== 2){
                                (id===0||id)?errorsChange.timeStart.push('Некорректный ввод время начала: часы.'):errorsCreate.timeStart.push('Некорректный ввод время начала: часы.')
                            }
                        }else if(i === 1){
                            if(+arr[i] < 0 || isNaN(+arr[i]) || arr[i] > 59 || arr[i].length !== 2){
                                (id===0||id)?errorsChange.timeStart.push('Некорректный ввод время начала: минуты.'):errorsCreate.timeStart.push('Некорректный ввод время начала: минуты.')
                            }
                        }
                    }
                }
            }
        }
        if(obj.timeEnd || !obj.timeEnd){
            if(!obj.timeEnd) {
                (id===0||id)?errorsChange.timeEnd.push('Введите время конца.'):errorsCreate.timeEnd.push('Введите время конца.')
            }else{
                let arr = obj.timeEnd.split('.');
                if(arr.length !== 2) {
                    (id===0||id)?errorsChange.timeEnd.push('Некорректный ввод время конца, Формат "HH.MM".'):errorsCreate.timeEnd.push('Некорректный ввод время конца, Формат "HH.MM".')
                }else{
                    for(let i=0; arr.length > i; i++){
                        if(i === 0){
                            if(isNaN(+arr[i]) || arr[i].length !== 2){
                                (id===0||id)?errorsChange.timeEnd.push('Некорректный ввод время конца: часы.'):errorsCreate.timeEnd.push('Некорректный ввод время конца: часы.')
                            }
                        }else if(i === 1){
                            if(+arr[i] < 0 || isNaN(+arr[i]) || arr[i] > 59 || arr[i].length !== 2){
                                (id===0||id)?errorsChange.timeEnd.push('Некорректный ввод время конца: минуты.'):errorsCreate.timeEnd.push('Некорректный ввод время конца: минуты.');
                            }
                        }
                    }
                }
            }
        }
        if(errorsChange.title.length !== 0 || errorsChange.dateEvent.length !== 0 || errorsChange.timeStart.length !== 0 || errorsChange.timeEnd.length !== 0){
            return {errorsChange: errorsChange, result: false}
        }
        if(errorsCreate.title.length !== 0 || errorsCreate.dateEvent.length !== 0 || errorsCreate.timeStart.length !== 0 || errorsCreate.timeEnd.length !== 0){
            return {errorsCreate: errorsCreate, result: false}
        }

        let indexDay = this.state.events.findIndex(item=>item.dateEvent === obj.dateEvent);

        const adaptTimeStart = (t) =>{
            let time = t.split('.');
            if((+time[0]) < 9){
                (id===0||id)?errorsChange.timeStart.push('События раньше 09.00 запрещены!'):errorsCreate.timeStart.push('События раньше 09.00 запрещены!');
                return;
            }
            if((+time[0]) === 9){
                return (+time[1])
            }
            let timeSecond = ((+time[0])-9)*60+(+time[1]);
            if(timeSecond > 540){
                (id===0||id)?errorsChange.timeStart.push('События позже 18.00 запрещены!'):errorsCreate.timeStart.push('События позже 18.00 запрещены!');
                return;
            }
            return timeSecond
        };

        const adaptTimeEnd = (t) =>{
            let time = t.split('.');
            if((+time[0]) < 9){
                (id===0||id)?errorsChange.timeEnd.push('События раньше 09.00 запрещены!'):errorsCreate.timeEnd.push('События раньше 09.00 запрещены!');
                return;
            }
            if((+time[0]) === 9){
                return (+time[1])
            }
            let timeSecond = ((+time[0])-9)*60+(+time[1]);
            if(timeSecond > 540){
                (id===0||id)?errorsChange.timeEnd.push('События позже 18.00 запрещены!'):errorsCreate.timeEnd.push('События позже 18.00 запрещены!');
                return;
            }
            return timeSecond
        };

        let timestart = adaptTimeStart(obj.timeStart);
        let timeend = adaptTimeEnd(obj.timeEnd);

        if(errorsChange.title.length !== 0 || errorsChange.dateEvent.length !== 0 || errorsChange.timeStart.length !== 0 || errorsChange.timeEnd.length !== 0){
            return {errorsChange: errorsChange, result: false}
        }
        if(errorsCreate.title.length !== 0 || errorsCreate.dateEvent.length !== 0 || errorsCreate.timeStart.length !== 0 || errorsCreate.timeEnd.length !== 0){
            return {errorsCreate: errorsCreate, result: false}
        }

        if(timestart >= timeend){
            (id===0||id)?errorsChange.timeEnd.push('События не может заканчиваться не начавнись.'):errorsCreate.timeEnd.push('События не может заканчиваться не начавнись.')
        }

        if(errorsChange.title.length !== 0 || errorsChange.dateEvent.length !== 0 || errorsChange.timeStart.length !== 0 || errorsChange.timeEnd.length !== 0){
            return {errorsChange: errorsChange, result: false}
        }
        if(errorsCreate.title.length !== 0 || errorsCreate.dateEvent.length !== 0 || errorsCreate.timeStart.length !== 0 || errorsCreate.timeEnd.length !== 0){
            return {errorsCreate: errorsCreate, result: false}
        }

        if(indexDay === -1){
            return id?{errorsChange: errorsChange, result: true}:{errorsCreate: errorsCreate, result: true}
        }

        let dayEvent = this.state.events[indexDay].eventsData;

        if(id===0||id){
            for(let i=0; dayEvent.length > i; i++){
                if(id !== dayEvent[i].id){
                    if(adaptTimeStart(dayEvent[i].timeStart) <= adaptTimeStart(obj.timeStart) && adaptTimeEnd(dayEvent[i].timeEnd) > adaptTimeStart(obj.timeStart)){
                        errorsChange.timeStart.push('Событие не может начаться пока не закончиться предыдущее: ' + dayEvent[i].title)
                    }
                }
            }
        }else{
            for(let i=0; dayEvent.length > i; i++){
                if(adaptTimeStart(dayEvent[i].timeStart) <= adaptTimeStart(obj.timeStart) && adaptTimeEnd(dayEvent[i].timeEnd) > adaptTimeStart(obj.timeStart)){
                    errorsCreate.timeStart.push('Событие не может начаться пока не закончиться предыдущее: ' + dayEvent[i].title)
                }
            }
        }
        if(errorsChange.title.length !== 0 || errorsChange.dateEvent.length !== 0 || errorsChange.timeStart.length !== 0 || errorsChange.timeEnd.length !== 0){
            return {errorsChange: errorsChange, result: false}
        }
        if(errorsCreate.title.length !== 0 || errorsCreate.dateEvent.length !== 0 || errorsCreate.timeStart.length !== 0 || errorsCreate.timeEnd.length !== 0){
            return {errorsCreate: errorsCreate, result: false}
        }
        return (id===0||id)?{errorsChange: errorsChange, result: true}:{errorsCreate: errorsCreate, result: true}

    };


    render(){
        if (!Array.prototype.findIndex) {
            Array.prototype.findIndex = function(predicate) {
                if (this == null) {
                    throw new TypeError('Array.prototype.findIndex called on null or undefined');
                }
                if (typeof predicate !== 'function') {
                    throw new TypeError('predicate must be a function');
                }
                var list = Object(this);
                var length = list.length >>> 0;
                var thisArg = arguments[1];
                var value;

                for (var i = 0; i < length; i++) {
                    value = list[i];
                    if (predicate.call(thisArg, value, i, list)) {
                        return i;
                    }
                }
                return -1;
            };
        }
        const {active, events, newEvent, changeEvent, errorsCreate, errorsChange} = this.state;
        return(
            <div className='containerApp'>
                <SearchData
                    active={active.length!==0?events[active].dateEvent:''}
                    onChangeFilter={this.onChangeFilter}
                    events={events}
                />
                <Events
                    events={active.length!==0?new Array(events[active]):events}
                    changeEvent={changeEvent}
                    onDeleteEvent={this.onDeleteEvent}
                    onChangeEvent={this.onChangeEvent}
                    onChangeInputData={this.onChangeInputData}
                    onChangeEventInputSave={this.onChangeEventInputSave}
                    errorsChange={errorsChange}
                />
                <NewEvent
                    newEvent={newEvent}
                    onChangeInput={this.onChangeInput}
                    onSubmitChange={this.onSubmitChange}
                    errorsCreate={errorsCreate}
                />
            </div>
        )
    }
}

export default App;



