"use client";

import { useEffect, useState, use } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { supabase } from "@/lib/supabase";
import { MessageCircle, ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Product(props: { params: Promise<{ id: string }> }) {
    const params = use(props.params);
    const [product, setProduct] = useState<any>(null);
    const [images, setImages] = useState<string[]>([]);
    const [mainImage, setMainImage] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProduct() {
            // Fetch product details with category
            const { data: prodData } = await supabase
                .from('products')
                .select(`
          *,
          category:categories(name)
        `)
                .eq('id', params.id)
                .single();

            if (prodData) {
                setProduct(prodData);

                // Fetch product images
                const { data: imgData } = await supabase
                    .from('product_images')
                    .select('image_url')
                    .eq('product_id', params.id);

                if (imgData && imgData.length > 0) {
                    const urls = imgData.map(img => img.image_url);
                    setImages(urls);
                    setMainImage(urls[0]);
                }
            }
            setLoading(false);
        }
        fetchProduct();
    }, [params.id]);

    if (loading) {
        return (
            <>
                <Navbar />
                <main className="min-h-screen py-section container text-center">Loading elegant details...</main>
                <Footer />
            </>
        );
    }

    if (!product) {
        return (
            <>
                <Navbar />
                <main className="min-h-screen py-section container text-center">
                    <h2>Product not found</h2>
                    <Link href="/jewellery" className="btn btn-outline" style={{ marginTop: '2rem' }}>Return to Collection</Link>
                </main>
                <Footer />
            </>
        );
    }

    // Build WhatsApp Message URL
    const whatsappNumber = "94715804185";
    const messageText = `Hello Sayoshopping,

I would like to order the following jewellery:

Product Name: ${product.name}
Price: Rs. ${product.price.toLocaleString()}
Category: ${product.category?.name || 'N/A'}

Please share further details.`;
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(messageText)}`;

    return (
        <>
            <Navbar />
            <main className="min-h-screen py-section container">
                <Link href="/jewellery" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    <ArrowLeft size={16} /> Back to Collection
                </Link>

                <div className="grid grid-cols-2" style={{ alignItems: 'start', gap: '4rem' }}>

                    {/* Image Gallery (70%) */}
                    <div style={{ flex: '1 1 65%' }}>
                        <div className="fade-in" style={{
                            width: '100%',
                            aspectRatio: '3/4',
                            backgroundColor: 'var(--accent-light)',
                            backgroundImage: mainImage ? `url(${mainImage})` : 'none',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            marginBottom: '2rem'
                        }}>
                            {!mainImage && <div style={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center', color: '#999', fontFamily: 'var(--font-serif)' }}>No Image Available</div>}
                        </div>

                        {images.length > 1 && (
                            <div style={{ display: 'flex', gap: '1rem', overflowX: 'auto', paddingBottom: '1rem' }}>
                                {images.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setMainImage(img)}
                                        className="hover-lift"
                                        style={{
                                            width: '120px',
                                            height: '160px',
                                            flexShrink: 0,
                                            backgroundImage: `url(${img})`,
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center',
                                            border: mainImage === img ? '2px solid var(--accent-dark)' : '1px solid transparent',
                                            opacity: mainImage === img ? 1 : 0.6,
                                            transition: 'var(--transition-smooth)'
                                        }}
                                        aria-label={`View image ${idx + 1}`}
                                    />
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Product Details (30%) */}
                    <div style={{ flex: '1 1 30%', position: 'sticky', top: '120px' }}>
                        <p style={{ textTransform: 'uppercase', letterSpacing: '0.15em', fontSize: '0.875rem', color: '#888', marginBottom: '1rem' }}>
                            {product.category?.name || "Uncategorized"}
                        </p>
                        <h1 style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', marginBottom: '1rem', lineHeight: 1.1 }}>{product.name}</h1>
                        <p style={{ fontSize: '1.5rem', fontFamily: 'var(--font-sans)', marginBottom: '3rem', borderBottom: '1px solid var(--accent-grey)', paddingBottom: '2rem' }}>
                            Rs. {product.price.toLocaleString()}
                        </p>

                        {product.color && (
                            <p style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.875rem' }}>
                                <span style={{ color: '#888' }}>Color</span> {product.color}
                            </p>
                        )}

                        <div style={{ marginBottom: '4rem', lineHeight: '2', color: '#555' }}>
                            <h4 style={{ textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.5rem', fontSize: '0.875rem', color: 'var(--accent-dark)' }}>Description & Details</h4>
                            {product.description && Array.isArray(product.description) && product.description.length > 0 ? (
                                <ul style={{ paddingLeft: '1.25rem' }}>
                                    {product.description.map((point: string, idx: number) => (
                                        <li key={idx} style={{ marginBottom: '0.75rem', paddingLeft: '0.5rem' }}>{point}</li>
                                    ))}
                                </ul>
                            ) : (
                                <p style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '1.125rem' }}>An elegant piece crafted with precision and care to elevate your everyday style.</p>
                            )}
                        </div>

                        <a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="btn btn-primary"
                            style={{
                                width: '100%',
                                padding: '1.5rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                border: '1px solid var(--accent-dark)',
                                textDecoration: 'none'
                            }}
                        >
                            <span style={{ letterSpacing: '0.15em' }}>ORDER VIA WHATSAPP</span>
                            <ArrowRight size={20} />
                        </a>

                        <p style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.75rem', color: '#888' }}>
                            Clicking this button will open WhatsApp with a pre-filled order request.
                        </p>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
