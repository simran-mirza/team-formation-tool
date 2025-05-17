let participants = [];
let teams = [];

function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}

function getRandomTeamName(existingNames = new Set()) {
    let name;
    do {
        const adjective = faker.hacker.adjective();
        const noun = faker.hacker.noun();
        name = `${capitalize(adjective)} ${capitalize(noun)}`;
    } while (existingNames.has(name));
    existingNames.add(name);
    return name;
}


function parseCSV(file) {
    Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: function (results) {
            const headers = Object.keys(results.data[0]);

            const emailKey = headers.find(h => h.toLowerCase().includes('email'));
            const nameKey = headers.find(h => h.toLowerCase().includes('name') && !h.toLowerCase().includes('team'));
            const teamKey = headers.find(h => h.toLowerCase().includes('team'));

            participants = results.data.map(row => ({
                email: row[emailKey]?.trim(),
                name: row[nameKey]?.trim(),
                teamName: row[teamKey]?.trim() || "", // preserve original case for display
                teamKey: row[teamKey]?.trim()?.toLowerCase() || "", // normalized for logic
            })).filter(p => p.email && p.name);


            // Remove duplicates based on email
            const seen = new Set();
            participants = participants.filter(p => {
                if (seen.has(p.email)) return false;
                seen.add(p.email);
                return true;
            });

            alert("CSV parsed successfully!");
        }
    });
}

function formTeams() {
    const preassignedTeams = {};
    const unassigned = [];

    participants.forEach(p => {
        if (p.teamKey) {
            if (!preassignedTeams[p.teamKey]) {
                preassignedTeams[p.teamKey] = {
                    originalName: p.teamName,
                    members: []
                };
            }
            preassignedTeams[p.teamKey].members.push(p);
        } else {
            unassigned.push(p);
        }
    });

    const assignedEmails = new Set();
    for (const key in preassignedTeams) {
        preassignedTeams[key].members.forEach(p => assignedEmails.add(p.email));
    }

    const remaining = unassigned.filter(p => !assignedEmails.has(p.email));

    // Shuffle unassigned
    for (let i = remaining.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [remaining[i], remaining[j]] = [remaining[j], remaining[i]];
    }

    const generatedNames = new Set();

    // Add preassigned teams (preserve original name)
    for (const key in preassignedTeams) {
        let team = preassignedTeams[key];
        while (team.members.length < 5 && remaining.length > 0) {
            team.members.push(remaining.shift());
        }
        teams.push({ name: team.originalName, members: team.members });
    }

    // New teams from remaining
    while (remaining.length >= 5) {
        const newTeam = remaining.splice(0, 5);
        const name = getRandomTeamName(generatedNames);
        teams.push({ name, members: newTeam });
    }

    if (remaining.length > 0) {
        const name = getRandomTeamName(generatedNames);
        teams.push({ name, members: remaining });
    }

    renderTeams();
}

function renderTeams() {
    const container = $("#teamsContainer");
    container.empty();

    teams.forEach(team => {
        const teamDiv = $(`
          <div class="team">
            <h3>${team.name} <small>(${team.members.length} members)</small></h3>
            <ul>
              ${team.members.map(m => `<li>${m.name} (${m.email})</li>`).join('')}
            </ul>
          </div>
        `);
        container.append(teamDiv);
    });
}

function downloadCSV() {
    const rows = [["Team Name", "Name", "Email", "Team Size"]];
    teams.forEach(team => {
        team.members.forEach(member => {
            rows.push([team.name, member.name, member.email, team.members.length]);
        });
    });

    const csvContent = rows.map(r => r.map(cell => `"${cell}"`).join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "formed-teams.csv");
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

$("#csvFile").on("change", function (e) {
    const file = e.target.files[0];
    if (file) parseCSV(file);
});

$("#generateTeams").on("click", function () {
    if (participants.length === 0) {
        alert("Please upload a CSV file first!");
        return;
    }
    teams = [];
    formTeams();
});

$("#downloadCSV").on("click", function () {
    if (teams.length === 0) {
        alert("Please generate the teams first!");
        return;
    }
    downloadCSV();
});
