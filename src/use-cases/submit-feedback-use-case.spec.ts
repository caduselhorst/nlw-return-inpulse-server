import { SubmitFeedbackUseCase } from "./submit-feedback-use-case";

const createFeedbackSpy = jest.fn();
const createSendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
  { create: createFeedbackSpy },
  { sendMail: createSendMailSpy },
);

describe('Submit feedback', () => {
  it('should be able to submit a feedback', async () => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'Example comment',
      screenshot: 'data:image/png;base64,asfaslkjfasfjalskdjflaskdf',
    })).resolves.not.toThrow();
    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(createSendMailSpy).toHaveBeenCalled();
  });

  it('should not be able to submit a feedback without type', async () => {
    await expect(submitFeedback.execute({
      type: '',
      comment: 'Example comment',
      screenshot: 'data:image/png;base64,asfaslkjfasfjalskdjflaskdf',
    })).rejects.toThrow();
  });

  it('should not be able to submit a feedback without comment', async () => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: '',
      screenshot: 'data:image/png;base64,asfaslkjfasfjalskdjflaskdf',
    })).rejects.toThrow();
  });

  it('should not be able to submit a feedback with an invalid screenshot format', async () => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'Example of a comment',
      screenshot: 'asfaslkjfasfjalskdjflaskdf',
    })).rejects.toThrow();
  });
});
