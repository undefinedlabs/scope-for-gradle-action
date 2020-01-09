import * as exec from '@actions/exec';
import * as io from '@actions/io';
import * as tc from '@actions/tool-cache';

export async function instrument(agentVersion:string, scopeGradlePluginVersion:string): Promise<void> {
    const workdir = process.cwd();
    const scopeAgentPath = await tc.downloadTool("https://repo1.maven.org/maven2/com/undefinedlabs/scope/scope-agent/"+agentVersion+"/scope-agent-"+agentVersion+".jar");
    if(!scopeAgentPath.endsWith(".jar")) {
        await io.mv(scopeAgentPath, scopeAgentPath+".jar");
    }

    const gradleInstrumentatorPath = await tc.downloadTool("https://repo1.maven.org/maven2/com/undefinedlabs/scope/scope-instrumentation-for-gradle/0.1.0-beta.1/scope-instrumentation-for-gradle-0.1.0-beta.1.jar");
    if(!gradleInstrumentatorPath.endsWith(".jar")){
        await io.mv(gradleInstrumentatorPath, gradleInstrumentatorPath+".jar");
    }

    await exec.exec("sh -c \"java -jar "+gradleInstrumentatorPath+" "+scopeGradlePluginVersion+" "+scopeAgentPath+".jar "+workdir+" \"");
}