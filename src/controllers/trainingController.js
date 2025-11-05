const { addTraining, getTrainingsByUser, deleteTraining, consolidatePace, consolidateAllPaces, groupByPace } = require('../services/trainingService');
const { trainingIdSeq } = require('../data/inMemoryDb');

exports.addTraining = (req, res) => {
  const training = { ...req.body, id: trainingIdSeq, userId: req.user.id };
  addTraining(training);
  require('../data/inMemoryDb').trainingIdSeq++;
  res.status(201).json(training);
};

exports.getMyTrainings = (req, res) => {
  res.json(getTrainingsByUser(req.user.id));
};

exports.getUserTrainings = (req, res) => {
  res.json(getTrainingsByUser(req.params.userId));
};

exports.deleteTraining = (req, res) => {
  const success = deleteTraining(req.params.id, req.user.id);
  if (!success) return res.status(404).json({ error: 'Treino não encontrado ou não autorizado' });
  res.status(204).send();
};

exports.consolidatePace = (req, res) => {
  const pace = consolidatePace(req.params.userId);
  if (pace === null) return res.status(404).json({ error: 'Sem treinos válidos para consolidação' });
  res.json({ pace });
};


exports.groupByPace = (req, res) => {
  res.json(groupByPace());
};