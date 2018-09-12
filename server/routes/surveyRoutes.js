const _ = require('lodash');
const Path = require('path-parser').default;
const { URL } = require('url');
const mongoose = require('mongoose');
const requireLogin = require('../middleware/requireLogin');
const requireCredits = require('../middleware/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

module.exports = app => {
  app.get('/api/surveys/:surveyId/:choice', (req, res) => {
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

  app.post('/api/surveys/webhooks', (req, res) => {
    const p = new Path('/api/surveys/:surveyId/:choice');
    // parse route
    _.chain(req.body)
      .map(({ email, url }) => {
        try {
          const match = p.test(new URL(url).pathname);
          if (match) return { email, ...match };
        } catch (err) {
          return;
        }
      })
      // remove undefined to filter for survey click events
      .compact()
      // remove duplicate events
      .uniqBy('email', 'surveyId')
      // update survey and recipient instances
      .each(({ surveyId, email, choice }) => {
        Survey.updateOne(
          {
            _id: surveyId,
            recipients: {
              $elemMatch: { email, responded: false },
            },
          },
          {
            $inc: { [choice]: 1 },
            $set: { 'recipients.$.responded': true },
            lastResponded: Date.now(),
          }
        ).exec();
      })
      .value();
    res.send({});
  });
};
