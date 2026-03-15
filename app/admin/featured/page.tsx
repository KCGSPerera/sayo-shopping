"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Search, Save, Star, Image as ImageIcon, Check, X, Loader2 } from "lucide-react";
import Image from "next/image";

export default function FeaturedProductsAdmin() {
    const [products, setProducts] = useState<any[]>([]);
    const [featuredSlots, setFeaturedSlots] = useState<any[]>([
        { slot: 1, productId: null, imageUrl: null, product: null },
        { slot: 2, productId: null, imageUrl: null, product: null },
        { slot: 3, productId: null, imageUrl: null, product: null }
    ]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [activeSlot, setActiveSlot] = useState<number | null>(null); // For which slot we are picking a product
    const [isPickingProduct, setIsPickingProduct] = useState(false);
    const [isPickingImage, setIsPickingImage] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            // Fetch all products for selector
            const { data: productsData } = await supabase
                .from('products')
                .select('*, images:product_images(image_url)')
                .order('name');
            setProducts(productsData || []);

            // Fetch current featured slots
            const { data: featuredData } = await supabase
                .from('featured_products')
                .select('*, product:products(*, images:product_images(image_url))')
                .order('slot');

            if (featuredData && featuredData.length > 0) {
                const newSlots = [...featuredSlots];
                featuredData.forEach(item => {
                    const index = item.slot - 1;
                    if (index >= 0 && index < 3) {
                        newSlots[index] = {
                            slot: item.slot,
                            productId: item.product_id,
                            imageUrl: item.image_url,
                            product: item.product
                        };
                    }
                });
                setFeaturedSlots(newSlots);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
        setLoading(false);
    };

    const handleSelectProduct = (product: any) => {
        if (activeSlot === null) return;

        const newSlots = [...featuredSlots];
        newSlots[activeSlot - 1] = {
            ...newSlots[activeSlot - 1],
            productId: product.id,
            product: product,
            imageUrl: product.images?.[0]?.image_url || null // Default to first image
        };
        setFeaturedSlots(newSlots);
        setIsPickingProduct(false);
        setIsPickingImage(true); // Automatically allow choosing image
    };

    const handleSave = async (slotNum: number) => {
        setSaving(true);
        const slotData = featuredSlots[slotNum - 1];

        try {
            const { error } = await supabase
                .from('featured_products')
                .upsert({
                    slot: slotNum,
                    product_id: slotData.productId,
                    image_url: slotData.imageUrl,
                    updated_at: new Date().toISOString()
                }, { onConflict: 'slot' });

            if (error) throw error;
            alert(`Featured Product ${slotNum} saved!`);
        } catch (error) {
            console.error("Error saving slot:", error);
            alert("Failed to save featured product.");
        }
        setSaving(false);
    };

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.code?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <div style={{ padding: '2rem' }}>Loading featured products...</div>;

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h1 style={{ fontSize: '2rem', marginBottom: '1rem', fontFamily: 'var(--font-serif)' }}>Manage Featured Products</h1>
            <p style={{ color: '#666', marginBottom: '3rem' }}>
                Select exactly 3 products to be showcased in the "Featured Collection" section on the home page.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
                {featuredSlots.map((slotData) => (
                    <div key={slotData.slot} style={{
                        backgroundColor: 'white',
                        padding: '2rem',
                        borderRadius: '12px',
                        boxShadow: 'var(--shadow-subtle)',
                        display: 'flex',
                        flexDirection: 'column',
                        minHeight: '500px'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <span style={{
                                textTransform: 'uppercase',
                                letterSpacing: '0.1em',
                                fontSize: '0.75rem',
                                fontWeight: 600,
                                color: 'var(--accent-dark)'
                            }}>Slot {slotData.slot}</span>
                            <Star size={16} fill={slotData.productId ? 'gold' : 'none'} color={slotData.productId ? 'gold' : '#ccc'} />
                        </div>

                        {slotData.product ? (
                            <>
                                <div style={{
                                    aspectRatio: '1',
                                    backgroundColor: '#f5f5f5',
                                    borderRadius: '8px',
                                    overflow: 'hidden',
                                    marginBottom: '1.5rem',
                                    position: 'relative',
                                    cursor: 'pointer'
                                }} onClick={() => { setActiveSlot(slotData.slot); setIsPickingImage(true); }}>
                                    {slotData.imageUrl ? (
                                        <Image
                                            src={slotData.imageUrl}
                                            alt={slotData.product.name}
                                            fill
                                            style={{ objectFit: 'cover' }}
                                        />
                                    ) : (
                                        <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888' }}>
                                            No image selected
                                        </div>
                                    )}
                                    <div style={{
                                        position: 'absolute',
                                        bottom: 0,
                                        left: 0,
                                        right: 0,
                                        backgroundColor: 'rgba(0,0,0,0.5)',
                                        color: 'white',
                                        padding: '0.5rem',
                                        fontSize: '0.75rem',
                                        textAlign: 'center'
                                    }}>
                                        Change Image
                                    </div>
                                </div>
                                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{slotData.product.name}</h3>
                                <p style={{ color: '#888', fontSize: '0.875rem', marginBottom: '2rem' }}>Code: {slotData.product.code || 'N/A'}</p>

                                <div style={{ marginTop: 'auto', display: 'flex', gap: '0.5rem' }}>
                                    <button
                                        onClick={() => { setActiveSlot(slotData.slot); setIsPickingProduct(true); }}
                                        className="btn"
                                        style={{ flex: 1, backgroundColor: '#eee', color: '#444' }}
                                    >
                                        Change Product
                                    </button>
                                    <button
                                        onClick={() => handleSave(slotData.slot)}
                                        disabled={saving}
                                        className="btn btn-primary"
                                        style={{ flex: 1 }}
                                    >
                                        {saving ? <Loader2 className="animate-spin" size={18} /> : 'Save Slot'}
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div style={{
                                flex: 1,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                border: '2px dashed #eee',
                                borderRadius: '8px',
                                gap: '1rem'
                            }}>
                                <Star size={48} color="#eee" />
                                <button
                                    onClick={() => { setActiveSlot(slotData.slot); setIsPickingProduct(true); }}
                                    className="btn btn-primary"
                                >
                                    Select Product
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Product Selection Modal */}
            {isPickingProduct && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000,
                    padding: '2rem'
                }}>
                    <div style={{
                        backgroundColor: 'white',
                        width: '100%',
                        maxWidth: '800px',
                        maxHeight: '80vh',
                        borderRadius: '12px',
                        display: 'flex',
                        flexDirection: 'column',
                        overflow: 'hidden'
                    }}>
                        <div style={{ padding: '1.5rem', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h2 style={{ fontSize: '1.5rem', margin: 0 }}>Select Product for Slot {activeSlot}</h2>
                            <button onClick={() => setIsPickingProduct(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                                <X size={24} />
                            </button>
                        </div>

                        <div style={{ padding: '1.5rem', backgroundColor: '#f9f9f9' }}>
                            <div style={{ position: 'relative' }}>
                                <Search style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#888' }} size={20} />
                                <input
                                    type="text"
                                    placeholder="Search products by name or code..."
                                    className="form-input"
                                    style={{ paddingLeft: '3rem' }}
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    autoFocus
                                />
                            </div>
                        </div>

                        <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                                {filteredProducts.map(product => (
                                    <div
                                        key={product.id}
                                        onClick={() => handleSelectProduct(product)}
                                        style={{
                                            display: 'flex',
                                            gap: '1rem',
                                            padding: '1rem',
                                            border: '1px solid #eee',
                                            borderRadius: '8px',
                                            cursor: 'pointer',
                                            transition: 'border-color 0.2s'
                                        }}
                                        onMouseEnter={(e) => e.currentTarget.style.borderColor = 'black'}
                                        onMouseLeave={(e) => e.currentTarget.style.borderColor = '#eee'}
                                    >
                                        <div style={{ width: '60px', height: '60px', backgroundColor: '#f5f5f5', borderRadius: '4px', overflow: 'hidden', position: 'relative' }}>
                                            {product.images?.[0] && (
                                                <Image src={product.images[0].image_url} alt={product.name} fill style={{ objectFit: 'cover' }} />
                                            )}
                                        </div>
                                        <div>
                                            <h4 style={{ margin: '0 0 0.25rem 0', fontSize: '0.9rem' }}>{product.name}</h4>
                                            <p style={{ margin: 0, fontSize: '0.75rem', color: '#888' }}>{product.code || 'No Code'}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Image Selection Modal */}
            {isPickingImage && activeSlot !== null && featuredSlots[activeSlot - 1].product && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000,
                    padding: '2rem'
                }}>
                    <div style={{
                        backgroundColor: 'white',
                        width: '100%',
                        maxWidth: '600px',
                        borderRadius: '12px',
                        overflow: 'hidden'
                    }}>
                        <div style={{ padding: '1.5rem', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h2 style={{ fontSize: '1.5rem', margin: 0 }}>Choose Featured Image</h2>
                            <button onClick={() => setIsPickingImage(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                                <X size={24} />
                            </button>
                        </div>

                        <div style={{ padding: '2rem' }}>
                            <p style={{ marginBottom: '1.5rem', color: '#666' }}>
                                Select the image to represent {featuredSlots[activeSlot - 1].product.name} on the home page.
                            </p>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
                                {featuredSlots[activeSlot - 1].product.images?.map((img: any, idx: number) => (
                                    <div
                                        key={idx}
                                        onClick={() => {
                                            const newSlots = [...featuredSlots];
                                            newSlots[activeSlot - 1].imageUrl = img.image_url;
                                            setFeaturedSlots(newSlots);
                                            setIsPickingImage(false);
                                        }}
                                        style={{
                                            aspectRatio: '1',
                                            borderRadius: '8px',
                                            overflow: 'hidden',
                                            position: 'relative',
                                            cursor: 'pointer',
                                            border: featuredSlots[activeSlot - 1].imageUrl === img.image_url ? '3px solid black' : 'none'
                                        }}
                                    >
                                        <Image src={img.image_url} alt="Product image" fill style={{ objectFit: 'cover' }} />
                                        {featuredSlots[activeSlot - 1].imageUrl === img.image_url && (
                                            <div style={{ position: 'absolute', top: '0.5rem', right: '0.5rem', backgroundColor: 'black', color: 'white', borderRadius: '50%', padding: '0.25rem' }}>
                                                <Check size={12} />
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
