import { useProfile } from "@/contexts/profile.context";
import { Rating } from "@/types/Rating.type";
import participantDto from "@/types/participantDto";
import { Dispatch, SetStateAction } from "react";
import RatingCard from "../RatingCard/RatingCard";

interface RatingCardsListProps {
  participants: participantDto[];
  ratingList: Rating[];
  setRatingList: Dispatch<SetStateAction<Rating[]>>;
}
function RatingCardsList({
  participants,
  ratingList,
  setRatingList,
}: RatingCardsListProps) {
  const profile = useProfile();
  const participantsWithoutUser = profile
    ? participants.filter((participant) => participant.id !== profile.id)
    : participants;

  return (
    <div className="w-full">
      <ul className="flex flex-col gap-y-4 sm:gap-y-7 sm:grid sm:grid-cols-2 sm:gap-x-7">
        {participantsWithoutUser.map((participant) => (
          <li key={participant.id}>
            <RatingCard
              ratingList={ratingList}
              setRatingList={setRatingList}
              participant={participant}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RatingCardsList;
