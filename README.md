# bybit-python
Python SDK (sync and async) for Bybit with Rest and WS capabilities.

You can check Bybit's docs here: [Docs](https://bybit.com/apidocs1)


You can check the SDK docs here: [SDK](https://docs.ccxt.com/#/exchanges/bybit)

*This package derives from CCXT and allows you to call pretty much every endpoint by either using the unified CCXT API or calling the endpoints directly*

## Installation

```
pip install bybit-api
```

## Usage

### Async

```Python
from bybit_api import BybitAsync

async def main():
    instance = BybitAsync({})
    order = await instance.create_order(__EXAMPLE_SYMBOL__, "limit", "buy", 1, 100000)
```

### Sync

```Python
from bybit_api import BybitSync

def main():
    instance = BybitSync({})
    order =  instance.create_order(__EXAMPLE_SYMBOL__, "limit", "buy", 1, 100000)
```

### Websockets

```Python
from bybit_api import BybitWs

async def main():
    instance = BybitWs({})
    while True:
        orders = await instance.watch_orders(__EXAMPLE_SYMBOL__)
```

