import { useContext, useEffect, useState } from 'react';
import { useRouteMatch, useHistory } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

// Context
import BuyContext from '../../context/buy/BuyContext';

// Lang Context
import { useI18n } from '../../lang';

// Components
import BaseSpinner from '../Ui/BaseSpinner';
import ExRate from './ExRate';
import BuyDetail from './BuyDetail';
import FormFooter from '../Layout/FormFooter';
import CompleteStatus from '../universal/CompleteStatus';
import Pairing from './Pairing';
import TheChat from '../Chat/TheChat.js';

// Style
import helpIcon from '../../Assets/i_ask2.png';
import Button from 'react-bootstrap/Button';

const BuyInfo = () => {
  // Lang Context
  const { t } = useI18n();
  // Init State
  const [showChat, setShowChat] = useState(false);

  // Media Query
  const isMobile = useMediaQuery({ query: '(max-width: 1200px)' }); // 小於等於 1200 true

  // Router Props
  const match = useRouteMatch();
  const history = useHistory();

  // Buy Context
  const buyContext = useContext(BuyContext);
  const {
    buyWsData,
    buyConnectWs,
    setOrderToken,
    wsStatus,
    cleanAll,
    GetDeltaTime,
    buyWsClient,
    buyPairing,
    handlePairing,
    buyCount,
    // closeWebSocket,
  } = buyContext;

  // ===========
  //  useEffect
  // ===========
  useEffect(() => {
    const orderToken = match.params.id;
    if (orderToken) {
      buyConnectWs(orderToken);
      setOrderToken(orderToken);
    }

    return () => {
      if (buyWsClient) buyWsClient.close();
      cleanAll();
    };

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (wsStatus === 31 || wsStatus === 32) {
      handlePairing(true);
    } else {
      handlePairing(false);
    }
    // eslint-disable-next-line
  }, [wsStatus]);

  useEffect(() => {
    GetDeltaTime(match.params.id);
    // eslint-disable-next-line
  }, [showChat]);

  // ===========
  //  function
  // ===========
  const backToHome = () => {
    history.replace('/home/overview');
    if (buyWsClient) buyWsClient.close();
    cleanAll();
  };

  const onHide = () => {
    handlePairing(false);
    cleanAll();
    history.replace('/home/overview');
  };

  return (
    <div className="" style={{ position: 'relative' }}>
      <Pairing show={buyPairing} onHide={onHide} usdt={buyCount.usdt} rmb={buyCount.rmb} />
      <ExRate />

      {wsStatus === 33 && buyWsData ? (
        <BuyDetail />
      ) : (wsStatus === 34 || wsStatus === 1 || wsStatus === 99 || wsStatus === 98) && buyWsData ? (
        // <BuyComplete wsStatus={wsStatus} hash={buyWsData.hash} backToHome={backToHome} />
        <CompleteStatus wsStatus={wsStatus} hash={buyWsData.hash} backToHome={backToHome} type="buy" />
      ) : (
        <BaseSpinner />
      )}

      <FormFooter />

      {/* 桌機版聊天室 */}
      {buyWsData && !isMobile ? (
        <div style={chatContainer}>
          <TheChat isChat={!isMobile} hash={buyWsData.hash} />
        </div>
      ) : null}

      {/* 手機版聊天室*/}
      {isMobile && buyWsData ? (
        <div style={MobileChatContainer}>
          <Button style={helpBtn} variant="primary" onClick={() => setShowChat(!showChat)}>
            <img
              style={{
                width: 15,
                height: 20,
                marginRight: 8,
              }}
              src={helpIcon}
              alt="help icon"
            />
            {t('chat_help')}
          </Button>

          <TheChat hash={buyWsData.hash} isChat={showChat} />
        </div>
      ) : null}
    </div>
  );
};

const helpBtn = {
  paddingLeft: 15,
  paddingRight: 15,
  paddingTop: 5,
  paddingBottom: 5,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '1rem 2rem',
  fontSize: '1.5rem',
  fontWeight: 300,
  borderRadius: '10rem',
  position: 'absolute',
  bottom: '5%',
  right: 0,
  backgroundColor: '#F80FA',
};

const MobileChatContainer = {
  height: '600px',
  width: 100,
  position: 'fixed',
  bottom: -15,
  right: 10,
};

const chatContainer = {
  backgroundColor: 'red',
  position: 'absolute',
  top: -95,
  right: '-50%',
};

export default BuyInfo;
