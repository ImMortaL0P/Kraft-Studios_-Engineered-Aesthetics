const fs = require('fs');
let content = fs.readFileSync('src/routes/index.tsx', 'utf8');

const target = `<div 
              key={step.k} 
              className="flex w-[85vw] md:w-[50vw] lg:w-[40vw] shrink-0 flex-col justify-between bg-paper p-10 md:p-14 border border-line/75 rounded-2xl shadow-sm"
            >`;

const replacement = `<motion.div 
              key={step.k} 
              whileHover={{ y: -8, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="group flex w-[85vw] md:w-[50vw] lg:w-[40vw] shrink-0 flex-col justify-between bg-paper p-10 md:p-14 border border-line/75 rounded-2xl shadow-[0_0_0_1px_transparent] hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:border-reg transition-all duration-300"
            >`;

content = content.replace(target, replacement);
// Then swap the closing div for motion.div
content = content.replace(/<\/div>\s*\)\)\}\s*<\/motion\.div>/, `\/motion.div>\n          ))}\n        </motion.div>`);

fs.writeFileSync('src/routes/index.tsx', content);
