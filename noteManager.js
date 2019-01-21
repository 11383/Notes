class NoteManager {
    constructor(element, dialog) {
        this.element = document.querySelector(element)
        this.dialog = document.querySelector(dialog)
        this.notes = []
        this.load()
    }

    save() {
        localStorage.setItem("notes", JSON.stringify(this.notes))
    }

    //add note from data from dialog
    add() {
        this.showDialog('Add note', {date: Date.now()}, this.addDone)
    }

    edit(note) {
        this.showDialog('Edit note', note, this.editDone)
    }

    showDialog(title, params, callbackSave)
    {
        // action to show dialog with edit action
        this.dialog.querySelector('.js-noteManager-title').innerText = title
        this.dialog.querySelector('.js-noteManager-save').onclick = callbackSave.bind(this)

        // bind values to dialog
        this.bindValuesToModal(params)

        this.dialog.showModal()
    }

    // bind values from given param to modal inputs
    bindValuesToModal(param) {
        const elements = document.querySelectorAll('.js-noteManager-dialog [data-bind]')

        elements.forEach(element => {
            if (param[element.getAttribute('data-bind')]) {
                element.value = param[element.getAttribute('data-bind')]
                element.parentNode.classList.add('is-dirty')
            } else {
                element.value = ""
                element.parentNode.classList.remove('is-dirty')
            }

            if (element.type == 'checkbox') {
                const checkbox = element.parentNode.MaterialCheckbox
                param[element.getAttribute('data-bind')] ? checkbox.check() : checkbox.uncheck()
            }
        })
    }

    // get object of values from modal
    valuesBindFromModal() {
        const params = {}
        const elements = document.querySelectorAll('.js-noteManager-dialog [data-bind]')

        elements.forEach( element => {
            let value = element.value
            element.type == 'checkbox' && (value = element.checked)

            params[element.getAttribute('data-bind')] = value
        })

        return params
    }

    // after 'add' dialog closed
    addDone() {
        const params = this.valuesBindFromModal()

        this.notes.push(new Note(params, this))

        this.dialog.close()
        this.save()

        this.render()
    }

    // after 'edit' dialog closed
    editDone() {
        const params = this.valuesBindFromModal()

        this.notes = this.notes.map( note => {
            if (note.date != params.date) { return note }

            return new Note({...note, ...params}, this) 
        })

        this.dialog.close()
        this.save()

        this.render()
    }
    
    remove(note) {
        this.notes = this.notes.filter( item => item != note )

        this.save()
    }
    
    load() {
        if (!localStorage.getItem("notes")) {
            return
        }
        
        const loadedNotes = JSON.parse(localStorage.getItem("notes"))
        
        this.notes = loadedNotes.map(params => new Note(params, this));
        
        this.render()
    }

    sortNotes(noteA, noteB) {
        if (noteA.pinned == noteB.pinned) {
            return noteB.date - noteA.date
        }
        
        return noteB.pinned - noteA.pinned
    }

    render() {
        this.element.innerHTML = ''

        this.notes
        .sort(this.sortNotes)
        .forEach( note => {
            this.element.appendChild(note.render())
        })
    }
}