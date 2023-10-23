import React from 'react'
import styles from './styles/StudentExperimentLabel.module.scss'

const StudentExperimentLabel = ({props}) => {
    const {number} = props
    return (
        <div className={styles.StudentExperimentLabel}>
        <div className={styles.StudentExperimentLabel__container}>
            <div className={styles.StudentExperimentLabel__mover}>
            <div className={styles.StudentExperimentLabel__sizer}>
                <p className={styles.StudentExperimentLabel__label}>
                    experiment nº {number ? number : '🤓'}
                </p>
            </div>
            </div>
        </div>
        </div>
    )
}

export default StudentExperimentLabel