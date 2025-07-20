import { randomBytes } from "crypto"

export default class QuizAction {
    static generateCode(length: number = 8): string {
        return randomBytes(length).toString("hex").slice(0, length).toUpperCase();
    }
}

