import React from 'react'
import styles from './chat.module.css'

type Props = {
    children: JSX.Element,
}

const ChatContainer = ({children}: Props) => {
  return (
    <div className={styles.container}>
      {children}
    </div>
  )
}

export default ChatContainer