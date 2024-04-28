export interface User {
    userData: {
      name: string;
      email: string;
      age: number;
      localizedData: {
        [key: string]: { description: string };
      };
    }
  }