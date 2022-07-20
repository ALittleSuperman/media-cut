import videoJs from 'video.js'

const Component = videoJs.getComponent('Component')
class vrControl extends Component {
  constructor (player, options = {}) {
    super(player, options)
    this.options = options
    const _this = this
    this.on(this.el(), ['click', 'tap'], function (e) {
      const controlType = this.computedDirection(e.target.className)
      _this.viewPoint(controlType)
    })
  }

  computedDirection (className) {
    if (className.includes('left')) {
      return 1
    } else if (className.includes('top')) {
      return 2
    } else if (className.includes('right')) {
      return 3
    } else if (className.includes('bottom')) {
      return 4
    }
  }

  createEl () {
    const leftControl = videoJs.dom.createEl('div', {
      className: 'vjs-left-control'
    },
    {
      'data-icon': 'left',
      size: 22
    })
    const rightControl = videoJs.dom.createEl('div', {
      className: 'vjs-right-control'
    },
    {
      'data-icon': 'right',
      size: 22
    })
    const topControl = videoJs.dom.createEl('div', {
      className: 'vjs-top-control'
    },
    {
      'data-icon': 'top',
      size: 22
    })
    const bottomControl = videoJs.dom.createEl('div', {
      className: 'vjs-bottom-control'
    },
    {
      'data-icon': 'bottom',
      size: 22
    })
    const blank = videoJs.dom.createEl('div', {
      className: 'vjs-black-control'
    },
    {
      'data-icon': 'focus',
      size: 22
    })
    const topContainer = videoJs.dom.createEl('div', {
      className: 'vjs-top-container'
    })
    const centerContainer = videoJs.dom.createEl('div', {
      className: 'vjs-center-container'
    })
    const bottomContainer = videoJs.dom.createEl('div', {
      className: 'vjs-bottom-container'
    })

    const controlContainer = videoJs.dom.createEl('div', {
      className: 'vjs-control-container'
    })
    videoJs.dom.appendContent(topContainer, [topControl])
    videoJs.dom.appendContent(centerContainer, [leftControl, blank, rightControl])
    videoJs.dom.appendContent(bottomContainer, [bottomControl])
    videoJs.dom.appendContent(controlContainer, [topContainer, centerContainer, bottomContainer])
    return controlContainer
  }

  viewPoint (type) {
    console.log(this.options, type, '参数')
    if (type === 1) {
      // TODO:向左改变视角
    } else if (type === 2) {
      // TODO:向上改变视角
    } else if (type === 3) {
      // TODO:向右改变视角
    } else if (type === 4) {
      // TODO:向下改变视角
    }
  }
}
videoJs.registerComponent('vrControl', vrControl)
export default vrControl
