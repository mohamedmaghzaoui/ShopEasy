

-- Users table
CREATE TABLE IF NOT EXISTS Users (
    UserId INTEGER PRIMARY KEY AUTOINCREMENT,
    FirstName TEXT NOT NULL,
    LastName TEXT NOT NULL,
    Email TEXT UNIQUE NOT NULL,
    Address TEXT,
    Phone TEXT
);

-- categories table
CREATE TABLE IF NOT EXISTS Categories (
    CategoryId INTEGER PRIMARY KEY AUTOINCREMENT,
    CategoryName TEXT NOT NULL
);

-- products tablex
CREATE TABLE IF NOT EXISTS Products (
    ProductId INTEGER PRIMARY KEY AUTOINCREMENT,
    ProductName TEXT NOT NULL,
    Price REAL NOT NULL,
    Stock INTEGER DEFAULT 0,
    Description TEXT,
    CategoryId INTEGER,
    FOREIGN KEY (CategoryId) REFERENCES Categories(CategoryId)
);

-- orders table
CREATE TABLE IF NOT EXISTS Orders (
    OrderId INTEGER PRIMARY KEY AUTOINCREMENT,
    UserId INTEGER,
    OrderDate TEXT NOT NULL,
    FOREIGN KEY (UserId) REFERENCES Users(UserId)
);

-- order_details tablle
CREATE TABLE IF NOT EXISTS Order_Details (
    OrderDetailsId INTEGER PRIMARY KEY AUTOINCREMENT,
    OrderId INTEGER,
    ProductId INTEGER,
    Quantity INTEGER NOT NULL,
    UnitPrice REAL NOT NULL,
    FOREIGN KEY (OrderId) REFERENCES Orders(OrderId),
    FOREIGN KEY (ProductId) REFERENCES Products(ProductId)
);

-- reviews 
CREATE TABLE IF NOT EXISTS Reviews (
    ReviewId INTEGER PRIMARY KEY AUTOINCREMENT,
    UserId INTEGER,
    ProductId INTEGER,
    Rating INTEGER,
    Comment TEXT,
    Created_At TEXT,
    FOREIGN KEY (UserId) REFERENCES Users(UserId),
    FOREIGN KEY (ProductId) REFERENCES Products(ProductId)
);

--  Payments
CREATE TABLE IF NOT EXISTS Payments (
    PaymentId INTEGER PRIMARY KEY AUTOINCREMENT,
    OrderId INTEGER,
    PaymentMethod TEXT,
    Amount REAL,
    PaymentDate TEXT,
    Status TEXT,
    FOREIGN KEY (OrderId) REFERENCES Orders(OrderId)
);
