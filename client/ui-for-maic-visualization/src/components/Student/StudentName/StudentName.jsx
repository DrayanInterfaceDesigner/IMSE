import React from 'react'
import styles from './styles/StudentName.module.scss'

const StudentName = ({props}) => {
  return (
    <div className={styles.StudentName}>
      <div className={styles.StudentName__container}>
        <div className={styles.StudentName__mover}>
          <div className={styles.StudentName__sizer}>
            <p className={styles.StudentName__name}>
              StudentName
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudentName