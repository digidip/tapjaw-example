Tapjaw example
==============

Example of the Tapjaw implementation

- [Tapjaw example](#tapjaw-example)
- [Install](#install)
- [Usage](#usage)
- [Tutorial](#tutorial)
  - [Setup new project](#setup-new-project)
  - [Command Implementation](#command-implementation)
    - [Setup class](#setup-class)
    - [Setup methods and properties](#setup-methods-and-properties)
  - [Connector Implementation](#connector-implementation)
    - [Single Connector](#single-connector)
    - [Proxy Connector](#proxy-connector)
    - [Connectors with authentication](#connectors-with-authentication)
  - [Adapter Implementation](#adapter-implementation)
    - [getAdapterCallback() implementation](#getadaptercallback-implementation)
  - [Override the TapjawMessage](#override-the-tapjawmessage)

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

# Tutorial

## Setup new project

There are a number of prerequaists before you start, firstly make sure you have `yarn`, `npx` and `nodejs 10+` installed
on your host system. You can find out how to do this by visiting the following pages:

* [yarn](https://yarnpkg.com/en/docs/install)
* [npx](https://www.npmjs.com/package/npx)
* [nodejs](https://nodejs.org/en/)

Since Tapjaw relies heavily on [oclif](https://github.com/oclif/oclif) for the command infrastructure,
you must execute the OCLIF builder to create a multi command project, so lets get started!

Firstly execute:
```bash
$ npx oclif multi <name of your project>
```

OCLIF will ask you a number of questions about creating the command project, please make sure you enable the `yarn` and `typescript` implemetations.

> The following OCLIF steps will be replaced in a later version of Tapjaw, unfortuantly it's manual process for now.

You will need to modify the parts of the oclif project to make it cleaner and reduce issues.

* You should update the `README.md` to reflect your project instead of the OCLIF `README.md` template.
* Copy `https://github.com/digidip/tapjaw-example/blob/master/tslint.json` into your project.
* Copy `https://github.com/digidip/tapjaw-example/blob/master/tsconfig.json` into your project.
* (Optionally) Copy `https://github.com/digidip/tapjaw-example/blob/master/.editorconfig` into your project

Change the directory to you project directory.
```bash
$ cd <name of your project>
```

Execute the following `yarn` dependancies:
```bash
$ yarn add https://github.com/digidip/tapjaw-importer.git#0.1.0 tslib
```

```bash
$ yarn add --dev globby ts-node tslint typescript @types/node
```

Crate the following directories in your `src/` directory:
```bash
$ mkdir src/adapters src/connectors src/contracts
```

Your project should now be ready to implement.

## Command Implementation

Now the fun starts, you need to either edit or create a new command in the projects `src/commands` directory.

By default, OCLIF creates a `src/commands/hello.ts` class, so for this tutorial we'll use this class.

### Setup class
Change the the extended class from `Command` to `TapjawCommand` and implement the contracted properties and methods.

```typescript
export default class Hello extends TapjawCommand {
    // ...
}
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

Connectors have the ability to handle various authentication methods, currently Tapjaw Importer ships
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

## Adapter Implementation

The adapters primary responsbility is **to be the interface to your business layer**. In an adapter each `public` method _must_ return a generator which yields an instances of `TapjawMessage`.

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

Internally how the adapter works should be completely hidden from the command

### getAdapterCallback() implementation

The primary responsbility is the `TapjawCommand.getAdapterCallback()` is to provide a callback which can be used inside the `TajawIterator`. The callback should define which adapter `public` method should be called and provide the required method parameter data used by the adapter method.

It is important that the callback yields from the adapter method as demostrated in the example below.

```typescript
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
```

## Override the TapjawMessage

Generally a good practice is to create your own `TapjawMessage` class, which you can then overload the hashing mechanism or add extra functionality prior to transforming into JSON.