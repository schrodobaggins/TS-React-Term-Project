-- NOTE: I figured we'd want this for the section on SQL
PRAGMA foreign_keys;

-- NOTE: For the SQL assignment, we could have them normalize
-- this database farther. Perhaps they can learn about SERIAL and
-- then go implement a way to change a room_name without losing
-- references by using a FOREIGN KEY into a rooms table with an 
-- int primary key.
CREATE TABLE songs (
	id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	song_title text NOT NULL,
	notes text NOT NULL
);

INSERT INTO songs (id, song_title, notes) 
VALUES (1, 'Ode to Joy (Dubstep Remix)', 'E4 E4 F4 G4 G4 F4 E4 D4 C4 C4 D4 E4 E4 D4 D4');

INSERT INTO songs (id, song_title, notes) 
VALUES (2, 'Kenneth`s Stupid Song', 'G4 G4 F4 G4 G4 F4 G4 A4 B4 C5 B4 A4 G4');

INSERT INTO songs (id, song_title, notes) 
VALUES (3, 'Ninja Kun (Nes Soundtrack) ', 'A4 C5 D5 A4 C5 C5 C5 A4 C5 D5 A4 C5 C5 C5 C5 D5 D5 D5 D5 A4 G4 C5 A4 G4 G4 G4 G4 A4 C5 D5 G4 G4 G4 G4 A4 C5 A4 C5 C5 C5 E5 F5 G5 F5 E5 C5 C5 C5 G4 A4 C5 A4');

INSERT INTO songs (id, song_title, notes) 
VALUES (4, 'Song of Storms', 'D4 A4 A4 E4 B4 C12 F4 C5 C5 E4 B4 C12');

INSERT INTO songs (id, song_title, notes) 
VALUES (5, 'AI Generated Song', 'D5 D5 C5 G4 D5 G4 G4 A4 D5 A4 C5 C5 G4 C5 D5 C5 D5 C5 A4 C5 A4 G4 A4 G4 C5 CT A4 G4 A4 D5 C5');

INSERT INTO songs (id, song_title, notes) 
VALUES (6, 'Michael is a bad Musician', 'C5 D5 C5 A4 C5 A4 G4 A4 G4 D5 D5 C5 G4 D5 G4 G4 A4 D5 A4 C5 C5');

INSERT INTO songs (id, song_title, notes) 
VALUES (7, 'Flute Melody', 'E4 E4 F4 G4 D5 D5 C5 G4 D5 G4 D5 D5 C5 G4 D5 G4 G4 A4');

INSERT INTO songs (id, song_title, notes) 
VALUES (8, 'Ukelele Test', 'D4 A4 A4 E4 B4 C12 E4 D4 C4 C4 D4 A4 A4 E4 B4 C12');

INSERT INTO songs (id, song_title, notes) 
VALUES (9, 'Flute Melody Deux', 'E4 D4 C4 C4 E4 E4 F4 G4 G4 F4 E4 D4 C4 C4 E4 E4 F4 G4 D4 E4 E4 D4 D4');

INSERT INTO songs (id, song_title, notes) 
VALUES (10, 'Kalimba Jingle', ' D4 D4 E4 E4  D4 D4 F4 G4 G4 F4 C5 D5 A4 C5 C5 C5 A4 C5 D5 A4 D4 C4 C4 D4 E4 E4 D4 D4');