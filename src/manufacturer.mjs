import cli from '@battis/qui-cli';

const {values, positionals} = await cli.init({ args: {requirePositionals: 1}});

const assets = await(await fetch(`${process.env.API_URL}/assets/manufacturers/global`, {
    method: 'post',
    headers: {
        Authorization: `Bearer ${process.env.TOKEN}`,
        "Content-Type": 'application/json'
    },
    body: JSON.stringify({
            "RequestOptions": {
                "Flags": 0,
                "Filters": [
                    {
                        "Facet": "Name",
                        "Values": [
                            positionals[0]
                        ],
                        "Op": 1
                    }
                ]
            }
        })
})).json();

cli.log.info(JSON.stringify(assets, null, 2));