/**
 * metaInfo 操作函数
 * @returns {{setMetaInfo: (function(*)), removeMetaInfo: (function())}}
 */
import _setAttr from './setAttribute'
import _removeNode from './removeNode'

export default function operate() {
  return {
    /**
     * 设置 metaInfo 信息
     * @param metaOpts
     */
    setMetaInfo(metaOpts) {
      let ndHead = document.getElementsByTagName('head')[0]
      for (let key in metaOpts) {
        if (key === 'title') {
          document.title = metaOpts.title
          continue
        }
        if (metaOpts.hasOwnProperty(key)) {
          metaOpts[key].forEach((opt) => {
            let ndKey = document.createElement(key)
            _setAttr(ndKey, opt)
            ndHead.appendChild(ndKey)
          })
        }
      }
    },
    /**
     * 删除 metaInfo 添加的 meta 信息
     */
    removeMetaInfo() {
      let ndHead = document.getElementsByTagName('head')[0]
      _removeNode(ndHead)
    }
  }
}
