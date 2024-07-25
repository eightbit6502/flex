const sgMail = require('@sendgrid/mail');

class EmailService {
  constructor() {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  }

  async sendActivationEmail(to, activationToken) {
    const msg = {
      from: 'sixfivezerotwo@outlook.com',
      template_id: 'd-48d92a5eba9c46e4af408e7bae97fa72',
      personalizations: [{
        to,
        dynamic_template_data: {
          subject: `Activate your account`,
          email: to,
          activationToken: activationToken
        },
      }]
    };

    try {
      await sgMail.send(msg);
      console.log('[emailService] sendActivationEmail success');
    } catch (error) {
      console.error(error);
      throw new Error('[emailService] sendActivationEmail failure');
    }
  }

  async sendWelcomeEmail(to, firstName) {
    const msg = {
      from: 'sixfivezerotwo@outlook.com',
      template_id: 'd-60df36a3224d46deb2ec45dd436c319f',
      personalizations: [{
        to,
        dynamic_template_data: {
          first_name: firstName
        },
      }]
    };

    try {
      await sgMail.send(msg);
      console.log('[emailService] sendWelcomeEmail success');
    } catch (error) {
      console.error(error);
      throw new Error('[emailService] sendWelcomeEmail failure');
    }
  }

  async sendResetPasswordEmail(to, firstName, resetUrl) {
    const msg = {
      from: 'sixfivezerotwo@outlook.com',
      template_id: 'd-810bda38f748422dacf522cf658e1f5b',
      personalizations: [{
        to,
        dynamic_template_data: {
          first_name: firstName,
          reset_url: resetUrl

        },
      }]
    };

    try {
      await sgMail.send(msg);
      console.log('[emailService] sendResetPasswordEmail success');
    } catch (error) {
      console.error(error);
      throw new Error('[emailService] sendResetPasswordEmail failure');
    }
  }

  async newPassword(to, firstName, country, platform, browser, ip) {
    const msg = {
      from: 'sixfivezerotwo@outlook.com',
      template_id: 'd-909671c1cf74410e80755f42cc6789ed',
      personalizations: [{
        to,
        dynamic_template_data: {
          first_name: firstName,
          email: to
        },
      }]
    };

    try {
      await sgMail.send(msg);
      console.log('[emailService] newPassword success');
    } catch (error) {
      console.error(error);
      throw new Error('[emailService] newPassword failure');
    }
  }
}

module.exports = EmailService;
