import { useContext, useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

// Context
import InstantContext from '../../context/instant/InstantContext';

// Lang Context
import { useI18n } from '../../lang';

// Components
import SellDetail from './SellDetail';
import BuyDetail from './BuyDetail';
import TheChat from '../Chat/TheChat.js';
import BaseSpinner from '../Ui/BaseSpinner';

// Style
import helpIcon from '../../Assets/i_ask2.png';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const InstantDetail = () => {
  // Lang Context
  const { t } = useI18n();
  // Router Props
  const match = useRouteMatch();

  // Media Query
  const isMobile = useMediaQuery({ query: '(max-width: 1200px)' }); // 小於等於 1200 true

  // Instant Context
  const instantContext = useContext(InstantContext);
  const { sell1Data, buy1Data, sellMatch1, buyMatch1, instantOngoingWsConnect } = instantContext;

  // Init State
  // const [showMobileChat, setShowMobileChat] = useState(false);
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    instantOngoingWsConnect();
    const orderToken = match.params.id;
    if (orderToken) {
      if (match.params.type === 'buy') sellMatch1(orderToken);
      if (match.params.type === 'sell') buyMatch1(orderToken);
    }

    return () => {};
    // eslint-disable-next-line
  }, []);

  if (sell1Data) {
    return (
      <div className="container h_88" style={{ position: 'relative' }}>
        <SellDetail />

        {/* Chat --桌機版 */}
        {!isMobile && sell1Data ? (
          <div style={chatContainer}>
            <TheChat isChat={!isMobile} hash={sell1Data.Tx_HASH} />
          </div>
        ) : null}

        {/* Chat --手機版  */}
        {isMobile && sell1Data ? (
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

            <TheChat hash={sell1Data.Tx_HASH} isChat={showChat} />
          </div>
        ) : null}
      </div>
    );
  } else if (buy1Data) {
    return (
      <div className="container h_88" style={{ position: 'relative' }}>
        <BuyDetail />

        {/* Chat --桌機版 */}
        {!isMobile && buy1Data ? (
          <div style={chatContainer}>
            <TheChat isChat={!isMobile} hash={buy1Data.Tx_HASH} />
          </div>
        ) : null}

        {/* Chat --手機版  */}
        {isMobile && buy1Data ? (
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
            <TheChat hash={buy1Data.Tx_HASH} isChat={showChat} />
          </div>
        ) : null}
      </div>
    );
  } else {
    return (
      <Card>
        <BaseSpinner />
      </Card>
    );
  }
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
  height: 600,
  width: 100,
  position: 'fixed',
  bottom: 25,
  right: 10,
};

const chatContainer = {
  position: 'absolute',
  top: 62,
  right: 0,
};

export default InstantDetail;
