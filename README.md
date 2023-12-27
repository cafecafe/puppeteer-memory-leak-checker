# Puppeteer memory leak checker

A slightly modified version of the script initially presented in [this article](https://devforth.io/blog/how-to-simply-workaround-ram-leaking-libraries-like-puppeteer-universal-way-to-fix-ram-leaks-once-and-forever/)<sub> (a saved article copy is available in the docs folder)</sub>

- `index.js` is just a puppeteer visitor script
- `drawmemoryoncharg.js` is a chart drawing script<sub>[source](https://gist.github.com/ivictbor/a0c35865a3e67708b6ff52ba8bc45043)</sub>
- `csv-parse` and `puppeteer` modules are required for the opener
- `vega` and `sharp` modules are needed for drawing the chart

The mentioned alexa top csv file isn't available anymore, therefore it's been replaced by the [Cloudflare top 5000 domains](https://radar.cloudflare.com/domains) (unsorted)

- Screen is required `apt-get install screen` <sub>[detailed guide](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-screen-on-an-ubuntu-cloud-server)</sub>
- Most likely, there will be some libraries missing for Chromium/Puppeteer, this command should solve it <sub>[source](https://stackoverflow.com/questions/66214552/tmp-chromium-error-while-loading-shared-libraries-libnss3-so-cannot-open-sha)</sub>

```
sudo apt-get install ca-certificates fonts-liberation libappindicator3-1 libasound2 libatk-bridge2.0-0 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgbm1 libgcc1 libglib2.0-0 libgtk-3-0 libnspr4 libnss3 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 lsb-release wget xdg-utils
```

There's an option to save the screenshots, if needed, uncomment the following line in _index.js_

```
// await page.screenshot({path: `file${i}.png`});
```

---

## Quick start

```
git clone https://github.com/cafecafe/puppeteer-memory-leak-checker.git
npm install
screen
```

- connect with Putty in a separate window
- in the first window run
  `node index.js --tagprocess`
  _--tagprocess_ here is a fake argument just to track the process later
- in the second window run
  `node drawramonchart.js 'tagprocess'` or `node drawramonchart.js 'tagprocess|chrome'`
- `RAMChart_tagprocess.png` or `RAMChart_tagprocess_or_chrome.png` png should appear in the folder
- _index.js_ runs indifinetly. `Ctrl+C` in the Putty window to stop the `index.js` process, wait a 10 seconds and then `Ctrl+C` in another window to stop the drawing process
