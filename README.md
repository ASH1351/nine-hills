# Nine Hills — Hair & Beauty Family Salon Website

> **"Where hair dreams come true."**  
> Premium, boutique-luxury, mobile-first website crafted specifically for **Nine Hills Family Salon & Beauty Studio** in Beliaghata, Kolkata.

---

## ✂️ Key Features & Brand Architecture

1. **Preloader Snip & Reveal**: Dual-blade animated scissors (one white, one gold) cutting a golden hair strand framed inside the signature scalloped badge before revealing the website.
2. **Sticky Luxury Navbar & Mobile Drawer**: Frosted glassmorphism header, smooth scroll-spy, desktop "Book Now" CTA, and animated full-screen mobile menu.
3. **Hero Section**: Glowing fairy-light bokeh canvas particles, bold typography featuring *"Dreams"* in custom gold script, dual CTAs (*Book Appointment* on WhatsApp & *Call Now*), and animated scissor emblem.
4. **Our Story & 3-Point Highlight Row**: Focus on family friendliness, certified master stylists, and medical-grade hygiene.
5. **Curated Services Menu (8 Categories)**: Haircuts & Styling, Hair Colour & Highlights, Hair Spa & Treatments, Smoothening & Keratin, Facials & Skin Care, Bridal & Party Makeup, Threading/Waxing/Mani-Pedi, Beard & Men's Grooming. Every category includes a clearly editable `Starting from ₹___` placeholder.
6. **Family Interactive Experience ("One Salon, The Whole Family")**: Interactive tabs for **Women**, **Men**, and **Kids** highlighting specialized treatments, gentle baby haircuts, and executive grooming.
7. **Interactive Masonry Gallery & Lightbox**: Category filter buttons (`All`, `Hair Styling`, `Color & Balayage`, `Spa & Skincare`, `Bridal Glamour`), image zoom, full-screen lightbox with keyboard (`Esc`, `←`, `→`) and touch-swipe navigation.
8. **Why Choose Us Animated Statistics**: Live count-up animations for years of mastery, happy clients, genuine products, and hygiene.
9. **Testimonials Swiper**: Touch-enabled carousel with gold 5-star ratings and clearly labelled editable placeholders.
10. **Interactive WhatsApp Booking Engine**: Form with client name, phone, service, date, time slot, category, and special notes. Submitting dynamically compiles a clean emoji-formatted message and opens directly to `wa.me/919836414320`.
11. **Direct Tap-to-Call & Location**: Direct `tel:+919836414320` links, Google Maps embed for Beliaghata Kolkata 700010, and opening hours card.
12. **Mobile Sticky Action Bar**: Bottom bar on mobile screens (`< 768px`) with high-contrast "Call Now" and "WhatsApp Book" buttons with >= 44px touch targets.
13. **Local SEO & Schema.org**: Fully populated Open Graph, Twitter cards, meta keywords, and JSON-LD `HairSalon` schema.

---

## 📝 Customization Checklist (What You Need to Replace)

All placeholder areas in [index.html](index.html) are marked with clear comments: `<!-- REPLACE ME: ... -->` and `<!-- EDITABLE PLACEHOLDER: ... -->`.

| Item | Location in `index.html` | Notes |
|---|---|---|
| **Salon Photos** | `<img src="https://images.unsplash..." ...>` | Replace Unsplash URLs with your own salon interior and hairstyle photos. Place local photos in `assets/images/` or link to your image host. |
| **Service Prices** | Search for `<span class="price-value">Starting from ₹___</span>` in the Services section | Replace `₹___` with your actual starting rates (e.g. `Starting from ₹299`). |
| **Google Reviews** | Search for `[Placeholder Review]` in the Reviews section | Replace sample quotes and reviewer names with authentic testimonials from your Google Business Profile. |
| **Opening Hours** | In the Contact section under `Opening Hours` | Currently set to `Monday – Sunday: 10:00 AM – 9:00 PM`. Adjust to your actual salon hours. |
| **Social Links** | In the Instagram strip and Footer | Replace `https://instagram.com` and `https://facebook.com` with your official salon page handles. |
| **Google Maps Pin** | In the Contact section `<iframe>` | Pre-configured for `P, 136, C I T Rd, Scheme VI-M, Sura Cross Lane, Phoolbagan, Beleghata, Kolkata, West Bengal 700010`. If you have a specific Google Maps Place ID embed link, replace the `src` attribute. |

---

## 🚀 How to Run & Deploy

This website is built with vanilla HTML5, CSS3, and modern ES6 JavaScript. It requires **no build tools, no Node.js compilation, and no complex dependencies**.

### 1. Run Locally
- Simply double-click `index.html` in your browser.
- Or use any local server:
  ```bash
  # Using Python:
  python -m http.server 8000
  ```
  Open `http://localhost:8000` in your web browser.

### 2. Deploy to Production
- **Netlify**: Drag and drop the `nine hills` project folder directly into [Netlify Drop](https://app.netlify.com/drop).
- **Vercel**: Run `vercel` or link your GitHub repository.
- **GitHub Pages**: Push this folder to a GitHub repository and turn on GitHub Pages under Settings > Pages.
- **cPanel / Web Hosting**: Upload all files to `public_html/`.

---

## 🎨 Design System Tokens

- **Deep Obsidian Black**: `#0A0A0A`
- **Surface Jet**: `#141414`
- **Regal Gold**: `#D4AF37`
- **Warm Champagne Shimmer**: `#F3E2A0`
- **Warm Off-White**: `#F6F1E7`
- **Typography**: 
  - Wordmark & Accent: *Lobster Two / Pacifico*
  - Luxury Serif: *Playfair Display & Cormorant Garamond*
  - Roman Labels: *Cinzel*
  - Body & Form: *Plus Jakarta Sans*
