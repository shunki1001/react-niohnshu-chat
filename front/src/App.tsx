import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import ChatContainer from './ui/ChatContainer';
import ChatMessages from './ui/ChatMessages';
// import ChatUser from './ui/ChatUser';
import ChatInput from './ui/ChatInput';
import DataContextProvider from './data/DataContext';
import defaultQuestion, { choice } from './data/defaultQuestion';
import Choice from './ui/Choice';
// import Loading from './ui/Loading';
import WritingLoad from './ui/WritingLoad';
import getRecommendList from './data/getRecommendList';
import { Button } from '@mui/material';

import younger from './image/younger.png'
import older from './image/older.png'

export type recommendList = {
  drink: {
    name: string,
    url: string,
    image: string,
  }, 
  food: {
    name: string,
    url: string,
    image: string,
  },
  reason: string
}

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="#">
        nihonshu-shimai
      </Link>{' '}
      {new Date().getFullYear()}.
    </Typography>
  );
}

export default function App() {
  const [renderList, setRenderList] = React.useState<string[]>([])
  const [questionNumber, setQuestionNumber] = React.useState<number[]>([])
  const [recommendList, setRecommendList] = React.useState<recommendList>({
    drink: {
      name: "",
      url: "",
      image: "",
    }, 
    food: {
      name: "",
      url: "",
      image: "",
    },
    reason: ""
  })

  const [triggerQuestion, setTriggerQuestion] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const [recommend, setRecommend] = React.useState(false)

  React.useEffect(() => {
    defaultQuestion.forEach((item, index) => {
      setTimeout(() => {
        setRenderList(prevList => [...prevList, item])
      }, 1*1000*index)
    })
  }, [])
  React.useEffect(() => {
    if (renderList.length === defaultQuestion.length) {
      setTriggerQuestion(true) 
    }
  }, [renderList])
  React.useEffect(() => {
    if (questionNumber.length === choice.length) {
      setLoading(true)
      setRecommendList(getRecommendList())
      setTimeout(() => {
        setLoading(false)
        setRecommend(true)
      }, 3 * 1000)
      setTimeout(() => {
        document.getElementById("scroll_index")!.scrollIntoView();
      }, 3.1*1000)
    }
  }, [questionNumber])
  
  const handleClick = () => {
    window.location.reload()
  }
  
  return (
    <DataContextProvider>
      <Container maxWidth="sm" sx={{ px: 0 }}>
        <ChatContainer>
          <>
            {renderList.map((item: string, index: number) => {
              if (index === 2) {
                return <ChatMessages key={index} src={younger}><>{item}</></ChatMessages>
              } else {
                return <ChatMessages key={index} src={older}><>{item}</></ChatMessages>
              }
            })}
            {triggerQuestion &&
              <Choice choice={choice[0]} setQuestionNumber={setQuestionNumber} />}
            {choice.map((item, index) => {
              return (
                questionNumber.includes(index) && <Choice choice={item} setQuestionNumber={setQuestionNumber} key={index}/>
              )
            })}
            {loading && <WritingLoad />}
            {recommend &&
              <>
              <ChatMessages src={older}><p id="scroll_index" style={{margin:"0"}}>こちらはいかがでしょうか？</p></ChatMessages>
              <ChatMessages src={older}><>{recommendList.drink.name}</></ChatMessages>
              <ChatMessages src={older}><a href={recommendList.drink.url}><img src={recommendList.drink.image} width="200px" />{recommendList.drink.url}</a></ChatMessages>
              <ChatMessages src={younger}><>{recommendList.food.name}</></ChatMessages>
              <ChatMessages src={younger}><a href={recommendList.food.url}><img src={recommendList.food.image} width="200px" />{recommendList.food.url}</a></ChatMessages>
              <ChatMessages src={younger}><>{recommendList.reason}</></ChatMessages> 
              <Button variant='contained' onClick={handleClick}>もう一度聞いてみる</Button>
            </>
            }
          </>
        </ChatContainer>
      <ChatInput />
      <Copyright />
      </Container>
    </DataContextProvider>
  );
}
