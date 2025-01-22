// filepath: /D:/Work/pachara-shop/pachara-shop-web/hosting/src/pages/_app.tsx
import { appWithTranslation } from 'next-i18next';
import '../styles/globals.css';
import '../i18n'; // Import i18n configuration

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default appWithTranslation(MyApp);
