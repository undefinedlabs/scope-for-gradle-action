import { getVersionToUse } from './version-parser'

test('should return agent version', async () => {
    expect(await getVersionToUse("https://repo1.maven.org/maven2/com/undefinedlabs/scope/scope-agent/maven-metadata.xml", false)).not.toBe("");
});

test('should return gradle instrumentator version', async () => {
    expect(await getVersionToUse("https://repo1.maven.org/maven2/com/undefinedlabs/scope/scope-instrumentation-for-gradle/maven-metadata.xml", false)).not.toBe("");
});

test('should return gradle plugin version', async () => {
    expect(await getVersionToUse("https://repo1.maven.org/maven2/com/undefinedlabs/scope/scope-gradle-plugin/maven-metadata.xml", false)).not.toBe("");
});