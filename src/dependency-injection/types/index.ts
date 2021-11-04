export const Configs = {
    RateLimitedStdout: {
        PipedMessagesPerMinute: Symbol.for('MMT-Configs-RateLimitedStdout-PipedMessagesPerMinute'),
    },
};

export const Iterators = {
    RateLimitedStdout: Symbol.for('MMT-Iterators-RateLimitedStdout'),
};

export const Adapters = {
    TapjawExampleAdapter: Symbol.for('MMT-Adapters-TapjawExampleAdapter'),
};

export const Connectors = {
    TapjawExampleConnector: Symbol.for('MMT-Connectors-TapjawExampleConnector'),
};

export const ThirdParty = {
    StdoutStream: Symbol.for('MMT-ThirdPart-StdoutStream'),
};
