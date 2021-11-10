import { TapjawDate, TapjawMessage } from 'tapjaw-importer';

export default class ExampleTapjawMessage extends TapjawMessage.DefaultMessage {
    constructor(
        public readonly importId: string,
        protected readonly name: string,
        payload: TapjawMessage.TapjawPayload
    ) {
        super(`${name} example`, payload, TapjawDate.utcDate.now());
    }
}
