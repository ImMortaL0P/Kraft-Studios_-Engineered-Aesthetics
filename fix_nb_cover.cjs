const fs = require('fs');

let content = fs.readFileSync('src/data/caseStudies.ts', 'utf8');

// Replace nbEligibility import with nbSingle
content = content.replace(/import nbEligibility from "\.\.\/assets\/showcase\/noticeboard-eligibility\.jpg";/, 
  'import nbSingle from "../assets/showcase/noticeboard-single.jpg";');

content = content.replace(/\{ src: nbEligibility, caption: "Eligibility Engine — checking exact criteria match against student profile" \},/g, 
  '{ src: nbSingle, caption: "Notice Payload — extracted qualification, timeline and recruitment metrics" },');

// Replace cover image for Noticeboard
// In the "noticeboardImage" block there is:
// cover: noticeboardImage,
content = content.replace(/cover: noticeboardImage,/, 'cover: nbHomeV2,');

// Since nbHomeV2 is now the cover, it acts as the primary image on the case study preview.
// I'll leave nbHomeV2 in the shots array too, or maybe remove it. Wait, the work index uses `cover`, so it will be the storefront image!
// Also I will rename the cover tooltip
content = content.replace(/coverAlt: "Autonomous data pipeline represented as a node network",/, 'coverAlt: "The Notice Board — discovery and verification pipeline",');

fs.writeFileSync('src/data/caseStudies.ts', content);
