const chalk = require("chalk");
const childProcess = require("child_process");

const Timer = {
    time: 0,
    reset() {
        this.time = Date.now();
    },
    getDiffTime() {
        const temp = this.time;
        this.time = Date.now();
        return ((this.time - temp) / 1000).toFixed(2);
    },
};

function spawn(command, args) {
    const isWindows = process.platform === "win32";
    const result = childProcess.spawnSync(isWindows ? command + ".cmd" : command, args, { stdio: "inherit" });
    if (result.error) {
        console.error(result.error);
        process.exit(1);
    }
    if (result.status !== 0) {
        console.error(`non-zero exit code returned, code=${result.status}, command=${command} ${args.join(" ")}`);
        process.exit(1);
    }
}

function checkTypeScript() {
    console.log(chalk`{green.bold [Task]} {white.bold Check TypeScript}`);
    spawn("tsc", ["-p", "./tsconfig.json"]);
    console.info(chalk`{green.bold [task]} {white.bold Check TypeScript} {green.bold finished in ${Timer.getDiffTime()} seconds}`);
}

function checkLint() {
    console.log(chalk`{green.bold [Task]} {white.bold Check Lint}`);
    spawn("eslint", ["./src", "--cache", "--quiet"]);
    console.log(chalk`{green.bold [Task]} {white.bold Check Lint} {green.bold Finished in ${Timer.getDiffTime()} seconds}`);
}

(function () {
    Timer.reset();
    checkLint();
    checkTypeScript();
})();
