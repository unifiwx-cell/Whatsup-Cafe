/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ScrollMarquee } from './components/ScrollMarquee';
import { Introduction } from './components/Introduction';
import { FoodSliderReel } from './components/FoodSliderReel';
import { MenuSection } from './components/MenuSection';
import { FoodGallery } from './components/FoodGallery';
import { RooftopExperience } from './components/RooftopExperience';
import { CocktailsDrinks } from './components/CocktailsDrinks';
import { Atmosphere } from './components/Atmosphere';
import { ReviewsSection } from './components/ReviewsSection';
import { LocationSection } from './components/LocationSection';
import { ReservationSection } from './components/ReservationSection';
import { ReservationModal } from './components/ReservationModal';
import { OrderOnlineModal } from './components/OrderOnlineModal';
import { Footer } from './components/Footer';

export default function App() {
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [isOrderOpen, setIsOrderOpen] = useState(false);

  // Smooth scroll progress bar at the very top
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const handleOpenReservation = () => setIsReservationOpen(true);
  const handleCloseReservation = () => setIsReservationOpen(false);

  const handleOpenOrder = () => setIsOrderOpen(true);
  const handleCloseOrder = () => setIsOrderOpen(false);

  const handleExploreMenu = () => {
    const element = document.getElementById('menu');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#10110F] text-[#F6F2E9] selection:bg-[#FF5500] selection:text-white">
      {/* Scroll Progress Indicator Bar */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-[3px] bg-[#FF5500] origin-left z-[60] shadow-[0_0_14px_rgba(255,85,0,0.85)] pointer-events-none"
      />

      {/* Fixed Navigation */}
      <Navbar
        onOpenReservation={handleOpenReservation}
        onOpenOrder={handleOpenOrder}
      />

      {/* Main Content Sections */}
      <main>
        {/* 1. Cinematic Hero with Scroll Parallax and Official Logo */}
        <Hero
          onOpenReservation={handleOpenReservation}
          onExploreMenu={handleExploreMenu}
        />

        {/* 2. Scrolling Animation Marquee Ribbon */}
        <ScrollMarquee />

        {/* 3. Editorial Introduction */}
        <Introduction
          onOpenReservation={handleOpenReservation}
          onExploreMenu={handleExploreMenu}
        />

        {/* 4. Sliding Food Reel (Left to Right with Images) */}
        <FoodSliderReel
          onOpenOrder={handleOpenOrder}
          onOpenReservation={handleOpenReservation}
        />

        {/* 5. Culinary Menu */}
        <MenuSection
          onOpenOrder={handleOpenOrder}
          onOpenReservation={handleOpenReservation}
        />

        {/* 5. Signature Scrolling Food Gallery */}
        <FoodGallery />

        {/* 6. The Rooftop Experience */}
        <RooftopExperience
          onOpenReservation={handleOpenReservation}
        />

        {/* 7. Nocturnal Cocktails & Mixology */}
        <CocktailsDrinks
          onOpenOrder={handleOpenOrder}
          onOpenReservation={handleOpenReservation}
        />

        {/* 8. Atmosphere & Social Energy */}
        <Atmosphere
          onOpenReservation={handleOpenReservation}
        />

        {/* 9. Reviews & Social Proof */}
        <ReviewsSection />

        {/* 10. Location & Visit */}
        <LocationSection
          onOpenReservation={handleOpenReservation}
        />

        {/* 11. Call to Action Strip */}
        <ReservationSection
          onOpenReservation={handleOpenReservation}
          onOpenOrder={handleOpenOrder}
        />
      </main>

      {/* Footer with Logo and Social Links */}
      <Footer />

      {/* Interactive Modals */}
      <ReservationModal
        isOpen={isReservationOpen}
        onClose={handleCloseReservation}
      />

      <OrderOnlineModal
        isOpen={isOrderOpen}
        onClose={handleCloseOrder}
      />
    </div>
  );
}
