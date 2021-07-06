import React from 'react';

// Lang Context
import { useI18n } from '../../../lang';

// Style
import trans from '../../../Assets/icon_trans.gif';
import Modal from 'react-bootstrap/Modal';
import closeBtn from '../../../Assets/blue_close_btn.png';

const OnLoading = props => {
  const { t } = useI18n();
  return (
    <Modal {...props} size="sm" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Body className="text-right">
        <img
          src={closeBtn}
          alt="close btn"
          style={{
            cursor: 'pointer',
          }}
          onClick={props.onHide}
        />

        <div className="text-center">
          <img src={trans} alt="transfer" />
          <h3 style={{ color: '#3F80FA' }}>{t('transfer_onLoading')}</h3>
          <p>
            {t('transfer_text')} {Math.abs(Number(props.usdtCount)).toFixed(2)} USDT
          </p>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default OnLoading;
