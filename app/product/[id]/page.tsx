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
                <Link href="/jewellery" className="back-link" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    <ArrowLeft size={16} /> Back to Collection
                </Link>

                <div className="product-layout">
                    {/* Image Gallery Section */}
                    <div className="gallery-section">
                        <div className="fade-in main-image-wrapper">
                            {mainImage ? (
                                <Image
                                    src={mainImage}
                                    alt={product.name}
                                    fill
                                    style={{ objectFit: 'contain', objectPosition: 'center' }}
                                    priority
                                    sizes="(max-width: 1024px) 100vw, 60vw"
                                />
                            ) : (
                                <div className="no-image-placeholder">No Image Available</div>
                            )}
                        </div>

                        {images.length > 1 && (
                            <div className="thumbnail-grid">
                                {images.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setMainImage(img)}
                                        className="hover-lift"
                                        style={{
                                            border: mainImage === img ? '2px solid var(--accent-dark)' : '1px solid transparent',
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
                    <div className="info-section">
                        <p className="category-label">
                            {product.category?.name || "Uncategorized"}
                        </p>
                        <h1 className="product-title">{product.name}</h1>
                        <p className="product-price">
                            Rs. {Number(product.price).toLocaleString()}
                        </p>

                        <div className="stock-indicator">
                            <div style={{
                                width: '8px',
                                height: '8px',
                                borderRadius: '50%',
                                backgroundColor: product.quantity > 0 ? '#166534' : '#991b1b'
                            }} />
                            <span style={{
                                color: product.quantity > 0 ? '#166534' : '#991b1b',
                            }}>
                                {product.quantity > 0 ? `In Stock (${product.quantity} available)` : 'Out of Stock'}
                            </span>
                        </div>

                        <div className="divider"></div>

                        {product.color && (
                            <p className="product-meta">
                                <span>Color</span> {product.color}
                            </p>
                        )}

                        {product.code && (
                            <p className="product-meta">
                                <span>Product Code</span> {product.code}
                            </p>
                        )}

                        <div className="description-container">
                            <h4 className="description-title">Description & Details</h4>
                            {product.description && Array.isArray(product.description) && product.description.length > 0 ? (
                                <ul>
                                    {product.description.map((point: string, idx: number) => (
                                        <li key={idx}>{point}</li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="empty-description">An elegant piece crafted with precision and care to elevate your everyday style.</p>
                            )}
                        </div>

                        <a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="btn btn-primary whatsapp-btn"
                        >
                            <span>ORDER VIA WHATSAPP</span>
                            <ArrowRight size={20} />
                        </a>

                        <p className="whatsapp-help">
                            Clicking this button will open WhatsApp with your order request.
                        </p>
                    </div>
                </div>
            </main>
            <Footer />

            <style dangerouslySetInnerHTML={{
                __html: `
                .product-layout { display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 6vw; align-items: start; }
                .gallery-section { position: sticky; top: 140px; }
                .main-image-wrapper { width: 100%; aspect-ratio: 3/4; margin-bottom: 2rem; position: relative; overflow: hidden; background-color: transparent; }
                .thumbnail-grid { display: flex; gap: 1rem; overflow-x: auto; padding-bottom: 1rem; touch-action: pan-x; }
                .thumbnail-grid button { width: 100px; height: 133px; flex-shrink: 0; position: relative; border-radius: 4px; overflow: hidden; padding: 0; background: transparent; transition: var(--transition-smooth); }
                .info-section { padding: 0; }
                .category-label { text-transform: uppercase; letter-spacing: 0.15em; font-size: 0.875rem; color: #888; margin-bottom: 1rem; }
                .product-title { font-size: clamp(2.5rem, 4vw, 3.5rem); margin-bottom: 1rem; line-height: 1.1; }
                .product-price { font-size: 1.5rem; font-family: var(--font-sans); margin-bottom: 1.5rem; }
                .stock-indicator { margin-bottom: 2.5rem; display: flex; align-items: center; gap: 0.75rem; }
                .stock-indicator span { font-size: 0.875rem; text-transform: uppercase; letter-spacing: 0.05em; color: inherit; font-weight: 500; }
                .divider { height: 1px; background-color: var(--accent-grey); margin-bottom: 2.5rem; }
                .product-meta { margin-bottom: 1rem; display: flex; align-items: center; gap: 1rem; text-transform: uppercase; letter-spacing: 0.1rem; font-size: 0.875rem; }
                .product-meta span { color: #888; }
                .description-container { margin-bottom: 4rem; line-height: 2; color: #555; }
                .description-title { text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 1.5rem; font-size: 0.875rem; color: var(--accent-dark); }
                .description-container ul { padding-left: 1.25rem; }
                .description-container li { margin-bottom: 0.75rem; padding-left: 0.5rem; }
                .empty-description { font-family: var(--font-serif); font-style: italic; font-size: 1.125rem; }
                .whatsapp-btn { width: 100%; padding: 1.5rem; display: flex; align-items: center; justify-content: space-between; border: 1px solid var(--accent-dark); text-decoration: none; }
                .whatsapp-btn span { letter-spacing: 0.15em; }
                .whatsapp-help { text-align: center; margin-top: 1.5rem; font-size: 0.75rem; color: #888; font-style: italic; }
                .no-image-placeholder { display: flex; height: 100%; align-items: center; justify-content: center; color: #999; font-family: var(--font-serif); }

                @media (max-width: 1024px) {
                    .product-layout { grid-template-columns: 1fr !important; gap: 4rem !important; }
                    .gallery-section { position: static !important; }
                    .info-section { padding: 0 !important; }
                    .main-image-wrapper { aspect-ratio: 4/5 !important; }
                }
                @media (max-width: 768px) {
                    main.container { padding-left: 1rem !important; padding-right: 1rem !important; overflow-X: hidden !important; }
                    .product-layout { display: block !important; }
                    .product-title { font-size: clamp(1.75rem, 8vw, 2.5rem) !important; margin-bottom: 0.75rem !important; }
                    .product-price { font-size: 1.25rem !important; margin-bottom: 1rem !important; }
                    .whatsapp-btn { padding: 1rem !important; justify-content: center !important; gap: 0.75rem !important; box-sizing: border-box !important; }
                    .whatsapp-btn span { font-size: 0.75rem !important; letter-spacing: 0.05em !important; flex: 1; text-align: left; }
                    .gallery-section { margin-bottom: 1.5rem !important; }
                    .main-image-wrapper { aspect-ratio: 1/1 !important; height: auto !important; max-height: 85vw !important; margin-left: auto !important; margin-right: auto !important; margin-bottom: 1.5rem !important; }
                    .main-image-wrapper img { object-fit: contain !important; }
                    .thumbnail-grid { gap: 0.5rem !important; touch-action: pan-x !important; padding-bottom: 0.5rem !important; }
                    .thumbnail-grid button { width: 70px !important; height: 93px !important; }
                    .description-container ul { list-style-position: inside !important; padding-left: 0 !important; }
                    .description-container li { margin-bottom: 1rem !important; padding-left: 0 !important; }
                }
                @media (max-width: 350px) {
                    main.container { padding-left: 0.5rem !important; padding-right: 0.5rem !important; }
                    .back-link { font-size: 0.75rem !important; margin-bottom: 1.5rem !important; }
                    .product-title { font-size: 1.5rem !important; }
                    .whatsapp-btn { padding: 0.875rem 0.6rem !important; gap: 0.4rem !important; }
                    .whatsapp-btn span { font-size: 0.625rem !important; letter-spacing: 0px !important; }
                    .info-section { word-break: break-all !important; }
                    .description-container li { font-size: 0.9rem !important; margin-bottom: 0.75rem !important; }
                    .main-image-wrapper { max-height: 75vw !important; width: 95% !important; }
                    .stock-indicator span { font-size: 0.75rem !important; }
                }
            `}} />
        </>
    );
}
