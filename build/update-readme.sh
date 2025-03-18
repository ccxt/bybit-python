#!/bin/bash

# Define array of exchanges
EXCHANGES=("binance" "kucoin" "coinbase" "kraken" "bybit")

# Create the section content in a variable
SECTION=$'\n## Exchange Repositories\n\n'

# Generate links for each exchange
for exchange in "${EXCHANGES[@]}"; do
  SECTION+="- [python-${exchange}](https://github.com/ccxt/python-${exchange}.git)"$'\n'
done

# Update README with perl (no temp files)
perl -i -0pe "s/## Exchange Repositories.*?(^##|\Z)/$SECTION\$1/ms" README.md || {
  # If section doesn't exist, append it
  echo "$SECTION" >> README.md
}

# Display the changes
cat README.md