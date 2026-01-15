export function formatTeamTotals(teamTotals, activityTypes) {
  const lines = [];

  lines.push('=== Team Totals ===\n');

  for (const [type, data] of Object.entries(teamTotals)) {
    const displayName = activityTypes[type]?.displayName || type;
    lines.push(`${displayName}: ${data.count} activities, ${data.totalDistance}km total`);
  }

  return lines.join('\n');
}

export function formatPersonalStats(title, personalStats, activityTypes) {
  const lines = [];

  lines.push(`\n=== ${title} ===\n`);

  for (const [type, rankings] of Object.entries(personalStats)) {
    const displayName = activityTypes[type]?.displayName || type;
    lines.push(`${displayName}:`);

    if (rankings.length === 0) {
      lines.push('  (no data)');
    } else {
      for (const ranking of rankings) {
        const valueKey = Object.keys(ranking).find(k => k !== 'person');
        const value = ranking[valueKey];
        lines.push(`  ${ranking.person}: ${value}`);
      }
    }

    lines.push('');
  }

  return lines.join('\n');
}

export function formatStatisticsReport(stats, activityTypes) {
  const sections = [];

  sections.push(formatTeamTotals(stats.teamTotals, activityTypes));
  sections.push(formatPersonalStats('Average Distance per Person', stats.personal.averagePerPerson, activityTypes));
  sections.push(formatPersonalStats('Personal Bests', stats.personal.personalBests, activityTypes));
  sections.push(formatPersonalStats('Top 3 Weekly Appearances', stats.personal.top3Appearances, activityTypes));

  return sections.join('\n');
}

export function formatRanking(title, rankings, valueLabel) {
  const lines = [];

  lines.push(`\n=== ${title} ===\n`);

  if (rankings.length === 0) {
    lines.push('(no data)');
  } else {
    for (let i = 0; i < rankings.length; i++) {
      const ranking = rankings[i];
      const valueKey = Object.keys(ranking).find(k => k !== 'person');
      const value = ranking[valueKey];
      lines.push(`${i + 1}. ${ranking.person}: ${value} ${valueLabel}`);
    }
  }

  return lines.join('\n');
}

export function formatWeeklyParticipation(weeklyData) {
  const lines = [];

  lines.push('\n=== Weekly Participation ===\n');

  for (const data of weeklyData) {
    lines.push(`${data.week}: ${data.participantCount} participants`);
  }

  return lines.join('\n');
}

export function formatAsJSON(stats) {
  return JSON.stringify(stats, null, 2);
}

export function formatActivityTypeSummary(byTypeData, activityTypes) {
  const lines = [];

  lines.push('\n=== Activity Summary by Type ===\n');
  lines.push('Type          | Activities | Distance | Participants');
  lines.push('--------------|------------|----------|-------------');

  for (const [type, data] of Object.entries(byTypeData)) {
    const displayName = (activityTypes[type]?.displayName || type).padEnd(13);
    const count = String(data.totalActivities).padEnd(10);
    const distance = `${Math.round(data.totalDistance)}km`.padEnd(8);
    const participants = String(data.participants).padEnd(12);

    lines.push(`${displayName} | ${count} | ${distance} | ${participants}`);
  }

  return lines.join('\n');
}

export function formatConsoleLog(teamTotals) {
  const parts = [];

  for (const [type, data] of Object.entries(teamTotals)) {
    const typeName = type.charAt(0).toUpperCase() + type.slice(1) + 's';
    parts.push(`${typeName}: ${data.count}, ${data.totalDistance}km`);
  }

  return parts.join('. ');
}
