CREATE TABLE
    quotes (
        id_quote INTEGER PRIMARY KEY AUTO_INCREMENT,
        client_id INTEGER NOT NULL,
        contact_name VARCHAR(200) NOT NULL,
        validity DATE NOT NULL,
        files VARCHAR(50),
        notes VARCHAR(100) NOT NULL,
        total INTEGER NOT NULL,
        subtotal INTEGER NOT NULL,
        totalIva INTEGER NOT NULL,
        products JSON NOT NULL,
        FOREIGN KEY (client_id) REFERENCES clients (id_client)
    );