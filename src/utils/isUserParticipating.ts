import { MatchDetail } from "@/types/match.response.type";

function isUserParticipating(
  matchDetail: MatchDetail,
  userId: string
): boolean {
  return matchDetail.participate.some(
    (participant) => participant.id === userId
  );
}

export default isUserParticipating;
