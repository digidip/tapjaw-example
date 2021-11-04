import { TapjawMessage, TapjawPayload } from 'tapjaw-importer';

export default class ExampleTapjawMessage extends TapjawMessage {
    constructor(public readonly importId: string, protected readonly name: string, payload: TapjawPayload) {
        super(`${name} example`, payload);
    }
}
