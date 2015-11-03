var fs = require("fs");
var vfs = require("vinyl-fs");

fs.renameSync("build/main.d.ts", "build/gw2-api.d.ts");
vfs.src("build/**/*.d.ts").pipe(vfs.dest("lib"));
vfs.src("build/gw2-api.js").pipe(vfs.dest("lib"));