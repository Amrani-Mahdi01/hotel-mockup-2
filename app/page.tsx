import { GallerySection } from "@/components/gallery-section";
import { GettingHereSection } from "@/components/getting-here-section";
import { GoodToKnowSection } from "@/components/good-to-know-section";
import { GuestWordsSection } from "@/components/guest-words-section";
import { Hero } from "@/components/hero";
import { HouseSection } from "@/components/house-section";
import { IslandSection } from "@/components/island-section";
import { JournalSection } from "@/components/journal-section";
import { RoomsSection } from "@/components/rooms-section";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { TableSection } from "@/components/table-section";
import { WeddingsSection } from "@/components/weddings-section";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <HouseSection />
        <RoomsSection />
        <TableSection />
        <IslandSection />
        <WeddingsSection />
        <GallerySection />
        <GuestWordsSection />
        <JournalSection />
        <GettingHereSection />
        <GoodToKnowSection />
      </main>
      <SiteFooter />
    </>
  );
}
