const { Client } = require('@notionhq/client');
const { NotionToMarkdown } = require('notion-to-md');

exports.handler = async function(event, context) {
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: 'Method Not Allowed',
            headers: { 'Content-Type': 'application/json' },
        };
    }

    const body = JSON.parse(event.body);

    const auth = event.headers?.authorization ?? null;

    if (!auth) {
        return {
            statusCode: 401,
            body: 'Unauthorized',
            headers: { 'Content-Type': 'application/json' },
        };
    }

    const notionClient = new Client({ auth });
    const n2m = new NotionToMarkdown({ notionClient });
    const mdblocks = await n2m.pageToMarkdown(body.pageId);
    const mdString = n2m.toMarkdownString(mdblocks);

    return {
        statusCode: 200,
        body: JSON.stringify({ message: "Success!", data: mdString.parent }),
        headers: { 'Content-Type': 'application/json' },
    };
};