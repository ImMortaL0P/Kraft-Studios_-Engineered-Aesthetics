const fs = require('fs');

let content = fs.readFileSync('src/data/caseStudies.ts', 'utf8');

// Update imports
content = content.replace(
  /import nbAdmin from "\.\.\/assets\/showcase\/noticeboard-admin\.jpg";/,
  `import nbAdminRuns from "../assets/showcase/noticeboard-admin-runs.png";\nimport nbAdminSources from "../assets/showcase/noticeboard-admin-sources.png";`
);

// Update shots array for Notice Board. I will use regex to find the shots inside Notice Board block.
content = content.replace(
  /shots: \[\s*\{\s*src: noticeboardImage, caption: "The Notice Board — discovery and verification pipeline" \},\s*\{\s*src: nbHomeV2, caption: "The student-facing feed of verified government notifications" \},\s*\{\s*src: nbSingle, caption: "Notice Payload — extracted qualification, timeline and recruitment metrics" \},\s*\{\s*src: nbCalendar, caption: "Calendar — timeline of upcoming state and central exams" \},\s*\{\s*src: nbAdmin, caption: "Admin Access — securing the verification pipeline" \}\s*\],/,
  `shots: [
      { src: nbHomeV2, caption: "The student-facing feed of verified government notifications" },
      { src: nbSingle, caption: "Notice Payload — extracted qualification, timeline and recruitment metrics" },
      { src: nbAdminSources, caption: "Source Configuration — declaring headless browser selectors and scrape intervals directly through the UI" },
      { src: nbAdminRuns, caption: "Scrape Runs — real-time telemetry and error bounds surfacing scraping anomalies" }
    ],`
);

fs.writeFileSync('src/data/caseStudies.ts', content);
