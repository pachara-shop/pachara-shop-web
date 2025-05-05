'use client';

import { useEffect, useState } from 'react';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';
import '@public/styles/swagger-ui-custom.css';
function ApiDocs() {
  const [spec, setSpec] = useState(null);

  useEffect(() => {
    fetch('/api/docs')
      .then((response) => response.json())
      .then((data) => setSpec(data));
  }, []);

  if (!spec) {
    return <div>Loading...</div>;
  }

  return (
    <SwaggerUI
      spec={spec}
      // เพิ่มการตั้งค่าเหล่านี้เพื่อให้แสดง JSON แบบสวยงาม
      docExpansion='list'
      deepLinking={true}
      defaultModelExpandDepth={3}
      displayRequestDuration={true}
      filter={true}
      showExtensions={true}
      showCommonExtensions={true}
      supportedSubmitMethods={['get', 'post', 'put', 'delete', 'patch']}
      requestInterceptor={(req) => {
        return req;
      }}
      responseInterceptor={(res) => {
        // จัดรูปแบบ JSON response
        if (
          res.text &&
          res.headers['Content-Type']?.includes('application/json')
        ) {
          try {
            const json = JSON.parse(res.text);
            res.text = JSON.stringify(json, null, 2);
          } catch (e) {
            console.error('Failed to parse JSON', e);
          }
        }
        return res;
      }}
    />
  );
}

export default ApiDocs;
