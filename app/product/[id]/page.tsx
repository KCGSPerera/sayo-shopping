"use client";

import { useEffect, useState, use } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { supabase } from "@/lib/supabase";
import { MessageCircle, ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

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
    const formattedPrice = typeof product.price === 'number'
        ? product.price.toLocaleString()
        : Number(product.price).toLocaleString();

    const messageText = `Hello Sayoshopping,

I would like to order the following jewellery:

Product Code: ${product.code || 'N/A'}
Product Name: ${product.name}
Price: Rs. ${formattedPrice}
Category: ${product.category?.name || 'N/A'}

Please share further details.`;
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(messageText)}`;

    return (
        <>
            <Navbar />
            <main className="min-h-screen container" style={{ paddingTop: '50px', paddingBottom: '100px' }}>
                <Link href="/jewellery" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    <ArrowLeft size={16} /> Back to Collection
                </Link>

                <div className="product-layout" style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '6vw', alignItems: 'start' }}>

                    {/* Image Gallery Section */}
                    <div className="gallery-section" style={{ position: 'sticky', top: '140px' }}>
                        <div className="fade-in main-image-wrapper" style={{
                            width: '100%',
                            aspectRatio: '3/4',
                            backgroundColor: 'var(--accent-light)',
                            marginBottom: '2rem',
                            position: 'relative',
                            overflow: 'hidden'
                        }}>
                            {mainImage ? (
                                <Image
                                    src={mainImage}
                                    alt={product.name}
                                    fill
                                    style={{ objectFit: 'cover', objectPosition: 'center' }}
                                    priority
                                    sizes="(max-width: 1024px) 100vw, 60vw"
                                />
                            ) : (
                                <div style={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center', color: '#999', fontFamily: 'var(--font-serif)' }}>No Image Available</div>
                            )}
                        </div>

                        {images.length > 1 && (
                            <div className="thumbnail-grid" style={{ display: 'flex', gap: '1rem', overflowX: 'auto', paddingBottom: '1rem' }}>
                                {images.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setMainImage(img)}
                                        className="hover-lift"
                                        style={{
                                            width: '100px',
                                            height: '133px',
                                            flexShrink: 0,
                                            position: 'relative',
                                            backgroundColor: 'var(--accent-light)',
                                            border: mainImage === img ? '2px solid var(--accent-dark)' : '1px solid transparent',
                                            transition: 'var(--transition-smooth)',
                                            padding: 0,
                                            overflow: 'hidden'
                                        }}
                                        aria-label={`View image ${idx + 1}`}
                                    >
                                        <Image
                                            src={img}
                                            alt={`${product.name} thumbnail ${idx + 1}`}
                                            fill
                                            style={{ objectFit: 'cover' }}
                                            sizes="100px"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Product Details Section */}
                    <div className="info-section" style={{ padding: '0' }}>
                        <p style={{ textTransform: 'uppercase', letterSpacing: '0.15em', fontSize: '0.875rem', color: '#888', marginBottom: '1rem' }}>
                            {product.category?.name || "Uncategorized"}
                        </p>
                        <h1 className="product-title" style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', marginBottom: '1rem', lineHeight: 1.1 }}>{product.name}</h1>
                        <p className="product-price" style={{ fontSize: '1.5rem', fontFamily: 'var(--font-sans)', marginBottom: '1.5rem' }}>
                            Rs. {Number(product.price).toLocaleString()}
                        </p>

                        <div style={{ marginBottom: '2.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <div style={{
                                width: '8px',
                                height: '8px',
                                borderRadius: '50%',
                                backgroundColor: product.quantity > 0 ? '#166534' : '#991b1b'
                            }} />
                            <span style={{
                                fontSize: '0.875rem',
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em',
                                color: product.quantity > 0 ? '#166534' : '#991b1b',
                                fontWeight: 500
                            }}>
                                {product.quantity > 0 ? `In Stock (${product.quantity} available)` : 'Out of Stock'}
                            </span>
                        </div>

                        <div style={{ height: '1px', backgroundColor: 'var(--accent-grey)', marginBottom: '2.5rem' }}></div>

                        {product.color && (
                            <p style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '1rem', textTransform: 'uppercase', letterSpacing: '0.1rem', fontSize: '0.875rem' }}>
                                <span style={{ color: '#888' }}>Color</span> {product.color}
                            </p>
                        )}

                        {product.code && (
                            <p style={{ marginBottom: '2.5rem', display: 'flex', alignItems: 'center', gap: '1rem', textTransform: 'uppercase', letterSpacing: '0.1rem', fontSize: '0.875rem' }}>
                                <span style={{ color: '#888' }}>Product Code</span> {product.code}
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
                            className="btn btn-primary whatsapp-btn"
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

                        <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.75rem', color: '#888', fontStyle: 'italic' }}>
                            Clicking this button will open WhatsApp with your order request.
                        </p>
                    </div>
                </div>
            </main>
            <Footer />

            <style dangerouslySetInnerHTML={{
                __html: `
                @media (max-width: 1024px) {
                    .product-layout { grid-template-columns: 1fr !important; gap: 4rem !important; }
                    .gallery-section { position: static !important; }
                    .info-section { padding: 0 !important; }
                    .main-image-wrapper { aspect-ratio: 4/5 !important; }
                }
                @media (max-width: 768px) {
                    .product-title { font-size: 2.25rem !important; }
                    .whatsapp-btn { padding: 1.25rem !important; font-size: 0.875rem !important; }
                }
            `}} />
        </>
    );
}
