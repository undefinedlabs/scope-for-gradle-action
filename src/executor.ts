import * as exec from '@actions/exec';
import * as io from '@actions/io';
import * as tc from '@actions/tool-cache';
import { getVersionToUse } from './version-parser'

const scopeAgentMetadataURL = "https://repo1.maven.org/maven2/com/undefinedlabs/scope/scope-agent/maven-metadata.xml";
const scopeGradlePluginMetadataURL = "https://repo1.maven.org/maven2/com/undefinedlabs/scope/scope-gradle-plugin/maven-metadata.xml";
const scopeGradleInstrMetadataURL = "https://repo1.maven.org/maven2/com/undefinedlabs/scope/scope-instrumentation-for-gradle/maven-metadata.xml";

export async function instrument(allowBeta:boolean): Promise<void> {
    const workdir = process.cwd();
    const [agentVersion, pluginVersion, instrVersion] = await Promise.all([getVersionToUse(scopeAgentMetadataURL, allowBeta), getVersionToUse(scopeGradlePluginMetadataURL, false), getVersionToUse(scopeGradleInstrMetadataURL, false)])

    const gradleInstrumentatorPath = await tc.downloadTool(`https://repo1.maven.org/maven2/com/undefinedlabs/scope/scope-instrumentation-for-gradle/${instrVersion}/scope-instrumentation-for-gradle-${instrVersion}.jar`);
    if(!gradleInstrumentatorPath.endsWith(".jar")){
        await io.mv(gradleInstrumentatorPath, gradleInstrumentatorPath+".jar");
    }

    const scopeAgentPath = await tc.downloadTool(`https://repo1.maven.org/maven2/com/undefinedlabs/scope/scope-agent/${agentVersion}/scope-agent-${agentVersion}.jar`);
    if(!scopeAgentPath.endsWith(".jar")) {
        await io.mv(scopeAgentPath, scopeAgentPath+".jar");
    }

    await exec.exec(`sh -c "java -jar ${gradleInstrumentatorPath}.jar ${pluginVersion} ${scopeAgentPath}.jar ${workdir} "`);
}
