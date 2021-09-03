import bs from 'browser-sync'
import { styles } from './styles.js'
import { scripts } from './scripts.js'
import { assets } from './assets.js'
import pkg from 'gulp'
import { prepareHtmlDev } from './prepare-html-dev.js'
import { convertHBS } from './hbs.js'

const { series, watch } = pkg

export const server = bs.create()

export const initServer = () => {
  return server.init({
    server: [$.conf.outputPath, $.conf.app],
    startPath: $.conf.htmlPages,
    notify: false, // уведомления отключены
    port: 3000,
    browser: 'google chrome',
  })
}

export const initWatcher = () => {
  const watchHBS = [`${$.conf.app}/${$.conf.pathHTML}/**/*`, `${$.conf.app}/${$.conf.db}/db/*`]
  // watch(`${$.conf.app}/${$.conf.pathHTML}/**/*.html`, series(optHTML))
  watch(`${$.conf.app}/${$.conf.pathStyles}/**/*.scss`, series(styles))
  watch(`${$.conf.app}/${$.conf.pathJS}/**/*.js`, series(scripts))
  watch(`${$.conf.src}/${$.conf.pathAssets}/**/*`, series(assets))
  watch(watchHBS, series([convertHBS, prepareHtmlDev]))
}
