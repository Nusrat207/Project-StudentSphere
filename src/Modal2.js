import React from 'react'
import ReactDom from 'react-dom'

const MODAL_STYLES = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  backgroundColor: 'rgb(34,34,34)',
  //backgroundColor:'#bcc2c1',
  transform: 'translate(-50%, -50%)',
  zIndex: 1000,
  height: '90%',
  width: '90%',
  overflowY: 'scroll', 
}

const OVERLAY_STYLES = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, .7)',
  zIndex: 1000
}
const CLOSE_BUTTON_STYLES = {
  position: 'absolute',
  top: '0px', 
  right: '5px',
  backgroundColor: 'transparent',
  border: 'none',
  color: '#fff',
  fontSize: '20px',
  cursor: 'pointer',
};

export default function Modal({ children, onClose }) {

  return ReactDom.createPortal(
    <>
      <div style={OVERLAY_STYLES} />
      <div style={MODAL_STYLES}>
        <button className='btn bg-danger fs-4'  style={CLOSE_BUTTON_STYLES}  onClick={onClose}> X </button>
        {children}
      </div>
    </>,
    document.getElementById('cart2-root')
  )
}