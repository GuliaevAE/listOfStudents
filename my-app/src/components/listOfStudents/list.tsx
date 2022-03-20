import React, { useState, useRef, FC } from "react";
import "../listOfStudents/list.css"

interface Types{
    state:string
}


export default function ListOfStudents() {
    let [state, setstate] = useState("id")
    let [list, setlist]: any = useState([
        { id: 5, name: 'asd', group: "ист1", ball: 4 },
        { id: 8, name: 'asvfd', group: "ист2", ball: 5 },
        { id: 1, name: 'ымdfsd', group: "ист3", ball: 2 },
        { id: 4, name: 'askukd', group: "ист4", ball: 1 },
    ])
    let [input, setvalue] = useState({ id: '', name: '', group: '', ball: '' })
    const ID = useRef(null);
    const NAME = useRef(null);
    const GROUP = useRef(null);
    const BALL = useRef(null);

    function change(values) {
        let newvalue = values.target.value
        let updatedValue = {}
        updatedValue[`${values.target.id}`] = newvalue
        setvalue({
            ...input,
            ...updatedValue
        })
    }

    function removeValue() {
        ID.current.value = ''
        NAME.current.value = ''
        GROUP.current.value = ''
        BALL.current.value = ''
        setvalue({
            id: '', name: '', group: '', ball: ''
        })
    }


    function add() {
        let updatedValue = { 'id': ID.current.value }
        if (NAME.current.value === '' || GROUP.current.value === '' || BALL.current.value === '') {
            alert('Не все данные введены')
            return
        }

        let arr = []
        list.forEach(item => {
            arr.push(item.id)
        })

        if (ID.current.value === '') {
            updatedValue['id'] = arr[arr.length - 1] + 1
        }

        if (arr.includes(Number(ID.current.value))) {
            alert(`Редактирование элемента с id:${ID.current.value}`)

            list[list.indexOf(list.find(el => el.id == ID.current.value))] = input
            setstate(state + 1)
            removeValue()
            return
        }
        input['id'] = updatedValue['id']
        setlist([...list, input])
        removeValue()
    }

    function Del(i) {
        list.splice(list.indexOf(list.find(el => el.id == i.target.id)), 1)
        setstate(state + 1)
        console.log(list)
        console.log(i)
    }

    const Sort:FC<Types>=({state})=> {
        function sortirovka(a, b) {
            if (a[state] < b[state]) { return -1; }
            if (a[state] > b[state]) { return 1; }

        }
        let sort = list.sort(sortirovka).map(item =>
            <div id={item.id} className="listItem" >
                <span>{item.id}</span>
                <span>{item.name}</span>
                <span>{item.group}</span>
                <span>{item.ball}</span>
                <div id={item.id} className="del" onClick={(item) => Del(item)} />
            </div>
        )
        return (
            <span>{sort}</span>
        )
    }

    return (
        <>
            <div className="miniList">
                <div className="miniListItem" onClick={() => setstate(state = "id")}>ID</div>
                <div className="miniListItem" onClick={() => setstate(state = "name")}>ФИО</div>
                <div className="miniListItem" onClick={() => setstate(state = "group")}>Группа</div>
                <div className="miniListItem" onClick={() => setstate(state = "ball")}>Ср.балл</div>
            </div>

            <div className="listItem">
                <span>ID</span>
                <span>ФИО</span>
                <span>Группа</span>
                <span>Ср.балл</span>
            </div>

            <Sort state={state}/>

            <div className=" sec">
                <input id="id" type="number" ref={ID} name="id" onChange={(w) => change(w)} placeholder="id" />
                <input id="name" type="text" ref={NAME} name="name" onChange={(w) => change(w)} placeholder="name" />
                <input id="group" type="text" ref={GROUP} name="group" onChange={(w) => change(w)} placeholder="group" />
                <input id="ball" type="number" ref={BALL} name="ball" onChange={(w) => change(w)} placeholder="ball" />
                <button onClick={() => add()}>x</button>
            </div>

        </>
    )
}