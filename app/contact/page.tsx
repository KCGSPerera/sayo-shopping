import ContactClient from "./ContactClient";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact Us | Bespoke Jewellery Inquiries | Sayoshopping",
    description: "Get in touch with Sayoshopping for bespoke jewellery inquiries, order assistance, or private appointments. We provide an unparalleled luxury experience.",
    openGraph: {
        title: "Contact Sayoshopping | Luxury Jewellery Support",
        description: "Reach out to us for any inquiries about our exclusive jewellery collections.",
    }
};

export default function Contact() {
    return <ContactClient />;
}
