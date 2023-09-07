import { randomUUID } from "node:crypto"


export class DatabaseMemory {
    #users = new Map()

    list() {
        return Array.from(this.#users.entries()).map(userArray => {
            const id = userArray[0]
            const data = userArray[1]

            return { id, ...data }
        })
    }

    create(user) {
        const userId = randomUUID()
        // UUID: Universal Unique ID
        this.#users.set(userId, user)
    }

    update(id, user) {
        this.#users.set(id, user)
    }

    delete(id) {
        this.#users.delete(id)
    }

}