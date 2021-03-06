import * as core from '@actions/core'
import { instrument } from './executor'
import * as exec from "@actions/exec";

async function run() {
    try {
        let dsn = core.getInput("dsn", {required: true});
        core.exportVariable("SCOPE_DSN", dsn);

        let executeTestPhase = core.getInput("run-tests", {required: true});
        let command = core.getInput("command", {required: true});

        await instrument(false);

        if(executeTestPhase == "true") {
            await exec.exec("sh -c \""+command+" --init-script initscope.gradle\"")
        }

    } catch (error) {
        core.setFailed(error.message)
    }
}

run();
