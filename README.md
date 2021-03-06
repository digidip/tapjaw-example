Tapjaw example
==============

Example of the Tapjaw implementation

- [Tapjaw example](#tapjaw-example)
- [Install](#install)
- [Usage](#usage)
- [Extending the example with the TapjawGenerator](#extending-the-example-with-the-tapjawgenerator)
- [Tutorial](#tutorial)
  - [Setup new project](#setup-new-project)
  - [Command Implementation](#command-implementation)
    - [Setup class](#setup-class)
    - [Setup methods and properties](#setup-methods-and-properties)
  - [Connector Implementation](#connector-implementation)
    - [Single Connector](#single-connector)
    - [Proxy Connector](#proxy-connector)
    - [Connectors with authentication](#connectors-with-authentication)
      - [New helper methods with TapjawImporter 0.2.0](#new-helper-methods-with-tapjawimporter-020)
  - [Adapter Implementation](#adapter-implementation)
    - [TapjawAdapter.getAdapterCallback() implementation](#tapjawadaptergetadaptercallback-implementation)
  - [Configurations](#configurations)
    - [TapjawMessageConfig](#tapjawmessageconfig)
    - [Creating your own configuration](#creating-your-own-configuration)
  - [Overriding the TapjawMessage](#overriding-the-tapjawmessage)

# Install

Download the project.

```bash
$ git clone https://github.com/digidip/tapjaw-example.git
```

Install the project's dependancies.

```bash
$ cd tapjaw-example
$ yarn install
```

Start example API server.

```bash
$ yarn server
```

# Usage

To perform a basic GET request, execute:

```bash
$ bin/run hello
get Animals
{"signature":"70e3baf7f7db6ed793f7837008e1a7e608adfcf95ce07eb02544d835e9a879e9","sourceProviderName":"animals","import_date":"2019-09-18T09:12:35.732Z","payload":{"type":"Dog"}}
{"signature":"55964a867bacb5169869498db99b68e7d2b0bfcc5dfec4d4456626674992089c","sourceProviderName":"animals","import_date":"2019-09-18T09:12:35.732Z","payload":{"type":"Cat"}}
{"signature":"f1678214e62aae890c6ffaa0cd3c9154e086b80d3c292fef0610163a6d8979b7","sourceProviderName":"animals","import_date":"2019-09-18T09:12:35.733Z","payload":{"type":"Narwhal"}}
{"signature":"114f6721e0e2f17b68be5caaac4391193c5b0edc409e8c9b6cd5ee3e8d4097b7","sourceProviderName":"animals","import_date":"2019-09-18T09:12:35.733Z","payload":{"type":"Komodo Dragon"}}
{"signature":"47b9e7f65611be13ea7df2476eb53036eddcbdf4c344eb7474076bca7d4601cd","sourceProviderName":"animals","import_date":"2019-09-18T09:12:35.733Z","payload":{"type":"Wasp"}}
{"signature":"9caaef5435ad411ef97ccf5ed3107a36ade6d3420bfc3c9a4d267390cf058a3f","sourceProviderName":"animals","import_date":"2019-09-18T09:12:35.733Z","payload":{"type":"Ladybird"}}
```

To perform a basic POST request, execute:

```bash
$ bin/run hello --post
post Animals
{"signature":"70e3baf7f7db6ed793f7837008e1a7e608adfcf95ce07eb02544d835e9a879e9","sourceProviderName":"animals","import_date":"2019-09-18T09:12:35.732Z","payload":{"type":"Dog"}}
{"signature":"55964a867bacb5169869498db99b68e7d2b0bfcc5dfec4d4456626674992089c","sourceProviderName":"animals","import_date":"2019-09-18T09:12:35.732Z","payload":{"type":"Cat"}}
{"signature":"f1678214e62aae890c6ffaa0cd3c9154e086b80d3c292fef0610163a6d8979b7","sourceProviderName":"animals","import_date":"2019-09-18T09:12:35.733Z","payload":{"type":"Narwhal"}}
{"signature":"114f6721e0e2f17b68be5caaac4391193c5b0edc409e8c9b6cd5ee3e8d4097b7","sourceProviderName":"animals","import_date":"2019-09-18T09:12:35.733Z","payload":{"type":"Komodo Dragon"}}
{"signature":"47b9e7f65611be13ea7df2476eb53036eddcbdf4c344eb7474076bca7d4601cd","sourceProviderName":"animals","import_date":"2019-09-18T09:12:35.733Z","payload":{"type":"Wasp"}}
{"signature":"9caaef5435ad411ef97ccf5ed3107a36ade6d3420bfc3c9a4d267390cf058a3f","sourceProviderName":"animals","import_date":"2019-09-18T09:12:35.733Z","payload":{"type":"Ladybird"}}
```

To perform a basic GET request with a limit, execute:

```bash
$ bin/run hello --limit=2
get Animals
{"signature":"70e3baf7f7db6ed793f7837008e1a7e608adfcf95ce07eb02544d835e9a879e9","sourceProviderName":"animals","import_date":"2019-09-18T09:12:35.732Z","payload":{"type":"Dog"}}
{"signature":"55964a867bacb5169869498db99b68e7d2b0bfcc5dfec4d4456626674992089c","sourceProviderName":"animals","import_date":"2019-09-18T09:12:35.732Z","payload":{"type":"Cat"}}
```

To perform a basic GET request with Basic Authentication, execute:

```bash
$ bin/run hello-secure test test
get Animals (secure call)
{"signature":"70e3baf7f7db6ed793f7837008e1a7e608adfcf95ce07eb02544d835e9a879e9","sourceProviderName":"animals","import_date":"2019-09-18T09:12:35.732Z","payload":{"type":"Dog"}}
{"signature":"55964a867bacb5169869498db99b68e7d2b0bfcc5dfec4d4456626674992089c","sourceProviderName":"animals","import_date":"2019-09-18T09:12:35.732Z","payload":{"type":"Cat"}}
{"signature":"f1678214e62aae890c6ffaa0cd3c9154e086b80d3c292fef0610163a6d8979b7","sourceProviderName":"animals","import_date":"2019-09-18T09:12:35.733Z","payload":{"type":"Narwhal"}}
{"signature":"114f6721e0e2f17b68be5caaac4391193c5b0edc409e8c9b6cd5ee3e8d4097b7","sourceProviderName":"animals","import_date":"2019-09-18T09:12:35.733Z","payload":{"type":"Komodo Dragon"}}
{"signature":"47b9e7f65611be13ea7df2476eb53036eddcbdf4c344eb7474076bca7d4601cd","sourceProviderName":"animals","import_date":"2019-09-18T09:12:35.733Z","payload":{"type":"Wasp"}}
{"signature":"9caaef5435ad411ef97ccf5ed3107a36ade6d3420bfc3c9a4d267390cf058a3f","sourceProviderName":"animals","import_date":"2019-09-18T09:12:35.733Z","payload":{"type":"Ladybird"}}
```

# Extending the example with the TapjawGenerator

If you wish to experiment with this example, consider using the [TapjawGenerator](https://www.npmjs.com/package/generator-tapjaw) to add configs, connectors, adapters, commands or message contracts to the current project.

# Tutorial

## Setup new project

Please refer to the [TapjawGenerator](https://www.npmjs.com/package/generator-tapjaw) for further instructions.

## Command Implementation

Now the fun starts, you need to either edit or create a new command in the projects `src/commands` directory.

By default, we've created a `src/commands/hello.ts` class, so for this tutorial we'll use this class.

### Setup class

Use the [TapjawGenerator](https://www.npmjs.com/package/generator-tapjaw) to create a new command with:
```bash
~/tapjaw-example %> yo tapjaw:command
```

### Setup methods and properties

Setup the properties:
```typescript
export default class Hello extends TapjawCommand {
    // 1. Provide a description
    static description = '<input a description>';

    // 2. Provide the examples of how to use this command
    static examples = [
        '$ bin/run hello'
    ];

    // 3. Define default flags and add extra ones if you like, please reference oclif for more details.
    static flags = {
        ...TapjawCommand.defaultFlags,
    };

    // 4. Optionally add arguments, please reference oclif for more details.
    static args = [];

    // ...
}
```

Setup the required method:
```typescript
export default class Hello extends TapjawCommand {
    // ...

    protected getAdapterCallback(args: TapjawCommandArgs, flags: TapjawCommandFlags): TapjawAdapterCallback {
        // 5. Your adapter and connector construction and initialisation.
        // - Please refer to Connector and Adapter implementation below.

        // 6. Your callback on how the adapter should be invoked based on args and flags.
        // - Please refer to "getAdapterCallback() implementation" below.
    }
}
```

## Connector Implementation

The purpose of a connector is to allow an adapter to use different external API services, so for example some third party APIs will have a RESTful and SOAP API. The _Connector Pattern_ allows us to create a two implementations with the same method signatures for the adapter to use. The developer then has the choice to switch between either connector and expect the adapter to operate seemlessly regardless of which connector is used.

Use the [TapjawGenerator](https://www.npmjs.com/package/generator-tapjaw) to create a new connector with:
```bash
~/tapjaw-example %> yo tapjaw:connector
```

### Single Connector

The most basic implementation of af a connector is to communicate with a single third party API. The following example demostrates how to create one of these connectors:

```typescript

// -- src/contracts/example-connector.ts

interface AnimalResponse extends TapjawConnectorResponse {
    name: string;
}

interface ExampleConnector {
    getAnimals(): Promise<AnimalResponse>;
}

// -- src/connectors/example-animal-world-connector.ts

class ExampleAnimalWorldConnector extends TapjawHttpConnector implements ExampleConnector {
    constructor() {
        super('animalworld.example.com', 80);
    }

    public getAnimals(): Promise<AnimalResponse> {
        return new Promise();
    }
}

// -- src/connectors/example-nature-connector.ts

class ExampleNatureConnector extends TapjawHttpConnector implements ExampleConnector {
    constructor() {
        super('nature.example.com', 80);
    }

    public getAnimals(): Promise<AnimalResponse> {
        return new Promise();
    }
}

```

### Proxy Connector

A nice feature of the _Connector Pattern_ is that you can proxy one or more other connectors, so for example
if `endpoint 𝒂` and `endpoint 𝒃`, you can create a connector which has requirements for `connector 𝒂` and `connector 𝒃`.

```typescript
// Connector Response interfaces

interface EnvironmentalData extends TapjawConnectorResponse {
    // type definition
}

interface GlobalData extends TapjawConnectorResponse {
    // type definition
}

interface GlobalEnvironmentalData extends TapjawConnectorResponse {
    // type definition
    enviromental: EnvironmentalData;
    global: GlobalData;
}

// Interface for Environmental data with a RESTful API
class Connecter_𝒂 implements TapjawHttpConnector /* implements ContractConnector */ {
    constructor() {
        super('environmental.example.com');
    }

    public getEnvironmentalData(): Promise<any> {}
}

// Interface for Global data via a RESTful API
class Connecter_𝒃 implements TapjawHttpConnector /* implements ContractConnector */ {
    constructor() {
        super('global.example.com');
    }

    public getGlobalData(): Promise<any> {}
}

// Interfaces with both SOAP and RESTful API.
class MyConnector implements TapjawConnector {
    constructor(
        readonly private connectorA: Connecter_𝒂,
        readonly private connectorB: Connecter_𝒃
    ) {}

    public async getGlobalEnviromentalData(): Promise<GlobalEnvironmentalData> {
        const enviromentalData = await this.connectorA.getEnvironmentalData();
        const globalData = await this.connectorB.getGlobalData();

        return {
            enviromental: enviromentalData,
            global: globalData
        };
    }
}

const impl = new MyConnector(
    new Connecter_𝒂(),
    new Connecter_𝒃()
)
const response = impl.getGlobalEnviromentalData();
```

Another great example of the _Connector Pattern_ is to create a `CacheConnector` that wraps an existing child connector and abstracts away the caching of the response from the child connector. But in regards to the adapter
which implements the `CacheConnector` or the child connector, it requires no awareness whether the data was recieved from cache or the API.

```typescript
class ChildConnector implements TapjawConnector {
    public async getRecord(id: number): Promise<any> {}
}

class CacheConnector implements TapjawConnector {
    constructor(
        readonly private connector: ChildConnector,
        readonly private cache: CacheInterface,
    ) {}

    public async getRecord(id: number): Promise<any> {
        if (this.cache.has(/* cache key */)) {
            return this.cache.get(/* cache key */);
        }

        const record = await this.connector.getRecord(id);
        if (record) {
            this.cache.put(/* cache key */, record);
        }

        return record;
    }
}

const impl = new CacheConnector(new ChildConnector(), new Cache());
const response = await impl.getRecord(123);
```

### Connectors with authentication

Connectors have the ability to handle various authentication approaches, currently Tapjaw Importer ships
with the following authenticators:
* HTTP Basic Authentication (`BasicAuthAuthenticator`)
* HTTP Bearer Authentication (`BearerAuthAuthenticator`)
* OAuth 2.0 Authentication (`Oauth2AuthAuthenticator`)

> If you require an alternative authenticator, you are able to manually implement your own by creating
  a `src/authenticators` directory in your project and implement the `TapjawAuthenticator` interface.

An authenticator's primary responsbility is to use provided credentials, to either create a token or communcicate with a third party authentication interface to retreieve session/access token data. The response provided from the `authenticate()` method
should contain all the necassary data to be able to transform a connector request, into an authenticated request.

The mediator between the connector's request mechanism and the `TapjawAuthenticator.authenticate()` requires a wrapper.

A wrapper's primary responsbility is to take the information recieved from `TapjawAuthenticator.authenticate()` and update
a HTTP request's header or URI with the necassary authentication token, api key or similar.

Tapjaw Importer is shipped with the following wrappers:
* Applying `Authorization: <auth type> <token>` to a HTTP request header (`ApplyAuthorizationHttpHeaderWrapper`)
* Applying `Authorization: Bearer <oauth access token>` to a HTTP request header (`ApplyOauthAuthorizationHttpHeaderWrapper`)

> If you require a custom wrapper, create a `src/authenticators/wrappers` directory in your project and create a new wrapper class which extends the `TapjawAuthenticationWrapper` interface. In most cases you will also need to create a new class which extends the `TapjawAuthenticator`.

To inject security into your connector, you must doing the following changes to your connector and connect the necassary parts in your command.
```typescript
import { ApplyAuthorizationHttpHeaderWrapper, BasicAuthAuthenticator } from 'tapjaw-importer'; // WARNING: This approach will be deprecated in v0.3.0.

class MyHttpConnector extends TapjawHttpConnector implements MyConnector {
    constructor(security: TapjawAuthenticationWrapper) {
        super('host', 443, true, security);
    }

    // ... connector implementation
}

// Defined in the command ...
const security = new ApplyAuthorizationHttpHeaderWrapper(
    new BasicAuthAuthenticator('username', 'password')
);

const connector = new MyHttpConnector(security);
```

#### New helper methods with TapjawImporter 0.2.0

Due to the verbose approach towards implementing the Wrapper and Authenticator, three new helper methods have been added to the TapjawImporter interface, the following example will give you an understanding how to use them.

```typescript

import { createBasicSecurity, createBearerSecurity, createOAuthSecurity } from 'tapjaw-importer';

class MyHttpConnector extends TapjawHttpConnector implements MyConnector {
    constructor(security: TapjawAuthenticationWrapper) {
        // Basic Auth
        super('host', 443, true, security || createBasicSecurity('user', 'pass'));

        // Bearer Auth
        super('host', 443, true, security || createBearerSecurity('token'));

        // OAuth
        super(
            'host',
            443,
            true,
            security || createOAuthSecurity(
                'clientId',
                'clientSecret',
                'hostname',
                'path',
                'postParams',
                'method',
                'responseEncoding'
            )
        );
    }

    // ... connector implementation
}
```

These new methods simply wrap the `new Wrapper(new Authenticator())` approach into an easy to use approach.

> **Deprecation Note**: *In TapjawImporter v0.3.0, the wrappers and authenticators will be removed from TapjawImporter's index interface, as it will not longer be the recommended approach. Although you will still be able to use them by referencing the files directly in TapjawImporter project tree.*

## Adapter Implementation

The adapters primary responsbility is **to be the interface to your business domain**. In an adapter each `public` method _must_ return a generator which yields an instances of `TapjawMessage`.

Use the [TapjawGenerator](https://www.npmjs.com/package/generator-tapjaw) to create a new adapter class with:
```bash
~/tapjaw-example %> yo tapjaw:adapter
```

> **Note**: *If you create your connectors before the adapter, the adapter generator will automatically allow you to select an existing connector that the adapter should implement.*

```typescript
type TapjawAdapterCallback<T = TapjawMessage> = () => AsyncGenerator<T>;

// should be implemented like:

class MyAdapter extends TapjawAdapter<MyAdapter, TapjawMessage> {

    // ...

    public async * getAnimals(): AsyncGenerator<TapjawMessage> {
        yield new TapjawMessage('Animal', {});
    }
}
```

Fundementally, the adapter should be completely independany from the command, the command should only call upon the Adapter to provide the necassary arguments to complex it's task.

### TapjawAdapter.getAdapterCallback() implementation

The primary responsbility is the `TapjawCommand.getAdapterCallback()` is to provide a callback which can be used inside the `TajawIterator`. The callback should define which adapter `public` method should be called and provide the required method parameter data used by the adapter method.

It is important that the callback yields from the adapter method as demostrated in the example below.

```typescript
export default class Hello extends TapjawCommand {
    // ...

    protected getAdapterCallback(args: TapjawCommandArgs, flags: TapjawCommandFlags): TapjawAdapterCallback {
        const adapter = new ExampleAdapter(new ExampleHttpConnector());

        // Call the Adapter method using GET.
        return async function* (): AsyncGenerator<AnimalMessage> {

            // ... Use `args` or `flags` to provide paramters.

            // ... validate or prepare other data used by the adapter method.

            /**
             * Pipe generator yield to Iterator
             */
            yield* adapter.getAnimals(/* parameters from args, flags or prepared data */);
        };
    }

    // ...
}
```

## Configurations

Generally it's good practice to put connector credentials or general mutable command configurations into the TapjawImporter's configuration system. To get a rough idea take a look at `src/configs/example-config.ts` and `.env`. You will see that `EXAMPLE_` is a prefix that exists against every `ExampleConfig` configuration in the `.env`:
```env
EXAMPLE_MY_ARG=Tapjaw Example
```
When you run `$> bin/run hello` it will output `Example Config: my_arg = Tapjaw Example.`, which is derived from the above configuration.


### TapjawMessageConfig

By default TapjawImporter is shipped with `TapjawMessageConfig`, with the default configuration in the `.env` being:
```env
TAPJAW_MESSAGE_SECRET=example secret
```

If you wish to salt your `TapjawMessage` signature, simply change the `TAPJAW_MESSAGE_SECRET` value to your desired secret.


### Creating your own configuration

Use the [TapjawGenerator](https://www.npmjs.com/package/generator-tapjaw) to create a new configuration instance with:
```bash
~/tapjaw-example %> yo tapjaw:config
```

You will be asked to provide a prefix/namespace for your new configurations, it will also ask if you wish to setup a number of key/value pairs using the newly created prefix/namespace.

If you do not have a `.env` file in your project, the generator will automatically create you a new one with all your newly configured variables. If `.env` already exists, the new configuration variables will be appended to the file.

Once you've created a new configuration instance, you simply need to import the file into your project file:
```typescript
import myDataConfig from 'src/configs/my-data-config.ts'; // Uses prefix: "MY_DATA_"

// Get a value from MY_DATA_NAME=moo
myDataConfig.getConfig('name'); // will return "moo"
```

## Overriding the TapjawMessage

Generally a good practice is to create your own `TapjawMessage` class, which you can then overload the hashing mechanism or add extra functionality prior to transforming into JSON.

To make this easy use the [TapjawGenerator](https://www.npmjs.com/package/generator-tapjaw) to create a new message type with:
```bash
~/tapjaw-example %> yo tapjaw:message
```

Once you have generated a new message type, you can now start to use this in your Adapters instead of the `TapjawMessage`.
