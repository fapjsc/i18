import React, { useState } from 'react';
import I18nContext from './I18nContext';

const I18nProvider = props => {
  // zh-HK =>繁體
  // zh-CN =>簡體
  // ja-JP =>日文
  const [locale, setLocale] = useState('ja-JP');

  const i18n = {
    t: key => props.translations[locale][key],
    getLocale: () => locale,
    setLocale: locale => setLocale(locale),
  };

  return <I18nContext.Provider value={i18n}>{props.children}</I18nContext.Provider>;
};

export default I18nProvider;
