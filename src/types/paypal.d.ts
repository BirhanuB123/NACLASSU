declare module '@paypal/checkout-server-sdk' {
  export class Environment {
    static Sandbox: string;
    static Live: string;
    constructor(webUrl: string, apiUrl: string, clientId: string, clientSecret: string);
  }

  export class PayPalHttpClient {
    constructor(environment: Environment);
    execute<T>(request: any): Promise<{ result: T; statusCode: number; headers: Record<string, string> }>;
  }

  export namespace orders {
    export class OrdersCreateRequest {
      constructor();
      requestBody(paymentData: any): void;
    }

    export class OrdersCaptureRequest {
      constructor(orderId: string);
    }
  }

  export namespace payments {
    export class CapturesRefundRequest {
      constructor(captureId: string);
      requestBody(refundData: any): void;
    }
  }

  export class payments {
    static CapturesRefundRequest: typeof payments.CapturesRefundRequest;
  }

  export const core: {
    PayPalHttpClient: typeof PayPalHttpClient;
  };

  export const core: {
    SandboxEnvironment: typeof Environment;
    LiveEnvironment: typeof Environment;
  };

  export const checkoutNodeJssdk: {
    core: typeof core;
    orders: typeof orders;
    payments: typeof payments;
  };

  export default checkoutNodeJssdk;
}
