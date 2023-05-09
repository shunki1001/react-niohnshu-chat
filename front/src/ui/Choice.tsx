import React, { useContext, useEffect, useState } from 'react'
import styles from './choice.module.css'
import { Button, ButtonGroup } from '@mui/material'
import { DataContext } from '../data/DataContext'
import ChatMessages from './ChatMessages'
import ChatUser from './ChatUser'

import older from '../image/older.png'
import younger from '../image/younger.png'

type Props = {
    choice: {
        list: string[],
        key: string,
        question: string,
        index: number,
        option: boolean,
        example: string[]
    }
    setQuestionNumber:React.Dispatch<React.SetStateAction<number[]>>
}

const Choice = ({ choice, setQuestionNumber }: Props) => {
    const { choiceAnswer, setChoiceAnswer, clickSubmit, setClickSubmit, inputText} = useContext(DataContext)
    const [renderAnswer, setRenderAnswer] = useState(false)
    const [answer, setAnswer] = useState<string>("")
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnswer(event.currentTarget.value)
        setChoiceAnswer({
            ...choiceAnswer,
            [choice.key]: event.currentTarget.value,
        })
        setRenderAnswer(true)
        setQuestionNumber(prev => [...prev, choice.index])
    }

    useEffect(()=>{
        if (clickSubmit){
            setAnswer(inputText)
            setRenderAnswer(true)
            setClickSubmit(false)
        }
    },[clickSubmit])

    return (
        <>
            <ChatMessages src={older}><>{choice.question}</></ChatMessages>
            {!choice.option && 
                <>
                    <ChatMessages src={younger}><>例）{choice.example.map(item=>item+" ")}</></ChatMessages>
                    <ChatMessages src={younger}><>下に入力して送信ボタンを押してね</></ChatMessages>
                </>
            }
            {!renderAnswer &&
                <div className={styles.overlay}>
                    <ButtonGroup color="error" variant='contained'>
                        {choice.list.map((item) => {
                            return (
                                <Button key={item} onClick={handleClick} value={item}>{item}</Button>
                            )
                        })}
                    </ButtonGroup>
                </div>}
            {renderAnswer && <ChatUser text={answer} />}
            {!choice.option && renderAnswer && <ChatUser text={answer} />}
        </>
  )
}

export default Choice