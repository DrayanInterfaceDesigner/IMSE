import React from 'react'
import styles from './styles/MachineStatus.module.scss'

const MachineStatus = ({props}) => {
  const {currentStatus} = props
  return (
    <div className={styles.MachineStatus}>
      <div className={styles.MachineStatus__sizer}>

        <div className={`${styles.MachineStatus__status} ${styles[currentStatus]}`}>
          <p className={styles.MachineStatus__status__label}>status:</p>
          <p className={styles.MachineStatus__status__current}>
            {currentStatus || 'unknown'}
          </p>
        </div>

      </div>
    </div>
  )
}

export default MachineStatus