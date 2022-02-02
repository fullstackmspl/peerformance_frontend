import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { PAGES, BUTTONS } from '../../constants/en';


function ConfirmationPopup({
    closeConfirmationPopup,
    isConfirmationPopupOpened,
    registerAccount
}) {
    return (
        <Modal className="confirmation-popup" show={isConfirmationPopupOpened} onHide={closeConfirmationPopup}>
            <Modal.Header>
                <Modal.Title>
                    <span className="popup-title">{PAGES.SIGN_UP.CONFIRMATION_POPUP.TITLE}</span>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <span className="popup-text">
                    {PAGES.SIGN_UP.CONFIRMATION_POPUP.TEXT}
                </span>
            </Modal.Body>
            <Modal.Footer>
                <div className="row w-50">
                    <div className="col-6">
                        <button
                            type="button"
                            className="btn confirm-popup-button w-100"
                            onClick={registerAccount}>
                            {BUTTONS.YES}
                        </button>

                    </div>
                    <div className="col-6">
                        <button
                            type="button"
                            className="btn confirm-popup-button w-100"
                            onClick={closeConfirmationPopup}>
                            {BUTTONS.NO}
                        </button>
                    </div>
                </div>

            </Modal.Footer>
        </Modal>
    )
}

export default ConfirmationPopup
