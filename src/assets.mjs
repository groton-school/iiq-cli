import cli from '@battis/qui-cli';

const {values, positionals} = await cli.init({
    args: {
        requirePositionals: 1
    }
});

const assets = await(await fetch(`${process.env.API_URL}/assets`, {
    method: 'post',
    headers: {
        Authorization: `Bearer ${process.env.TOKEN}`,
        "Content-Type": 'application/json'
    },
    body: JSON.stringify({
            "Filters": [
                {
                    "Facet": "Model",
                    "Id": positionals[0],
                    "Negative": false
                }
            ],
            "Paging": {
                "PageSize": 100
            }
        })
})).json();

cli.log.info(JSON.stringify(assets, null, 2));