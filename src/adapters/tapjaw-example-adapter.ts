import { TapjawContract, TapjawError, TapjawMessage } from 'tapjaw-importer';
import { injectable, inject } from 'inversify';
import ExampleTapjawMessage from '../contracts/messages/example-tapjaw-message';
import TapjawExampleConnector from '../contracts/connectors/tapjaw-example-connector';
import { Connectors } from '../dependency-injection/types';

@injectable()
export default class TapjawExampleAdapter
    implements TapjawContract.TapjawAdapter<TapjawExampleAdapter, ExampleTapjawMessage>
{
    /**
     * Provide the connector implementation the Adapter should use.
     */
    constructor(@inject(Connectors.TapjawExampleConnector) private readonly connector: TapjawExampleConnector) {}

    public async *getMessages(importId?: string): AsyncGenerator<ExampleTapjawMessage> {
        /**
         * Request the data from the connector, which should contain a
         * response in accordance with the ExampleResponse interface.
         */
        try {
            const apiResponse = await this.connector.getNames();

            if (apiResponse.length === 0) {
                throw new TapjawError.TapjawAdapterError('empty response', this);
            }

            /**
             * Iterate each data entity and yield to the TapjawIterator.
             */
            for (const payload of apiResponse) {
                /**
                 * Yield a TapjawMessage type with the necassary information.
                 *
                 * sortObjectArrays() will sort any internal array properties to prevent signature corruption.
                 */
                try {
                    yield new ExampleTapjawMessage(
                        importId || 'n/a',
                        'tapjaw-example',
                        TapjawMessage.sortObjectArrays(payload)
                    );
                } catch (error) {
                    console.error(error);
                }
            }
        } catch (error) {
            console.error(error);
        }
    }
}
