import React from 'react'
import styles from './WritingLoad.module.css'
import ChatMessages from './ChatMessages'

import older from '../image/older.png'

const WritingLoad = () => {
  return (
    <ChatMessages src={older}>
      <div className={styles.loadingio_spinner_ellipsis_86zfkhyfx4c}><div className={styles.ldio_pmfr11vcrkl}>
      <div></div><div></div><div></div><div></div><div></div>
      </div></div>
  </ChatMessages>
  )
}

export default WritingLoad