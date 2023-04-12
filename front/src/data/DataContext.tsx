import React, { useEffect, useState } from 'react'

type Props = {
    children: JSX.Element,
}
type Answer = {
  old: number,
  woman: boolean,
  situation: number,
  feel:number,
}

export const DataContext = React.createContext({} as {
  freeInput: string,
  setFreeInput:React.Dispatch<React.SetStateAction<string>>,
  choiceAnswer: Answer,
  setChoiceAnswer:React.Dispatch<React.SetStateAction<Answer>>,
});

const DataContextProvider = ({ children }: Props) => {
  const [freeInput, setFreeInput] = useState("")
  const [choiceAnswer, setChoiceAnswer] = useState<Answer>({
    old: 20,
    woman: true,
    situation: 0,
    feel:0,
  })

  useEffect(() => {
    console.log(choiceAnswer)
  },[choiceAnswer])

  const value = {freeInput, setFreeInput,choiceAnswer, setChoiceAnswer}

  return (
    <DataContext.Provider value={value} >{children}</DataContext.Provider>
  )
}

export default DataContextProvider