import {inflate} from 'pako';

async function readBlob(file: Blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = function (event) {
      resolve(event?.target?.result);
    };

    reader.readAsArrayBuffer(file);
    reader.onabort = reject;
    reader.onerror = reject;
  });
}

async function readGzipToJson(gzPath: string) {
  const fetchRes = await fetch(gzPath);
  const dataBlob = await fetchRes.blob();

  const fileData = await readBlob(dataBlob);
  return JSON.parse(inflate(fileData, {to: 'string'}));
}

export default readGzipToJson;
