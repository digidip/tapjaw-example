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
