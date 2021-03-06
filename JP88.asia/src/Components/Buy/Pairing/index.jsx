// Style
import Modal from 'react-bootstrap/Modal';
import './index.scss';
import searchIcon from '../../../Assets/icon_search.gif';
import closeBtn from '../../../Assets/blue_close_btn.png';

// Context
import { useI18n } from '../../../lang';

const Paring = props => {
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
          <img src={searchIcon} alt="icon" className="" />
          <h3 style={{ color: '#3F80FA' }}>{t('please_wait')}</h3>
          <p>
            {t('buy_order')}：{Number(props.usdt).toFixed(2)} USDT = ${Number(props.rmb).toFixed(0)} {t('currency')}
          </p>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default Paring;
