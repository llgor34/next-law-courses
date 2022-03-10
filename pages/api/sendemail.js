import nodemailer from 'nodemailer';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(200).json({ status: 'error', message: 'Method not supported!' });
    return;
  }

  // console.log(req.body);
  const { name, emailFrom, userMessage } = req.body;

  if (!name || !emailFrom || !userMessage) {
    res
      .status(200)
      .json({ status: 'error', message: 'No required data provided!' });
    return;
  }

  // validate data
  // ...

  const transporter = nodemailer.createTransport({
    host: '', // fill your data here
    port: 0,
    auth: {
      user: '',
      pass: '',
    },
  });

  const message = {
    from: 'next-commerce-app',
    to: [''], // your email here
    subject: `Zapytanie od [ Imię: ${name} ] [ E-mail: ${emailFrom}]`,
    text: `
        Imie: ${name}
        Od: ${emailFrom}
        ${userMessage}
      `,
    html: `
      <div style="font-size: 24px; text-decoration: none;">
        <div style="background-color: #04aa6d; width: 48%; color: #fff; padding: 1%; height: auto; border-radius: 13px; text-align: center; display: block; margin: 2% auto;"> 
          <b>NOWA WIADOMOŚĆ OD</b><br /> ${name} <br>
        </div>
        
        <div style="margin: 2% auto 2% auto; display: block; width: 46%; height: auto; background-color: transparent; border-radius: 13px; text-align: center; padding: 2%;">
          <b>TRESĆ</b><br />${userMessage} <br>
        </div>

        <a href="mailto:${emailFrom}" style="margin: 2% auto; display: block; color: #fff; padding: 1%; width: 48%; height: auto; text-decoration: none; background-color: #04aa6d; border-radius: 13px; text-align: center; text-transform: uppercase; font-weight: bold; ">
          Kliknij by odpowiedzieć
        </a>

      </div>
    `,
  };

  transporter.sendMail(message, (err) => {
    if (err) {
      throw new Error(err);
    }
  });
  res
    .status(200)
    .json({ status: 'success', message: 'Message was successfully sent' });
}
