import { TapjawCommandFlags } from 'tapjaw-importer';

export default interface BaseCommandFlags<T = string> extends TapjawCommandFlags<T> {
    importId: T;
}
