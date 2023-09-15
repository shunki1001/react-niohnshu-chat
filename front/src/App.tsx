import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import ChatContainer from './ui/ChatContainer';
import ChatMessages from './ui/ChatMessages';
// import ChatUser from './ui/ChatUser';
import DataContextProvider from './data/DataContext';
import defaultQuestion, { choice } from './data/defaultQuestion';
// import Loading from './ui/Loading';
import WritingLoad from './ui/WritingLoad';
import getRecommendList from './data/getRecommendList';
import { Box, Button, ButtonGroup, IconButton, TextField } from '@mui/material';

import SendIcon from '@mui/icons-material/Send';

import younger from './image/younger.png'
import older from './image/older.png'
import ChatUser from './ui/ChatUser';

export type recommendList = {
  drink: {
    name: string,
    reason:string
  }, 
  food: {
    name: string,
    reason:string
  },
}

export interface Question {
  id: number;
  key:string;
  question: string;
  list: string[];
  option: Boolean;
  answer: string;
  example:string[];
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

function App() {

  const [currentQuestion, setCurrentQuestion] = React.useState<Question>(choice[0]);

  const [chatHistory, setChatHistory] = React.useState<Question[]>([]);

  const [renderList, setRenderList] = React.useState<string[]>([])

  const [triggerQuestion, setTriggerQuestion] = React.useState<Boolean>(false)

  const [loading, setLoading] = React.useState<Boolean>(false)

  const [recommend, setRecommend] = React.useState<recommendList>()
  const [getRecommend, setGetRecommend] = React.useState<Boolean>(false)
  const [gotRecommend, setGotRecommend] = React.useState<Boolean>(false)

  const [buttonClickable, setButtonClickable] = React.useState<Boolean>(false)

  // テンプレ会話の順番表示
  React.useEffect(() => {
    defaultQuestion.forEach((item, index) => {
      setTimeout(() => {
        setRenderList(prevList => [...prevList, item])
      }, 1*1000*index+Math.floor(Math.random() * 500))
    })
  }, [])
  // 最初の質問表示
  React.useEffect(() => {
    if (renderList.length === defaultQuestion.length) {
      setTimeout(() => {
        setTriggerQuestion(true) 
      }, 1*1000)
    }
  }, [renderList])
  
  // Inputの入力反映
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentQuestion({
      ...currentQuestion,
      answer: event.target.value,
    });
  };
  // Inputの入力
  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const activeElement = document.activeElement as HTMLElement;
    // フォーカスを外す
    activeElement.blur();
    nextQuestion(currentQuestion.answer)
  };
  // 選択肢ボタンの選択
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setCurrentQuestion({
      ...currentQuestion,
      answer: event.currentTarget.value,
    });
    nextQuestion(event.currentTarget.value)
  }
  // 次の質問に
  const nextQuestion = async (newAnswer: string) =>{
    // 次の質問を一旦非表示に
    setTriggerQuestion(false)
    // 回答をオブジェクトリストに格納
    setChatHistory([
      ...chatHistory, {
        ...currentQuestion,
        answer: newAnswer,
      }
    ]);
    // Loading ON
    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, Math.floor(Math.random() * 1500)));
    // 次の質問を表示
    if(chatHistory.length < choice.length - 1 ) {
      const nextQuestionIndex = currentQuestion.id;
      setCurrentQuestion(choice[nextQuestionIndex]);
      // Loading解除、次の質問を再表示
      setLoading(false)
      setTriggerQuestion(true)
    } else {
      setTriggerQuestion(false)
      setGetRecommend(true)
      setLoading(true)
    }  
  }

  // スクロール
  React.useEffect(()=>{
    try {
      document.getElementsByClassName('question')[0]!.scrollIntoView({ behavior: "smooth"});  
    } catch (error) {}
  },[currentQuestion, gotRecommend, loading])

  // APIをたたく
  function useAsyncEffect(effect: () => Promise<void>, deps?: any[]) {
    React.useEffect(() => {
      effect();
    }, deps);
  }
  useAsyncEffect(async () => {
    if (getRecommend){
      const res = await getRecommendList(chatHistory)
      setRecommend(res)
      setLoading(false)
      setGotRecommend(true)
    }
  }, [getRecommend]);

  React.useEffect(()=>{
    if (loading){
      setButtonClickable(false)
    }
  },[loading])

  const handleClickRetry = () =>{
    window.location.reload()
  }

  return (
    <DataContextProvider>
    <Container maxWidth="sm" sx={{ px: 0 }}>
      <ChatContainer>
        <>
          {/* 最初のテンプレ会話 */}
          {renderList.map((item: string, index: number) => {
              if (index === 2) {
                return <ChatMessages key={index} src={younger}><>{item}</></ChatMessages>
              } else {
                return <ChatMessages key={index} src={older}><>{item}</></ChatMessages>
              }
            })}
            
          {/* 質問回答履歴の表示 */}
          {chatHistory.map((chat, index) => (
            <div key={index}>
              <ChatMessages src={older}><>{chat?.question}</></ChatMessages>
              {!chat?.option && 
                <>
                  <ChatMessages src={younger}>
                    <>「{chat?.example[0]}」とか「{chat?.example[1]}」とか</>
                  </ChatMessages>
                  <ChatMessages src={younger}>
                    <>↓に入力してね</>
                  </ChatMessages>
                </>
              }
              <ChatUser text={chat?.answer} />
            </div>
          ))}
          {/* 次の質問と選択肢の表示 */}
          {triggerQuestion && 
            <div className='question'>
              <ChatMessages src={older}><>{currentQuestion?.question}</></ChatMessages>
              {currentQuestion?.option ? 
                  <ButtonGroup color="error" variant='contained'>
                      {currentQuestion?.list.map((item) => {
                          return (
                              <Button key={item} onClick={handleClick} value={item}>{item}</Button>
                          )
                      })}
                  </ButtonGroup>:
                  <>
                    <ChatMessages src={younger}>
                      <>「{currentQuestion?.example[0]}」とか「{currentQuestion?.example[1]}」とか</>
                    </ChatMessages>
                    <ChatMessages src={younger}>
                      <>↓に入力してね</>
                    </ChatMessages>
                  </>
              }
            </div>
            }
          {/* Loading表示 */}
          {loading && <div className='question'><WritingLoad /></div>}
          {/* おススメの表示 */}
          {gotRecommend && 
            <div className='question'>
              <ChatMessages src={older}><>こちらをおススメします！</></ChatMessages>
              <ChatMessages src={older}><>{recommend?.drink.name}</></ChatMessages>
              <ChatMessages src={older}><>{recommend?.drink.reason}</></ChatMessages>
              <ChatMessages src={younger}><>{recommend?.food.name}</></ChatMessages>
              <ChatMessages src={younger}><>{recommend?.food.reason}</></ChatMessages>
              <Button variant='contained' onClick={handleClickRetry}>もう一度聞いてみる</Button>
            </div>            
          }
      </>
        </ChatContainer>
      <form onSubmit={handleFormSubmit}>
      <Box sx={{width:'100%', display:'flex', backgroundColor:'#fff', m:0}}>
        <TextField variant='standard' sx={{flexGrow : 1}} value={currentQuestion?.answer} onChange={handleInputChange}/>
        <IconButton type='submit' >
          <SendIcon />
        </IconButton>
      </Box>
      </form>
      <Copyright />
      </Container>
    </DataContextProvider>
  );
}

export default App;
