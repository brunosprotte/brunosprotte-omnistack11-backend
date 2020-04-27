const app = require('./app');

app.listen(process.env.PORT || 3333, () => {
  console.log('Be The Hero server is running...');
  console.log('listening on 3333');
});
