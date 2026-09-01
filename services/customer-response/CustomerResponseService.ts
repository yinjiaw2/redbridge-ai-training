export type CustomerResponseContext = {
  sessionId: string;
  scenarioId: string;
  studentMessage: string;
  conversationHistory: Array<{
    sender: "CUSTOMER" | "STUDENT" | "SYSTEM";
    content: string;
  }>;
};

export type CustomerResponse = { content: string; matchedRule?: string };

export interface CustomerResponseService {
  generateResponse(context: CustomerResponseContext): Promise<CustomerResponse>;
}
