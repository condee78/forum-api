class NewThread {
  constructor(payload) {
    this._isNull(payload);
    this._verifyPayload(payload);

    const { title, body } = payload;

    this.title = title;
    this.body = body;
  }

  _isNull(payload) {
    if (payload == null) {
      throw new Error("NEW_THREAD.NOT_CONTAIN_ANY_PROPERTY");
    }
  }

  _verifyPayload({ title, body }) {
    if (!title || !body) {
      throw new Error("NEW_THREAD.NOT_CONTAIN_NEEDED_PROPERTY");
    }

    if (typeof title !== "string" || typeof body !== "string") {
      throw new Error("NEW_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION");
    }
  }
}

module.exports = NewThread;
