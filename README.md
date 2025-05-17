# Team Formation Tool

**Team Formation Tool** is a simple, browser-based web application designed to help organizers efficiently group participants into balanced teams for hackathons, events, or collaborative projects.

---

## Features

- **CSV Upload:** Easily upload a CSV file containing participant data (Name, Email, Team Name).
- **Case-Insensitive Team Matching:** Automatically groups participants with the same team name regardless of letter casing (e.g., "Alpha" and "alpha" are treated as the same team).
- **Random Team Name Generation:** For participants without a pre-assigned team, the app generates unique, creative team names using the Faker library.
- **Balanced Teams:** Participants are distributed evenly into teams, filling up existing teams before creating new ones.
- **Team Preview:** View the formed teams directly on the webpage, with clear member lists.
- **Download Teams:** Export the finalized teams as a CSV file for easy sharing and record-keeping.
- **No Backend Required:** Fully client-side implementation — no server setup needed. Just open the HTML file in your browser and start forming teams!

---

## Technologies Used

- HTML, CSS, JavaScript
- [jQuery](https://jquery.com/)
- [PapaParse](https://www.papaparse.com/) (CSV parsing)
- [Faker.js](https://github.com/faker-js/faker) (random team name generation)

---

## How to Use

1. Prepare a CSV file with participant data including columns for Name, Email, and optionally Team Name.
2. Open the `index.html` file in your browser.
3. Upload your CSV file using the file input.
4. Click the **Generate Teams** button to form balanced teams.
5. View the generated teams on the page.
6. Optionally, download the teams as a CSV file for sharing or record-keeping.

---

## Demo CSV Format

| Name        | Email               | Team Name   |
|-------------|---------------------|-------------|
| John Doe    | john@example.com    | Alpha       |
| Jane Smith  | jane@example.com    | Beta        |
| Alice Jones | alice@example.com   |             |
| Bob Brown   | bob@example.com     | ALPHA       |

*Note:* Team names are case-insensitive (e.g., "Alpha" and "ALPHA" are treated as the same team).

---

## Live Demo

You can view a live demo of the project hosted on GitHub Pages here:
https://simran-mirza.github.io/team-formation-tool/

---

## Contributing

Contributions and suggestions are welcome! Feel free to open issues or submit pull requests.

---

## Author

Simran Mirza - https://github.com/simran-mirza/

---

Thank you for checking out this project! If you find it useful, please give it a ⭐️ on GitHub.

