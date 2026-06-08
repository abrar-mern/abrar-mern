const fs = require("fs");
const path = require("path");

// If using Node.js < 18, uncomment the next two lines:
// const fetch = (...args) =>
//   import("node-fetch").then(({ default: fetch }) => fetch(...args));

async function fetchLatestCommits() {
  try {
    // Fetch public GitHub events
    const response = await fetch(
      "https://api.github.com/users/abrar-mern/events/public",
      {
        headers: {
          Accept: "application/vnd.github+json",
          "User-Agent": "README-Updater",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`GitHub API Error: ${response.status}`);
    }

    const data = await response.json();

    // Get only PushEvents and limit to latest 3
    const pushEvents = data
      .filter((event) => event.type === "PushEvent")
      .slice(0, 3);

    let logOutput = "";

    const timestamp = new Date()
      .toISOString()
      .replace("T", " ")
      .substring(0, 19);

    logOutput += `[${timestamp}] INITIALIZING AGENT: abrar-mern CI/CD PIPELINE...\n`;
    logOutput += `[${timestamp}] CONNECTING TO AWS EC2 PRODUCTION CLUSTERS...\n`;

    if (pushEvents.length === 0) {
      logOutput += `[${timestamp}] STATUS: Idle. System core stable. All microservices healthy.\n`;
    } else {
      pushEvents.forEach((event) => {
        const repoName = event.repo.name.split("/")[1];

        const commitMessage =
          event.payload.commits?.[0]?.message ||
          "Routine optimization completed";

        logOutput += `[${timestamp}] SUCCESS: Synchronized '${repoName}' -> Deployed: "${commitMessage}"\n`;
      });
    }

    logOutput += `[${timestamp}] TERMINAL WRAP: Redis cache cleared. Compression 100% complete.\n`;

    return logOutput;
  } catch (error) {
    console.error(error);

    return `[ERROR] Failed to fetch live cluster logs. System operating in offline mode.\n`;
  }
}

async function run() {
  try {
    const logContent = await fetchLatestCommits();

    const readmePath = path.join(__dirname, "../../README.md");

    let readme = fs.readFileSync(readmePath, "utf8");

    const terminalBlock = `\`\`\`bash
${logContent}\`\`\``;

    // README should contain:
    // <!-- TERMINAL:START -->
    // <!-- TERMINAL:END -->
    const regex =
      /<!-- TERMINAL:START -->([\s\S]*?)<!-- TERMINAL:END -->/;

    const updatedReadme = readme.replace(
      regex,
      `<!-- TERMINAL:START -->\n${terminalBlock}\n<!-- TERMINAL:END -->`
    );

    fs.writeFileSync(readmePath, updatedReadme, "utf8");

    console.log("✅ System build logs successfully compiled to README!");
  } catch (err) {
    console.error("❌ Error updating README:", err);
  }
}

run();