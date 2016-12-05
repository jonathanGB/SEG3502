DROP TABLE IF EXISTS requesters;
DROP TABLE IF EXISTS supervisors;


CREATE TABLE supervisors (
  surname               VARCHAR(35) NOT NULL,
  givenName             VARCHAR(35) NOT NULL,
  email                 VARCHAR(254) NOT NULL UNIQUE,
  loginId               VARCHAR(10)  NOT NULL UNIQUE,
  password              VARCHAR(100) NOT NULL,
  status                BOOLEAN NOT NULL DEFAULT TRUE,
  empNumber             VARCHAR(10) NOT NULL UNIQUE,
  PRIMARY KEY (loginId)
);
INSERT INTO supervisors(surname, givenName, email, loginId, password, empNumber) VALUES ('foo2', 'bar2', 'na@topkek.com', '123123', 'foo2bar2', '456456');


CREATE TABLE requesters (
  surname               VARCHAR(35) NOT NULL,
  givenName             VARCHAR(35) NOT NULL,
  email                 VARCHAR(254) NOT NULL UNIQUE,
  loginId               VARCHAR(10)  NOT NULL UNIQUE,
  password              VARCHAR(100) NOT NULL,
  status                BOOLEAN  NOT NULL DEFAULT TRUE,
  type                  VARCHAR(10) NOT NULL,
  studentNumber         INTEGER NOT NULL,
  academicUnit          VARCHAR(50) NOT NULL,
  program               VARCHAR(50) NOT NULL,
  sessionNumber         VARCHAR(10) NOT NULL,
  supervisorId          VARCHAR(10) NOT NULL,
  thesisTopic           VARCHAR(100) NOT NULL,
  bankAccountNumber     INTEGER NOT NULL,
  FOREIGN KEY (supervisorId) REFERENCES Supervisors(empNumber),
  PRIMARY KEY (loginId)
);

DROP TABLE IF EXISTS admins;
CREATE TABLE admins (
  username             VARCHAR(20) NOT NULL,
  password             VARCHAR(100) NOT NULL,
  PRIMARY KEY (username)
);
INSERT INTO admins(username, password) VALUES ('foo', 'bar')
