Bun is an all-in-one toolkit for JavaScript and TypeScript apps. It ships as a single executable called bun.

At its core is the Bun runtime, a fast JavaScript runtime designed as a drop-in replacement for Node.js. It's written in Zig and powered by JavaScriptCore under the hood, dramatically reducing startup times and memory usage.

bun run index.tsx  # TS and JSX supported out of the box
The bun command-line tool also implements a test runner, script runner, and Node.js-compatible package manager, all significantly faster than existing tools and usable in existing Node.js projects with little to no changes necessary.

bun run start                 # run the `start` script
bun install <pkg>             # install a package
bun build ./index.tsx         # bundle a project for browsers
bun test                      # run tests
bunx cowsay 'Hello, world!'   # execute a package
Get started with one of the quick links below, or read on to learn more about Bun.