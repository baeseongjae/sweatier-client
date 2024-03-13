import AvailabilityButton from "@/components/Buttons/AvailabilityButton";
import { Match } from "@/types/Match.type";

import getMatchAvailableInfo from "@/utils/getMatchAvailableInfo";
import translateGender from "@/utils/translateMatches/translateGender";
import Link from "next/link";

function MatchCard({ match, className }: { match: Match; className?: string }) {
  const teamCapability = match.capability / 2;
  const gender = translateGender(match.gender);

  const matchAvailableInfo = getMatchAvailableInfo(match);
  return (
    <Link href={`/matches/${match.id}`}>
      <div
        className={`px-5 relative py-4 rounded-[10px] flex flex-col gap-y-4 shadow border-solid ${className}`}
      >
        <div className="font-bold">{match.matchTime}</div>
        <div className="text-sm">{match.title}</div>
        <div className="text-[11px] flex justify-between">
          <span className="text-neutral-60">{`${gender} | ${teamCapability}vs${teamCapability} | ${match.tier}`}</span>
          <AvailabilityButton
            imagePath={matchAvailableInfo.imagePath}
            label={matchAvailableInfo.label}
          />
        </div>
      </div>
    </Link>
  );
}

export default MatchCard;
