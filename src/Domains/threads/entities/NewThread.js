class NewThread {
  constructor(payload, authentication) {
    this._isNullPayload(payload);
    this._verifyPayload(payload);
    this._verifyAuthentication(authentication);
    this._verifyBearerAuthentication(authentication);

    const { title, body } = payload;

    this.title = title;
    this.body = body;

    this.authentication = authentication.includes("Bearer")
      ? authentication.replace("Bearer ", "")
      : "";
  }

  _isNullPayload(payload) {
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

  _verifyAuthentication(authentication) {
    if (authentication == null) {
      throw new Error("NEW_THREAD.NOT_CONTAIN_ANY_AUTHENTICATION");
    }
  }

  _verifyBearerAuthentication(authentication) {
    if (!authentication.includes("Bearer")) {
      throw new Error("NEW_THREAD.NOT_CONTAIN_BEARER_AUTHENTICATION");
    }
  }
}

module.exports = NewThread;
