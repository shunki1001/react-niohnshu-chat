import React from 'react'
import styles from './chat.module.css'

type Props = {
    text: string
}

const ChatUser = ({text}:Props) => {
  return (
    <div className={styles.comment}>
        <p>
            {text}
        </p>
    </div>
  )
}

export default ChatUser