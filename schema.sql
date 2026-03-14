-- Supabase Schema for Sayo Shopping

-- 1. Admins Table
CREATE TABLE admins (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    role TEXT DEFAULT 'admin',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Categories Table
CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Products Table
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
    color TEXT,
    description JSONB, -- Array for bullet points
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Product Images Table
CREATE TABLE product_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL
);

-- 5. Orders Table
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    address TEXT NOT NULL,
    product_id UUID REFERENCES products(id) ON DELETE SET NULL,
    price DECIMAL(10, 2) NOT NULL,
    order_status TEXT DEFAULT 'Placed', -- Placed, Packed, Courier, Delivered, Completed, Cancelled
    payment_status TEXT DEFAULT 'Not Paid', -- Paid, Not Paid
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Contacts Table
CREATE TABLE contacts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name TEXT NOT NULL,
    phone1 TEXT NOT NULL,
    phone2 TEXT,
    address TEXT NOT NULL,
    email TEXT NOT NULL,
    description TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Row Level Security (RLS) Policies

-- Enable RLS for all tables
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Allow public read access to categories, products, and images
CREATE POLICY "Allow public read categories" ON categories FOR SELECT USING (true);
CREATE POLICY "Allow public read products" ON products FOR SELECT USING (is_active = true);
CREATE POLICY "Allow public read product images" ON product_images FOR SELECT USING (true);

-- Allow public insert to contacts
CREATE POLICY "Allow public insert contacts" ON contacts FOR INSERT WITH CHECK (true);

-- (Admin policies would be handled via Supabase Auth roles or app-level middleware)
