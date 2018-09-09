const mongoose = require('mongoose');
const requireLogin = require('../middleware/requireLogin');
const requireCredits = require('../middleware/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

module.exports = app => {
  app.get('/api/surveys/thanks', (req, res) => {
    res.send('Thanks for voting!');
  });

  app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, recipients } = req.body;

    // create survey document
    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients.split(',').map(email => ({ email: email.trim() })),
      _user: req.user.id,
    });

    // create email
    const mailer = new Mailer(survey, surveyTemplate(survey));

    try {
      // send email
      await mailer.send();
      // save survey after email successfully sent
      await survey.save();
      // deduct user credits
      req.user.credits -= 1;
      const user = await req.user.save();
      // return updated user
      res.send(user);
    } catch (err) {
      // unprocessable entity (bad data)
      res.status(422).send(err);
    }
  });
};
