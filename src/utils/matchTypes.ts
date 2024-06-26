export type MatchTypesObject = {
  [key: string]: string | number;
};

export const sportsTypeName: MatchTypesObject[] = [
  { 농구: "basketball" },
  { 배드민턴: "badminton" },
  { 야구: "baseball" },
  { 축구: "soccer" },
  { 테니스: "tennis" },
];

export const newSports = [
  { label: "농구", value: "basketball" },
  { label: "배드민턴", value: "badminton" },
  { label: "야구", value: "baseball" },
  { label: "축구", value: "soccer" },
  { label: "테니스", value: "tennis" },
];

const gender: MatchTypesObject[] = [
  { "남녀 모두": "both" },
  { 남성: "male" },
  { 여성: "female" },
];

const capability: MatchTypesObject[] = [
  { "1:1": 2 },
  { "2:2": 4 },
  { "3:3": 6 },
  { "4:4": 8 },
  { "5:5": 10 },
  { "6:6": 12 },
  { "7:7": 14 },
  { "8:8": 16 },
  { "9:9": 18 },
  { "10:10": 20 },
  { "11:11": 22 },
];

const timeHours = [
  "00",
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "21",
  "22",
  "23",
  "24",
];

const timeMinutes = ["00", "30"];

export const regions = [
  "서울",
  "경기",
  "인천",
  "강원",
  "대전",
  "세종",
  "충남",
  "충북",
  "대구",
  "경북",
  "부산",
  "울산",
  "경남",
  "광주",
  "전남",
  "전북",
  "제주",
] as const;

const matchTypes = {
  sportsTypeName,
  capability,
  gender,
  timeHours,
  timeMinutes,
  regions,
};

export default matchTypes;
