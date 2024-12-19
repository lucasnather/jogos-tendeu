export class ResourceAlreadyCreateError extends Error {
    constructor(message: string) {
        super(message)
        this.message = message
    }
}