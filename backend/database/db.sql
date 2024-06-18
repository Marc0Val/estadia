CREATE DATABASE microtest;
USE microtest;

CREATE TABLE personal (
    id_personal INTEGER PRIMARY KEY AUTO_INCREMENT,
    name_ VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    role_ VARCHAR(50) NOT NULL,
    title VARCHAR(50),
    email VARCHAR(255) NOT NULL,
    cell_number VARCHAR(10) NOT NULL,
    country VARCHAR(100) NOT NULL,
    state_ VARCHAR(100) NOT NULL,
    city VARCHAR(100) NOT NULL,
    phone VARCHAR(10),
    address_ TEXT NOT NULL,
    password_ VARCHAR(200) NOT NULL
);

CREATE TABLE clients (
    id_client INTEGER PRIMARY KEY AUTO_INCREMENT,
    trade_name VARCHAR(255) NOT NULL,
    business_type VARCHAR(255) NOT NULL,
    phone_or_cell VARCHAR(100),
    email VARCHAR(255),
    street VARCHAR(255) NOT NULL,
    number_ VARCHAR(50) NOT NULL,
    neighborhood VARCHAR(255),
    postal_code VARCHAR(20),
    city VARCHAR(100) NOT NULL,
    country VARCHAR(100) NOT NULL,
    state_ VARCHAR(100) NOT NULL,
    location_ TEXT,
    notes TEXT,
    contact_name VARCHAR(255) NOT NULL,
    contact_title VARCHAR(100),
    contact_area_or_position VARCHAR(100),
    contact_cell_phone VARCHAR(100) NOT NULL,
    contact_email VARCHAR(255)
);

CREATE TABLE suppliers (
    id_supplier INTEGER PRIMARY KEY AUTO_INCREMENT,
    trade_name VARCHAR(255) NOT NULL,
    business_type VARCHAR(255) NOT NULL,
    cell_number VARCHAR(100) NOT NULL,
    email VARCHAR(255),
    country VARCHAR(100) NOT NULL,
    state_ VARCHAR(100) NOT NULL,
    address_ TEXT,
    city VARCHAR(100) NOT NULL,
    postal_code VARCHAR(20),
    location_ TEXT,
    website VARCHAR(255),
    bank_accounts TEXT,
    billing_name VARCHAR(255),
    billing_number VARCHAR(100),
    billing_address TEXT,
    notes TEXT,
    contact_name VARCHAR(255) NOT NULL,
    contact_title VARCHAR(100),
    contact_area_or_position VARCHAR(100),
    contact_cell_phone VARCHAR(100) NOT NULL,
    contact_email VARCHAR(255)
);


CREATE TABLE contacts (
    id_contact INTEGER PRIMARY KEY AUTO_INCREMENT,
    name_ VARCHAR(200) NOT NULL,
    last_name VARCHAR(200) NOT NULL,
    position VARCHAR(200) NOT NULL,
    title VARCHAR(200) NOT NULL,
    type_ VARCHAR(200),
    cell_number VARCHAR(10) NOT NULL,
    phone_number VARCHAR(10),
    email VARCHAR(200),
    street VARCHAR(200),
    number_ VARCHAR(10),
    neighborhood VARCHAR(200),
    country VARCHAR(100),
    state_ VARCHAR(100),
    city VARCHAR(100),
    postal_code VARCHAR(20)
);

CREATE TABLE categories (
    id_category INTEGER PRIMARY KEY AUTO_INCREMENT,
    name_ VARCHAR(50)
);

CREATE TABLE products (
    id_product INTEGER PRIMARY KEY AUTO_INCREMENT,
    name_ VARCHAR(255) NOT NULL,
    category_id INT NOT NULL,
    unit VARCHAR(100) NOT NULL,
    description_ TEXT NOT NULL,
    sale_price DECIMAL(10, 2) NOT NULL,
    model VARCHAR(100),
    factory_code VARCHAR(100),
    supplier_id INT NOT NULL,
    manufacturer_brand VARCHAR(255),
    reorder_point INT NOT NULL,
    initial_stock INT NOT NULL,
    minimum_stock INT NOT NULL,
    FOREIGN KEY (category_id) REFERENCES categories(id_category),
    FOREIGN KEY (supplier_id) REFERENCES suppliers(id_supplier)
);

CREATE TABLE services (
    id_service INTEGER PRIMARY KEY AUTO_INCREMENT,
    name_ VARCHAR(255) NOT NULL,
    category_id INTEGER NOT NULL,
    sale_price DECIMAL(10, 2) NOT NULL,
    description_ TEXT NOT NULL,
    sat_unit VARCHAR(100),
    sat_code VARCHAR(100),
    FOREIGN KEY (category_id) REFERENCES categories(id_category)
);

CREATE TABLE services_orders (
    id_service_order INTEGER PRIMARY KEY AUTO_INCREMENT,
    client_id INTEGER NOT NULL,
    contact_id INTEGER NOT NULL,
    service_id INTEGER NOT NULL,
    personal_id INTEGER NOT NULL,
    scheduled_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    quantity INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    additional_info VARCHAR(100) NOT NULL,
    activities VARCHAR(4000) NOT NULL,
    recomendations VARCHAR(4000) NOT NULL,
    files VARCHAR(50) NOT NULL,
    notes VARCHAR(100) NOT NULL,
    FOREIGN KEY (client_id) REFERENCES clients(id_client),
    FOREIGN KEY (contact_id) REFERENCES contacts(id_contact),
    FOREIGN KEY (service_id) REFERENCES services(id_service),
    FOREIGN KEY (personal_id) REFERENCES personal(id_personal),
    FOREIGN KEY (product_id) REFERENCES products(id_product)
);

CREATE TABLE quotes (
    id_quote INTEGER PRIMARY KEY AUTO_INCREMENT,
    client_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    discount INTEGER NOT NULL, 
    iva INTEGER NOT NULL,
    validity DATE NOT NULL,
    files VARCHAR(50) NOT NULL,
    notes VARCHAR(100) NOT NULL,
    FOREIGN KEY (client_id) REFERENCES clients(id_client),
    FOREIGN KEY (product_id) REFERENCES products(id_product)
);

CREATE TABLE purchase_orders (
    id_purchase_order INTEGER PRIMARY KEY AUTO_INCREMENT,
    supplier_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    iva INTEGER NOT NULL,
    validity DATE NOT NULL,
    files VARCHAR(50) NOT NULL,
    notes VARCHAR(100) NOT NULL,
    FOREIGN KEY (supplier_id) REFERENCES suppliers(id_supplier),
    FOREIGN KEY (product_id) REFERENCES products(id_product)
);

CREATE TABLE client_assets(
    id_client_asset INTEGER PRIMARY KEY AUTO_INCREMENT,
    product_id INTEGER NOT NULL,
    client_id INTEGER,
    name_ VARCHAR(100) NOT NULL,
    description_ VARCHAR(200) NOT NULL,
    serial_ INTEGER,
    inventory_number INTEGER,
    FOREIGN KEY (product_id) REFERENCES products(id_product),
    FOREIGN KEY (client_id) REFERENCES clients(id_client)
);