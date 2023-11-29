import React from 'react'
import styles from './styles/StructureGridCell.module.scss'

const StructureGridCell = ({children, props}) => {
  return (
    <div className={styles.StructureGridCell}>
      <div className={styles.StructureGridCell__container}>
        <div className={styles.StructureGridCell__mover}>
          <div className={styles.StructureGridCell__sizer}>
            <div className={styles.StructureGridCell__innerComponent}>
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StructureGridCell