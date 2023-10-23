import React from 'react'

const StructureGridCell = ({children, props}) => {
  return (
    <div className='StructureGridCell'>
      <div className='StructureGridCell__container'>
        <div className='StructureGridCell__mover'>
          <div className='StructureGridCell__sizer'>
            <div className='StructureGridCell__innerComponent'>
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StructureGridCell