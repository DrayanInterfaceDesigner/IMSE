import React from 'react'
import styles from './styles/StructureGrid2x2.module.scss'

const StructureGrid2x2 = ({children, props}) => {
  return (
    <div className={styles.StructureGrid2x2}>
      <div className={styles.StructureGrid2x2__container}>
        <div className={styles.StructureGrid2x2__mover}>
          <div className={styles.StructureGrid2x2__sizer}>
            <div className={styles.StructureGrid2x2__content}>
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StructureGrid2x2