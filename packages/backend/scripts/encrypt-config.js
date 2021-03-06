import fs from 'fs';
import { promisify } from 'util';
import { resolve } from 'path';

import Config from '../config';
import { logError, logInfo } from '../app/utils/logger';
import { encrypt } from '../app/utils/crypto';

const writeFile = promisify(fs.writeFile);

const run = async () => {
  const config = JSON.parse(JSON.stringify(Config));
  if (config.encrypted_data) {
    console.log('✔ このコンフィグは暗号化済みです');
    return process.exit(0);
  }

  const encrypted = {};
  Object.keys(config.plain_data).forEach(UID => {
    const data = config.plain_data[UID];
    const { banks, display_name, encrypt_password } = data;
    if (!banks || !display_name || !encrypt_password) {
      logError('banks, display_name または encrypt_password がありません');
      return process.exit(1);
    }
    encrypted[UID] = {
      display_name,
      banks: encrypt(JSON.stringify(banks), encrypt_password)
    };
  });

  config.encrypted_data = encrypted;
  delete config.plain_data;

  const json = JSON.stringify(config, null, 2);
  await writeFile(resolve('config.json'), json, 'utf8');
  logInfo('✔ Succeed!');
};

run().catch(logError);
