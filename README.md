Tapjaw example
==============

Example of the Tapjaw implementation

- [Tapjaw example](#tapjaw-example)
- [Primary Dependencies](#primary-dependencies)
- [Install](#install)
- [Usage](#usage)
- [Tutorial](#tutorial)
  - [Setup new project](#setup-new-project)
  - [Setting up and managing commands](#setting-up-and-managing-commands)
    - [Introduction](#introduction)
    - [Implementation](#implementation)
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


# Primary Dependencies

- TapjawImporter - The main library which provides the schemas, interfaces and contract for creating adapters, commands, messages, iterators and connectors.
- Commander - We use commander as the foundation to our command line interface paradigm.
- Inversify - We use inversify to manage the DI/IoC for adapters, connectors, configurations and third party modules.
- Luxon - Luxon is a replacement to moment.js, inside `src/modules/date` you will find our standard palette of commonly used date functions.
- Dotenv - Loads the `.env` file, which the values are read by with `src/config` classes and are injected into the DI/IoC for use across the application.

# Install

Download the project.

```bash
$ git clone https://github.com/digidip/tapjaw-example.git
```

Install the project dependancies.

```bash
$ cd tapjaw-example

$ yarn install

    ...will take a few moments

$ yarn tsc
```

Start example API server.

```bash
$ yarn server
```

# Usage

To perform a basic GET request, execute:

```bash
$ bin/run apis tapjaw-example -i test
{"signature":"819b118f0139bcf6b7f5426d8cd4793bcade306f7f8941f1bb59d972ea48a822","sourceProviderName":"tapjaw-example merchant","import_date":"2021-11-03T15:26:20.315Z","payload":{"name":"henry"},"importId":"test","networkName":"tapjaw-example"}
{"signature":"16b27dc0da3b8272c29350935151ab8371fb3452018fdc83cfcaf383bcfe6360","sourceProviderName":"tapjaw-example merchant","import_date":"2021-11-03T15:26:20.339Z","payload":{"name":"james"},"importId":"test","networkName":"tapjaw-example"}
{"signature":"8c577e250986393fa78192443bf34b4a14df935d9a3addb3888e2e24516f4f11","sourceProviderName":"tapjaw-example merchant","import_date":"2021-11-03T15:26:20.358Z","payload":{"name":"sasha"},"importId":"test","networkName":"tapjaw-example"}
{"signature":"47551f3acef29f5a31d05b3931a0a126fb773ed5a816c87d288072774a192138","sourceProviderName":"tapjaw-example merchant","import_date":"2021-11-03T15:26:20.380Z","payload":{"name":"pancho"},"importId":"test","networkName":"tapjaw-example"}
{"signature":"2f2170dcb6bb01bfb66ac5b15386c022afdabedd6efb10cbbf8fd540aa7e5db2","sourceProviderName":"tapjaw-example merchant","import_date":"2021-11-03T15:26:20.402Z","payload":{"name":"errin"},"importId":"test","networkName":"tapjaw-example"}
{"signature":"85256934bb44a200b6c745e84afc608284d1e4725417eceab2901e885a0f70f7","sourceProviderName":"tapjaw-example merchant","import_date":"2021-11-03T15:26:20.423Z","payload":{"name":"lorna"},"importId":"test","networkName":"tapjaw-example"}
{"signature":"ad7202fb1c71b44df19d02dc47587f898f966d7addd2289b84c51b7a09e8ec0c","sourceProviderName":"tapjaw-example merchant","import_date":"2021-11-03T15:26:20.444Z","payload":{"name":"rosa"},"importId":"test","networkName":"tapjaw-example"}
{"signature":"0677dd63d9ee11f2a6d1def6a5e70f725b0f3bb1766db0f7b84e5bbc06d57a0a","sourceProviderName":"tapjaw-example merchant","import_date":"2021-11-03T15:26:20.464Z","payload":{"name":"biggles"},"importId":"test","networkName":"tapjaw-example"}
```

```bash
$ bin/run tools hello "Hello from Tapjaw" --name="Pancho"
Hello World...Pancho has something to say: Hello from Tapjaw
```

# Tutorial

## Setup new project

1. Checkout this project to your local machine with `$ git clone https://github.com/digidip/tapjaw-example.git my-project`.
2. Change into the my-project directory with `$ cd my-project/`.
3. Delete the exist `.git/` directory with `$ rm -rf .git`. Additionally you can then perform `git init` to start your own repository.
4. Install dependencies with `$ yarn install`
5. Build project with `$ yarn tsc`, you should now be able to execute `$ bin/run` which will display the help screen by default.

## Setting up and managing commands

### Introduction

We've created two example commands, a simple `src/commands/tools/hello.ts` command, and an API featured command at `src/commands/apis/tapjaw-example.ts`.

You can see which available API commands exist by executing:

```bash
$ bin/run help apis
Usage: run apis [options] [command] <api>

Execute an API command

Options:
  -h, --help                display help for command

Commands:
  tapjaw-example [options]  TapjawExample API Command
  help [command]            display help for command
```

or you can also see which tool commands exist by executing:

```bash
$ bin/run help tools
Usage: run tools [options] [command] <tool>

Execute a tool command

Options:
  -h, --help                 display help for command

Commands:
  hello [options] <caption>  A hello demo command
  help [command]             display help for command
```

To see what features the `$ bin/run tools hello` command provides, additonally and example of it's usage execute:

```bash
$ bin/run tools help hello
Usage: run tools hello [options] <caption>

A hello demo command

Arguments:
  caption              A simple caption

Options:
  -n, --name <string>  Add a name to the message
  -h, --help           display help for command

Examples:
  $ bin/mmt tools hello "My super caption" --name="Sasha"
```
### Implementation

Generally a tapjaw project contains four distinct command types, these are:

- `src/commands/apis/...` API to Messages Commands (uses `STDOUT`)

*API commands* are used exclusively for querying APIs and transforming the response to a standardised message which gets written to a `STDOUT` buffer as a JSON string. API commands employ an adapter along with one more more connectors, and iterator to complete this task.


- `src/commands/filters/...` Messages filter Commands (uses `STDIN`/`STDOUT`)

*Filter commands* are used to read in JSON messages from the `STDIN` buffer, then filter out messages which should be ignored (for some business related reason), or written to the filter's `STDOUT` buffer.


- `src/commands/stores/...` Messages storing Commands (uses `STDIN`)

*Store commands* read from the `STDIN` buffer and should be designed to write to a third party service, database
storage, document storage or queue.


- `src/commands/tools/...` Additional tool commands. (uses `STDIN`/`STDOUT`)

*Tool comamnds* are free to perform any necassary purpose required in the project, which does not fit within the sccope of the 3 previous command types.

For example, tools can be used for creating a buffer splitting command, which reads messages from the `STDIN` buffer and then divides the messages with a modular calcuation and pipes each respective message to one of the two `STDOUT` commands. Additionally you may wish to output the same message into two different Store commands.



> ========= ========= ========= BLOCK!! ========= ========= ========= =========













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
