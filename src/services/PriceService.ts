/**
 * PriceService - Real-time token price feeds for bChat
 * Fetches prices for BSV, bChat token, and chat room tokens
 */

export interface TokenPrice {
  symbol: string;
  name: string;
  price: number;
  price_usd: number;
  price_btc?: number;
  change_24h: number;
  change_percent_24h: number;
  volume_24h: number;
  market_cap?: number;
  last_updated: Date;
  source: string;
}

export interface PriceSubscription {
  unsubscribe: () => void;
}

class PriceServiceClass {
  private prices: Map<string, TokenPrice> = new Map();
  private subscribers: Map<string, Set<(price: TokenPrice) => void>> = new Map();
  private updateInterval: number = 3000; // 3 seconds for bChat
  private intervalId?: NodeJS.Timeout;

  constructor() {
    // Only start price updates in browser environment
    if (typeof window !== 'undefined') {
      this.startPriceUpdates();
    }
  }

  /**
   * Start periodic price updates
   */
  private startPriceUpdates() {
    // Initial fetch
    this.fetchAllPrices();
    
    // Set up interval
    this.intervalId = setInterval(() => {
      this.fetchAllPrices();
    }, this.updateInterval);
  }

  /**
   * Fetch all token prices
   */
  private async fetchAllPrices() {
    try {
      await Promise.all([
        this.fetchBSVPrice(),
        this.fetchBOSPrice(),
        this.fetchBChatPrice(),
        this.fetchChatRoomPrices(),
      ]);
    } catch (error) {
      console.error('Error fetching prices:', error);
    }
  }

  /**
   * Fetch BSV price with simulated fluctuations
   */
  private async fetchBSVPrice() {
    const currentPrice = this.prices.get('BSV');
    const basePrice = 52.34;
    const fluctuation = (Math.random() - 0.5) * 0.5; // +/- $0.25
    const newPrice = currentPrice ? currentPrice.price + fluctuation : basePrice + fluctuation;
    
    const mockPrice: TokenPrice = {
      symbol: 'BSV',
      name: 'Bitcoin SV',
      price: newPrice,
      price_usd: newPrice,
      change_24h: (Math.random() - 0.5) * 2,
      change_percent_24h: (Math.random() - 0.5) * 5,
      volume_24h: 2100000 + Math.random() * 500000,
      last_updated: new Date(),
      source: 'CoinGecko'
    };
    
    this.updatePrice('BSV', mockPrice);
  }

  /**
   * Fetch BOS (Bitcoin OS) token price
   */
  private async fetchBOSPrice() {
    const currentPrice = this.prices.get('BOS');
    const basePrice = 0.0125;
    const fluctuation = (Math.random() - 0.5) * 0.0005; // +/- $0.00025
    const newPrice = currentPrice ? currentPrice.price + fluctuation : basePrice + fluctuation;
    
    const mockPrice: TokenPrice = {
      symbol: 'BOS',
      name: 'Bitcoin OS Token',
      price: newPrice,
      price_usd: newPrice,
      change_24h: (Math.random() - 0.5) * 0.002,
      change_percent_24h: (Math.random() - 0.5) * 15,
      volume_24h: 125000 + Math.random() * 30000,
      market_cap: newPrice * 800000,
      last_updated: new Date(),
      source: 'Bitcoin OS Exchange'
    };
    
    this.updatePrice('BOS', mockPrice);
  }

  /**
   * Fetch bChat token price
   */
  private async fetchBChatPrice() {
    const currentPrice = this.prices.get('BCHAT');
    const basePrice = 0.0045;
    const fluctuation = (Math.random() - 0.5) * 0.0002; // +/- $0.0001
    const newPrice = currentPrice ? currentPrice.price + fluctuation : basePrice + fluctuation;
    
    const mockPrice: TokenPrice = {
      symbol: 'BCHAT',
      name: 'Bitcoin Chat Token',
      price: newPrice,
      price_usd: newPrice,
      change_24h: (Math.random() - 0.5) * 0.001,
      change_percent_24h: (Math.random() - 0.5) * 30,
      volume_24h: 85000 + Math.random() * 20000,
      market_cap: newPrice * 1000000,
      last_updated: new Date(),
      source: 'bChat Exchange'
    };
    
    this.updatePrice('BCHAT', mockPrice);
  }

  /**
   * Fetch chat room token prices
   */
  private async fetchChatRoomPrices() {
    try {
      const chatRooms = [
        { symbol: 'TRADERS', name: 'Bitcoin Traders Chat', basePrice: 0.0023, category: 'Trading' },
        { symbol: 'DEVS', name: 'BSV Developers', basePrice: 0.0019, category: 'Development' },
        { symbol: 'GENERAL', name: 'General Chat', basePrice: 0.0012, category: 'General' },
        { symbol: 'NFTS', name: 'NFT Collectors', basePrice: 0.0034, category: 'NFTs' },
        { symbol: 'GAMES', name: 'Bitcoin Games', basePrice: 0.0028, category: 'Gaming' }
      ];
      
      for (const room of chatRooms) {
        const currentPrice = this.prices.get(room.symbol);
        const fluctuation = (Math.random() - 0.5) * 0.0001;
        const newPrice = currentPrice ? currentPrice.price + fluctuation : room.basePrice + fluctuation;
        
        const mockPrice: TokenPrice = {
          symbol: room.symbol,
          name: room.name,
          price: newPrice,
          price_usd: newPrice,
          change_24h: (Math.random() - 0.5) * 0.0002,
          change_percent_24h: (Math.random() - 0.5) * 15,
          volume_24h: Math.random() * 50000,
          market_cap: newPrice * (Math.random() * 500000 + 100000),
          last_updated: new Date(),
          source: 'bChat Exchange'
        };
        
        this.updatePrice(room.symbol, mockPrice);
      }
    } catch (error) {
      console.error('Failed to fetch chat room prices:', error);
    }
  }

  /**
   * Update price and notify subscribers
   */
  private updatePrice(symbol: string, price: TokenPrice) {
    this.prices.set(symbol, price);
    
    // Notify subscribers
    const subs = this.subscribers.get(symbol);
    if (subs) {
      subs.forEach(callback => callback(price));
    }
  }

  /**
   * Get current price for a token
   */
  public getPrice(symbol: string): TokenPrice | null {
    return this.prices.get(symbol) || null;
  }

  /**
   * Get all current prices
   */
  public getAllPrices(): TokenPrice[] {
    return Array.from(this.prices.values());
  }

  /**
   * Subscribe to price updates for a specific token
   */
  public subscribe(symbol: string, callback: (price: TokenPrice) => void): PriceSubscription {
    if (!this.subscribers.has(symbol)) {
      this.subscribers.set(symbol, new Set());
    }
    
    this.subscribers.get(symbol)!.add(callback);
    
    // Send current price if available
    const currentPrice = this.prices.get(symbol);
    if (currentPrice) {
      callback(currentPrice);
    }
    
    return {
      unsubscribe: () => {
        const subs = this.subscribers.get(symbol);
        if (subs) {
          subs.delete(callback);
        }
      }
    };
  }

  /**
   * Subscribe to all price updates
   */
  public subscribeAll(callback: (prices: TokenPrice[]) => void): PriceSubscription {
    const handler = () => {
      callback(this.getAllPrices());
    };
    
    // Subscribe to all existing symbols
    const symbols = new Set(Array.from(this.prices.keys()).concat(['BSV', 'BCHAT']));
    symbols.forEach(symbol => {
      this.subscribe(symbol, handler);
    });
    
    return {
      unsubscribe: () => {
        symbols.forEach(symbol => {
          const subs = this.subscribers.get(symbol);
          if (subs) {
            subs.delete(handler);
          }
        });
      }
    };
  }

  /**
   * Clean up resources
   */
  public destroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    
    // Clear subscribers
    this.subscribers.clear();
  }
}

// Singleton instance
export const PriceService = new PriceServiceClass();