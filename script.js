const teamNumber = '16';
const eventKey = '2025arli'; // Event key for the 2025 Arkansas Regional
const apiKey = '5StwKToh7sAeGfuxb0uCaMWBc5ewdde7eIlyZhlVCyGGXRLnfsccbJReWImEFLui'; // Your API key

// Fetch event information
fetch(`https://www.thebluealliance.com/api/v3/event/${eventKey}`, {
  method: 'GET',
  headers: {
    'X-TBA-Auth-Key': apiKey
  }
})
.then(response => response.json())
.then(data => {
  // Display event information
  const eventInfoDiv = document.getElementById('event-info');
  eventInfoDiv.innerHTML = `
    <p><strong>Event Name:</strong> ${data.name}</p>
    <p><strong>Location:</strong> ${data.location.city}, ${data.location.state}</p>
    <p><strong>Dates:</strong> ${new Date(data.start_date).toLocaleDateString()} to ${new Date(data.end_date).toLocaleDateString()}</p>
  `;

  // Fetch match results for Team 16
  fetch(`https://www.thebluealliance.com/api/v3/team/${teamNumber}/event/${eventKey}/matches`, {
    method: 'GET',
    headers: {
      'X-TBA-Auth-Key': apiKey
    }
  })
  .then(response => response.json())
  .then(matches => {
    const matchesDiv = document.getElementById('matches');
    matchesDiv.innerHTML = '<h2>Match Results</h2>';
    matches.forEach(match => {
      if (match.alliances.red.team_keys.includes(`frc${teamNumber}`) || match.alliances.blue.team_keys.includes(`frc${teamNumber}`)) {
        const allianceColor = match.alliances.red.team_keys.includes(`frc${teamNumber}`) ? 'Red' : 'Blue';
        const matchDiv = document.createElement('div');
        matchDiv.classList.add('match');
        matchDiv.innerHTML = `
          <div class="match-header">Match ${match.match_number} (${allianceColor} Alliance)</div>
          <p><strong>Score:</strong> ${match.alliances[allianceColor.toLowerCase()].score}</p>
          <p><strong>Teams:</strong> ${match.alliances[allianceColor.toLowerCase()].team_keys.join(', ')}</p>
        `;
        matchesDiv.appendChild(matchDiv);
      }
    });
  })
  .catch(error => {
    console.error('Error fetching match data:', error);
    alert("Error fetching match data.");
  });
})
.catch(error => {
  console.error('Error fetching event data:', error);
  alert("Error fetching event data.");
});
