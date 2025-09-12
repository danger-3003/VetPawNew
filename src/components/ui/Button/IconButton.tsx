import React from 'react'

function IconButton({ children, onClick, className }) {
  return (
    <>
      <button>
        <div className={`${className} cursor-pointer`} onClick={onClick}>
          {children}
        </div>
      </button>
    </>
  )
}

export default IconButton