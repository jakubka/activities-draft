import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export function loadActivities() {
  const filePath = join(__dirname, 'activities.json');

  try {
    const rawData = readFileSync(filePath, 'utf-8');
    const activities = JSON.parse(rawData);

    if (!Array.isArray(activities)) {
      throw new Error('Activities data must be an array');
    }

    const validatedActivities = activities.map((activity, index) => {
      validateActivity(activity, index);
      return activity;
    });

    return validatedActivities;
  } catch (error) {
    if (error.code === 'ENOENT') {
      throw new Error(`Activities file not found: ${filePath}`);
    }
    throw error;
  }
}

export function loadActivityTypes() {
  const filePath = join(__dirname, '../config/activity-types.json');

  try {
    const rawData = readFileSync(filePath, 'utf-8');
    const activityTypes = JSON.parse(rawData);

    if (typeof activityTypes !== 'object' || activityTypes === null) {
      throw new Error('Activity types must be an object');
    }

    for (const [type, config] of Object.entries(activityTypes)) {
      validateActivityTypeConfig(type, config);
    }

    return activityTypes;
  } catch (error) {
    if (error.code === 'ENOENT') {
      throw new Error(`Activity types config not found: ${filePath}`);
    }
    throw error;
  }
}

function validateActivity(activity, index) {
  const requiredFields = ['person', 'distance', 'type', 'week', 'date', 'duration', 'heartRate', 'elevationGain'];

  for (const field of requiredFields) {
    if (!(field in activity)) {
      throw new Error(`Activity at index ${index} missing required field: ${field}`);
    }
  }

  if (typeof activity.person !== 'string' || activity.person.trim() === '') {
    throw new Error(`Activity at index ${index} has invalid person name`);
  }

  if (typeof activity.distance !== 'number' || activity.distance < 0) {
    throw new Error(`Activity at index ${index} has invalid distance: ${activity.distance}`);
  }

  if (typeof activity.type !== 'string' || activity.type.trim() === '') {
    throw new Error(`Activity at index ${index} has invalid type`);
  }

  if (typeof activity.week !== 'string' || !activity.week.match(/^W\d+$/)) {
    throw new Error(`Activity at index ${index} has invalid week format: ${activity.week}`);
  }

  if (typeof activity.date !== 'string' || !activity.date.match(/^\d{4}-\d{2}-\d{2}$/)) {
    throw new Error(`Activity at index ${index} has invalid date format: ${activity.date}`);
  }

  if (typeof activity.duration !== 'number' || activity.duration <= 0) {
    throw new Error(`Activity at index ${index} has invalid duration: ${activity.duration}`);
  }

  if (typeof activity.heartRate !== 'number' || activity.heartRate < 40 || activity.heartRate > 220) {
    throw new Error(`Activity at index ${index} has invalid heart rate: ${activity.heartRate}`);
  }

  if (typeof activity.elevationGain !== 'number' || activity.elevationGain < 0) {
    throw new Error(`Activity at index ${index} has invalid elevation gain: ${activity.elevationGain}`);
  }
}

function validateActivityTypeConfig(type, config) {
  if (typeof config !== 'object' || config === null) {
    throw new Error(`Activity type '${type}' config must be an object`);
  }

  const requiredFields = ['calorieRate', 'category', 'displayName'];
  for (const field of requiredFields) {
    if (!(field in config)) {
      throw new Error(`Activity type '${type}' missing required field: ${field}`);
    }
  }

  if (typeof config.calorieRate !== 'number' || config.calorieRate <= 0) {
    throw new Error(`Activity type '${type}' has invalid calorieRate: ${config.calorieRate}`);
  }

  if (typeof config.category !== 'string' || config.category.trim() === '') {
    throw new Error(`Activity type '${type}' has invalid category`);
  }

  if (typeof config.displayName !== 'string' || config.displayName.trim() === '') {
    throw new Error(`Activity type '${type}' has invalid displayName`);
  }
}

export function validateActivityReferences(activities, activityTypes) {
  const validTypes = new Set(Object.keys(activityTypes));
  const invalidActivities = [];

  for (let i = 0; i < activities.length; i++) {
    if (!validTypes.has(activities[i].type)) {
      invalidActivities.push({
        index: i,
        type: activities[i].type,
        person: activities[i].person
      });
    }
  }

  if (invalidActivities.length > 0) {
    const details = invalidActivities
      .map(a => `  - Index ${a.index}: type '${a.type}' (${a.person})`)
      .join('\n');
    throw new Error(
      `Found ${invalidActivities.length} activities with undefined activity types:\n${details}\n` +
      `Valid types: ${Array.from(validTypes).join(', ')}`
    );
  }
}
