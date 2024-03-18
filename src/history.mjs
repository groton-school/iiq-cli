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
  try {
    const history = await (
      await fetch(
        `${process.env.API_URL}/assets/${assets.Items[i].AssetId}/activities`,
        {
          method: 'get',
          headers: {
            Authorization: `Bearer ${process.env.TOKEN}`,
            'Content-Type': 'application/json'
          }
        }
      )
    ).json();
    assets.Items[i].History = history;
  } catch (e) {
    cli.log.error(e);
  }
}

cli.log.info(JSON.stringify(assets, null, 2));
