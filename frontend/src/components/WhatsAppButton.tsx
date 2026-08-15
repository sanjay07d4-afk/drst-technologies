import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  // Target Phone: 8870620760
  const whatsappUrl = 'https://wa.me/918870620760';

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 flex items-center justify-center w-14 h-14 bg-graphite border border-champagne text-champagne rounded-full shadow-lg transition-all duration-300 hover:bg-champagne hover:text-obsidian hover:scale-105 active:scale-95 group focus:outline-none"
      aria-label="Contact DRST Technologies on WhatsApp"
      title="Contact WhatsApp"
    >
      <MessageCircle className="w-7 h-7 transition-transform group-hover:rotate-12" />
    </a>
  );
}
