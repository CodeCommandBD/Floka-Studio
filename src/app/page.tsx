import Hero from "@/components/Hero";
import Approach from "@/components/Approach";
import TeamReveal from "@/components/TeamReveal";
import Portfolio from "@/components/Portfolio";
import CompanyExpertise from "@/components/CompanyExpertise";

export default function Home() {
  return (
    <main className="flex flex-col w-full">
      <Hero />
      <Approach />
      <TeamReveal />
      <Portfolio />
      <CompanyExpertise />
    </main>
  );
}
