const NewThread = require("../../Domains/threads/entities/NewThread");

class AddedThreadUseCase {
  constructor({ threadRepository, authenticationTokenManager }) {
    this._threadRepository = threadRepository;
    this._authenticationTokenManager = authenticationTokenManager;
  }

  async execute(useCasePayload, useCaseAuthentication) {
    const newThread = new NewThread(useCasePayload, useCaseAuthentication);
    const accessToken = newThread.authentication;

    const { id } = await this._authenticationTokenManager.decodePayload(
      accessToken
    );

    return this._threadRepository.addThread(newThread, id);
  }
}

module.exports = AddedThreadUseCase;
