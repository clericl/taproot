import {inflate} from 'pako';
import {Asset} from 'expo-asset';
import ReactNativeBlobUtil from 'react-native-blob-util';
import base64ToArrayBuffer from './base64ToArrayBuffer';

async function readGzipToJson(gzPath: string) {
  // get the static uri of the require()'d asset
  const gzAsset = Asset.fromModule(gzPath);

  // fetch the actual file and read into memory
  const fetchRes = await ReactNativeBlobUtil.fetch('GET', gzAsset.uri);

  // convert blob response into base64 string
  const data = await fetchRes.base64();

  // convert base64 string into array buffer
  const arrayBuffer = base64ToArrayBuffer(data);

  // inflate gzipped array buffer into json
  const inflated = JSON.parse(inflate(arrayBuffer, {to: 'string'}));

  return inflated;
}

export default readGzipToJson;
