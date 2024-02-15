import React from 'react';

export const metadata = {
  title: 'Scrambles Matcher',
};

export const viewport = {
  themeColor: '#000000',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  );
}
