"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function Jewellery() {
    const [products, setProducts] = useState<any[]>([]);
    const [categories, setCategories] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    // Filters
    const [search, setSearch] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("all");
    const [colorFilter, setColorFilter] = useState("all");
    // Simple price range mockup
    const [priceSort, setPriceSort] = useState("none");

    useEffect(() => {
        async function fetchData() {
            // Fetch categories
            const { data: cats } = await supabase.from('categories').select('*');
            if (cats) setCategories(cats);

            // Fetch products with their primary image
            // Note: is_active filtering is handled by RLS, but we can explicitly request it
            const { data: prods } = await supabase
                .from('products')
                .select(`
          *,
          product_images (image_url)
        `)
                .eq('is_active', true);

            if (prods) setProducts(prods);
            setLoading(false);
        }
        fetchData();
    }, []);

    const filteredProducts = products.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = categoryFilter === "all" || p.category_id === categoryFilter;
        const matchesColor = colorFilter === "all" || (p.color && p.color.toLowerCase() === colorFilter.toLowerCase());
        return matchesSearch && matchesCategory && matchesColor;
    }).sort((a, b) => {
        if (priceSort === "low") return a.price - b.price;
        if (priceSort === "high") return b.price - a.price;
        return 0;
    });

    // Extract unique colors for filter
    const uniqueColors = Array.from(new Set(products.map(p => p.color).filter(Boolean)));

    return (
        <>
            <Navbar />
            <main className="min-h-screen py-section container">
                <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '4rem' }}>
                    <h1 style={{ fontSize: 'clamp(3rem, 5vw, 4.5rem)', marginBottom: '2rem', letterSpacing: '-0.02em' }}>The Collection</h1>

                    {/* Horizontal Elegant Filters */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', alignItems: 'center', borderTop: '1px solid var(--accent-grey)', borderBottom: '1px solid var(--accent-grey)', padding: '1.5rem 0' }}>
                        <div style={{ flex: '1 1 200px' }}>
                            <input
                                type="text"
                                placeholder="Search pieces..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                style={{ border: 'none', borderBottom: '1px solid var(--foreground)', padding: '0.5rem 0', outline: 'none', fontSize: '1rem', width: '250px', background: 'transparent' }}
                            />
                        </div>

                        <div style={{ display: 'flex', gap: '2rem', flex: 1, justifyContent: 'flex-end' }}>
                            <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} style={{ border: 'none', borderBottom: '1px solid var(--accent-grey)', padding: '0.5rem 0', outline: 'none', background: 'transparent', cursor: 'pointer', textTransform: 'uppercase', fontSize: '0.875rem', letterSpacing: '0.1em' }}>
                                <option value="all">Category</option>
                                {categories.map(c => (
                                    <option key={c.id} value={c.id}>{c.name}</option>
                                ))}
                            </select>

                            <select value={colorFilter} onChange={(e) => setColorFilter(e.target.value)} style={{ border: 'none', borderBottom: '1px solid var(--accent-grey)', padding: '0.5rem 0', outline: 'none', background: 'transparent', cursor: 'pointer', textTransform: 'uppercase', fontSize: '0.875rem', letterSpacing: '0.1em' }}>
                                <option value="all">Color</option>
                                {uniqueColors.map(color => (
                                    <option key={color as string} value={color as string}>{color}</option>
                                ))}
                            </select>

                            <select value={priceSort} onChange={(e) => setPriceSort(e.target.value)} style={{ border: 'none', borderBottom: '1px solid var(--accent-grey)', padding: '0.5rem 0', outline: 'none', background: 'transparent', cursor: 'pointer', textTransform: 'uppercase', fontSize: '0.875rem', letterSpacing: '0.1em' }}>
                                <option value="none">Sort</option>
                                <option value="low">Lowest Price</option>
                                <option value="high">Highest Price</option>
                            </select>
                        </div>
                    </div>

                    {/* Product Grid */}
                    {loading ? (
                        <div className="text-center" style={{ padding: '8rem 0', fontSize: '1.25rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Curating Collection...</div>
                    ) : filteredProducts.length === 0 ? (
                        <div className="text-center" style={{ padding: '8rem 0', color: '#666', fontSize: '1.125rem' }}>No pieces found matching your criteria.</div>
                    ) : (
                        <div className="grid grid-cols-3" style={{ gap: '4rem 2rem' }}>
                            {filteredProducts.map((product) => {
                                const primaryImage = product.product_images && product.product_images.length > 0
                                    ? product.product_images[0].image_url
                                    : null;

                                return (
                                    <Link href={`/product/${product.id}`} key={product.id} className="hover-lift group fade-in" style={{ display: 'block' }}>
                                        <div className="hover-zoom" style={{
                                            backgroundColor: 'var(--accent-light)',
                                            aspectRatio: '3/4',
                                            marginBottom: '1.5rem',
                                            overflow: 'hidden'
                                        }}>
                                            <div className="bg-image" style={{
                                                width: '100%',
                                                height: '100%',
                                                backgroundImage: primaryImage ? `url(${primaryImage})` : 'none',
                                                backgroundSize: 'cover',
                                                backgroundPosition: 'center',
                                                transition: 'transform 0.8s ease'
                                            }}>
                                                {!primaryImage && <div style={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center', color: '#999', fontFamily: 'var(--font-serif)' }}>No Image</div>}
                                            </div>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                            <h3 style={{ fontSize: '1.5rem', margin: 0, paddingRight: '1rem', lineHeight: 1.3 }}>
                                                {product.name}
                                            </h3>
                                            <p style={{ color: 'var(--foreground)', fontSize: '1.125rem', whiteSpace: 'nowrap' }}>Rs. {product.price.toLocaleString()}</p>
                                        </div>
                                        <p style={{ color: '#888', marginTop: '0.5rem', fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '1rem' }}>
                                            {product.color || 'Classic Collection'}
                                        </p>
                                    </Link>
                                );
                            })}
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </>
    );
}
