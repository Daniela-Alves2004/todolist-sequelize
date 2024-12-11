const express = require('express');
const sequelize = require('./sequelize');
const indexRouter = require('./routes/index');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);

(async () => {
    try {
        await sequelize.sync({ force: false });
        console.log('Database synchronized successfully.');
        app.listen(port, () => {
            console.log(`Server running on port ${PORT}`);
        });

    } catch (error) {
        console.error('Error synchronizing the database:', error);
    }
})();

module.exports = app;