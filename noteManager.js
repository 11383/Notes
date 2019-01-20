class NoteManager {
    constructor(element) {
        this.element = document.querySelector(element)
        this.notes = []
        this.load()
    }

    save() {
        localStorage.setItem("notes", JSON.stringify(this.notes))
    }

    add(params) {
        const note = new Note(params, this) 
        
        this.element.append(note.render())
        this.notes.push(note)

        this.save()
    }

    remove(note) {
        this.notes = this.notes.filter( item => item != note )

        this.save()
    }

    edit(note) {
        
        const elements = document.querySelectorAll('.js-noteManager-dialog [data-bind]')

        elements.forEach(element => {
            element.value = note[element.getAttribute('data-bind')]
            element.parentNode.classList.add('is-dirty')
        })

        var dialog = document.querySelector('dialog');

        dialog.showModal();

        console.log(elements)
        // run dialog to edit
        console.log('edit', note)
    }

    update(note) {
    }
    
    load() {
        if (!localStorage.getItem("notes")) {
            return
        }
        
        const loadedNotes = JSON.parse(localStorage.getItem("notes"))
        
        loadedNotes.forEach((params) => this.add(params));
    }

    renderModal(params = {}) {
        // todo
    }

    /**
     * todo
     * 1. render pinned
     * 2. render all
     */
}