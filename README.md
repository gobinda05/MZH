# MZH Hospisol - Modern Hospital Website

A professional, modern, and fully responsive multi-page website for MZH Hospisol healthcare services.

## 🌟 Features

### Design & Branding
- Modern teal (#17A2B8) and gold (#D4AF37) color scheme matching the MZH logo
- Clean, professional design with smooth animations
- Fully responsive layout for all devices
- Consistent branding across all pages

### Pages
1. **Home** - Hero section, stats, departments preview, about preview
2. **About** - Hospital history, mission, vision, achievements
3. **Departments** - 12+ medical specialties with detailed information
4. **Doctors** - Doctor profiles with filtering by department
5. **Services** - Medical services offered
6. **Contact** - Contact form, contact methods, map, emergency info

### Interactive Features
- Smart contact form with real-time validation
- Toast notifications for user feedback
- Smooth scroll animations
- Mobile-friendly hamburger menu
- Loading states for async operations
- Custom styled form elements

### Technical Highlights
- Semantic HTML5
- Modern CSS3 (Grid, Flexbox, Custom Properties)
- Vanilla JavaScript (no dependencies)
- Mobile-first responsive design
- Accessibility compliant (WCAG 2.1)
- SEO optimized
- Print-friendly styles

## 🚀 Quick Start

### Option 1: Direct Open
Simply open `index.html` in your web browser.

### Option 2: Local Server (Recommended)
```bash
# Using Python 3
python -m http.server 8000

# Using Node.js http-server
npx http-server

# Using PHP
php -S localhost:8000
```

Then visit: `http://localhost:8000`

## 📁 Project Structure

```
MZH/
├── index.html              # Home page
├── about.html              # About page
├── departments.html        # Departments listing
├── doctors.html            # Doctor profiles
├── services.html           # Services page
├── contact.html            # Contact page
├── styles.css              # Main stylesheet (3600+ lines)
├── script.js               # JavaScript functionality
├── logo.svg                # Hospital logo
├── README.md               # This file
├── CHANGELOG.md            # Detailed change log
└── images/                 # Image assets
    ├── logo.svg
    ├── logo.png
    ├── hospital-hero.png
    ├── medical-team.png
    ├── emergency-care.png
    └── lab-testing.png
```

## 🎨 Color Palette

```css
Primary (Teal):     #17A2B8
Primary Light:      #20C4DC
Primary Dark:       #138496
Secondary (Gold):   #D4AF37
Secondary Light:    #F0C952
Secondary Dark:     #B8941F
```

## 📱 Responsive Breakpoints

- Desktop: 1024px+
- Tablet: 768px - 1023px
- Mobile: < 768px
- Small Mobile: < 480px

## ✨ Key Features

### Contact Form
- Real-time validation
- Visual feedback (success/error states)
- Loading state during submission
- Toast notifications
- All fields with icons and placeholders

### Navigation
- Fixed navbar with scroll effect
- Active page highlighting
- Mobile hamburger menu

### Animations
- Smooth scroll reveals
- Card hover effects
- Button ripple effects
- Icon float animations

## 🌐 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers

## ♿ Accessibility

- WCAG 2.1 AA compliant
- Keyboard navigation support
- Screen reader friendly
- Focus visible states

## 📧 Contact Form Integration

To integrate with a backend API, update `script.js`:

```javascript
fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
})
.then(response => response.json())
.then(data => {
    showToast('✅ Message sent successfully!', 'success');
})
```

## 📄 License

Copyright © 2024 MZH Hospisol. All rights reserved.

---

**Built with ❤️ using modern web technologies**
