import React from 'react'
import styles from './styles/StudentFillet.module.scss'
import StudentName from '../StudentName/StudentName'
import StudentId from '../StudentId/StudentId'

const StudentFillet = ({props}) => {
    return (
      <div className={styles.StudentFillet}>
        <div className={styles.StudentFillet__container}>
          <div className={styles.StudentFillet__mover}>
            <div className={styles.StudentFillet__sizer}>
              <div className={styles.StudentFillet__content}>
                
                <div className={styles.StudentFillet__name}>
                  <StudentName className={styles.StudentFillet__name}></StudentName>
                </div>
                <div className={styles.StudentFillet__id}>
                  <StudentId props={{sID: props.sID}}></StudentId>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    )
}

export default StudentFillet