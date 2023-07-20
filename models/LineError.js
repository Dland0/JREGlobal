class LineError {
    constructor(message, value, line) {
        this.message = message,
        this.value = value
        this.line = line
    }

    toHTML() {
        return `
          <div class="error-card">
            <h3>Error Information</h3>
            <p><strong>Message:</strong> ${this.message}</p>
            <p><strong>Value:</strong> ${this.value}</p>
            <p><strong>Line:</strong> ${this.line}</p>
          </div>
        `;
      }
}

module.exports = LineError