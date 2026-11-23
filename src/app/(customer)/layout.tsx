import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import SearchModal from '@/components/SearchModal';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="pt-20">{children}</main>
      <Footer />
      {/* Interactive Global Slide-out Drawer & Search */}
      <CartDrawer />
      <SearchModal />
      {/* Discreet Floating WhatsApp Quick Inquiries */}
      <FloatingWhatsApp />
    </>
  );
}
