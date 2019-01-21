class Note {
    constructor({title, text, color, pinned = false, date = Date.now()} = {}, nodeManager) {
        this.title = title
        this.text = text
        this.color = color
        this.pinned = pinned
        this.date = date

        // callbacks
        this.remove = nodeManager.remove.bind(nodeManager)
        this.edit = nodeManager.edit.bind(nodeManager)
        this.updateManager = nodeManager.render.bind(nodeManager)
    }

    render() {
        const node = document.createElement('div')
        node.classList.add('mdl-cell', 'mdl-cell--4-col-phone', 'mdl-cel--4-col-tablet', 'mdl-cell--3-col-desktop')

        node.innerHTML = `
        <div class="demo-card-wide mdl-card mdl-shadow--2dp">
            <div class="mdl-card__title">
              <h2 class="mdl-card__title-text">${this.title}</h2>
            </div>
            <div class="mdl-card__supporting-text">
              ${this.text}
            </div>
            <div class="mdl-card__actions mdl-card--border">
              <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect js-note-edit">
                Edit
              </a>
              <a class="mdl-button mdl-button--accent mdl-js-button mdl-js-ripple-effect js-note-remove">
                Remove
              </a>
            </div>
            <div class="mdl-card__menu">
              <button class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect js-note-pin">
                <i class="material-icons">${this.getPinIcon()}</i>
              </button>
            </div>
        </div>
        `

        node.querySelector('.js-note-edit').addEventListener('click', () => this.onEdit())
        node.querySelector('.js-note-remove').addEventListener('click', () => this.onRemove())
        node.querySelector('.js-note-pin').addEventListener('click', () => this.onPin())
        node.querySelector('.mdl-card').style.backgroundColor = this.color
        
        this.node = node
        return node
    }

    onRemove() {
      this.node.remove()
      this.remove(this)
    }

    onEdit() {
      this.edit(this)
    }

    onPin() {
      this.pinned = !this.pinned
      this.updateManager()
    }

    formatDate() {
        return (new Date(this.date)).toLocaleString()
    }

    getPinIcon() {
      return this.pinned ? 'bookmark' : 'bookmark_outline'
    }
}
