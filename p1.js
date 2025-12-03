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
];

function getTotalRunDistanceForPerson(personName) {
  return 123;
}

function getTopRunnerForGivenWeek(week) {
  return {
    person: 'Name',
    distance: 123
  };
}

function get2TopPerformersByType() {
  return {
    run: [{
      person: 'Name',
      distance: 123
    },{
      person: 'Name',
      distance: 123
    }],
    swim: [{
      person: 'Name',
      distance: 123
    },{
      person: 'Name',
      distance: 123
    }]
  }
}

function getMostImprovedRunner(startingWeek, endingWeek) {
  return {
    person: 'Name',
    improvement: 123
  };
}

console.log('=== Task 1: getTotalRunDistanceForPerson ===');
console.log('Alice:', getTotalRunDistanceForPerson('Alice'));
console.log('Bob:', getTotalRunDistanceForPerson('Bob'));

console.log('\n=== Task 2: getTopRunnerForGivenWeek ===');
console.log('W01:', JSON.stringify(getTopRunnerForGivenWeek('W01')));
console.log('W02:', JSON.stringify(getTopRunnerForGivenWeek('W02')));

console.log('\n=== Task 3: get2TopPerformersByType ===');
console.log(JSON.stringify(get2TopPerformersByType(), null, 2));

console.log('\n=== Task 4: getMostImprovedRunner ===');
console.log('W01 to W03:', JSON.stringify(getMostImprovedRunner('W01', 'W03')));
