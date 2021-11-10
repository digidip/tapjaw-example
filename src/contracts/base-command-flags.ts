import { TapjawCommand } from 'tapjaw-importer';

export default interface BaseCommandFlags<T = string> extends TapjawCommand.TapjawCommandFlags<T> {
    importId: T;
}
