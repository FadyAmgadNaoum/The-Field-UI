import { BookingSelectionProvider } from "@/lib/providers/booking-selection-provider";
import { Hero } from "@/components/sections/hero";
import { Courts } from "@/components/sections/courts";
import { MinimalBands } from "@/components/sections/minimal-bands";
import { Locations } from "@/components/sections/locations";
import { Booking } from "@/components/sections/booking";
import { Footer } from "@/components/layout/footer";

export default function LandingPage() {
  return (
    <BookingSelectionProvider>
      <main id="top">
        <Hero />
        <Courts />
        <MinimalBands />
        <Locations />
        <Booking />
      </main>
      <Footer />
    </BookingSelectionProvider>
  );
}
