const { markdownToBlocks } = require('@tryfabric/martian');

exports.handler = async function(event, context) {
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: 'Method Not Allowed',
            headers: { 'Content-Type': 'application/json' },
        };
    }

    const body = JSON.parse(event.body);
    const blocks = markdownToBlocks(body.markdown);

    return {
        statusCode: 200,
        body: JSON.stringify({ message: "Success!", data: blocks }),
        headers: { 'Content-Type': 'application/json' },
    };
};