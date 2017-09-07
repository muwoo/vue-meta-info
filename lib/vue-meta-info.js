/**
 * vue-meta-info v0.1.0
 * (c) 2017 monkeyWang
 * @license MIT
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.VueMetaInfo = factory());
}(this, (function () { 'use strict';

/**
 * 存贮一些静态常量
 * @type {string}
 */
// 这个名字用作组件内的变量命
var VUE_META_KEY_NAME = 'metaInfo';

// 用作标识动态添加的 meta 属性
var VUE_META_ATTRIBUTE = 'data-vue-meta-info';

/**
 * 为 dom 设置属性
 * @param el
 * @param opt
 */
function _setAttr (el, opt) {
  el.setAttribute(VUE_META_ATTRIBUTE, true);
  for (var key in opt) {
    if (opt.hasOwnProperty(key)) {
      el.setAttribute(key, opt[key]);
    }
  }
}

/**
 * 移除节点
 * @param parent
 * @param childs
 */
function _removeNode (parent) {
  var childs = parent.querySelectorAll(("[" + VUE_META_ATTRIBUTE + "]"));
  for (var i = childs.length - 1; i > -1; i--) {
    if (childs[i].getAttribute(VUE_META_ATTRIBUTE) === 'true') {
      parent.removeChild(childs[i]);
    }
  }
}

/**
 * metaInfo 操作函数
 * @returns {{setMetaInfo: (function(*)), removeMetaInfo: (function())}}
 */
function operate() {
  return {
    /**
     * 设置 metaInfo 信息
     * @param metaOpts
     */
    setMetaInfo: function setMetaInfo(metaOpts) {
      var ndHead = document.getElementsByTagName('head')[0];
      var loop = function ( key ) {
        if (key === 'title') {
          document.title = metaOpts.title;
          return
        }
        if (metaOpts.hasOwnProperty(key)) {
          metaOpts[key].forEach(function (opt) {
            var ndKey = document.createElement(key);
            _setAttr(ndKey, opt);
            ndHead.appendChild(ndKey);
          });
        }
      };

      for (var key in metaOpts) loop( key );
    },
    /**
     * 删除 metaInfo 添加的 meta 信息
     */
    removeMetaInfo: function removeMetaInfo() {
      var ndHead = document.getElementsByTagName('head')[0];
      _removeNode(ndHead);
    }
  }
}

/**
 * 更新 metaInfo 信息
 * @param opts
 */
function updateMetaInfo (opts) {
  operate().removeMetaInfo();
  operate().setMetaInfo(opts);
}

/**
 * @author monkeywang
 * Date: 17/9/7
 */
var VueMetaInfo = function () {
};

VueMetaInfo.install = function (Vue) {
  Vue.mixin({
    beforeCreate: function beforeCreate () {
      var this$1 = this;

      // 如果组件内设置了 vueMeta 信息
      if (this.$options[VUE_META_KEY_NAME] !== undefined) {
        var type = typeof this.$options[VUE_META_KEY_NAME];
        // 区分是否存在 vueMeta 信息
        this._hasMetaInfo = true;
        // 判断组件内是否存在 computed 对象
        if (typeof this.$options.computed === 'undefined') {
          this.$options.computed = {};
        }
        // 为组件添加 computed 对象并返回 vueMeta 信息
        this.$options.computed.$metaInfo = type === 'function' ? this.$options[VUE_META_KEY_NAME] :
          function () { return this$1.$options[VUE_META_KEY_NAME]; };
      }
    },
    beforeMount: function beforeMount () {
      // 在组件挂载到 dom 之前更新 meta 信息
      if (this._hasMetaInfo) {
        updateMetaInfo(this.$metaInfo);
      }
    },
    mounted: function mounted () {
      var this$1 = this;

      // dom 挂载之后 继续监听 meta 信息。如果发生变化，继续更新
      if (this._hasMetaInfo) {
        this.$watch('$metaInfo', function () {
          updateMetaInfo(this$1.$metaInfo);
        });
      }
    }
  });
};

/**
 * @author monkeywang
 * Date: 17/9/7
 */

return VueMetaInfo;

})));
