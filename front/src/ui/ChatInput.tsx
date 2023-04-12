import { Box, IconButton, TextField } from '@mui/material'
import SendIcon from '@mui/icons-material/Send';
import React from 'react'

const ChatInput = () => {
  return (
    <Box sx={{width:'100%', display:'flex', backgroundColor:'#fff', m:0}}>
      <TextField variant='standard' sx={{flexGrow : 1}} />
      <IconButton >
        <SendIcon />
      </IconButton>
    </Box>
  )
}

export default ChatInput