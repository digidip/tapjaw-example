Tapjaw example
==============

Example of the Tapjaw implementation

## Install

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

## Usage

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

## Tutorial



### Setup new project

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

### Command Implementation

Now the fun starts, you need to either edit or create a new command in the projects `src/commands` directory.

By default, OCLIF creates a `src/commands/hello.ts` class, so for this tutorial we'll use this class.

#### Setup class
Change the the extended class from `Command` to `TapjawCommand` and implement the contracted properties and methods.

```typescript
export default class Hello extends TapjawCommand {
    // ...
}
```

#### Setup methods and properties

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
        // - Please refer to getAdapterCallback() Callback below.
    }
}
```

### Connector Implementation

#### Single Connector

The purpose of a connector is to allow an adapter to use different external API services, so for example some
third party APIs will have a RESTful and SOAP API. The _Connector Pattern_ allows us to create a two
implementations with the same method signatures for the adapter to use. The example below fleshes out the idea.

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

#### Proxy Connector

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

// Interfaces with a RESTful API
class Connecter_𝒂 implements TapjawConnector {
    public getEnvironmentalData(): Promise<any> {}
}

// Interfaces with a SOAP API
class Connecter_𝒃 implements TapjawConnector {
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

```

Another great example of the _Connector Pattern_ is to create a `CacheConnector` that wraps an existing child connector and abstracts the caching of the response from the child connector. But in regards to the adapter
which implements the `CacheConnector`, it has no awareness if the data was recieved from cache or the API.

#### Connectors with authentication

### Adapter Implementation

### getAdapterCallback() Callback