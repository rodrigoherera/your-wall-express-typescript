import { App } from './app'

async function main() {
    const app = new App(8888);
    await app.listen();
}

main();