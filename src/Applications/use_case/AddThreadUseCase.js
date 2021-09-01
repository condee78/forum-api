const NewThread = require("../../Domains/threads/entities/NewThread");

class AddedThreadUseCase {
  constructor({ threadRepository, authenticationTokenManager }) {
    this._threadRepository = threadRepository;
    this._authenticationTokenManager = authenticationTokenManager;
  }

  async execute(useCasePayload, useCaseAuthentication) {
    const newThread = new NewThread(useCasePayload);
    const accessToken = useCaseAuthentication.replace("Bearer ", "");

    const { username } = await this._authenticationTokenManager.decodePayload(
      accessToken
    );

    return this._threadRepository.addThread(newThread, username);
  }
}

module.exports = AddedThreadUseCase;