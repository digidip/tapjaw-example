import { TapjawAdapter, TapjawMessage } from 'tapjaw-importer';
import ExampleHttpConnector, { ExampleResponse } from '../connectors/example-http-connector';

export class AnimalMessage extends TapjawMessage {
}

export default class ExampleAdapter implements TapjawAdapter {
    constructor(private readonly connector: ExampleHttpConnector) {
    }

    public async * getAnimals(usePost = false): AsyncGenerator<AnimalMessage> {
        try {
            const results: ExampleResponse = usePost ? await this.connector.postAnimals() : await this.connector.getAnimals();

            for (const animal of results.data) {
                yield new AnimalMessage('animals', animal);
            }
        } catch (err) {
            throw err;
        }
    }
}
