class DetailThread {
  constructor(params) {
    this._isNullParams(params);
    this._verifyParams(params);

    const { threadId } = params;

    this.threadId = threadId;
  }

  _isNullParams(params) {
    if (params == null) {
      throw new Error("DETAIL_THREAD.NOT_CONTAIN_ANY_PROPERTY");
    }
  }

  _verifyParams({ threadId }) {
    if (!threadId) {
      throw new Error("DETAIL_THREAD.NOT_CONTAIN_NEEDED_PROPERTY");
    }

    if (typeof threadId !== "string") {
      throw new Error("DETAIL_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION");
    }
  }
}

module.exports = DetailThread;
