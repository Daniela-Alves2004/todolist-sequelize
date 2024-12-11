const express = require('express');
const router = express.Router();
const modelTask = require("../model/modelTask");

const validaNome = (req, res, next) => {
    const { nome } = req.body;
    if (!nome || nome.trim() === "") {
        return res.status(400).json({ status: false, error: "O nome não foi informado" });
    }
    if (nome.length < 3) {
        return res.status(400).json({ status: false, error: "O nome da tarefa deve ser maior do que 3 caracteres" });
    }
    req.nome = nome;
    next();
};

router.get("/", async (req, res) => {
    try {
        const list = await modelTask.list();
        res.json({ status: true, list });
    } catch (error) {
        res.status(500).json({ status: false, error: error.message });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const task = await modelTask.getElementById(id);
        if (!task) {
            return res.status(404).json({ status: false, error: "Tarefa não encontrada" });
        }
        res.json({ status: true, task });
    } catch (error) {
        res.status(500).json({ status: false, error: error.message });
    }
});

router.post("/", validaNome, async (req, res) => {
    try {
        const task = await modelTask.new(req.nome);
        res.json({ status: true, task });
    } catch (error) {
        res.status(500).json({ status: false, error: error.message });
    }
});

router.put("/:id", validaNome, async (req, res) => {
    try {
        const id = req.params.id;
        const updatedTask = await modelTask.update(id, req.nome);
        if (!updatedTask) {
            return res.status(404).json({ status: false, error: "Tarefa não encontrada" });
        }
        res.json({ status: true, task: updatedTask });
    } catch (error) {
        res.status(500).json({ status: false, error: error.message });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const deleted = await modelTask.delete(id);
        if (!deleted) {
            return res.status(404).json({ status: false, error: "Tarefa não encontrada" });
        }
        res.json({ status: true, message: "Tarefa deletada com sucesso" });
    } catch (error) {
        res.status(500).json({ status: false, error: error.message });
    }
});

module.exports = router;
