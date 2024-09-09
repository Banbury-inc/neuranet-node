import { neuranet } from '../../src'
import * as CredentialUtils from '../utils/credentialUtils'

export function deleteDevice(device_name: string[]): string {
  const senderSocket = neuranet.networking.connect();
  const endOfHeader = Buffer.from('END_OF_HEADER');
  const credentials = CredentialUtils.loadCredentials();
  let username = Object.keys(credentials)[0];
  const file_size = ""
  let header: string | null = null;
  let buffer = Buffer.alloc(0);
  let null_arg = ""
  const fileHeader = `DEVICE_DELETE_REQUEST:${device_name}:${null_arg}:${username}:`;
  senderSocket.write(fileHeader);
  senderSocket.write(endOfHeader);

  let jobCompleted = false;
  senderSocket.on('data', (data) => {
    buffer = Buffer.concat([buffer, data]);
    let fileType = 'Unknown';
    if (buffer.includes(endOfHeader) && !header) {
      const endOfHeaderIndex = buffer.indexOf(endOfHeader);
      if (endOfHeaderIndex !== -1) {
        const headerPart = buffer.slice(0, endOfHeaderIndex);
        const content = buffer.slice(endOfHeaderIndex + endOfHeader.length);
        header = headerPart.toString();
        const splitHeader = header.split(':');
        fileType = splitHeader[0];
        buffer = content;
      }
    }
  });

  senderSocket.on('end', () => {
    if (!jobCompleted) {
      console.log('Connection closed before login completion.');
    }
  });

  senderSocket.on('error', (err) => {
    console.error('Error during login:', err);
    senderSocket.end();
  });

  return '';
}

