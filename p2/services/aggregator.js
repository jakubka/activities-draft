export function groupBy(activities, field) {
  const groups = {};

  for (const activity of activities) {
    const key = activity[field];
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(activity);
  }

  return groups;
}

export function groupByMultiple(activities, fields) {
  if (fields.length === 0) {
    return activities;
  }

  const [firstField, ...remainingFields] = fields;
  const groups = groupBy(activities, firstField);

  if (remainingFields.length === 0) {
    return groups;
  }

  const nestedGroups = {};
  for (const [key, groupActivities] of Object.entries(groups)) {
    nestedGroups[key] = groupByMultiple(groupActivities, remainingFields);
  }

  return nestedGroups;
}

export function filterBy(activities, field, value) {
  return activities.filter(activity => activity[field] === value);
}

export function filterByType(activities, type) {
  return filterBy(activities, 'type', type);
}

export function filterByPerson(activities, person) {
  return filterBy(activities, 'person', person);
}

export function filterByWeek(activities, week) {
  return filterBy(activities, 'week', week);
}

export function getUniqueValues(activities, field) {
  const values = new Set(activities.map(activity => activity[field]));
  return Array.from(values).sort();
}

export function aggregate(activities, field, operation = 'sum') {
  if (activities.length === 0) {
    return 0;
  }

  const values = activities.map(activity => activity[field]);

  switch (operation) {
    case 'sum':
      return values.reduce((sum, val) => sum + val, 0);
    case 'avg':
      return values.reduce((sum, val) => sum + val, 0) / values.length;
    case 'min':
      return Math.min(...values);
    case 'max':
      return Math.max(...values);
    case 'count':
      return values.length;
    default:
      throw new Error(`Unknown aggregation operation: ${operation}`);
  }
}

export function summarizeGroups(groupedActivities, field) {
  const summaries = {};

  for (const [key, activities] of Object.entries(groupedActivities)) {
    summaries[key] = {
      count: activities.length,
      total: aggregate(activities, field, 'sum'),
      average: aggregate(activities, field, 'avg'),
      min: aggregate(activities, field, 'min'),
      max: aggregate(activities, field, 'max')
    };
  }

  return summaries;
}

export function aggregateByPerson(activities) {
  const byPerson = groupBy(activities, 'person');
  const results = {};

  for (const [person, personActivities] of Object.entries(byPerson)) {
    results[person] = {
      totalActivities: personActivities.length,
      totalDistance: aggregate(personActivities, 'distance', 'sum'),
      totalDuration: aggregate(personActivities, 'duration', 'sum'),
      avgDistance: aggregate(personActivities, 'distance', 'avg'),
      avgDuration: aggregate(personActivities, 'duration', 'avg'),
      avgHeartRate: aggregate(personActivities, 'heartRate', 'avg'),
      totalElevation: aggregate(personActivities, 'elevation', 'sum'),
      activities: personActivities
    };
  }

  return results;
}

export function aggregateByWeek(activities) {
  const byWeek = groupBy(activities, 'week');
  const results = {};

  for (const [week, weekActivities] of Object.entries(byWeek)) {
    const uniqueParticipants = getUniqueValues(weekActivities, 'person');

    results[week] = {
      totalActivities: weekActivities.length,
      participants: uniqueParticipants.length,
      totalDistance: aggregate(weekActivities, 'distance', 'sum'),
      totalDuration: aggregate(weekActivities, 'duration', 'sum'),
      avgDistance: aggregate(weekActivities, 'distance', 'avg'),
      activities: weekActivities
    };
  }

  return results;
}

export function aggregateByType(activities) {
  const byType = groupBy(activities, 'type');
  const results = {};

  for (const [type, typeActivities] of Object.entries(byType)) {
    const uniqueParticipants = getUniqueValues(typeActivities, 'person');

    results[type] = {
      totalActivities: typeActivities.length,
      participants: uniqueParticipants.length,
      totalDistance: aggregate(typeActivities, 'distance', 'sum'),
      totalDuration: aggregate(typeActivities, 'duration', 'sum'),
      avgDistance: aggregate(typeActivities, 'distance', 'avg'),
      avgHeartRate: aggregate(typeActivities, 'heartRate', 'avg'),
      activities: typeActivities
    };
  }

  return results;
}
