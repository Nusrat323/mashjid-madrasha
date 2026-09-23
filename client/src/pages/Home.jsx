import Hero from "../components/home/Hero.jsx";
import PrayerTimes from "../components/PrayerTimes.jsx";
import ImpactStats from "../components/home/ImpactStats.jsx";
import Services from "../components/home/Services.jsx";
import ImamMessage from "../components/home/ImamMessage.jsx";
import MadrashaPreview from "../components/home/MadrashaPreview.jsx";
import Timeline from "../components/home/Timeline.jsx";
import DonationBanner from "../components/home/DonationBanner.jsx";
import FAQ from "../components/home/FAQ.jsx";


export default function Home() {
  return (
    <>
      <Hero />
      <div className="relative z-10 mx-auto -mt-28 max-w-6xl px-4">
        <PrayerTimes />
      </div>
      <ImpactStats />
      <Services />
      <ImamMessage />
      <MadrashaPreview />
      <Timeline />
      <DonationBanner />
      
      <FAQ />
      
    </>
  );
}