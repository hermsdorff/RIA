--
-- Banco de Dados: `fluxo`
--

CREATE TABLE teContas (
  idContas INT(11) NOT NULL AUTO_INCREMENT,
  teContas_idContas INT(11) NULL,
  NmConta VARCHAR(100) NOT NULL,
  FgTipo SMALLINT(1) UNSIGNED NOT NULL,
  PRIMARY KEY(idContas),
  INDEX teContas_FKIndex1(teContas_idContas)
);

CREATE TABLE teFluxo (
  idFluxo INT(11) NOT NULL AUTO_INCREMENT,
  teContas_idContas INT(11) NOT NULL,
  DsDescricao VARCHAR(255) NOT NULL,
  DtFluxo DATE NOT NULL,
  NuValor FLOAT(8,2) NOT NULL,
  PRIMARY KEY(idFluxo),
  INDEX teFluxo_FKIndex1(teContas_idContas)
);

CREATE TABLE teUsuario (
  idUsuario INT(11) NOT NULL AUTO_INCREMENT,
  NmUsuario VARCHAR(255) NOT NULL,
  DsLogin VARCHAR(25) NOT NULL,
  DsSenha VARCHAR(100) NOT NULL,
  PRIMARY KEY(idUsuario)
);
