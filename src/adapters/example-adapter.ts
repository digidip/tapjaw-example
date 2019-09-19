import { TapjawAdapter, TapjawMessage, sortObjectArrays } from 'tapjaw-importer';
import ExampleHttpConnector, { ExampleResponse } from '../connectors/example-http-connector';

/**
 * Optionally create your own implementation of a TapjawMessage if required.
 */
export class AnimalMessage extends TapjawMessage {}

export default class ExampleAdapter implements TapjawAdapter {
    /**
     * Provide the connector implementation the Adapter should use.
     *
     * @param connector ExampleHttpConnector
     */
    constructor(private readonly connector: ExampleHttpConnector) {}

    /**
     * Example of a Adapter method implementation.
     *
     * The important part of the implemenation is that every Adapter
     * method must return a AsyncGenerator<TapjawMessage> data type.
     *
     * @param usePost boolean
     */
    public async * getAnimals(usePost = false): AsyncGenerator<AnimalMessage> {
        try {
            /**
             * Request the data from the connector, which should contain a
             * response in accordance with the ExampleResponse interface.
             */
            const apiResponse: ExampleResponse = usePost ? await this.connector.postAnimals() : await this.connector.getAnimals();

            /**
             * Iterate each data entity and yield to the TapjawIterator.
             */
            for (const animal of apiResponse.data) {
                /**
                 * Yield a TapjawMessage type with the necassary information.
                 *
                 * sortObjectArrays() will sort any internal array properties to prevent signature corruption.
                 */
                yield new AnimalMessage('animals', sortObjectArrays(animal));
            }
        } catch (err) {
            /**
             * Throw any connector errors down the line.
             */
            throw err;
        }
    }

    public async * getSecureAnimals(): AsyncGenerator<AnimalMessage> {
        if (!this.connector.hasSecurity()) {
            throw new Error('TapjawAuthenticator Wrapper not provided to connector.');
        }

        try {
            /**
             * Request the data from the connector, which should contain a
             * response in accordance with the ExampleResponse interface.
             */
            const apiResponse: ExampleResponse = await this.connector.getAnimals(true);

            /**
             * Iterate each data entity and yield to the TapjawIterator.
             */
            for (const animal of apiResponse.data) {
                /**
                 * Yield a TapjawMessage type with the necassary information.
                 *
                 * sortObjectArrays() will sort any internal array properties to prevent signature corruption.
                 */
                yield new AnimalMessage('animals', sortObjectArrays(animal));
            }
        } catch (err) {
            /**
             * Throw any connector errors down the line.
             */
            throw err;
        }
    }
}
