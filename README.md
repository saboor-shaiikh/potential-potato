# Saboor's Interactive Portfolio

A hyper-modern, interactive web developer portfolio designed with an immersive "Space & Galactic" aesthetic. Built entirely with React, Vite, and Framer Motion, the portfolio features complex glassmorphism UI structures, a custom physics-driven tech stack cloud, fluid scrolling anchors, and an integrated, serverless contact pipeline.

## 🚀 Live Demo
*(Insert Live link here after deployment)*

## 🛠 Features

- **Immersive Glassmorphism UI:** Seamless, blurred backgrounds heavily leveraging CSS pseudo-elements and dynamic layouts.
- **Physics Engine (Arsenal Section):** A hand-coded physics system simulating elastic bouncing and repelling interactions for technical skills in a bubble cloud.
- **EmailJS Serverless Integration:** A fully functional 'Hire Me' contact form tied globally to the developer's direct inbox.
- **Framer Motion Animations:** Butter-smooth viewport entry, exit, and timeline tracking transitions.
- **Global Chatbot Action:** A natively floating WhatsApp integration anchored via custom CSS keyframes.

## 💻 Tech Stack

- **Framework:** React + Vite
- **Styling:** Vanilla CSS3 + Variables + Custom Flex/Grid Systems
- **Icons:** `lucide-react`, `react-icons`
- **Animations:** `framer-motion`
- **Email API:** `@emailjs/browser`

## ⚙️ Local Installation & Development

To setup the application entirely locally:

1. Clone this repository natively:
   ```bash
   git clone https://github.com/saboor-shaiikh/Saboories-Portfolio.git
   cd Saboories-Portfolio
   ```

2. Install all node dependencies:
   ```bash
   npm install
   ```

3. Setup Environment Variables:
   Create a `.env` root file containing your EmailJS keys:
   ```env
   VITE_EMAILJS_SERVICE_ID=your_id
   VITE_EMAILJS_TEMPLATE_ID=your_id
   VITE_EMAILJS_PUBLIC_KEY=your_key
   ```

4. Launch the local compiler:
   ```bash
   npm run dev
   ```

## 📜 License
MIT License. Created by [Abdul Saboor](https://github.com/saboor-shaiikh).
