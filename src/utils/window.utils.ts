export class WindowUtils {
  static addEventListenerAndReturnRemover(type: keyof WindowEventMap, listener: () => any): () => void {
    window.addEventListener(type, listener)
    return () => window.removeEventListener(type, listener)
  }
}
