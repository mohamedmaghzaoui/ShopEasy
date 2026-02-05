-- index.sql

-- Table User
CREATE TABLE IF NOT EXISTS User (
    UserId INTEGER PRIMARY KEY AUTOINCREMENT,
    FirstName TEXT NOT NULL,
    LastName TEXT NOT NULL,
    Email TEXT UNIQUE NOT NULL,
    Address TEXT,
    Phone TEXT
);

-- Table Category
CREATE TABLE IF NOT EXISTS Category (
    CategoryId INTEGER PRIMARY KEY AUTOINCREMENT,
    CategoryName TEXT NOT NULL
);

-- Table Product
CREATE TABLE IF NOT EXISTS Product (
    ProductId INTEGER PRIMARY KEY AUTOINCREMENT,
    ProductName TEXT NOT NULL,
    Price REAL NOT NULL,
    Stock INTEGER DEFAULT 0,
    Description TEXT,
    CategoryId INTEGER,
    FOREIGN KEY (CategoryId) REFERENCES Category(CategoryId)
);

-- Table Order
CREATE TABLE IF NOT EXISTS "Order" (
    OrderId INTEGER PRIMARY KEY AUTOINCREMENT,
    UserId INTEGER,
    OrderDate TEXT NOT NULL,
    FOREIGN KEY (UserId) REFERENCES User(UserId)
);

-- Table Order_Details
CREATE TABLE IF NOT EXISTS Order_Details (
    OrderDetailsId INTEGER PRIMARY KEY AUTOINCREMENT,
    OrderId INTEGER,
    ProductId INTEGER,
    Quantity INTEGER NOT NULL,
    UnitPrice REAL NOT NULL,
    FOREIGN KEY (OrderId) REFERENCES "Order"(OrderId),
    FOREIGN KEY (ProductId) REFERENCES Product(ProductId)
);

-- Table Reviews
CREATE TABLE IF NOT EXISTS Reviews (
    Id INTEGER PRIMARY KEY AUTOINCREMENT,
    UserId INTEGER,
    ProductId INTEGER,
    Rating INTEGER,
    Comment TEXT,
    Created_At TEXT,
    FOREIGN KEY (UserId) REFERENCES User(UserId),
    FOREIGN KEY (ProductId) REFERENCES Product(ProductId)
);

-- Table Payment
CREATE TABLE IF NOT EXISTS Payment (
    PaymentId INTEGER PRIMARY KEY AUTOINCREMENT,
    OrderId INTEGER,
    PaymentMethod TEXT,
    Amount REAL,
    PaymentDate TEXT,
    Status TEXT,
    FOREIGN KEY (OrderId) REFERENCES "Order"(OrderId)
);
