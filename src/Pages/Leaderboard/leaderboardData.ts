const getRandomBadge = () => {
  const badges = [
    "Scout level",
    "Guardian level",
    "Champion level",
    "Legend level",
  ];
  return badges[Math.floor(Math.random() * badges.length)];
};

const generateLeaderboardData = (count: number) => {
  const data = [];
  for (let i = 1; i <= count; i++) {
    data.push({
      rank: i,
      name: `Player${i} ${Math.random().toString(36).substring(7)}`,
      points: Math.floor(Math.random() * 1000),
      badge: getRandomBadge(),
    });
  }
  data.sort((a, b) => b.points - a.points);
  return data;
};

export const leaderboardData = {
  daily: generateLeaderboardData(60),
  weekly: generateLeaderboardData(35),
  monthly: generateLeaderboardData(42),
};
