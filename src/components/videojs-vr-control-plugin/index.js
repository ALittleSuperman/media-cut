import videoJs from 'video.js'

const Component = videoJs.getComponent('Component')
class vrControl extends Component {
  constructor (player, options = {}) {
    super(player, options)
    this.options = options
    const _this = this
    this.on('mousedown', function (e) {
      const controlType = this.computedDirection(e.target.className)
      _this.viewPoint(controlType)
    })
    this.on('mouseup', function (e) {
      _this.end()
    })
    this.on('mouseleave', function (e) {
      _this.end()
    })
  }

  computedDirection (className) {
    if (className.includes('left')) {
      return 'left'
    } else if (className.includes('top')) {
      return 'top'
    } else if (className.includes('right')) {
      return 'right'
    } else if (className.includes('bottom')) {
      return 'bottom'
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
    console.log(type)
  }

  end () {
    console.log('end')
  }
}
videoJs.registerComponent('vrControl', vrControl)
export default vrControl
