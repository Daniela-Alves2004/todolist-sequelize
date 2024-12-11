const Task = require('./defineTask'); 

const modelTask = {
    
    async new(name) {
        return await Task.create({ name });
    },

    async update(id, name) {
        const task = await Task.findByPk(id);
        if (task) {
            task.name = name;
            await task.save();
        }
        return task;
    },

    async list() {
        return await Task.findAll();
    },

    async getElementById(id) {
        return await Task.findByPk(id);
    },

    async delete(id) {
        const task = await Task.findByPk(id);
        if (task) {
            await task.destroy();
            return true;
        }
        return false;
    },
};

module.exports = modelTask;
