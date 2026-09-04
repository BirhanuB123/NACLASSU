declare module '@paypal/checkout-server-sdk' {
  export namespace core {
    export class LiveEnvironment {
      constructor(clientId: string, clientSecret: string);
    }
    export class SandboxEnvironment {
      constructor(clientId: string, clientSecret: string);
    }
    export class PayPalHttpClient {
      constructor(environment: any);
      execute(request: any): Promise<any>;
    }
  }

  export namespace orders {
    export class OrdersCreateRequest {
      prefer(mode: string): void;
      requestBody(body: any): void;
    }
    export class OrdersCaptureRequest {
      constructor(orderId: string);
      requestBody(body?: any): void;
    }
  }

  export namespace payments {
    export class CapturesRefundRequest {
      constructor(captureId: string);
      requestBody(body?: any): void;
    }
  }

  const paypal: any;
  export default paypal;
}
