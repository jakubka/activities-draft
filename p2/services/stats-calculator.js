import { groupBy, aggregate, filterByType, getUniqueValues } from './aggregator.js';

export function calculateAveragePerPerson(activities) {
  const byPerson = groupBy(activities, 'person');
  const results = [];

  for (const [person, personActivities] of Object.entries(byPerson)) {
    const total = aggregate(personActivities, 'distance', 'sum');
    const count = personActivities.length;
    const average = Math.round((total / count) * 10) / 10;

    results.push({ person, average });
  }

  return results.sort((a, b) => b.average - a.average);
}

export function calculatePersonalBests(activities) {
  const byPerson = groupBy(activities, 'person');
  const results = [];

  for (const [person, personActivities] of Object.entries(byPerson)) {
    const best = aggregate(personActivities, 'distance', 'max');
    results.push({ person, best });
  }

  return results.sort((a, b) => b.best - a.best);
}

export function calculateTop3Appearances(activities) {
  const byWeek = groupBy(activities, 'week');
  const appearances = {};

  for (const weekActivities of Object.values(byWeek)) {
    const personTotals = {};

    for (const activity of weekActivities) {
      if (!personTotals[activity.person]) {
        personTotals[activity.person] = 0;
      }
      personTotals[activity.person] += activity.distance;
    }

    const top3 = Object.entries(personTotals)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([person]) => person);

    for (const person of top3) {
      appearances[person] = (appearances[person] || 0) + 1;
    }
  }

  return Object.entries(appearances)
    .map(([person, count]) => ({ person, count }))
    .sort((a, b) => b.count - a.count);
}

export function calculateTeamTotalsByType(activities) {
  const types = getUniqueValues(activities, 'type');
  const results = {};

  for (const type of types) {
    const typeActivities = filterByType(activities, type);
    results[type] = {
      count: typeActivities.length,
      totalDistance: Math.round(aggregate(typeActivities, 'distance', 'sum'))
    };
  }

  return results;
}

export function generateStatistics(activities, activityTypes) {
  const types = getUniqueValues(activities, 'type');

  const teamTotals = calculateTeamTotalsByType(activities);

  const personal = {
    averagePerPerson: {},
    personalBests: {},
    top3Appearances: {}
  };

  for (const type of types) {
    const typeActivities = filterByType(activities, type);
    personal.averagePerPerson[type] = calculateAveragePerPerson(typeActivities);
    personal.personalBests[type] = calculatePersonalBests(typeActivities);
    personal.top3Appearances[type] = calculateTop3Appearances(typeActivities);
  }

  return {
    teamTotals,
    personal
  };
}

export function calculateTotalDistancePerPerson(activities) {
  const byPerson = groupBy(activities, 'person');
  const results = [];

  for (const [person, personActivities] of Object.entries(byPerson)) {
    const totalDistance = aggregate(personActivities, 'distance', 'sum');
    results.push({ person, totalDistance: Math.round(totalDistance * 10) / 10 });
  }

  return results.sort((a, b) => b.totalDistance - a.totalDistance);
}

export function calculateAveragePace(activities) {
  const byPerson = groupBy(activities, 'person');
  const results = [];

  for (const [person, personActivities] of Object.entries(byPerson)) {
    const totalDuration = aggregate(personActivities, 'duration', 'sum');
    const totalDistance = aggregate(personActivities, 'distance', 'sum');
    const avgPace = totalDistance > 0 ? totalDuration / totalDistance : 0;

    results.push({
      person,
      avgPace: Math.round(avgPace * 10) / 10
    });
  }

  return results.sort((a, b) => a.avgPace - b.avgPace);
}

export function calculateWeeklyParticipation(activities) {
  const byWeek = groupBy(activities, 'week');
  const results = [];

  for (const [week, weekActivities] of Object.entries(byWeek)) {
    const uniqueParticipants = getUniqueValues(weekActivities, 'person');
    results.push({
      week,
      participantCount: uniqueParticipants.length
    });
  }

  return results.sort((a, b) => a.week.localeCompare(b.week));
}

export function calculateTotalElevation(activities) {
  const byPerson = groupBy(activities, 'person');
  const results = [];

  for (const [person, personActivities] of Object.entries(byPerson)) {
    const totalElevation = aggregate(personActivities, 'elevationGain', 'sum');
    results.push({ person, totalElevation: Math.round(totalElevation) });
  }

  return results.sort((a, b) => b.totalElevation - a.totalElevation);
}

export function calculateAverageHeartRate(activities) {
  const byPerson = groupBy(activities, 'person');
  const results = [];

  for (const [person, personActivities] of Object.entries(byPerson)) {
    const avgHeartRate = aggregate(personActivities, 'heartRate', 'avg');
    results.push({
      person,
      avgHeartRate: Math.round(avgHeartRate)
    });
  }

  return results.sort((a, b) => b.avgHeartRate - a.avgHeartRate);
}
