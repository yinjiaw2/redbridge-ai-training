import type {
  CustomerResponse,
  CustomerResponseContext,
  CustomerResponseService,
} from "./CustomerResponseService";

export class MockCustomerResponseService implements CustomerResponseService {
  async generateResponse({
    studentMessage,
  }: CustomerResponseContext): Promise<CustomerResponse> {
    const text = studentMessage.toLowerCase();
    const rules = [
      {
        id: "price",
        pattern: /价格|费用|多少钱|cost|price|fee/,
        content: "我比较担心预算。整个流程大概要多少钱？",
      },
      {
        id: "experience",
        pattern: /经验|工作|职位|experience|job/,
        content: "我有大约一年的经验，但不是都在同一家公司。这会影响吗？",
      },
      {
        id: "employer",
        pattern: /雇主|公司|担保|employer|sponsor/,
        content: "我还没有和公司正式谈过担保。你建议我先问 HR 什么？",
      },
      {
        id: "time",
        pattern: /时间|到期|多久|time|month/,
        content: "我的签证只剩九个月，时间会不会太紧？",
      },
    ];
    const match = rules.find((rule) => rule.pattern.test(text));
    return match
      ? { content: match.content, matchedRule: match.id }
      : {
          content: "我不太确定这对我的情况意味着什么，可以再具体解释一下吗？",
          matchedRule: "fallback",
        };
  }
}
