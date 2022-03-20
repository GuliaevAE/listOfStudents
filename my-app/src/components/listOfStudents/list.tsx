import React, { useState, useRef, FC } from "react";
import "../listOfStudents/list.css"

interface Types {
    state: string,
    list: [{ idSt: number, name: string, group: string, ball: string }],

}


export default function ListOfStudents() {
    let [state, setstate] = useState("id")
    let [list, setlist]: any = useState([
        { idSt: 1, name: 'Гуляев Антон', group: "ист3", ball: 4 },
        { idSt: 3, name: 'Колыван', group: "ист2", ball: 5 },
        { idSt: 2, name: 'Максим Родин', group: "ист3", ball: 3 },
        { idSt: 4, name: 'Градиленко Артем', group: "аниме", ball: 2 },
    ])
    let [input, setvalue] = useState({ idSt: '', name: '', group: '', ball: '' })
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
            idSt: '', name: '', group: '', ball: ''
        })
    }


    function add() {
        let updatedValue = { 'idSt': ID.current.value }
        if (NAME.current.value === '' || GROUP.current.value === '' || BALL.current.value === '') {
            alert('Не все данные введены')
            return
        }

        let arr = []
        list.forEach(item => {
            arr.push(item.idSt)
        })

        if (ID.current.value === '') {
            updatedValue['idSt'] = Math.max(...arr) + 1
        }

        if (arr.includes(Number(ID.current.value))) {
            alert(`Редактирование элемента с id:${ID.current.value}`)

            list[list.indexOf(list.find(el => el.idSt == ID.current.value))] = input

            setstate(state + 1)
            removeValue()
            return
        }
        console.log(arr)


        input['idSt'] = updatedValue['idSt']
        setlist([...list, input])
        removeValue()
    }

    const Del = (item) => {

        list.splice(list.indexOf(list.find(el => el.idSt == item.target.id)), 1)
        setstate(state + 1)

        console.log(list)
        console.log(item)
    }

    const Sort: FC<Types> = ({ state, list }) => {
        function sortirovka(a, b) {
            if (a[state] < b[state]) { return -1; }
            if (a[state] > b[state]) { return 1; }

        }
        let sort = list.sort(sortirovka).map(item =>
            <tr id={`${item.idSt}`}>

                <td>{item.idSt}</td>
                <td>{item.name}</td>
                <td>{item.group}</td>
                <td>{item.ball}</td>
                <td id={`${item.idSt}`} className="del" onClick={(item) => Del(item)}></td>

                {/* <span>{item.idSt}</span>
                <span>{item.name}</span>
                <span>{item.group}</span>
                <span>{item.ball}</span>
                <div id={`${item.idSt}`} className="del" onClick={(item) => Del(item)} /> */}
            </tr>
        )
        return (
            <tbody>{sort}</tbody>
        )
    }

    return (
        <>
            <table className="stTable" border="1px">
                <tbody >
                    <tr>
                        <td>
                            Сорт. по:
                        </td>
                        <td>
                            <select value={state} onChange={(event) => setstate(event.target.value)}>
                                <option value="idSt">ID</option>
                                <option value="name">ФИО</option>
                                <option value="group">ГРУППА</option>
                                <option value="ball">СР.БАЛЛ</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>ID</td>
                        <td>ФИО</td>
                        <td>Группа</td>
                        <td>Ср.балл</td>
                        <td>Удаление</td>
                    </tr>
                </tbody>

                <Sort state={state} list={list} />
                <tfoot>
                    <tr>
                        <td>
                            <input id="idSt" type="number" ref={ID} name="id" onChange={(w) => change(w)} placeholder="id" />
                        </td>
                        <td>
                            <input id="name" type="text" ref={NAME} name="name" onChange={(w) => change(w)} placeholder="name" />
                        </td>
                        <td>
                            <input id="group" type="text" ref={GROUP} name="group" onChange={(w) => change(w)} placeholder="group" />
                        </td>
                        <td>
                            <input id="ball" type="number" ref={BALL} name="ball" onChange={(w) => change(w)} placeholder="ball" />
                        </td>
                        <td>
                            <button onClick={() => add()}>x</button>
                        </td>
                    </tr>
                </tfoot>
            </table>
        </>
    )
}