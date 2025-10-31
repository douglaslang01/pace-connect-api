class User {
  constructor({ id, usuario, senha, nascimento, sexo, experiencia, objetivo, pace, tipo }) {
    this.id = id;
    this.usuario = usuario;
    this.senha = senha;
    this.nascimento = nascimento;
    this.sexo = sexo;
    this.experiencia = experiencia;
    this.objetivo = objetivo;
    this.pace = pace;
    this.tipo = tipo;
  }
}

module.exports = User;