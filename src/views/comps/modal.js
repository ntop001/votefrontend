import React from 'react'
import ReactModal from 'react-modal'
import styles from './modal.module.css'
import lang from 'lang'

import { Button } from 'shared/comps'
import { ReactComponent as CloseSvg } from 'shared/images/close.svg'

const customStyles = {
    content : {
      top                   : '10%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -10%)',

      border: 0,
      padding: '0px 0px',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',

      overflow: "visible",
    },
    overlay: {
        zIndex: '9999',
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(102, 125, 153, 0.8)',
      },
};

export default class Modal extends React.Component {    
    afterOpenModal = () => {
        // references are now sync'd and can be accessed.
    }

    render() {
        const { overflow, title, show,  onRequestClose, onSubmit } = this.props
        const overflowStyle = overflow? {overflow: "visible"}: {}
        return (
            <div>
                <ReactModal
                    ariaHideApp={false}
                    isOpen={show}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={onRequestClose}
                    style={customStyles}
                    contentLabel="Example Modal"
                    >
                    <div className={styles.modal}>
                        <div className={styles.title}>
                            <h3>{title}</h3> 
                            <div className={styles.close} onClick={onRequestClose}>
                                <CloseSvg/>
                            </div>
                        </div>
                        <div className={styles.body} style={overflowStyle}>
                            {this.props.children}
                        </div>
                        <div className={styles.footer}>
                            <div className={styles.toright}>
                                <Button type="normal" onClick={onRequestClose} >{lang.cancel}</Button> 
                                <Button onClick={onSubmit}>{lang.save}</Button>
                            </div>
                        </div>
                    </div>
                </ReactModal>
            </div>
        )
    }
}