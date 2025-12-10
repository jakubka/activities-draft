const ACTIVITIES = [
  { person: 'Alice', distance: 12.5, type: 'run', week: 'W01' },
  { person: 'Bob', distance: 8.0, type: 'run', week: 'W01' },
  { person: 'Carol', distance: 15.0, type: 'run', week: 'W01' },
  { person: 'Alice', distance: 2.0, type: 'swim', week: 'W01' },
  { person: 'David', distance: 3.5, type: 'swim', week: 'W01' },
  { person: 'Alice', distance: 18.0, type: 'run', week: 'W02' },
  { person: 'Bob', distance: 22.0, type: 'run', week: 'W02' },
  { person: 'Carol', distance: 10.0, type: 'run', week: 'W02' },
  { person: 'David', distance: 5.0, type: 'run', week: 'W02' },
  { person: 'Bob', distance: 1.5, type: 'swim', week: 'W02' },
  { person: 'Carol', distance: 4.0, type: 'swim', week: 'W02' },
  { person: 'Alice', distance: 25.0, type: 'run', week: 'W03' },
  { person: 'Bob', distance: 15.0, type: 'run', week: 'W03' },
  { person: 'Carol', distance: 20.0, type: 'run', week: 'W03' },
  { person: 'David', distance: 12.0, type: 'run', week: 'W03' },
  { person: 'Eve', distance: 8.0, type: 'run', week: 'W03' },
  { person: 'Alice', distance: 3.0, type: 'swim', week: 'W03' },
  { person: 'David', distance: 5.0, type: 'swim', week: 'W03' },
  { person: 'Eve', distance: 2.5, type: 'swim', week: 'W03' },
  { person: 'Alice', distance: 30.0, type: 'run', week: 'W04' },
  { person: 'Bob', distance: 28.0, type: 'run', week: 'W04' },
  { person: 'Carol', distance: 18.0, type: 'run', week: 'W04' },
  { person: 'David', distance: 10.0, type: 'run', week: 'W04' },
  { person: 'Bob', distance: 2.0, type: 'swim', week: 'W04' },
  { person: 'Carol', distance: 5.5, type: 'swim', week: 'W04' },
  { person: 'Eve', distance: 3.0, type: 'swim', week: 'W04' },
  { person: 'Alice', distance: 35.0, type: 'run', week: 'W05' },
  { person: 'Bob', distance: 20.0, type: 'run', week: 'W05' },
  { person: 'Carol', distance: 25.0, type: 'run', week: 'W05' },
  { person: 'David', distance: 15.0, type: 'run', week: 'W05' },
  { person: 'Eve', distance: 12.0, type: 'run', week: 'W05' },
  { person: 'Alice', distance: 4.0, type: 'swim', week: 'W05' },
  { person: 'David', distance: 6.0, type: 'swim', week: 'W05' },
  { person: 'Eve', distance: 4.5, type: 'swim', week: 'W05' },
];

function getTop3Appearances(activities) {
  const byWeek = Object.groupBy(activities, a => a.week);
  
  const appearances = {};
  
  for (const weekActivities of Object.values(byWeek)) {
    const personTotals = {};
    for (const a of weekActivities) {
      personTotals[a.person] = (personTotals[a.person] || 0) + a.distance;
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

function generateStatistics(activities) {
  const runs = activities.filter(a => a.type === 'run');
  const swims = activities.filter(a => a.type === 'swim');

  const totalRun = runs.reduce((sum, a) => sum + a.distance, 0);
  const totalSwim = swims.reduce((sum, a) => sum + a.distance, 0);

  console.log(`Runs: ${runs.length}, ${totalRun}km. Swims: ${swims.length}, ${totalSwim}km`);

  return {
    teamTotals: {
      run: Math.round(totalRun),
      swim: Math.round(totalSwim)
    },
    personal: {
      top3Appearances: {
        run: getTop3Appearances(runs),
        swim: getTop3Appearances(swims)
      }
    }
  };
}

const stats = generateStatistics(ACTIVITIES);
console.log('\n=== Statistics ===\n');
console.log(JSON.stringify(stats, null, 2));

