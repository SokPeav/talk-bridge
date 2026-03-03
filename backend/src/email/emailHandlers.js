import { resendClient, sender } from "../lib/resend.js";
import { createWelcomeEmailTemplate } from "./emailTemplates.js";

export const sendWelcomeEmail = async (email, name, clientURL) => {
  const { data, error } = await resendClient.emails.send({
    from: `${sender.name} <${sender.email}>`,
    to: `${email}`,
    subject: `<h1>Welcome to Talk-Bridge, ${name}`,
    html: createWelcomeEmailTemplate(name, clientURL),
  });

  if (error) {
    console.log(error);
  }

  console.log(data);
};
