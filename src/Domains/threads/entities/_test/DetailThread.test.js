const DetailThread = require("../DetailThread");

describe("a DetailThread entities", () => {
  it("should throw error when params did not contain any property", () => {
    // Arrange
    const params = null;

    // Action and Assert
    expect(() => new DetailThread(params)).toThrowError(
      "DETAIL_THREAD.NOT_CONTAIN_ANY_PROPERTY"
    );
  });

  it("should throw error when params did not contain needed property", () => {
    // Arrange
    const params = {};

    // Action and Assert
    expect(() => new DetailThread(params)).toThrowError(
      "DETAIL_THREAD.NOT_CONTAIN_NEEDED_PROPERTY"
    );
  });

  it("should create DetailThread object correctly", () => {
    // Arrange
    const params = {
      threadId: "thread-1",
    };

    // Action
    const { threadId } = new DetailThread(params);

    // Assert
    expect(threadId).toEqual(params.threadId);
  });
});
