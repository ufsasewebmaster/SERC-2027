import { Wave } from "./decor";
import TeamBoxes from "./TeamBoxes";

export default function Team() {
  return (
    <section id="team" className="relative bg-paper py-20 sm:py-24">
      <Wave color="var(--color-paper)" />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="section-title">Meet the team</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg sm:text-xl">
            Who’s in the box? Tap to meet the SERC 2027 team.
          </p>
        </div>
        <TeamBoxes />
      </div>
    </section>
  );
}
