import fetch from "node-fetch";
import {parseString} from "xml2js";

export async function getVersionToUse(url:string, allowBeta:boolean):Promise<string> {
    const response = await fetch(url);
    const json = await xml2json(await response.text());

    const releaseVersion:string = json.metadata.versioning[0].release[0];
    if(allowBeta || !releaseVersion.includes("beta")){
        return releaseVersion;
    }

    const allVersions:string[] = json.metadata.versioning[0].versions[0].version;
    for (let i = allVersions.length - 1 ; i >= 0; i--) {
        const agentVersion = allVersions[i];
        if(!agentVersion.includes("beta")){
            return agentVersion;
        }
    }

    return ""
}

async function xml2json(xml:string):Promise<any> {
    return new Promise((resolve, reject) => {
        parseString(xml, function (err, json) {
            if (err)
                reject(err);
            else
                resolve(json);
        });
    });
}