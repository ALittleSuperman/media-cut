import videojs from 'videojs'

const Component = videojs.getComponent('Component')
class vrControl extends Component {
  constructor (player, options = {}) {
    super(player, options)
  }

  createEl () {
    const leftControl = videojs.dom.createEl('div', {
      className: 'vjs-left-control'
    })
    const rightControl = videojs.dom.createEl('div', {
      className: 'vjs-right-control'
    })
    const topControl = videojs.dom.createEl('div', {
      className: 'vjs-top-control'
    })
    const bottomControl = videojs.dom.createEl('div', {
      className: 'vjs-bottom-control'
    })
    const centerContainer = videojs.dom.createEl('div', {
      className: 'vjs-center-container',
      content: [leftControl, rightControl]
    })
    const controlContainer = videojs.dom.createEl('div', {
      className: 'vjs-control-container',
      content: [topControl, centerContainer, bottomControl]
    })
    return controlContainer
  }
}

export default vrControl
