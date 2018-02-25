export class Crypto {
  get total_supply(): string {
    return this._total_supply;
  }

  set total_supply(value: string) {
    this._total_supply = value;
  }
  available_supply: string;
  currency: string;
  id: string;
  last_updated: string;
  market_cap_usd: string;
  max_supply: string;
  name: string;
  percent_change_1h: string;
  percent_change_7d: string;
  percent_change_24h: number;
  price_btc: string;
  price_usd: string;
  rank: string;
  symbol: string;
  private _total_supply: string;

  constructor(metadata) {
      this.available_supply = metadata.available_supply;
      this.currency = metadata.currency;
      this.id = metadata.id;
      this.last_updated = metadata.last_updated;
      this.market_cap_usd = metadata.market_cap_usd;
      this.max_supply = metadata.max_supply;
      this.name = metadata.name;
      this.percent_change_1h = metadata.percent_change_1h;
      this.percent_change_7d = metadata.percent_change_7d;
      this.percent_change_24h = metadata.percent_change_24h;
      this.price_btc = metadata.price_btc;
      this.price_usd = metadata.price_usd;
      this.rank = metadata.rank;
      this.symbol = metadata.symbol;
      this.total_supply = metadata.total_supply ;
  }

  public getImage() {
    return '../../assets/icons/' + this.symbol.toLowerCase() + '.png';
  }
}
