import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        {/* Massive Editorial Hero Section */}
        <section
          className="hero fade-in"
          style={{
            minHeight: "90vh",
            position: "relative",
            display: "flex",
            alignItems: "center",
            backgroundColor: "var(--accent-light)",
            backgroundImage:
              'linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.3)), url("https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=2070&auto=format&fit=crop")',
            backgroundSize: "cover",
            backgroundPosition: "center",
            paddingBottom: "140px", // Minimum 140px before next section
          }}
        >
          <div className="container-wide" style={{ zIndex: 10 }}>
            <div style={{ maxWidth: "800px" }}>
              <h1
                style={{
                  color: "white",
                  marginBottom: "2rem",
                  textShadow: "0 4px 20px rgba(0,0,0,0.2)",
                  fontSize: "clamp(4.5rem, 6vw, 5rem)", // Large serif heading (70-80px)
                }}
              >
                SAYOSHOPPING
              </h1>
              <p
                style={{
                  color: "white",
                  fontSize: "clamp(1.25rem, 2vw, 1.5rem)",
                  fontFamily: "var(--font-serif)",
                  marginBottom: "3rem",
                  letterSpacing: "0.05em",
                  fontStyle: "italic",
                  textShadow: "0 2px 10px rgba(0,0,0,0.2)",
                }}
              >
                Timeless Jewellery for Modern Elegance.
              </p>
              <Link
                href="/jewellery"
                className="btn hover-lift"
                style={{
                  backgroundColor: "black",
                  color: "white",
                  border: "none",
                  padding: "1.25rem 4rem",
                  fontSize: "1rem",
                  letterSpacing: "0.15em",
                }}
              >
                Explore Collection
              </Link>
            </div>
          </div>
        </section>

        {/* SECTION 1 - FEATURED COLLECTION */}
        <section className="py-section container-wide fade-in">
          <div className="text-center" style={{ marginBottom: "4rem" }}>
            <h2 className="text-serif" style={{ fontSize: "clamp(2.5rem, 4vw, 3.5rem)" }}>Featured Collection</h2>
            <div style={{ width: "60px", height: "1px", backgroundColor: "black", margin: "2rem auto 0" }}></div>
          </div>

          <div
            className="grid"
            style={{
              gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
              gap: "40px", // 40-60px gap
              alignItems: "stretch"
            }}
          >
            {[
              { id: 1, title: "Diamond Solitaire Ring", price: "Rs. 45,000", image: "/assets/home/diamond-solitaire-ring.jpg" },
              { id: 2, title: "Emerald Drop Necklace", price: "Rs. 85,000", image: "/assets/home/emerald-drop-necklace.jpg" },
              { id: 3, title: "Pearl Estate Earrings", price: "Rs. 32,000", image: "/assets/home/pearl-estate-earrings.jpg" }
            ].map((product) => (
              <Link href={`/product/${product.id}`} key={product.id} className="hover-lift group" style={{ display: "flex", flexDirection: "column" }}>
                <div className="hover-zoom" style={{ backgroundColor: "var(--accent-light)", aspectRatio: "4/5", marginBottom: "1.5rem", position: "relative", overflow: "hidden" }}>
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    style={{ objectFit: "cover", objectPosition: "center" }}
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginTop: "auto" }}>
                  <div>
                    <h3 style={{ fontSize: "1.25rem", margin: "0 0 0.5rem 0", letterSpacing: "0.02em" }}>{product.title}</h3>
                    <p style={{ color: "#666", margin: 0, fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "0.875rem" }}>18k White Gold</p>
                  </div>
                  <p style={{ fontSize: "1.125rem", borderBottom: "1px solid black", margin: 0 }}>{product.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* SECTION 2 - EDITORIAL SPLIT SECTION */}
        <section className="split-layout py-section-large fade-in">
          <div className="hover-zoom" style={{ position: "relative", backgroundColor: "var(--accent-grey)", overflow: "hidden" }}>
            <Image
              src="/assets/home/heritage-collection.jpg"
              alt="Heritage Collection"
              fill
              style={{ objectFit: "cover", objectPosition: "center" }}
              sizes="50vw"
            />
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "8vw" }}>
            <div style={{ maxWidth: "550px" }}>
              <h2 style={{ fontSize: "clamp(3rem, 5vw, 4rem)", marginBottom: "2rem", lineHeight: "1.1" }}>
                Crafted for<br />Timeless Beauty
              </h2>
              <p style={{ fontSize: "1.125rem", color: "#555", marginBottom: "3rem", lineHeight: 1.8 }}>
                Every piece in our collection is meticulously crafted by master artisans. We source only the finest ethical diamonds and precious metals to create jewelry that transcends generations. A dedication to breathless beauty and impeccable precision.
              </p>
              <Link
                href="/about"
                style={{
                  display: "flex",
                  alignItems: "center",
                  borderBottom: "1px solid black",
                  paddingBottom: "0.5rem",
                  width: "fit-content",
                  textTransform: "uppercase",
                  letterSpacing: "0.15em",
                  fontSize: "0.875rem",
                }}
                className="hover-lift"
              >
                Our Heritage <ArrowRight size={16} style={{ marginLeft: "1rem" }} />
              </Link>
            </div>
          </div>
        </section>

        <section className="split-layout py-section fade-in">
          <div className="hover-zoom" style={{ position: "relative", backgroundColor: "var(--accent-light)", overflow: "hidden" }}>
            <Image
              src="/assets/home/diamond-solitaire-ring.jpg"
              alt="Bridal Exclusives"
              fill
              style={{ objectFit: "cover", objectPosition: "center" }}
              sizes="50vw"
            />
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "8vw", backgroundColor: "var(--accent-dark)", color: "white" }}>
            <div style={{ maxWidth: "550px" }}>
              <h2 style={{ fontSize: "clamp(3rem, 5vw, 4rem)", marginBottom: "2rem", color: "white", lineHeight: "1.1" }}>
                The Bridal<br />Exclusives
              </h2>
              <p style={{ fontSize: "1.125rem", color: "#aaa", marginBottom: "3rem", lineHeight: 1.8 }}>
                Discover rings and sets designed to capture the essence of your most profound moments. Every cut, every stone, strictly vetted for breathtaking brilliance and lifelong wear.
              </p>
              <Link
                href="/jewellery?category=bridal"
                style={{
                  display: "flex",
                  alignItems: "center",
                  borderBottom: "1px solid white",
                  paddingBottom: "0.5rem",
                  width: "fit-content",
                  textTransform: "uppercase",
                  letterSpacing: "0.15em",
                  fontSize: "0.875rem",
                  color: "white",
                }}
                className="hover-lift"
              >
                View Bridal <ArrowRight size={16} style={{ marginLeft: "1rem" }} />
              </Link>
            </div>
          </div>
        </section>

        {/* SECTION 3 - CATEGORY HIGHLIGHTS */}
        <section className="py-section-large container-wide fade-in" style={{ borderTop: "1px solid var(--accent-grey)", marginTop: "120px" }}>
          <div className="text-center" style={{ marginBottom: "5rem" }}>
            <h2 className="text-serif" style={{ fontSize: "clamp(2.5rem, 4vw, 3.5rem)" }}>Shop by Category</h2>
          </div>

          <div className="grid grid-cols-3" style={{ gap: "2rem" }}>
            {[
              { name: "Necklaces", image: "/assets/categories/necklaces.jpg" },
              { name: "Rings", image: "/assets/categories/rings.jpg" },
              { name: "Earrings", image: "/assets/categories/earrings.jpg" }
            ].map((category) => (
              <Link href={`/jewellery?category=${category.name.toLowerCase()}`} key={category.name} className="group" style={{ position: "relative", display: "block", aspectRatio: "3/4", overflow: "hidden" }}>
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  style={{ objectFit: "cover", objectPosition: "center", transition: "transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)" }}
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    backgroundColor: "rgba(0,0,0,0.2)",
                    transition: "background-color 0.3s ease",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                  className="group-hover:bg-black/40"
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 10
                  }}
                >
                  <h3
                    style={{
                      color: "white",
                      margin: 0,
                      fontSize: "clamp(2rem, 3vw, 2.5rem)",
                      textShadow: "0 2px 10px rgba(0,0,0,0.3)",
                      transition: "transform 0.3s ease",
                    }}
                    className="group-hover:scale-105"
                  >
                    {category.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
