import React from 'react'
import styles from './chat.module.css'
import { Avatar } from '@mui/material'

type Props = {
  children: JSX.Element,
  src: string
}

const ChatMessages = ({children, src}:Props) => {
  return (
      <div className={styles.chat_message}>
        <Avatar sx={{float: 'left', marginRight: '-50px'}} src={src} />
        <div className={styles.message}>
          <div className={styles.chatting}> 
            <div>{children}</div>
          </div>
        </div>
    </div>
  )
}

export default ChatMessages