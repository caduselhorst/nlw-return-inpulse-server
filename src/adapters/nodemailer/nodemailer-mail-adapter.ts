import nodemailer from 'nodemailer';
import { MailAdapter, SendMailData } from '../mail-adapter';

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "521151817777f4",
      pass: "15cb9ac1c17554"
    }
  });

export class NodemailerMailAdapter implements MailAdapter{
  async sendMail ({ subject, body }: SendMailData) {
    await transport.sendMail({
      from: 'Equipe Feedget <oi@feedget.com>',
      to: 'Carlos Eduardo <cadu.selhorst@gmail.com>',
      subject: subject,
      html: body,
    });
  }
}