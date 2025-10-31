class Training {
  constructor({ id, userId, dataHora, distancia, tempoTotal, pace }) {
    this.id = id;
    this.userId = userId;
    this.dataHora = dataHora;
    this.distancia = distancia;
    this.tempoTotal = tempoTotal;
    this.pace = pace;
  }
}

module.exports = Training;