import React from 'react'
import styles from './styles/StudentId.module.scss'

const StudentId = ({props}) => {
  const {sID} = props
  return (
    <div className={styles.StudentId}>
      <div className={styles.StudentId__sizer}>

        <div className={styles.StudentId__label}>
          <p className={styles.StudentId__label__text}>ID</p>
        </div>

        <div className={styles.StudentId__number}>
          <p className={styles.StudentId__number_id}>{sID || "🙁"}</p>
        </div>

      </div>
    </div>
  )
}

export default StudentId