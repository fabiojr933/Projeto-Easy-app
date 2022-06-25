CREATE TABLE DESPESA(
    ID SERIAL,
    DESPESA VARCHAR(100) NOT NULL,
    STATUS CHAR(1) NOT NULL,
    ID_USUARIO INTEGER NOT NULL
) 
CREATE TABLE RECEITA(
    ID SERIAL,
    RECEITA VARCHAR(100) NOT NULL,
    STATUS CHAR(1) NOT NULL,
    ID_USUARIO INTEGER NOT NULL
) 
CREATE TABLE USUARIO(
    ID SERIAL,
    USUARIO VARCHAR(100) NOT NULL,
    EMAIL VARCHAR(100) NOT NULL,
    SENHA VARCHAR(100) NOT NULL,
    TOKEN VARCHAR(100) NOT NULL,
    DATA DATE NOT NULL
)
CREATE TABLE CONTA(
     ID SERIAL,
     NOME VARCHAR(100) NOT NULL,
     CONTA INTEGER NOT NULL,
     BANCO INTEGER NOT NULL,
     STATUS CHAR(1) NOT NULL,
     ID_USUARIO INTEGER NOT NULL
)
CREATE TABLE LANCAMENTO (
    ID SERIAL,
    DESCRICAO VARCHAR(100),
    ID_USUARIO INTEGER NOT NULL,
    ID_DESPESA INTEGER,
    ID_RECEITA INTEGER,
    OFX_ACCTID INTEGER,
    OFX_BANKID INTEGER,
    OFX_TRNTYPE VARCHAR(25),
    OFX_DTPOSTED DATETIME,
    OFX_TRNAMT REAL
    OFX_FITID INTEGER,
    OFX_CHECKNUM INTEGER,
    OFX_MEMO VARCHAR(150),
    OFX_LEDGERBAL REAL,
    TIPO VARCHAR(150)
)


ACCTID => numero da conta do banco
BANKID => numero do banco

TRNTYPE => Aceita os valores 'CREDIT' ou 'DEBIT'.

DTPOSTED => Data de lançamento da transação. Ou seja, a data de disponibilização do valor na conta corrente. exemplo'20220404120000[-3:BRT]',

TRNAMT => Valor da transação com duas casas decimais para os centavos (separados por ponto). Se a transação for um débito, haverá um sinal negativo no valor.
Exemplos:
Crédito: 123.45 equivale a R$ 123,45
Débito: -84.30 equivale a -R$ 84,30

FITID => Código único da transação com 34 caracteres '30930',
CHECKNUM => Protocolo da transação com 15 caracteres. '30930',
MEMO => Descrição da cobrança 'DEB ELO'

LEDGERBAL => Representa o saldo parcial da conta no momento da transação mais recente. Exemplos: 1050.32, -223.95