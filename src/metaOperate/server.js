/**
 * @author monkeywang
 * Date: 2018/3/15
 */
export default function (context, metaInfo) {
  if (context && metaInfo) {
    context.title = metaInfo.title || ''
    context.render = {}
    Object.keys(metaInfo).forEach(info => {
      if (info === 'title') return
      context.render[info] = function () {
        let metaNd = ''
        if (metaInfo[info]) {
          metaInfo[info].forEach((item) => {
            let str = `<${info} data-vue-meta-info="true"`
            Object.keys(item).forEach(key => {
              str += `${key}="${item[key]}"`
            })
            str += `></${info}>\n`
            metaNd += str
          })
        }
        return metaNd
      }.bind(this)
    })
  }
}
