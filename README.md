# ookinawa

CSS のアーキテクチャは FLOCSS を採用しています。<br>

| Layer      | 役割                                                                                 |
| ---------- | ------------------------------------------------------------------------------------ |
| Foundation | reset/normalize/base/mixins/functions など（assets/scss/に配置）                     |
| Layout     | header/main/sidebar/footer など（components ディレクトリで対応）                     |
| Object     | component/project/utility（utility は assets/scss/に配置で他は components 内で対応） |

詳しくは以下を参照してください。<br>
[FLOCSS](https://github.com/hiloki/flocss)

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start


For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
