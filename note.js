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
    }

    render() {
        const node = document.createElement('div')
        node.classList.add('mdl-cell', 'mdl-cell--3-col')

        node.innerHTML = `
            Title: ${this.title} <br>
            Date: ${this.formatDate(this.date)} <br>
            Text: ${this.text} <br>
        `

        node.innerHTML = `
        <div class="demo-card-wide mdl-card mdl-shadow--2dp">
            <div class="mdl-card__title">
              <h2 class="mdl-card__title-text">${this.title}</h2>
            </div>
            <div class="mdl-card__supporting-text">
              ${this.text}
            </div>
            <div class="mdl-card__actions mdl-card--border">
              <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
                Edit
              </a>
              <a class="mdl-button mdl-button--accent mdl-js-button mdl-js-ripple-effect">
                Remove
              </a>
            </div>
            <div class="mdl-card__menu">
              <button class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect">
                <i class="material-icons">bookmark</i>
              </button>
            </div>
        </div>
        `


        node.style.backgroundColor = this.color
        
        node.addEventListener('click', () => this.onRemove())
        this.node = node
        return node
    }

    onRemove() {
        this.node.remove()
        this.remove(this)
    }

    onEdit() {
        // this.edit(this)
    }

    onUpdate(params) {

    }

    formatDate(date) {
        return (new Date(date)).toLocaleString()
    }
}

// .toISOString()