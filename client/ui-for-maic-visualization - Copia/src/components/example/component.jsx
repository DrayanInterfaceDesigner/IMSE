import React from 'react'

const component = ({props}) => {
  return (
    <div className='component'>
      <div className='component__container'>
        <div className='component__mover'>
          <div className='component__sizer'>
            <div className='component__innerComponent'>
              {/* Content */}
              ...lot of stuff here
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default component