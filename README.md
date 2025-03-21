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

### Sync

```Python
from bybit_api import BybitSync

def main():
    instance = BybitSync({})
    ob =  instance.fetch_order_book("BTC/USDC")
    print(ob)
    #
    # balance = instance.fetch_balance()
    # order = instance.create_order("BTC/USDC", "limit", "buy", 1, 100000)
```

### Async

```Python
import asyncio
from bybit_api import BybitAsync

async def main():
    instance = BybitAsync({})
    ob =  await instance.fetch_order_book("BTC/USDC")
    print(ob)
    #
    # balance = await instance.fetch_balance()
    # order = await instance.create_order("BTC/USDC", "limit", "buy", 1, 100000)

asyncio.run(main())
```

### Websockets

```Python
from bybit_api import BybitWs

async def main():
    instance = BybitWs({})
    while True:
        ob = await instance.watch_order_book("BTC/USDC")
        print(ob)
        # orders = await instance.watch_orders("BTC/USDC")
```

