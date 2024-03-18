import cli from '@battis/qui-cli';
import fs from 'fs';
import path from 'path';

const { values, positionals } = await cli.init({
  args: {
    requirePositionals: 1
  }
});

const assets = JSON.parse(
  fs.readFileSync(path.resolve(process.cwd(), positionals[0])).toString()
);

for (let i = 0; i < assets.Items.length; i++) {
  if (assets.Items[i].History) {
    for (let j = 0; j < assets.Items[i].History.Items.length; j++) {
      try {
        assets.Items[i].History.Items[j].Details = JSON.parse(
          assets.Items[i].History.Items[j].Details
        );
      } catch (e) {}
    }
  }
}

cli.log.info(JSON.stringify(assets, null, 2));
