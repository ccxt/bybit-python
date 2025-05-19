# bybit-python
Python SDK (sync and async) for Bybit cryptocurrency exchange with Rest and WS capabilities.

- You can check the SDK docs here: [SDK](https://docs.ccxt.com/#/exchanges/bybit)
- You can check Bybit's docs here: [Docs](https://bybit.com/apidocs1)
- Github repo: https://github.com/ccxt/bybit-python
- Pypi package: https://pypi.org/project/bybit-api


## Installation

```
pip install bybit-api
```

## Usage

### Sync

```Python
from bybit import BybitSync

def main():
    instance = BybitSync({})
    ob =  instance.fetch_order_book("BTC/USDC")
    print(ob)
    #
    # balance = instance.fetch_balance()
    # order = instance.create_order("BTC/USDC", "limit", "buy", 1, 100000)

main()
```

### Async

```Python
import sys
import asyncio
from bybit import BybitAsync

### on Windows, uncomment below:
# if sys.platform == 'win32':
# 	asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())

async def main():
    instance = BybitAsync({})
    ob =  await instance.fetch_order_book("BTC/USDC")
    print(ob)
    #
    # balance = await instance.fetch_balance()
    # order = await instance.create_order("BTC/USDC", "limit", "buy", 1, 100000)

    # once you are done with the exchange
    await instance.close()

asyncio.run(main())
```



### Websockets

```Python
import sys
from bybit import BybitWs

### on Windows, uncomment below:
# if sys.platform == 'win32':
# 	asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())

async def main():
    instance = BybitWs({})
    while True:
        ob = await instance.watch_order_book("BTC/USDC")
        print(ob)
        # orders = await instance.watch_orders("BTC/USDC")

    # once you are done with the exchange
    await instance.close()

asyncio.run(main())
```





#### Raw call

You can also construct custom requests to available "implicit" endpoints

```Python
        request = {
            'type': 'candleSnapshot',
            'req': {
                'coin': coin,
                'interval': tf,
                'startTime': since,
                'endTime': until,
            },
        }
        response = await instance.public_post_info(request)
```


## Available methods

### REST Unified

- `create_convert_trade(self, id: str, fromCode: str, toCode: str, amount: Num = None, params={})`
- `create_expired_option_market(self, symbol: str)`
- `create_market_buy_order_with_cost(self, symbol: str, cost: float, params={})`
- `create_market_sell_order_with_cost(self, symbol: str, cost: float, params={})`
- `create_order_request(self, symbol: str, type: OrderType, side: OrderSide, amount: float, price: Num = None, params={}, isUTA=True)`
- `create_order(self, symbol: str, type: OrderType, side: OrderSide, amount: float, price: Num = None, params={})`
- `create_orders(self, orders: List[OrderRequest], params={})`
- `fetch_balance(self, params={})`
- `fetch_bids_asks(self, symbols: Strings = None, params={})`
- `fetch_borrow_interest(self, code: Str = None, symbol: Str = None, since: Int = None, limit: Int = None, params={})`
- `fetch_borrow_rate_history(self, code: str, since: Int = None, limit: Int = None, params={})`
- `fetch_canceled_and_closed_orders(self, symbol: Str = None, since: Int = None, limit: Int = None, params={})`
- `fetch_canceled_orders(self, symbol: Str = None, since: Int = None, limit: Int = None, params={})`
- `fetch_closed_order(self, id: str, symbol: Str = None, params={})`
- `fetch_closed_orders(self, symbol: Str = None, since: Int = None, limit: Int = None, params={})`
- `fetch_convert_currencies(self, params={})`
- `fetch_convert_quote(self, fromCode: str, toCode: str, amount: Num = None, params={})`
- `fetch_convert_trade_history(self, code: Str = None, since: Int = None, limit: Int = None, params={})`
- `fetch_convert_trade(self, id: str, code: Str = None, params={})`
- `fetch_cross_borrow_rate(self, code: str, params={})`
- `fetch_currencies(self, params={})`
- `fetch_deposit_address(self, code: str, params={})`
- `fetch_deposit_addresses_by_network(self, code: str, params={})`
- `fetch_deposit_withdraw_fees(self, codes: Strings = None, params={})`
- `fetch_deposits(self, code: Str = None, since: Int = None, limit: Int = None, params={})`
- `fetch_derivatives_market_leverage_tiers(self, symbol: str, params={})`
- `fetch_derivatives_open_interest_history(self, symbol: str, timeframe='1h', since: Int = None, limit: Int = None, params={})`
- `fetch_funding_history(self, symbol: Str = None, since: Int = None, limit: Int = None, params={})`
- `fetch_funding_rate_history(self, symbol: Str = None, since: Int = None, limit: Int = None, params={})`
- `fetch_funding_rates(self, symbols: Strings = None, params={})`
- `fetch_future_markets(self, params)`
- `fetch_greeks(self, symbol: str, params={})`
- `fetch_ledger(self, code: Str = None, since: Int = None, limit: Int = None, params={})`
- `fetch_leverage_tiers(self, symbols: Strings = None, params={})`
- `fetch_leverage(self, symbol: str, params={})`
- `fetch_long_short_ratio_history(self, symbol: Str = None, timeframe: Str = None, since: Int = None, limit: Int = None, params={})`
- `fetch_market_leverage_tiers(self, symbol: str, params={})`
- `fetch_markets(self, params={})`
- `fetch_my_liquidations(self, symbol: Str = None, since: Int = None, limit: Int = None, params={})`
- `fetch_my_settlement_history(self, symbol: Str = None, since: Int = None, limit: Int = None, params={})`
- `fetch_my_trades(self, symbol: Str = None, since: Int = None, limit: Int = None, params={})`
- `fetch_ohlcv(self, symbol: str, timeframe='1m', since: Int = None, limit: Int = None, params={})`
- `fetch_open_interest_history(self, symbol: str, timeframe='1h', since: Int = None, limit: Int = None, params={})`
- `fetch_open_interest(self, symbol: str, params={})`
- `fetch_open_order(self, id: str, symbol: Str = None, params={})`
- `fetch_open_orders(self, symbol: Str = None, since: Int = None, limit: Int = None, params={})`
- `fetch_option_chain(self, code: str, params={})`
- `fetch_option_markets(self, params)`
- `fetch_option(self, symbol: str, params={})`
- `fetch_order_book(self, symbol: str, limit: Int = None, params={})`
- `fetch_order_classic(self, id: str, symbol: Str = None, params={})`
- `fetch_order_trades(self, id: str, symbol: Str = None, since: Int = None, limit: Int = None, params={})`
- `fetch_order(self, id: str, symbol: Str = None, params={})`
- `fetch_orders_classic(self, symbol: Str = None, since: Int = None, limit: Int = None, params={})`
- `fetch_orders(self, symbol: Str = None, since: Int = None, limit: Int = None, params={})`
- `fetch_position(self, symbol: str, params={})`
- `fetch_positions_history(self, symbols: Strings = None, since: Int = None, limit: Int = None, params={})`
- `fetch_positions(self, symbols: Strings = None, params={})`
- `fetch_settlement_history(self, symbol: Str = None, since: Int = None, limit: Int = None, params={})`
- `fetch_spot_markets(self, params)`
- `fetch_ticker(self, symbol: str, params={})`
- `fetch_tickers(self, symbols: Strings = None, params={})`
- `fetch_time(self, params={})`
- `fetch_trades(self, symbol: str, since: Int = None, limit: Int = None, params={})`
- `fetch_trading_fee(self, symbol: str, params={})`
- `fetch_trading_fees(self, params={})`
- `fetch_transfers(self, code: Str = None, since: Int = None, limit: Int = None, params={})`
- `fetch_volatility_history(self, code: str, params={})`
- `fetch_withdrawals(self, code: Str = None, since: Int = None, limit: Int = None, params={})`
- `add_pagination_cursor_to_result(self, response)`
- `borrow_cross_margin(self, code: str, amount: float, params={})`
- `cancel_all_orders_after(self, timeout: Int, params={})`
- `cancel_all_orders(self, symbol: Str = None, params={})`
- `cancel_order_request(self, id: str, symbol: Str = None, params={})`
- `cancel_order(self, id: str, symbol: Str = None, params={})`
- `cancel_orders_for_symbols(self, orders: List[CancellationRequest], params={})`
- `cancel_orders(self, ids, symbol: Str = None, params={})`
- `describe(self)`
- `edit_order_request(self, id: str, symbol: str, type: OrderType, side: OrderSide, amount: Num = None, price: Num = None, params={})`
- `edit_order(self, id: str, symbol: str, type: OrderType, side: OrderSide, amount: Num = None, price: Num = None, params={})`
- `edit_orders(self, orders: List[OrderRequest], params={})`
- `enable_demo_trading(self, enable: bool)`
- `get_amount(self, symbol: str, amount: float)`
- `get_bybit_type(self, method, market, params={})`
- `get_cost(self, symbol: str, cost: str)`
- `get_leverage_tiers_paginated(self, symbol: Str = None, params={})`
- `get_price(self, symbol: str, price: str)`
- `is_unified_enabled(self, params={})`
- `nonce(self)`
- `repay_cross_margin(self, code: str, amount, params={})`
- `safe_market(self, marketId: Str = None, market: Market = None, delimiter: Str = None, marketType: Str = None)`
- `set_leverage(self, leverage: Int, symbol: Str = None, params={})`
- `set_margin_mode(self, marginMode: str, symbol: Str = None, params={})`
- `set_position_mode(self, hedged: bool, symbol: Str = None, params={})`
- `transfer(self, code: str, amount: float, fromAccount: str, toAccount: str, params={})`
- `upgrade_unified_trade_account(self, params={})`
- `withdraw(self, code: str, amount: float, address: str, tag=None, params={})`

### REST Raw

- `public_get_spot_v3_public_symbols(request)`
- `public_get_spot_v3_public_quote_depth(request)`
- `public_get_spot_v3_public_quote_depth_merged(request)`
- `public_get_spot_v3_public_quote_trades(request)`
- `public_get_spot_v3_public_quote_kline(request)`
- `public_get_spot_v3_public_quote_ticker_24hr(request)`
- `public_get_spot_v3_public_quote_ticker_price(request)`
- `public_get_spot_v3_public_quote_ticker_bookticker(request)`
- `public_get_spot_v3_public_server_time(request)`
- `public_get_spot_v3_public_infos(request)`
- `public_get_spot_v3_public_margin_product_infos(request)`
- `public_get_spot_v3_public_margin_ensure_tokens(request)`
- `public_get_v3_public_time(request)`
- `public_get_contract_v3_public_copytrading_symbol_list(request)`
- `public_get_derivatives_v3_public_order_book_l2(request)`
- `public_get_derivatives_v3_public_kline(request)`
- `public_get_derivatives_v3_public_tickers(request)`
- `public_get_derivatives_v3_public_instruments_info(request)`
- `public_get_derivatives_v3_public_mark_price_kline(request)`
- `public_get_derivatives_v3_public_index_price_kline(request)`
- `public_get_derivatives_v3_public_funding_history_funding_rate(request)`
- `public_get_derivatives_v3_public_risk_limit_list(request)`
- `public_get_derivatives_v3_public_delivery_price(request)`
- `public_get_derivatives_v3_public_recent_trade(request)`
- `public_get_derivatives_v3_public_open_interest(request)`
- `public_get_derivatives_v3_public_insurance(request)`
- `public_get_v5_announcements_index(request)`
- `public_get_v5_market_time(request)`
- `public_get_v5_market_kline(request)`
- `public_get_v5_market_mark_price_kline(request)`
- `public_get_v5_market_index_price_kline(request)`
- `public_get_v5_market_premium_index_price_kline(request)`
- `public_get_v5_market_instruments_info(request)`
- `public_get_v5_market_orderbook(request)`
- `public_get_v5_market_tickers(request)`
- `public_get_v5_market_funding_history(request)`
- `public_get_v5_market_recent_trade(request)`
- `public_get_v5_market_open_interest(request)`
- `public_get_v5_market_historical_volatility(request)`
- `public_get_v5_market_insurance(request)`
- `public_get_v5_market_risk_limit(request)`
- `public_get_v5_market_delivery_price(request)`
- `public_get_v5_market_account_ratio(request)`
- `public_get_v5_spot_lever_token_info(request)`
- `public_get_v5_spot_lever_token_reference(request)`
- `public_get_v5_spot_margin_trade_data(request)`
- `public_get_v5_spot_margin_trade_collateral(request)`
- `public_get_v5_spot_cross_margin_trade_data(request)`
- `public_get_v5_spot_cross_margin_trade_pledge_token(request)`
- `public_get_v5_spot_cross_margin_trade_borrow_token(request)`
- `public_get_v5_crypto_loan_collateral_data(request)`
- `public_get_v5_crypto_loan_loanable_data(request)`
- `public_get_v5_ins_loan_product_infos(request)`
- `public_get_v5_ins_loan_ensure_tokens_convert(request)`
- `public_get_v5_earn_product(request)`
- `private_get_v5_market_instruments_info(request)`
- `private_get_v2_private_wallet_fund_records(request)`
- `private_get_spot_v3_private_order(request)`
- `private_get_spot_v3_private_open_orders(request)`
- `private_get_spot_v3_private_history_orders(request)`
- `private_get_spot_v3_private_my_trades(request)`
- `private_get_spot_v3_private_account(request)`
- `private_get_spot_v3_private_reference(request)`
- `private_get_spot_v3_private_record(request)`
- `private_get_spot_v3_private_cross_margin_orders(request)`
- `private_get_spot_v3_private_cross_margin_account(request)`
- `private_get_spot_v3_private_cross_margin_loan_info(request)`
- `private_get_spot_v3_private_cross_margin_repay_history(request)`
- `private_get_spot_v3_private_margin_loan_infos(request)`
- `private_get_spot_v3_private_margin_repaid_infos(request)`
- `private_get_spot_v3_private_margin_ltv(request)`
- `private_get_asset_v3_private_transfer_inter_transfer_list_query(request)`
- `private_get_asset_v3_private_transfer_sub_member_list_query(request)`
- `private_get_asset_v3_private_transfer_sub_member_transfer_list_query(request)`
- `private_get_asset_v3_private_transfer_universal_transfer_list_query(request)`
- `private_get_asset_v3_private_coin_info_query(request)`
- `private_get_asset_v3_private_deposit_address_query(request)`
- `private_get_contract_v3_private_copytrading_order_list(request)`
- `private_get_contract_v3_private_copytrading_position_list(request)`
- `private_get_contract_v3_private_copytrading_wallet_balance(request)`
- `private_get_contract_v3_private_position_limit_info(request)`
- `private_get_contract_v3_private_order_unfilled_orders(request)`
- `private_get_contract_v3_private_order_list(request)`
- `private_get_contract_v3_private_position_list(request)`
- `private_get_contract_v3_private_execution_list(request)`
- `private_get_contract_v3_private_position_closed_pnl(request)`
- `private_get_contract_v3_private_account_wallet_balance(request)`
- `private_get_contract_v3_private_account_fee_rate(request)`
- `private_get_contract_v3_private_account_wallet_fund_records(request)`
- `private_get_unified_v3_private_order_unfilled_orders(request)`
- `private_get_unified_v3_private_order_list(request)`
- `private_get_unified_v3_private_position_list(request)`
- `private_get_unified_v3_private_execution_list(request)`
- `private_get_unified_v3_private_delivery_record(request)`
- `private_get_unified_v3_private_settlement_record(request)`
- `private_get_unified_v3_private_account_wallet_balance(request)`
- `private_get_unified_v3_private_account_transaction_log(request)`
- `private_get_unified_v3_private_account_borrow_history(request)`
- `private_get_unified_v3_private_account_borrow_rate(request)`
- `private_get_unified_v3_private_account_info(request)`
- `private_get_user_v3_private_frozen_sub_member(request)`
- `private_get_user_v3_private_query_sub_members(request)`
- `private_get_user_v3_private_query_api(request)`
- `private_get_user_v3_private_get_member_type(request)`
- `private_get_asset_v3_private_transfer_transfer_coin_list_query(request)`
- `private_get_asset_v3_private_transfer_account_coin_balance_query(request)`
- `private_get_asset_v3_private_transfer_account_coins_balance_query(request)`
- `private_get_asset_v3_private_transfer_asset_info_query(request)`
- `private_get_asset_v3_public_deposit_allowed_deposit_list_query(request)`
- `private_get_asset_v3_private_deposit_record_query(request)`
- `private_get_asset_v3_private_withdraw_record_query(request)`
- `private_get_v5_order_realtime(request)`
- `private_get_v5_order_history(request)`
- `private_get_v5_order_spot_borrow_check(request)`
- `private_get_v5_position_list(request)`
- `private_get_v5_execution_list(request)`
- `private_get_v5_position_closed_pnl(request)`
- `private_get_v5_position_move_history(request)`
- `private_get_v5_pre_upgrade_order_history(request)`
- `private_get_v5_pre_upgrade_execution_list(request)`
- `private_get_v5_pre_upgrade_position_closed_pnl(request)`
- `private_get_v5_pre_upgrade_account_transaction_log(request)`
- `private_get_v5_pre_upgrade_asset_delivery_record(request)`
- `private_get_v5_pre_upgrade_asset_settlement_record(request)`
- `private_get_v5_account_wallet_balance(request)`
- `private_get_v5_account_borrow_history(request)`
- `private_get_v5_account_collateral_info(request)`
- `private_get_v5_asset_coin_greeks(request)`
- `private_get_v5_account_fee_rate(request)`
- `private_get_v5_account_info(request)`
- `private_get_v5_account_transaction_log(request)`
- `private_get_v5_account_contract_transaction_log(request)`
- `private_get_v5_account_smp_group(request)`
- `private_get_v5_account_mmp_state(request)`
- `private_get_v5_account_withdrawal(request)`
- `private_get_v5_asset_exchange_query_coin_list(request)`
- `private_get_v5_asset_exchange_convert_result_query(request)`
- `private_get_v5_asset_exchange_query_convert_history(request)`
- `private_get_v5_asset_exchange_order_record(request)`
- `private_get_v5_asset_delivery_record(request)`
- `private_get_v5_asset_settlement_record(request)`
- `private_get_v5_asset_transfer_query_asset_info(request)`
- `private_get_v5_asset_transfer_query_account_coins_balance(request)`
- `private_get_v5_asset_transfer_query_account_coin_balance(request)`
- `private_get_v5_asset_transfer_query_transfer_coin_list(request)`
- `private_get_v5_asset_transfer_query_inter_transfer_list(request)`
- `private_get_v5_asset_transfer_query_sub_member_list(request)`
- `private_get_v5_asset_transfer_query_universal_transfer_list(request)`
- `private_get_v5_asset_deposit_query_allowed_list(request)`
- `private_get_v5_asset_deposit_query_record(request)`
- `private_get_v5_asset_deposit_query_sub_member_record(request)`
- `private_get_v5_asset_deposit_query_internal_record(request)`
- `private_get_v5_asset_deposit_query_address(request)`
- `private_get_v5_asset_deposit_query_sub_member_address(request)`
- `private_get_v5_asset_coin_query_info(request)`
- `private_get_v5_asset_withdraw_query_record(request)`
- `private_get_v5_asset_withdraw_withdrawable_amount(request)`
- `private_get_v5_asset_withdraw_vasp_list(request)`
- `private_get_v5_user_query_sub_members(request)`
- `private_get_v5_user_query_api(request)`
- `private_get_v5_user_sub_apikeys(request)`
- `private_get_v5_user_get_member_type(request)`
- `private_get_v5_user_aff_customer_info(request)`
- `private_get_v5_user_del_submember(request)`
- `private_get_v5_user_submembers(request)`
- `private_get_v5_affiliate_aff_user_list(request)`
- `private_get_v5_spot_lever_token_order_record(request)`
- `private_get_v5_spot_margin_trade_interest_rate_history(request)`
- `private_get_v5_spot_margin_trade_state(request)`
- `private_get_v5_spot_cross_margin_trade_loan_info(request)`
- `private_get_v5_spot_cross_margin_trade_account(request)`
- `private_get_v5_spot_cross_margin_trade_orders(request)`
- `private_get_v5_spot_cross_margin_trade_repay_history(request)`
- `private_get_v5_crypto_loan_borrowable_collateralisable_number(request)`
- `private_get_v5_crypto_loan_ongoing_orders(request)`
- `private_get_v5_crypto_loan_repayment_history(request)`
- `private_get_v5_crypto_loan_borrow_history(request)`
- `private_get_v5_crypto_loan_max_collateral_amount(request)`
- `private_get_v5_crypto_loan_adjustment_history(request)`
- `private_get_v5_ins_loan_product_infos(request)`
- `private_get_v5_ins_loan_ensure_tokens_convert(request)`
- `private_get_v5_ins_loan_loan_order(request)`
- `private_get_v5_ins_loan_repaid_history(request)`
- `private_get_v5_ins_loan_ltv_convert(request)`
- `private_get_v5_lending_info(request)`
- `private_get_v5_lending_history_order(request)`
- `private_get_v5_lending_account(request)`
- `private_get_v5_broker_earning_record(request)`
- `private_get_v5_broker_earnings_info(request)`
- `private_get_v5_broker_account_info(request)`
- `private_get_v5_broker_asset_query_sub_member_deposit_record(request)`
- `private_get_v5_earn_order(request)`
- `private_get_v5_earn_position(request)`
- `private_post_spot_v3_private_order(request)`
- `private_post_spot_v3_private_cancel_order(request)`
- `private_post_spot_v3_private_cancel_orders(request)`
- `private_post_spot_v3_private_cancel_orders_by_ids(request)`
- `private_post_spot_v3_private_purchase(request)`
- `private_post_spot_v3_private_redeem(request)`
- `private_post_spot_v3_private_cross_margin_loan(request)`
- `private_post_spot_v3_private_cross_margin_repay(request)`
- `private_post_asset_v3_private_transfer_inter_transfer(request)`
- `private_post_asset_v3_private_withdraw_create(request)`
- `private_post_asset_v3_private_withdraw_cancel(request)`
- `private_post_asset_v3_private_transfer_sub_member_transfer(request)`
- `private_post_asset_v3_private_transfer_transfer_sub_member_save(request)`
- `private_post_asset_v3_private_transfer_universal_transfer(request)`
- `private_post_user_v3_private_create_sub_member(request)`
- `private_post_user_v3_private_create_sub_api(request)`
- `private_post_user_v3_private_update_api(request)`
- `private_post_user_v3_private_delete_api(request)`
- `private_post_user_v3_private_update_sub_api(request)`
- `private_post_user_v3_private_delete_sub_api(request)`
- `private_post_contract_v3_private_copytrading_order_create(request)`
- `private_post_contract_v3_private_copytrading_order_cancel(request)`
- `private_post_contract_v3_private_copytrading_order_close(request)`
- `private_post_contract_v3_private_copytrading_position_close(request)`
- `private_post_contract_v3_private_copytrading_position_set_leverage(request)`
- `private_post_contract_v3_private_copytrading_wallet_transfer(request)`
- `private_post_contract_v3_private_copytrading_order_trading_stop(request)`
- `private_post_contract_v3_private_order_create(request)`
- `private_post_contract_v3_private_order_cancel(request)`
- `private_post_contract_v3_private_order_cancel_all(request)`
- `private_post_contract_v3_private_order_replace(request)`
- `private_post_contract_v3_private_position_set_auto_add_margin(request)`
- `private_post_contract_v3_private_position_switch_isolated(request)`
- `private_post_contract_v3_private_position_switch_mode(request)`
- `private_post_contract_v3_private_position_switch_tpsl_mode(request)`
- `private_post_contract_v3_private_position_set_leverage(request)`
- `private_post_contract_v3_private_position_trading_stop(request)`
- `private_post_contract_v3_private_position_set_risk_limit(request)`
- `private_post_contract_v3_private_account_setmarginmode(request)`
- `private_post_unified_v3_private_order_create(request)`
- `private_post_unified_v3_private_order_replace(request)`
- `private_post_unified_v3_private_order_cancel(request)`
- `private_post_unified_v3_private_order_create_batch(request)`
- `private_post_unified_v3_private_order_replace_batch(request)`
- `private_post_unified_v3_private_order_cancel_batch(request)`
- `private_post_unified_v3_private_order_cancel_all(request)`
- `private_post_unified_v3_private_position_set_leverage(request)`
- `private_post_unified_v3_private_position_tpsl_switch_mode(request)`
- `private_post_unified_v3_private_position_set_risk_limit(request)`
- `private_post_unified_v3_private_position_trading_stop(request)`
- `private_post_unified_v3_private_account_upgrade_unified_account(request)`
- `private_post_unified_v3_private_account_setmarginmode(request)`
- `private_post_fht_compliance_tax_v3_private_registertime(request)`
- `private_post_fht_compliance_tax_v3_private_create(request)`
- `private_post_fht_compliance_tax_v3_private_status(request)`
- `private_post_fht_compliance_tax_v3_private_url(request)`
- `private_post_v5_order_create(request)`
- `private_post_v5_order_amend(request)`
- `private_post_v5_order_cancel(request)`
- `private_post_v5_order_cancel_all(request)`
- `private_post_v5_order_create_batch(request)`
- `private_post_v5_order_amend_batch(request)`
- `private_post_v5_order_cancel_batch(request)`
- `private_post_v5_order_disconnected_cancel_all(request)`
- `private_post_v5_position_set_leverage(request)`
- `private_post_v5_position_switch_isolated(request)`
- `private_post_v5_position_set_tpsl_mode(request)`
- `private_post_v5_position_switch_mode(request)`
- `private_post_v5_position_set_risk_limit(request)`
- `private_post_v5_position_trading_stop(request)`
- `private_post_v5_position_set_auto_add_margin(request)`
- `private_post_v5_position_add_margin(request)`
- `private_post_v5_position_move_positions(request)`
- `private_post_v5_position_confirm_pending_mmr(request)`
- `private_post_v5_account_upgrade_to_uta(request)`
- `private_post_v5_account_quick_repayment(request)`
- `private_post_v5_account_set_margin_mode(request)`
- `private_post_v5_account_set_hedging_mode(request)`
- `private_post_v5_account_mmp_modify(request)`
- `private_post_v5_account_mmp_reset(request)`
- `private_post_v5_asset_exchange_quote_apply(request)`
- `private_post_v5_asset_exchange_convert_execute(request)`
- `private_post_v5_asset_transfer_inter_transfer(request)`
- `private_post_v5_asset_transfer_save_transfer_sub_member(request)`
- `private_post_v5_asset_transfer_universal_transfer(request)`
- `private_post_v5_asset_deposit_deposit_to_account(request)`
- `private_post_v5_asset_withdraw_create(request)`
- `private_post_v5_asset_withdraw_cancel(request)`
- `private_post_v5_user_create_sub_member(request)`
- `private_post_v5_user_create_sub_api(request)`
- `private_post_v5_user_frozen_sub_member(request)`
- `private_post_v5_user_update_api(request)`
- `private_post_v5_user_update_sub_api(request)`
- `private_post_v5_user_delete_api(request)`
- `private_post_v5_user_delete_sub_api(request)`
- `private_post_v5_spot_lever_token_purchase(request)`
- `private_post_v5_spot_lever_token_redeem(request)`
- `private_post_v5_spot_margin_trade_switch_mode(request)`
- `private_post_v5_spot_margin_trade_set_leverage(request)`
- `private_post_v5_spot_cross_margin_trade_loan(request)`
- `private_post_v5_spot_cross_margin_trade_repay(request)`
- `private_post_v5_spot_cross_margin_trade_switch(request)`
- `private_post_v5_crypto_loan_borrow(request)`
- `private_post_v5_crypto_loan_repay(request)`
- `private_post_v5_crypto_loan_adjust_ltv(request)`
- `private_post_v5_ins_loan_association_uid(request)`
- `private_post_v5_lending_purchase(request)`
- `private_post_v5_lending_redeem(request)`
- `private_post_v5_lending_redeem_cancel(request)`
- `private_post_v5_account_set_collateral_switch(request)`
- `private_post_v5_account_set_collateral_switch_batch(request)`
- `private_post_v5_account_demo_apply_money(request)`
- `private_post_v5_broker_award_info(request)`
- `private_post_v5_broker_award_distribute_award(request)`
- `private_post_v5_broker_award_distribution_record(request)`
- `private_post_v5_earn_place_order(request)`

### WS Unified

- `describe(self)`
- `get_url_by_market_type(self, symbol: Str = None, isPrivate=False, method: Str = None, params={})`
- `clean_params(self, params)`
- `create_order_ws(self, symbol: str, type: OrderType, side: OrderSide, amount: float, price: Num = None, params={})`
- `edit_order_ws(self, id: str, symbol: str, type: OrderType, side: OrderSide, amount: Num = None, price: Num = None, params={})`
- `cancel_order_ws(self, id: str, symbol: Str = None, params={})`
- `watch_ticker(self, symbol: str, params={})`
- `watch_tickers(self, symbols: Strings = None, params={})`
- `un_watch_tickers(self, symbols: Strings = None, params={})`
- `un_watch_ticker(self, symbols: str, params={})`
- `watch_bids_asks(self, symbols: Strings = None, params={})`
- `watch_ohlcv(self, symbol: str, timeframe='1m', since: Int = None, limit: Int = None, params={})`
- `watch_ohlcv_for_symbols(self, symbolsAndTimeframes: List[List[str]], since: Int = None, limit: Int = None, params={})`
- `un_watch_ohlcv_for_symbols(self, symbolsAndTimeframes: List[List[str]], params={})`
- `un_watch_ohlcv(self, symbol: str, timeframe='1m', params={})`
- `watch_order_book(self, symbol: str, limit: Int = None, params={})`
- `watch_order_book_for_symbols(self, symbols: List[str], limit: Int = None, params={})`
- `un_watch_order_book_for_symbols(self, symbols: Strings, params={})`
- `un_watch_order_book(self, symbol: str, params={})`
- `watch_trades(self, symbol: str, since: Int = None, limit: Int = None, params={})`
- `watch_trades_for_symbols(self, symbols: List[str], since: Int = None, limit: Int = None, params={})`
- `un_watch_trades_for_symbols(self, symbols: Strings, params={})`
- `un_watch_trades(self, symbol: str, params={})`
- `get_private_type(self, url)`
- `watch_my_trades(self, symbol: Str = None, since: Int = None, limit: Int = None, params={})`
- `un_watch_my_trades(self, symbol: Str = None, params={})`
- `watch_positions(self, symbols: Strings = None, since: Int = None, limit: Int = None, params={})`
- `set_positions_cache(self, client: Client, symbols: Strings = None)`
- `load_positions_snapshot(self, client, messageHash)`
- `watch_liquidations(self, symbol: str, since: Int = None, limit: Int = None, params={})`
- `watch_orders(self, symbol: Str = None, since: Int = None, limit: Int = None, params={})`
- `un_watch_orders(self, symbol: Str = None, params={})`
- `watch_balance(self, params={})`
- `watch_topics(self, url, messageHashes, topics, params={})`
- `un_watch_topics(self, url: str, topic: str, symbols: List[str], messageHashes: List[str], subMessageHashes: List[str], topics, params={}, subExtension={})`
- `authenticate(self, url, params={})`

## Contribution
- Give us a star :star:
- Fork and Clone! Awesome
- Select existing issues or create a new issue.