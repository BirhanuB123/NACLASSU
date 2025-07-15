declare module '@paypal/checkout-server-sdk' {
  export namespace core {
    export class Environment {
      constructor(clientId: string, clientSecret: string);
    }

    export class LiveEnvironment extends Environment {}
    export class SandboxEnvironment extends Environment {}

    export class PayPalHttpClient {
      constructor(environment: Environment);
      execute<T = any>(request: any): Promise<{
        statusCode: number;
        result: T;
        headers: Record<string, string>;
      }>;
    }
  }

  export namespace orders {
    export class OrdersCreateRequest {
      constructor();
      prefer(preference: string): void;
      requestBody(order: {
        intent: 'CAPTURE' | 'AUTHORIZE';
        purchase_units: Array<{
          amount: {
            currency_code: string;
            value: string;
          };
          description?: string;
        }>;
        application_context?: {
          return_url?: string;
          cancel_url?: string;
        };
      }): void;
    }

    export class OrdersCaptureRequest {
      constructor(orderId: string);
      requestBody(body?: any): void;
    }
  }

  const checkoutNodeJssdk: {
    core: typeof core;
    orders: typeof orders;
  };

  export default checkoutNodeJssdk;
}
