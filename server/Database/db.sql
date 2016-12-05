DROP TABLE IF EXISTS expense;
DROP TABLE IF EXISTS conference;
DROP TABLE IF EXISTS geoZone;
DROP TABLE IF EXISTS grantapplication;
DROP TABLE IF EXISTS presentationType;
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
  isLoggedIn            BOOLEAN NOT NULL DEFAULT FALSE,
  PRIMARY KEY (loginId)
);
INSERT INTO supervisors(surname, givenName, email, loginId, password, empNumber) VALUES ('foo2', 'bar2', 'na@topkek.com', '123123', '$2a$10$5gXp9Y9a/oTVaoXKU8qgxuB0ljordXiajcL1xYiR47MGxJmsOODkK', '456456');


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
  isLoggedIn            BOOLEAN NOT NULL DEFAULT FALSE,
  FOREIGN KEY (supervisorId) REFERENCES Supervisors(empNumber),
  PRIMARY KEY (loginId)
);

DROP TABLE IF EXISTS admins;
CREATE TABLE admins (
  givenName             VARCHAR(35) DEFAULT 'admin',
  loginId               VARCHAR(20) NOT NULL,
  password              VARCHAR(100) NOT NULL,
  status                BOOLEAN NOT NULL DEFAULT TRUE,
  isLoggedIn            BOOLEAN NOT NULL DEFAULT FALSE,
  PRIMARY KEY (loginId)
);
INSERT INTO admins(loginId, password) VALUES ('admin', '$2a$10$O.nZ9zEUzwroerTkiNCIjOn1FCOyAf1vhYgY0bY3vKQMy9IhRljPa');




CREATE TABLE presentationType (
  name                 VARCHAR(10) NOT NULL UNIQUE
);
INSERT INTO presentationType(name) VALUES ('poster');
INSERT INTO presentationType(name) VALUES ('verbal');

CREATE TABLE grantapplication (
  id                   SERIAL,
  stage                VARCHAR(20) DEFAULT 'pre-approval',
  status               VARCHAR(20) DEFAULT 'started',
  presentationTitle    VARCHAR(50),
  requestAdvanceFunds  BOOLEAN,
  presentationTypeName VARCHAR(10),
  requesterId          VARCHAR(10),
  supervisorId         VARCHAR(10),
  PRIMARY KEY(id),
  FOREIGN KEY(presentationTypeName) REFERENCES presentationType(name),
  FOREIGN KEY(requesterId) REFERENCES requesters(loginId),
  FOREIGN KEY(supervisorId) REFERENCES supervisors(empNumber)
);

CREATE TABLE expense (
  description          VARCHAR(50),
  amount               INTEGER DEFAULT 0,
  requestId            INTEGER NOT NULL,
  UNIQUE(requestId, description),
  FOREIGN KEY(requestId) REFERENCES grantapplication(id)
);

CREATE TABLE geoZone (
  name                VARCHAR(20) NOT NULL UNIQUE
);
INSERT INTO geoZone(name) VALUES('north america');
INSERT INTO geoZone(name) VALUES('south america');
INSERT INTO geoZone(name) VALUES('europe');
INSERT INTO geoZone(name) VALUES('asia');
INSERT INTO geoZone(name) VALUES('africa');
INSERT INTO geoZone(name) VALUES('oceania');

CREATE TABLE conference (
  startDate           DATE,
  endDate             DATE,
  website             VARCHAR(50),
  location            VARCHAR(50),
  applicationId       INTEGER NOT NULL,
  geoZoneName         VARCHAR(20),
  FOREIGN KEY(applicationId) REFERENCES grantapplication(id),
  FOREIGN KEY(geoZoneName) REFERENCES geoZone(name)
);
