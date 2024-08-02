export interface Customer {
    id: number;
    name: string;
    title: string;
    address: string;
  }
  
  export interface Photo {
    id: string;
    urls: {
      raw: string;
      full: string;
      regular: string;
      small: string;
      thumb: string;
    };
    alt_description: string;
  }