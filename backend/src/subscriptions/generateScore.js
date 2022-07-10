const schedule = require('node-schedule');

const job = () => {
  schedule.scheduleJob('*/15 * * * * *', async () => {
    // eslint-disable-next-line no-console
    console.log('Every 15 second');
  });
};

module.exports = job;
