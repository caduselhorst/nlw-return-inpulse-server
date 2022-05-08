import express from 'express';
import { SubmitFeedbackUseCase } from './use-cases/submit-feedback-use-case';
import { PrimaFeedbacksRepository } from './repositories/prisma/prisma-feedbacks-repository';
import { NodemailerMailAdapter } from './adapters/nodemailer/nodemailer-mail-adapter';

export const routes = express.Router();

routes.post('/feedbacks', async (req, res) => {

    const {type, comment, screenshot} = req.body;
  
    const prismaFeedbackRepository = new PrimaFeedbacksRepository();
    const nodeMailerMailAdapter = new NodemailerMailAdapter();
    const submitFeedbackUseCase = new SubmitFeedbackUseCase(
      prismaFeedbackRepository,
      nodeMailerMailAdapter,
    );
  
    await submitFeedbackUseCase.execute({
      type,
      comment,
      screenshot
    });
  
    return res.status(201).send();
  });