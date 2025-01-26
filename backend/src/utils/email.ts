import { EmailClient } from "@azure/communication-email";
import dotenv from "dotenv";
dotenv.config();
const transporter = new EmailClient(
  process.env.COMMUNICATION_SERVICES_CONNECTION_STRING!.toString()
);

export const sendVerificationEmail = async (email: string, token: string) => {
  const poller = await transporter.beginSend({
    senderAddress: process.env.AZURE_SENDER_ADRESS || "",
    recipients: {
      to: [
        {
          address: email,
        },
      ],
    },
    content: {
      subject: "Email Verification",
      html: `Click <a href="${process.env.BASE_URL}/verify-email?token=${token}">here</a> to verify your email`,
    },
  });
  await poller.pollUntilDone();
};

export const sendJobAlert = async (
  emails: string[],
  jobDetails: any,
  companyDetails: any
) => {
  const poller = await transporter.beginSend({
    senderAddress: process.env.AZURE_SENDER_ADRESS || "",
    recipients: {
      bcc: emails.map((email) => {
        return {
          address: email,
        };
      }),
    },
    content: {
      subject: `New Job Opportunity: ${jobDetails.title}`,
      html: `
        <h1>${jobDetails.title}</h1>
        <p>${jobDetails.description}</p>
        <p>Experience Level: ${jobDetails.experienceLevel}</p>
        <p>Apply before: ${new Date(
          jobDetails.endDate
        ).toLocaleDateString()}</p>
        <hr>
        <p>Contact: ${companyDetails.email} | ${companyDetails.mobile}</p>
      `,
    },
  });
  await poller.pollUntilDone();
};
