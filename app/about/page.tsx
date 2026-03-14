import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link";
import Image from "next/image";
import { Gem, ShieldCheck, Sparkles, Star, Tag, Truck, Headset } from "lucide-react";

export const metadata = {
    title: "About Us | Sayoshopping",
};

export default function About() {
    return (
        <div style={{ backgroundColor: '#fafafa', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar />

            {/* 1. HERO SECTION */}
            <div style={{
                position: 'relative',
                padding: '160px 2rem 100px',
                backgroundColor: '#111',
                backgroundImage: 'url("https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=2000&auto=format&fit=crop")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed',
                color: 'white',
                textAlign: 'center'
            }}>
                <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)' }}></div>
                <div className="container-wide" style={{ position: 'relative', zIndex: 10, maxWidth: '1200px', margin: '0 auto' }}>
                    <h1 style={{ color: 'white', fontSize: 'clamp(3.5rem, 6vw, 5rem)', marginBottom: '1.5rem', letterSpacing: '0.02em', lineHeight: 1.1 }}>
                        Timeless Elegance.<br />Crafted for You.
                    </h1>
                    <p style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.25rem, 2vw, 1.5rem)', letterSpacing: '0.05em', opacity: 0.9, fontStyle: 'italic', maxWidth: '800px', margin: '0 auto' }}>
                        Transforming everyday moments into remarkable memories with meticulously curated jewellery.
                    </p>
                </div>
            </div>

            <main style={{ flex: 1 }}>

                {/* 2. BRAND STORY SECTION (Split Layout) */}
                <section style={{ backgroundColor: '#fff', padding: '0' }}>
                    <div className="container-wide" style={{ maxWidth: '1600px', padding: '0', margin: '0 auto' }}>
                        <div className="grid grid-cols-2" style={{ gap: '0', alignItems: 'stretch' }}>
                            {/* Left Image */}
                            <div className="hover-zoom" style={{ position: 'relative', minHeight: '700px', overflow: 'hidden' }}>
                                <Image
                                    src="/assets/about/brand-story.jpg"
                                    alt="Our Brand Story - luxury jewellery"
                                    fill
                                    style={{ objectFit: 'cover', objectPosition: 'center' }}
                                    sizes="50vw"
                                />
                            </div>
                            {/* Right Text Block */}
                            <div style={{ padding: 'clamp(4rem, 8vw, 8rem)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                <p style={{ textTransform: "uppercase", letterSpacing: "0.15em", fontSize: "0.875rem", color: "#888", marginBottom: "1.5rem" }}>OUR STORY</p>

                                <h2 style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', marginBottom: '2rem', lineHeight: '1.1' }}>Who We Are</h2>
                                <p style={{ fontSize: '1.125rem', lineHeight: '2', color: '#555', marginBottom: '3rem' }}>
                                    Founded on the principles of elegance and superior craftsmanship, Sayoshopping emerged from a passion for bringing timeless jewellery to those who appreciate the finer things in life.
                                </p>

                                <h2 style={{ fontSize: 'clamp(2rem, 3vw, 2.5rem)', marginBottom: '1.5rem', lineHeight: '1.1' }}>What Makes Us Unique</h2>
                                <p style={{ fontSize: '1.125rem', lineHeight: '2', color: '#555', marginBottom: '3rem' }}>
                                    Each piece in our collection is carefully curated to offer unparalleled luxury, from minimalist daily wear to breath-taking statement pieces for your most precious moments. We believe that true luxury lies in the details—the precision of the cut, the quality of the materials, and the timelessness of the design.
                                </p>

                                <h2 style={{ fontSize: 'clamp(2rem, 3vw, 2.5rem)', marginBottom: '1.5rem', lineHeight: '1.1' }}>Quality Promise</h2>
                                <p style={{ fontSize: '1.125rem', lineHeight: '2', color: '#555' }}>
                                    Our commitment goes beyond aesthetics. We strive to provide a seamless, premium shopping experience tailored to our discerning clientele. At Sayoshopping, you are not just purchasing jewellery; you are investing in a legacy of beauty.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 3. QUALITY & MATERIALS SECTION */}
                <section style={{ padding: 'clamp(6rem, 10vw, 8rem) 2rem', backgroundColor: '#fafafa' }}>
                    <div className="container-wide" style={{ maxWidth: '1400px', margin: '0 auto' }}>
                        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '4rem' }}>

                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                                <Gem size={48} strokeWidth={1} style={{ marginBottom: '2rem', color: '#111' }} />
                                <h3 style={{ fontSize: '1.75rem', marginBottom: '1rem', fontWeight: '500' }}>Imported 18K Gold-Plated</h3>
                                <div style={{ width: '40px', height: '1px', backgroundColor: '#000', marginBottom: '1.5rem' }}></div>
                                <p style={{ fontSize: '1.125rem', lineHeight: '1.8', color: '#666' }}>We source premium stainless steel infused with rich 18K gold plating, ensuring a brilliant, authentic shine that commands attention.</p>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                                <ShieldCheck size={48} strokeWidth={1} style={{ marginBottom: '2rem', color: '#111' }} />
                                <h3 style={{ fontSize: '1.75rem', marginBottom: '1rem', fontWeight: '500' }}>Designed for Durability</h3>
                                <div style={{ width: '40px', height: '1px', backgroundColor: '#000', marginBottom: '1.5rem' }}></div>
                                <p style={{ fontSize: '1.125rem', lineHeight: '1.8', color: '#666' }}>Built to withstand the test of time. Our materials are highly resistant to tarnishing, preserving their elegant luster wear after wear.</p>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                                <Sparkles size={48} strokeWidth={1} style={{ marginBottom: '2rem', color: '#111' }} />
                                <h3 style={{ fontSize: '1.75rem', marginBottom: '1rem', fontWeight: '500' }}>Everyday Luxury</h3>
                                <div style={{ width: '40px', height: '1px', backgroundColor: '#000', marginBottom: '1.5rem' }}></div>
                                <p style={{ fontSize: '1.125rem', lineHeight: '1.8', color: '#666' }}>Experience hypoallergenic comfort that feels as good as it looks. Perfect for elevating your daily ensemble or completing a formal look.</p>
                            </div>

                        </div>
                    </div>
                </section>

                {/* 4. ELEGANT IMAGE SECTION */}
                <section style={{
                    width: '100%',
                    height: '600px',
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    <Image
                        src="/assets/about/elegant-image.jpg"
                        alt="Luxury jewellery lifestyle"
                        fill
                        style={{ objectFit: 'cover', objectPosition: 'center' }}
                        sizes="100vw"
                    />
                    <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.1)' }}></div>
                </section>

                {/* 5. WHY CHOOSE SAYOSHOPPING */}
                <section style={{ padding: 'clamp(6rem, 10vw, 8rem) 2rem', backgroundColor: '#fff' }}>
                    <div className="container-wide" style={{ maxWidth: '1400px', margin: '0 auto' }}>
                        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                            <h2 style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', marginBottom: '1rem' }}>Why Choose Sayoshopping</h2>
                            <div style={{ width: '60px', height: '2px', backgroundColor: '#000', margin: '0 auto' }}></div>
                        </div>

                        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem' }}>
                            <div style={{ textAlign: 'center', padding: '2rem' }}>
                                <Star size={40} strokeWidth={1} style={{ margin: '0 auto 1.5rem', color: '#111' }} />
                                <h4 style={{ fontSize: '1.25rem', marginBottom: '1rem', fontWeight: '600' }}>Premium Quality</h4>
                                <p style={{ color: '#666', lineHeight: '1.6' }}>Strictly curated pieces.</p>
                            </div>
                            <div style={{ textAlign: 'center', padding: '2rem' }}>
                                <Tag size={40} strokeWidth={1} style={{ margin: '0 auto 1.5rem', color: '#111' }} />
                                <h4 style={{ fontSize: '1.25rem', marginBottom: '1rem', fontWeight: '600' }}>Affordable Luxury</h4>
                                <p style={{ color: '#666', lineHeight: '1.6' }}>Elegance within reach.</p>
                            </div>
                            <div style={{ textAlign: 'center', padding: '2rem' }}>
                                <Truck size={40} strokeWidth={1} style={{ margin: '0 auto 1.5rem', color: '#111' }} />
                                <h4 style={{ fontSize: '1.25rem', marginBottom: '1rem', fontWeight: '600' }}>Islandwide Delivery</h4>
                                <p style={{ color: '#666', lineHeight: '1.6' }}>Swift, secure shipping.</p>
                            </div>
                            <div style={{ textAlign: 'center', padding: '2rem' }}>
                                <Headset size={40} strokeWidth={1} style={{ margin: '0 auto 1.5rem', color: '#111' }} />
                                <h4 style={{ fontSize: '1.25rem', marginBottom: '1rem', fontWeight: '600' }}>24/7 Support</h4>
                                <p style={{ color: '#666', lineHeight: '1.6' }}>Always here to help you.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 6. FINAL CTA SECTION */}
                <section style={{ padding: 'clamp(6rem, 10vw, 8rem) 2rem', backgroundColor: '#efefef', textAlign: 'center' }}>
                    <div className="container-wide" style={{ maxWidth: '800px', margin: '0 auto' }}>
                        <h2 style={{ fontSize: 'clamp(3rem, 5vw, 4rem)', marginBottom: '2rem', lineHeight: '1.1' }}>Experience Luxury.<br />Shop with Confidence.</h2>
                        <Link href="/" className="btn btn-primary" style={{ fontSize: '1.125rem', padding: '1.25rem 3rem' }}>
                            Explore Collection
                        </Link>
                    </div>
                </section>

            </main>

            <Footer />
        </div>
    );
}
