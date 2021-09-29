const { injectDecoratorServerSide } = require('@navikt/nav-dekoratoren-moduler/ssr');

async function getHtmlWithDecorator(filePath: string): Promise<string> {
    return injectDecoratorServerSide({
        env: process.env.ENV,
        filePath: filePath,
    });
}

export default getHtmlWithDecorator;
