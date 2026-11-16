import Countdown from "@/components/Countdown";
import EnvelopeGate from "@/components/EnvelopeGate";
import Events from "@/components/Events";
import Fireworks from "@/components/Fireworks";
import Footer from "@/components/Footer";
import Guests from "@/components/Guests";
import Hero from "@/components/Hero";
import MusicPlayer from "@/components/MusicPlayer";
import ThemeSwitcher from "@/components/ThemeSwitcher";

export default function Home() {
  return (
    <>
      <EnvelopeGate />
      <Fireworks />
      <ThemeSwitcher />
      <MusicPlayer />

      <main className="relative z-10">
        <Hero />
        <Countdown />
        <Events />
        <Guests />
      </main>

      <Footer />
    </>
  );
}
