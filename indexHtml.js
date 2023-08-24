module.exports = ({htmlWebpackPlugin}) => {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <title>Timeline App</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <!-- Icons and Colors -->
        <link rel="apple-touch-icon" sizes="180x180" href="/images/appIcons/apple-touch-icon.png">
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
        <link rel="manifest" href="/manifest.json">
        <link rel="mask-icon" href="/images/appIcons/safari-pinned-tab.svg" color="#000000">
        <link rel="shortcut icon" href="/favicon.ico">
        <meta name="msapplication-TileColor" content="#000000">
        <meta name="msapplication-TileImage" content="/images/appIcons/mstile-144x144.png">
        <meta name="msapplication-config" content="/browserconfig.xml">
        <meta name="theme-color" content="#000000">
        <script>
            if ("serviceWorker" in navigator) {
                // window.addEventListener("load", () => {
                //     console.log('load', navigator.serviceWorker);
                //     navigator.serviceWorker && navigator.serviceWorker.register('/sw.js').then(
                //     (registration) => {
                //       console.log("Service worker registration succeeded:", registration);
                //     },
                //     (error) => {
                //       console.error(\`Service worker registration failed: \${error}\`);
                //     },
                //   );
                // });
            }
        </script>
         </head>
         <body>
               <div id="root"></div>
         </body>
    </html>
    `;
}