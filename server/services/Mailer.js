const client = require('@sendgrid/client');
const helper = require('@sendgrid/helpers').classes;
const keys = require('../config/keys');

class Mailer extends helper.Mail {
  constructor({ subject, recipients }, content) {
    super();

    // initialize client
    this.client = client;
    client.setApiKey(keys.sendGridKey);

    // email config
    this.from = new helper.EmailAddress('no-reply@emaily.com');
    this.subject = subject;

    this.body = content;
    this.addHtmlContent(this.body);

    this.recipients = this.formatAddresses(recipients);
    this.addTo(this.recipients);

    // enable click tracking
    this.addClickTracking();
  }

  /**
   * Get click data to toggle
   * Recipient responded property
   */
  addClickTracking() {
    this.setTrackingSettings({
      clickTracking: {
        enable: true,
        enableText: true,
      },
    });
  }

  formatAddresses(recipients) {
    return recipients.map(({ email }) => new helper.EmailAddress(email));
  }

  async send() {
    const request = this.client.createRequest({
      method: 'POST',
      url: '/v3/mail/send',
      body: this.toJSON(),
    });
    try {
      const response = await this.client.request(request);
      return response;
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = Mailer;
