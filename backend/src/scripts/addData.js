const mongoose = require('mongoose');

const mongoURI = 'mongoURI=mongodb://127.0.0.1:27017/maiChart';

// const csv = require('csv-parser');
// const fs = require('fs');
// const Student = require('../models/Student');
// const ALT = require('../models/ALT');

const merge = () => {
  console.log('hello');
  //   const data = [];
  //   fs.createReadStream('src/scripts/studentData.csv')
  //     .pipe(csv())
  //     .on('data', (row) => {
  //       // eslint-disable-next-line no-param-reassign
  //       row.classIDs = row.classIDs.replace('[', '').replace(']', '');
  //       // eslint-disable-next-line no-param-reassign
  //       row.classIDs = row.classIDs.split(' ');
  //       data.push(row);
  //     })
  //     .on('end', async () => {
  //       console.log('CSV file successfully processed');
  //       console.log(data);
  //       //   const filteredData = data.filter((res) => res.school === '148');
  //       //   console.log(filteredData.length);
  //       //   await Student.insertMany(data);
  //     });

  //   fs.createReadStream('src/scripts/schoolData.csv')
  //     .pipe(csv())
  //     .on('data', (row) => {
  //       // eslint-disable-next-line no-param-reassign
  //       const dataToAdd = {
  //         studentID: row['lln.ID.school'],
  //         classID: row.classname,
  //         subject: row.subject,
  //         correctAnswers: +row.CorrectAnswers,
  //         correctAdaptive: +row.CorrectAdaptive,
  //         totalAnswers: +row.TotalAnswers,
  //         totalAdaptiveAnswers: +row.TotalAdaptiveAnswers,
  //         totalAdaptiveExercises: +row.TotalAdaptiveExercises,
  //         totalExercises: +row.TotalExercises,
  //         startDate: new Date(row['periode.van']).toISOString(),
  //         endDate: new Date(row['periode.tot']).toISOString(),
  //       };
  //       data.push(dataToAdd);
  //     })
  //     .on('end', async () => {
  //       console.log('CSV2 file successfully processed');
  //       await ALT.insertMany(data);
  //     });
};

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

mongoose.connection.on('connected', () => {
  console.log(`Mongoose connected to ${mongoURI}`);
  merge();
});

mongoose.connection.on('error', (err) => {
  console.log(
    `Failed to connect mongoose to ${mongoURI} due to error ${err}`,
  );
  process.exit(0);
});

mongoose.connection.on('disconnected', () => {
  console.log(`Mongoose disconnected from ${mongoURI}`);
});
