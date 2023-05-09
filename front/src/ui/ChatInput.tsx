import { Box, IconButton, TextField } from '@mui/material'
import SendIcon from '@mui/icons-material/Send';
import React, { useContext } from 'react'
import { DataContext } from '../data/DataContext';

const ChatInput = () => {
  const {inputText, setInputText, setClickSubmit} = useContext(DataContext)
  
  const handleClick = () =>{
    setClickSubmit(true)
  }
  return (
    <Box sx={{width:'100%', display:'flex', backgroundColor:'#fff', m:0}}>
      <TextField variant='standard' sx={{flexGrow : 1}} value={inputText} onChange={e=>setInputText(e.currentTarget.value)}/>
      <IconButton onClick={handleClick} >
        <SendIcon />
      </IconButton>
    </Box>
  )
}

export default ChatInput