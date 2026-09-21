import type { Transaction } from "./types";

export const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: "TXN-5C71E1",
    customer: {
      name: "Sara Khelifi",
      phone: "+213 555 654 321",
      isGuest: false
    },
    source: "vtpe",
    terminal: "TEST",
    paymentMethod: "other",
    amount: 10000,
    currency: "DA",
    fee: 200,
    netAmount: 9800,
    status: "successful",
    createdAt: "2026-09-21T19:04:00.000Z",
    completedAt: "2026-09-21T19:05:00.000Z",
    settlement: {
      destination: "balance",
      status: "pending",
      amount: 9800
    },
    refund: {
      status: "not_refunded"
    }
  },
  {
    id: "TXN-6F088A",
    customer: {
      name: "Guest customer",
      isGuest: true
    },
    source: "qr",
    terminal: null,
    paymentMethod: "wallet",
    amount: 1500,
    currency: "DA",
    fee: 30,
    netAmount: 1470,
    status: "successful",
    createdAt: "2026-09-21T11:14:00.000Z",
    completedAt: "2026-09-21T11:15:00.000Z",
    settlement: {
      destination: "bank_account",
      status: "pending",
      amount: 1470
    },
    refund: {
      status: "not_refunded"
    }
  },
  {
    id: "TXN-372344",
    customer: {
      name: "Guest customer",
      isGuest: true
    },
    source: "api",
    terminal: null,
    paymentMethod: "wallet",
    amount: 5000,
    currency: "DA",
    fee: 100,
    netAmount: 4900,
    status: "successful",
    createdAt: "2026-09-21T10:43:00.000Z",
    completedAt: "2026-09-21T10:44:00.000Z",
    settlement: {
      destination: "balance",
      status: "pending",
      amount: 4900
    },
    refund: {
      status: "not_refunded"
    }
  },
  {
    id: "TXN-2AFF33",
    customer: {
      name: "Fethi Dahmani",
      phone: "+213 555 333 444",
      isGuest: false
    },
    source: "qr",
    terminal: null,
    paymentMethod: "edahabia",
    amount: 1500,
    currency: "DA",
    fee: 30,
    netAmount: 1470,
    status: "successful",
    createdAt: "2026-09-21T10:39:00.000Z",
    completedAt: "2026-09-21T10:40:00.000Z",
    settlement: {
      destination: "bank_account",
      status: "pending",
      amount: 1470
    },
    refund: {
      status: "not_refunded"
    }
  },
  {
    id: "TXN-3A8D23",
    customer: {
      name: "Fethi Dahmani",
      phone: "+213 555 333 444",
      isGuest: false
    },
    source: "qr",
    terminal: null,
    paymentMethod: "bank_transfer",
    amount: 2200,
    currency: "DA",
    fee: 44,
    netAmount: 2156,
    status: "successful",
    createdAt: "2026-09-20T16:21:00.000Z",
    completedAt: "2026-09-20T16:22:00.000Z",
    settlement: {
      destination: "balance",
      status: "pending",
      amount: 2156
    },
    refund: {
      status: "not_refunded"
    }
  },
  {
    id: "TXN-C79A9A",
    customer: {
      name: "Karim Aitouche",
      phone: "+213 555 999 000",
      isGuest: false
    },
    source: "qr",
    terminal: null,
    paymentMethod: "wallet",
    amount: 6700,
    currency: "DA",
    fee: 134,
    netAmount: 6566,
    status: "pending",
    createdAt: "2026-09-20T13:34:00.000Z",
    completedAt: null,
    settlement: {
      destination: "balance",
      status: "not_applicable"
    },
    refund: {
      status: "not_refunded"
    }
  },
  {
    id: "TXN-CA222B",
    customer: {
      name: "Fethi Dahmani",
      phone: "+213 555 333 444",
      isGuest: false
    },
    source: "payment_link",
    terminal: null,
    paymentMethod: "edahabia",
    amount: 4500,
    currency: "DA",
    fee: null,
    netAmount: null,
    status: "refunded",
    createdAt: "2026-09-20T12:08:00.000Z",
    completedAt: "2026-09-20T12:09:00.000Z",
    settlement: {
      destination: "bank_account",
      status: "not_applicable"
    },
    refund: {
      status: "refunded",
      amount: 4500,
      requestedAt: "2026-09-20T12:13:00.000Z",
      completedAt: "2026-09-21T12:18:00.000Z",
      reference: "RF-CA222B"
    }
  },
  {
    id: "TXN-BD3CC9",
    customer: {
      name: "Karim Aitouche",
      phone: "+213 555 999 000",
      isGuest: false
    },
    source: "vtpe",
    terminal: "RERE",
    paymentMethod: "cib",
    amount: 15000,
    currency: "DA",
    fee: 300,
    netAmount: 14700,
    status: "successful",
    createdAt: "2026-09-20T09:42:00.000Z",
    completedAt: "2026-09-20T09:43:00.000Z",
    settlement: {
      destination: "balance",
      status: "pending",
      amount: 14700
    },
    refund: {
      status: "not_refunded"
    }
  },
  {
    id: "TXN-C4BDF9",
    customer: {
      name: "Omar Belkacem",
      phone: "+213 555 111 222",
      isGuest: false
    },
    source: "payment_link",
    terminal: null,
    paymentMethod: "wallet",
    amount: 2500,
    currency: "DA",
    fee: null,
    netAmount: null,
    status: "refund_processing",
    createdAt: "2026-09-15T17:23:00.000Z",
    completedAt: "2026-09-15T17:24:00.000Z",
    settlement: {
      destination: "balance",
      status: "not_applicable"
    },
    refund: {
      status: "processing",
      amount: 2500,
      requestedAt: "2026-09-15T17:28:00.000Z"
    }
  },
  {
    id: "TXN-D3983A",
    customer: {
      name: "Imane Cherif",
      phone: "+213 555 888 999",
      isGuest: false
    },
    source: "qr",
    terminal: null,
    paymentMethod: "bank_transfer",
    amount: 12000,
    currency: "DA",
    fee: 240,
    netAmount: 11760,
    status: "successful",
    createdAt: "2026-09-14T08:13:00.000Z",
    completedAt: "2026-09-14T08:14:00.000Z",
    settlement: {
      destination: "balance",
      status: "settled",
      amount: 11760,
      settledAt: "2026-09-15T09:00:00.000Z"
    },
    refund: {
      status: "not_refunded"
    }
  },
  {
    id: "TXN-197716",
    customer: {
      name: "Mohamed Ali",
      phone: "+213 555 444 333",
      isGuest: false
    },
    source: "vtpe",
    terminal: "Constantine",
    paymentMethod: "cib",
    amount: 18500,
    currency: "DA",
    fee: null,
    netAmount: null,
    status: "successful",
    createdAt: "2026-09-13T15:25:00.000Z",
    completedAt: "2026-09-13T15:26:00.000Z",
    settlement: {
      destination: "balance",
      status: "settled",
      amount: 18500,
      settledAt: "2026-09-14T09:00:00.000Z"
    },
    refund: {
      status: "not_refunded"
    }
  },
  {
    id: "TXN-7B4722",
    customer: {
      name: "Yacine Mezhoud",
      phone: "+213 555 987 654",
      isGuest: false
    },
    source: "api",
    terminal: null,
    paymentMethod: "cib",
    amount: 2200,
    currency: "DA",
    fee: 44,
    netAmount: 2156,
    status: "successful",
    createdAt: "2026-09-13T15:22:00.000Z",
    completedAt: "2026-09-13T15:23:00.000Z",
    settlement: {
      destination: "balance",
      status: "settled",
      amount: 2156,
      settledAt: "2026-09-14T09:00:00.000Z"
    },
    refund: {
      status: "not_refunded"
    }
  },
  {
    id: "TXN-3E06AC",
    customer: {
      name: "Imane Cherif",
      phone: "+213 555 888 999",
      isGuest: false
    },
    source: "api",
    terminal: null,
    paymentMethod: "wallet",
    amount: 22000,
    currency: "DA",
    fee: 440,
    netAmount: 21560,
    status: "successful",
    createdAt: "2026-09-12T18:46:00.000Z",
    completedAt: "2026-09-12T18:47:00.000Z",
    settlement: {
      destination: "bank_account",
      status: "settled",
      amount: 21560,
      settledAt: "2026-09-13T09:00:00.000Z"
    },
    refund: {
      status: "not_refunded"
    }
  },
  {
    id: "TXN-8D7B2A",
    customer: {
      name: "Nadia Ziani",
      phone: "+213 555 777 888",
      isGuest: false
    },
    source: "qr",
    terminal: null,
    paymentMethod: "cib",
    amount: 18500,
    currency: "DA",
    fee: 370,
    netAmount: 18130,
    status: "successful",
    createdAt: "2026-09-11T13:16:00.000Z",
    completedAt: "2026-09-11T13:17:00.000Z",
    settlement: {
      destination: "bank_account",
      status: "settled",
      amount: 18130,
      settledAt: "2026-09-12T09:00:00.000Z"
    },
    refund: {
      status: "not_refunded"
    }
  },
  {
    id: "TXN-F67F5F",
    customer: {
      name: "Ahmed Benali",
      phone: "+213 555 123 456",
      isGuest: false
    },
    source: "payment_link",
    terminal: null,
    paymentMethod: "other",
    amount: 2500,
    currency: "DA",
    fee: 50,
    netAmount: 2450,
    status: "refunded",
    createdAt: "2026-09-10T10:34:00.000Z",
    completedAt: "2026-09-10T10:35:00.000Z",
    settlement: {
      destination: "balance",
      status: "not_applicable"
    },
    refund: {
      status: "refunded",
      amount: 2500,
      requestedAt: "2026-09-10T10:39:00.000Z",
      completedAt: "2026-09-11T10:44:00.000Z",
      reference: "RF-F67F5F"
    }
  },
  {
    id: "TXN-10D912",
    customer: {
      name: "Guest customer",
      isGuest: true
    },
    source: "payment_link",
    terminal: null,
    paymentMethod: "cib",
    amount: 1500,
    currency: "DA",
    fee: 30,
    netAmount: 1470,
    status: "refund_processing",
    createdAt: "2026-09-09T17:02:00.000Z",
    completedAt: "2026-09-09T17:03:00.000Z",
    settlement: {
      destination: "balance",
      status: "not_applicable"
    },
    refund: {
      status: "processing",
      amount: 1500,
      requestedAt: "2026-09-09T17:07:00.000Z"
    }
  },
  {
    id: "TXN-DA4260",
    customer: {
      name: "Guest customer",
      isGuest: true
    },
    source: "vtpe",
    terminal: "Constantine",
    paymentMethod: "cib",
    amount: 22000,
    currency: "DA",
    fee: 440,
    netAmount: 21560,
    status: "successful",
    createdAt: "2026-09-04T19:52:00.000Z",
    completedAt: "2026-09-04T19:53:00.000Z",
    settlement: {
      destination: "balance",
      status: "settled",
      amount: 21560,
      settledAt: "2026-09-05T09:00:00.000Z"
    },
    refund: {
      status: "not_refunded"
    }
  },
  {
    id: "TXN-9C874B",
    customer: {
      name: "Guest customer",
      isGuest: true
    },
    source: "api",
    terminal: null,
    paymentMethod: "cib",
    amount: 3800,
    currency: "DA",
    fee: 76,
    netAmount: 3724,
    status: "successful",
    createdAt: "2026-09-03T17:18:00.000Z",
    completedAt: "2026-09-03T17:19:00.000Z",
    settlement: {
      destination: "balance",
      status: "settled",
      amount: 3724,
      settledAt: "2026-09-04T09:00:00.000Z"
    },
    refund: {
      status: "not_refunded"
    }
  },
  {
    id: "TXN-931D4E",
    customer: {
      name: "Guest customer",
      isGuest: true
    },
    source: "qr",
    terminal: null,
    paymentMethod: "wallet",
    amount: 1500,
    currency: "DA",
    fee: 30,
    netAmount: 1470,
    status: "successful",
    createdAt: "2026-09-01T18:07:00.000Z",
    completedAt: "2026-09-01T18:08:00.000Z",
    settlement: {
      destination: "bank_account",
      status: "settled",
      amount: 1470,
      settledAt: "2026-09-02T09:00:00.000Z"
    },
    refund: {
      status: "not_refunded"
    }
  },
  {
    id: "TXN-60624A",
    customer: {
      name: "Guest customer",
      isGuest: true
    },
    source: "vtpe",
    terminal: "TEST",
    paymentMethod: "wallet",
    amount: 15000,
    currency: "DA",
    fee: 300,
    netAmount: 14700,
    status: "pending",
    createdAt: "2026-09-01T13:03:00.000Z",
    completedAt: null,
    settlement: {
      destination: "bank_account",
      status: "not_applicable"
    },
    refund: {
      status: "not_refunded"
    }
  },
  {
    id: "TXN-A4BECC",
    customer: {
      name: "Guest customer",
      isGuest: true
    },
    source: "vtpe",
    terminal: "TEST",
    paymentMethod: "bank_transfer",
    amount: 12000,
    currency: "DA",
    fee: 240,
    netAmount: 11760,
    status: "successful",
    createdAt: "2026-08-28T10:49:00.000Z",
    completedAt: "2026-08-28T10:50:00.000Z",
    settlement: {
      destination: "balance",
      status: "settled",
      amount: 11760,
      settledAt: "2026-08-29T09:00:00.000Z"
    },
    refund: {
      status: "not_refunded"
    }
  },
  {
    id: "TXN-DEB33E",
    customer: {
      name: "Sara Khelifi",
      phone: "+213 555 654 321",
      isGuest: false
    },
    source: "vtpe",
    terminal: "RERE",
    paymentMethod: "bank_transfer",
    amount: 18500,
    currency: "DA",
    fee: 370,
    netAmount: 18130,
    status: "successful",
    createdAt: "2026-08-27T19:29:00.000Z",
    completedAt: "2026-08-27T19:30:00.000Z",
    settlement: {
      destination: "balance",
      status: "settled",
      amount: 18130,
      settledAt: "2026-08-28T09:00:00.000Z"
    },
    refund: {
      status: "not_refunded"
    }
  },
  {
    id: "TXN-F2D67D",
    customer: {
      name: "Sarah Karim",
      phone: "+213 555 222 111",
      isGuest: false
    },
    source: "vtpe",
    terminal: "Oran Store",
    paymentMethod: "edahabia",
    amount: 4500,
    currency: "DA",
    fee: 90,
    netAmount: 4410,
    status: "successful",
    createdAt: "2026-08-26T17:32:00.000Z",
    completedAt: "2026-08-26T17:33:00.000Z",
    settlement: {
      destination: "balance",
      status: "settled",
      amount: 4410,
      settledAt: "2026-08-27T09:00:00.000Z"
    },
    refund: {
      status: "not_refunded"
    }
  },
  {
    id: "TXN-E33064",
    customer: {
      name: "Omar Belkacem",
      phone: "+213 555 111 222",
      isGuest: false
    },
    source: "api",
    terminal: null,
    paymentMethod: "cib",
    amount: 18500,
    currency: "DA",
    fee: 370,
    netAmount: 18130,
    status: "successful",
    createdAt: "2026-08-24T17:35:00.000Z",
    completedAt: "2026-08-24T17:36:00.000Z",
    settlement: {
      destination: "balance",
      status: "settled",
      amount: 18130,
      settledAt: "2026-08-25T09:00:00.000Z"
    },
    refund: {
      status: "not_refunded"
    }
  },
  {
    id: "TXN-351460",
    customer: {
      name: "Leila Boudjema",
      phone: "+213 555 234 567",
      isGuest: false
    },
    source: "payment_link",
    terminal: null,
    paymentMethod: "edahabia",
    amount: 3800,
    currency: "DA",
    fee: 76,
    netAmount: 3724,
    status: "successful",
    createdAt: "2026-08-24T08:40:00.000Z",
    completedAt: "2026-08-24T08:41:00.000Z",
    settlement: {
      destination: "bank_account",
      status: "settled",
      amount: 3724,
      settledAt: "2026-08-25T09:00:00.000Z"
    },
    refund: {
      status: "not_refunded"
    }
  },
  {
    id: "TXN-79605C",
    customer: {
      name: "Nadia Ziani",
      phone: "+213 555 777 888",
      isGuest: false
    },
    source: "api",
    terminal: null,
    paymentMethod: "edahabia",
    amount: 3800,
    currency: "DA",
    fee: 76,
    netAmount: 3724,
    status: "refund_processing",
    createdAt: "2026-08-21T08:16:00.000Z",
    completedAt: "2026-08-21T08:17:00.000Z",
    settlement: {
      destination: "balance",
      status: "not_applicable"
    },
    refund: {
      status: "processing",
      amount: 3800,
      requestedAt: "2026-08-21T08:21:00.000Z"
    }
  },
  {
    id: "TXN-C781A9",
    customer: {
      name: "Nadia Ziani",
      phone: "+213 555 777 888",
      isGuest: false
    },
    source: "vtpe",
    terminal: "Algiers Center",
    paymentMethod: "wallet",
    amount: 15000,
    currency: "DA",
    fee: 300,
    netAmount: 14700,
    status: "successful",
    createdAt: "2026-08-20T16:52:00.000Z",
    completedAt: "2026-08-20T16:53:00.000Z",
    settlement: {
      destination: "bank_account",
      status: "settled",
      amount: 14700,
      settledAt: "2026-08-21T09:00:00.000Z"
    },
    refund: {
      status: "not_refunded"
    }
  },
  {
    id: "TXN-67EDEC",
    customer: {
      name: "Omar Belkacem",
      phone: "+213 555 111 222",
      isGuest: false
    },
    source: "payment_link",
    terminal: null,
    paymentMethod: "wallet",
    amount: 2200,
    currency: "DA",
    fee: 44,
    netAmount: 2156,
    status: "successful",
    createdAt: "2026-08-20T13:31:00.000Z",
    completedAt: "2026-08-20T13:32:00.000Z",
    settlement: {
      destination: "balance",
      status: "settled",
      amount: 2156,
      settledAt: "2026-08-21T09:00:00.000Z"
    },
    refund: {
      status: "not_refunded"
    }
  },
  {
    id: "TXN-8EEDEA",
    customer: {
      name: "Sarah Karim",
      phone: "+213 555 222 111",
      isGuest: false
    },
    source: "api",
    terminal: null,
    paymentMethod: "wallet",
    amount: 6700,
    currency: "DA",
    fee: 134,
    netAmount: 6566,
    status: "successful",
    createdAt: "2026-08-18T13:59:00.000Z",
    completedAt: "2026-08-18T13:59:00.000Z",
    settlement: {
      destination: "balance",
      status: "settled",
      amount: 6566,
      settledAt: "2026-08-19T09:00:00.000Z"
    },
    refund: {
      status: "not_refunded"
    }
  },
  {
    id: "TXN-553211",
    customer: {
      name: "Mohamed Ali",
      phone: "+213 555 444 333",
      isGuest: false
    },
    source: "api",
    terminal: null,
    paymentMethod: "wallet",
    amount: 8000,
    currency: "DA",
    fee: 160,
    netAmount: 7840,
    status: "successful",
    createdAt: "2026-08-17T19:15:00.000Z",
    completedAt: "2026-08-17T19:16:00.000Z",
    settlement: {
      destination: "balance",
      status: "settled",
      amount: 7840,
      settledAt: "2026-08-18T09:00:00.000Z"
    },
    refund: {
      status: "not_refunded"
    }
  },
  {
    id: "TXN-72B341",
    customer: {
      name: "Ahmed Benali",
      phone: "+213 555 123 456",
      isGuest: false
    },
    source: "vtpe",
    terminal: "Store Downtown",
    paymentMethod: "cib",
    amount: 3800,
    currency: "DA",
    fee: 76,
    netAmount: 3724,
    status: "failed",
    createdAt: "2026-08-16T09:51:00.000Z",
    completedAt: null,
    settlement: {
      destination: "balance",
      status: "not_applicable"
    },
    refund: {
      status: "not_refunded"
    }
  },
  {
    id: "TXN-74FE8A",
    customer: {
      name: "Nadia Ziani",
      phone: "+213 555 777 888",
      isGuest: false
    },
    source: "qr",
    terminal: null,
    paymentMethod: "wallet",
    amount: 3800,
    currency: "DA",
    fee: 76,
    netAmount: 3724,
    status: "successful",
    createdAt: "2026-08-11T19:28:00.000Z",
    completedAt: "2026-08-11T19:29:00.000Z",
    settlement: {
      destination: "balance",
      status: "settled",
      amount: 3724,
      settledAt: "2026-08-12T09:00:00.000Z"
    },
    refund: {
      status: "not_refunded"
    }
  },
  {
    id: "TXN-851386",
    customer: {
      name: "Asma Lamali",
      phone: "+213 555 666 777",
      isGuest: false
    },
    source: "api",
    terminal: null,
    paymentMethod: "cib",
    amount: 12000,
    currency: "DA",
    fee: null,
    netAmount: null,
    status: "pending",
    createdAt: "2026-08-11T14:49:00.000Z",
    completedAt: null,
    settlement: {
      destination: "balance",
      status: "not_applicable"
    },
    refund: {
      status: "not_refunded"
    }
  },
  {
    id: "TXN-283DB2",
    customer: {
      name: "Nadia Ziani",
      phone: "+213 555 777 888",
      isGuest: false
    },
    source: "payment_link",
    terminal: null,
    paymentMethod: "wallet",
    amount: 5000,
    currency: "DA",
    fee: 100,
    netAmount: 4900,
    status: "successful",
    createdAt: "2026-08-11T10:17:00.000Z",
    completedAt: "2026-08-11T10:18:00.000Z",
    settlement: {
      destination: "balance",
      status: "settled",
      amount: 4900,
      settledAt: "2026-08-12T09:00:00.000Z"
    },
    refund: {
      status: "not_refunded"
    }
  },
  {
    id: "TXN-4B39AF",
    customer: {
      name: "Fethi Dahmani",
      phone: "+213 555 333 444",
      isGuest: false
    },
    source: "vtpe",
    terminal: "Oran Store",
    paymentMethod: "bank_transfer",
    amount: 15000,
    currency: "DA",
    fee: 300,
    netAmount: 14700,
    status: "failed",
    createdAt: "2026-08-10T18:50:00.000Z",
    completedAt: null,
    settlement: {
      destination: "bank_account",
      status: "not_applicable"
    },
    refund: {
      status: "not_refunded"
    }
  },
  {
    id: "TXN-C27DEE",
    customer: {
      name: "Ahmed Benali",
      phone: "+213 555 123 456",
      isGuest: false
    },
    source: "payment_link",
    terminal: null,
    paymentMethod: "cib",
    amount: 6700,
    currency: "DA",
    fee: 134,
    netAmount: 6566,
    status: "pending",
    createdAt: "2026-08-09T15:48:00.000Z",
    completedAt: null,
    settlement: {
      destination: "bank_account",
      status: "not_applicable"
    },
    refund: {
      status: "not_refunded"
    }
  },
  {
    id: "TXN-D2A54D",
    customer: {
      name: "Imane Cherif",
      phone: "+213 555 888 999",
      isGuest: false
    },
    source: "payment_link",
    terminal: null,
    paymentMethod: "edahabia",
    amount: 15000,
    currency: "DA",
    fee: 300,
    netAmount: 14700,
    status: "successful",
    createdAt: "2026-08-08T14:18:00.000Z",
    completedAt: "2026-08-08T14:19:00.000Z",
    settlement: {
      destination: "balance",
      status: "settled",
      amount: 14700,
      settledAt: "2026-08-09T09:00:00.000Z"
    },
    refund: {
      status: "not_refunded"
    }
  },
  {
    id: "TXN-1D617D",
    customer: {
      name: "Sarah Karim",
      phone: "+213 555 222 111",
      isGuest: false
    },
    source: "vtpe",
    terminal: "Store Downtown",
    paymentMethod: "edahabia",
    amount: 8000,
    currency: "DA",
    fee: 160,
    netAmount: 7840,
    status: "successful",
    createdAt: "2026-08-07T16:59:00.000Z",
    completedAt: "2026-08-07T16:59:00.000Z",
    settlement: {
      destination: "bank_account",
      status: "settled",
      amount: 7840,
      settledAt: "2026-08-08T09:00:00.000Z"
    },
    refund: {
      status: "not_refunded"
    }
  },
  {
    id: "TXN-6FDA76",
    customer: {
      name: "Sarah Karim",
      phone: "+213 555 222 111",
      isGuest: false
    },
    source: "qr",
    terminal: null,
    paymentMethod: "cib",
    amount: 2500,
    currency: "DA",
    fee: 50,
    netAmount: 2450,
    status: "successful",
    createdAt: "2026-08-06T19:57:00.000Z",
    completedAt: "2026-08-06T19:58:00.000Z",
    settlement: {
      destination: "balance",
      status: "settled",
      amount: 2450,
      settledAt: "2026-08-07T09:00:00.000Z"
    },
    refund: {
      status: "not_refunded"
    }
  },
  {
    id: "TXN-CA0267",
    customer: {
      name: "Leila Boudjema",
      phone: "+213 555 234 567",
      isGuest: false
    },
    source: "payment_link",
    terminal: null,
    paymentMethod: "cib",
    amount: 4500,
    currency: "DA",
    fee: 90,
    netAmount: 4410,
    status: "pending",
    createdAt: "2026-08-06T18:13:00.000Z",
    completedAt: null,
    settlement: {
      destination: "balance",
      status: "not_applicable"
    },
    refund: {
      status: "not_refunded"
    }
  },
  {
    id: "TXN-791EAF",
    customer: {
      name: "Guest customer",
      isGuest: true
    },
    source: "qr",
    terminal: null,
    paymentMethod: "wallet",
    amount: 12000,
    currency: "DA",
    fee: 240,
    netAmount: 11760,
    status: "successful",
    createdAt: "2026-08-03T18:18:00.000Z",
    completedAt: "2026-08-03T18:19:00.000Z",
    settlement: {
      destination: "balance",
      status: "settled",
      amount: 11760,
      settledAt: "2026-08-04T09:00:00.000Z"
    },
    refund: {
      status: "not_refunded"
    }
  },
  {
    id: "TXN-BF910A",
    customer: {
      name: "Asma Lamali",
      phone: "+213 555 666 777",
      isGuest: false
    },
    source: "api",
    terminal: null,
    paymentMethod: "cib",
    amount: 8000,
    currency: "DA",
    fee: 160,
    netAmount: 7840,
    status: "refunded",
    createdAt: "2026-08-02T14:00:00.000Z",
    completedAt: "2026-08-02T14:01:00.000Z",
    settlement: {
      destination: "balance",
      status: "not_applicable"
    },
    refund: {
      status: "refunded",
      amount: 8000,
      requestedAt: "2026-08-02T14:05:00.000Z",
      completedAt: "2026-08-03T14:10:00.000Z",
      reference: "RF-BF910A"
    }
  },
  {
    id: "TXN-D0F409",
    customer: {
      name: "Omar Belkacem",
      phone: "+213 555 111 222",
      isGuest: false
    },
    source: "vtpe",
    terminal: "Constantine",
    paymentMethod: "cib",
    amount: 18500,
    currency: "DA",
    fee: 370,
    netAmount: 18130,
    status: "successful",
    createdAt: "2026-08-01T19:52:00.000Z",
    completedAt: "2026-08-01T19:53:00.000Z",
    settlement: {
      destination: "balance",
      status: "settled",
      amount: 18130,
      settledAt: "2026-08-02T09:00:00.000Z"
    },
    refund: {
      status: "not_refunded"
    }
  },
  {
    id: "TXN-6075AB",
    customer: {
      name: "Imane Cherif",
      phone: "+213 555 888 999",
      isGuest: false
    },
    source: "payment_link",
    terminal: null,
    paymentMethod: "wallet",
    amount: 3800,
    currency: "DA",
    fee: 76,
    netAmount: 3724,
    status: "failed",
    createdAt: "2026-08-01T15:05:00.000Z",
    completedAt: null,
    settlement: {
      destination: "balance",
      status: "not_applicable"
    },
    refund: {
      status: "not_refunded"
    }
  },
  {
    id: "TXN-3DB2EB",
    customer: {
      name: "Asma Lamali",
      phone: "+213 555 666 777",
      isGuest: false
    },
    source: "payment_link",
    terminal: null,
    paymentMethod: "cib",
    amount: 10000,
    currency: "DA",
    fee: 200,
    netAmount: 9800,
    status: "successful",
    createdAt: "2026-08-01T14:29:00.000Z",
    completedAt: "2026-08-01T14:30:00.000Z",
    settlement: {
      destination: "bank_account",
      status: "settled",
      amount: 9800,
      settledAt: "2026-08-02T09:00:00.000Z"
    },
    refund: {
      status: "not_refunded"
    }
  },
  {
    id: "TXN-88EC5F",
    customer: {
      name: "Sara Khelifi",
      phone: "+213 555 654 321",
      isGuest: false
    },
    source: "api",
    terminal: null,
    paymentMethod: "wallet",
    amount: 22000,
    currency: "DA",
    fee: 440,
    netAmount: 21560,
    status: "successful",
    createdAt: "2026-07-31T14:55:00.000Z",
    completedAt: "2026-07-31T14:56:00.000Z",
    settlement: {
      destination: "bank_account",
      status: "settled",
      amount: 21560,
      settledAt: "2026-08-01T09:00:00.000Z"
    },
    refund: {
      status: "not_refunded"
    }
  },
  {
    id: "TXN-EE4BC0",
    customer: {
      name: "Leila Boudjema",
      phone: "+213 555 234 567",
      isGuest: false
    },
    source: "api",
    terminal: null,
    paymentMethod: "wallet",
    amount: 8000,
    currency: "DA",
    fee: 160,
    netAmount: 7840,
    status: "successful",
    createdAt: "2026-07-31T10:37:00.000Z",
    completedAt: "2026-07-31T10:38:00.000Z",
    settlement: {
      destination: "bank_account",
      status: "settled",
      amount: 7840,
      settledAt: "2026-08-01T09:00:00.000Z"
    },
    refund: {
      status: "not_refunded"
    }
  },
  {
    id: "TXN-DC18B6",
    customer: {
      name: "Ahmed Benali",
      phone: "+213 555 123 456",
      isGuest: false
    },
    source: "api",
    terminal: null,
    paymentMethod: "wallet",
    amount: 2500,
    currency: "DA",
    fee: 50,
    netAmount: 2450,
    status: "successful",
    createdAt: "2026-07-30T20:37:00.000Z",
    completedAt: "2026-07-30T20:38:00.000Z",
    settlement: {
      destination: "balance",
      status: "settled",
      amount: 2450,
      settledAt: "2026-07-31T09:00:00.000Z"
    },
    refund: {
      status: "not_refunded"
    }
  },
  {
    id: "TXN-330672",
    customer: {
      name: "Yacine Mezhoud",
      phone: "+213 555 987 654",
      isGuest: false
    },
    source: "qr",
    terminal: null,
    paymentMethod: "wallet",
    amount: 2500,
    currency: "DA",
    fee: 50,
    netAmount: 2450,
    status: "successful",
    createdAt: "2026-07-29T13:12:00.000Z",
    completedAt: "2026-07-29T13:13:00.000Z",
    settlement: {
      destination: "balance",
      status: "settled",
      amount: 2450,
      settledAt: "2026-07-30T09:00:00.000Z"
    },
    refund: {
      status: "not_refunded"
    }
  },
  {
    id: "TXN-E93A13",
    customer: {
      name: "Ahmed Benali",
      phone: "+213 555 123 456",
      isGuest: false
    },
    source: "qr",
    terminal: null,
    paymentMethod: "bank_transfer",
    amount: 5000,
    currency: "DA",
    fee: 100,
    netAmount: 4900,
    status: "successful",
    createdAt: "2026-07-28T20:39:00.000Z",
    completedAt: "2026-07-28T20:40:00.000Z",
    settlement: {
      destination: "balance",
      status: "settled",
      amount: 4900,
      settledAt: "2026-07-29T09:00:00.000Z"
    },
    refund: {
      status: "not_refunded"
    }
  },
  {
    id: "TXN-C39300",
    customer: {
      name: "Guest customer",
      isGuest: true
    },
    source: "payment_link",
    terminal: null,
    paymentMethod: "edahabia",
    amount: 6700,
    currency: "DA",
    fee: 134,
    netAmount: 6566,
    status: "successful",
    createdAt: "2026-07-28T20:31:00.000Z",
    completedAt: "2026-07-28T20:32:00.000Z",
    settlement: {
      destination: "bank_account",
      status: "settled",
      amount: 6566,
      settledAt: "2026-07-29T09:00:00.000Z"
    },
    refund: {
      status: "not_refunded"
    }
  },
  {
    id: "TXN-A516E4",
    customer: {
      name: "Asma Lamali",
      phone: "+213 555 666 777",
      isGuest: false
    },
    source: "payment_link",
    terminal: null,
    paymentMethod: "cib",
    amount: 22000,
    currency: "DA",
    fee: null,
    netAmount: null,
    status: "successful",
    createdAt: "2026-07-26T19:48:00.000Z",
    completedAt: "2026-07-26T19:49:00.000Z",
    settlement: {
      destination: "balance",
      status: "settled",
      amount: 22000,
      settledAt: "2026-07-27T09:00:00.000Z"
    },
    refund: {
      status: "not_refunded"
    }
  },
  {
    id: "TXN-6DFF35",
    customer: {
      name: "Karim Aitouche",
      phone: "+213 555 999 000",
      isGuest: false
    },
    source: "qr",
    terminal: null,
    paymentMethod: "edahabia",
    amount: 18500,
    currency: "DA",
    fee: 370,
    netAmount: 18130,
    status: "successful",
    createdAt: "2026-07-25T20:50:00.000Z",
    completedAt: "2026-07-25T20:51:00.000Z",
    settlement: {
      destination: "balance",
      status: "settled",
      amount: 18130,
      settledAt: "2026-07-26T09:00:00.000Z"
    },
    refund: {
      status: "not_refunded"
    }
  },
  {
    id: "TXN-7440A3",
    customer: {
      name: "Karim Aitouche",
      phone: "+213 555 999 000",
      isGuest: false
    },
    source: "vtpe",
    terminal: "Store Downtown",
    paymentMethod: "wallet",
    amount: 22000,
    currency: "DA",
    fee: 440,
    netAmount: 21560,
    status: "successful",
    createdAt: "2026-07-25T13:13:00.000Z",
    completedAt: "2026-07-25T13:14:00.000Z",
    settlement: {
      destination: "balance",
      status: "settled",
      amount: 21560,
      settledAt: "2026-07-26T09:00:00.000Z"
    },
    refund: {
      status: "not_refunded"
    }
  },
  {
    id: "TXN-7F182C",
    customer: {
      name: "Fethi Dahmani",
      phone: "+213 555 333 444",
      isGuest: false
    },
    source: "vtpe",
    terminal: "Oran Store",
    paymentMethod: "edahabia",
    amount: 12000,
    currency: "DA",
    fee: 240,
    netAmount: 11760,
    status: "successful",
    createdAt: "2026-07-24T20:13:00.000Z",
    completedAt: "2026-07-24T20:14:00.000Z",
    settlement: {
      destination: "bank_account",
      status: "settled",
      amount: 11760,
      settledAt: "2026-07-25T09:00:00.000Z"
    },
    refund: {
      status: "not_refunded"
    }
  },
  {
    id: "TXN-4459FA",
    customer: {
      name: "Guest customer",
      isGuest: true
    },
    source: "api",
    terminal: null,
    paymentMethod: "cib",
    amount: 1500,
    currency: "DA",
    fee: 30,
    netAmount: 1470,
    status: "failed",
    createdAt: "2026-07-24T11:53:00.000Z",
    completedAt: null,
    settlement: {
      destination: "bank_account",
      status: "not_applicable"
    },
    refund: {
      status: "not_refunded"
    }
  },
  {
    id: "TXN-5ADD74",
    customer: {
      name: "Yacine Mezhoud",
      phone: "+213 555 987 654",
      isGuest: false
    },
    source: "vtpe",
    terminal: "Store Downtown",
    paymentMethod: "wallet",
    amount: 6700,
    currency: "DA",
    fee: 134,
    netAmount: 6566,
    status: "successful",
    createdAt: "2026-07-23T18:51:00.000Z",
    completedAt: "2026-07-23T18:52:00.000Z",
    settlement: {
      destination: "bank_account",
      status: "settled",
      amount: 6566,
      settledAt: "2026-07-24T09:00:00.000Z"
    },
    refund: {
      status: "not_refunded"
    }
  },
  {
    id: "TXN-B31CD5",
    customer: {
      name: "Nadia Ziani",
      phone: "+213 555 777 888",
      isGuest: false
    },
    source: "api",
    terminal: null,
    paymentMethod: "wallet",
    amount: 4500,
    currency: "DA",
    fee: 90,
    netAmount: 4410,
    status: "failed",
    createdAt: "2026-07-22T10:30:00.000Z",
    completedAt: null,
    settlement: {
      destination: "balance",
      status: "not_applicable"
    },
    refund: {
      status: "not_refunded"
    }
  },
  {
    id: "TXN-1044FE",
    customer: {
      name: "Leila Boudjema",
      phone: "+213 555 234 567",
      isGuest: false
    },
    source: "qr",
    terminal: null,
    paymentMethod: "other",
    amount: 22000,
    currency: "DA",
    fee: 440,
    netAmount: 21560,
    status: "failed",
    createdAt: "2026-07-20T18:04:00.000Z",
    completedAt: null,
    settlement: {
      destination: "balance",
      status: "not_applicable"
    },
    refund: {
      status: "not_refunded"
    }
  },
  {
    id: "TXN-FA2963",
    customer: {
      name: "Sara Khelifi",
      phone: "+213 555 654 321",
      isGuest: false
    },
    source: "vtpe",
    terminal: "Algiers Center",
    paymentMethod: "bank_transfer",
    amount: 6700,
    currency: "DA",
    fee: 134,
    netAmount: 6566,
    status: "successful",
    createdAt: "2026-07-19T20:06:00.000Z",
    completedAt: "2026-07-19T20:07:00.000Z",
    settlement: {
      destination: "balance",
      status: "settled",
      amount: 6566,
      settledAt: "2026-07-20T09:00:00.000Z"
    },
    refund: {
      status: "not_refunded"
    }
  },
  {
    id: "TXN-A895E9",
    customer: {
      name: "Sarah Karim",
      phone: "+213 555 222 111",
      isGuest: false
    },
    source: "api",
    terminal: null,
    paymentMethod: "wallet",
    amount: 10000,
    currency: "DA",
    fee: 200,
    netAmount: 9800,
    status: "successful",
    createdAt: "2026-07-19T13:40:00.000Z",
    completedAt: "2026-07-19T13:41:00.000Z",
    settlement: {
      destination: "bank_account",
      status: "settled",
      amount: 9800,
      settledAt: "2026-07-20T09:00:00.000Z"
    },
    refund: {
      status: "not_refunded"
    }
  },
  {
    id: "TXN-FB84EF",
    customer: {
      name: "Omar Belkacem",
      phone: "+213 555 111 222",
      isGuest: false
    },
    source: "vtpe",
    terminal: "TEST",
    paymentMethod: "wallet",
    amount: 4500,
    currency: "DA",
    fee: 90,
    netAmount: 4410,
    status: "successful",
    createdAt: "2026-07-19T12:30:00.000Z",
    completedAt: "2026-07-19T12:31:00.000Z",
    settlement: {
      destination: "bank_account",
      status: "settled",
      amount: 4410,
      settledAt: "2026-07-20T09:00:00.000Z"
    },
    refund: {
      status: "not_refunded"
    }
  },
  {
    id: "TXN-A0B976",
    customer: {
      name: "Sarah Karim",
      phone: "+213 555 222 111",
      isGuest: false
    },
    source: "payment_link",
    terminal: null,
    paymentMethod: "wallet",
    amount: 4500,
    currency: "DA",
    fee: 90,
    netAmount: 4410,
    status: "successful",
    createdAt: "2026-07-19T12:14:00.000Z",
    completedAt: "2026-07-19T12:15:00.000Z",
    settlement: {
      destination: "balance",
      status: "settled",
      amount: 4410,
      settledAt: "2026-07-20T09:00:00.000Z"
    },
    refund: {
      status: "not_refunded"
    }
  },
  {
    id: "TXN-912E77",
    customer: {
      name: "Mohamed Ali",
      phone: "+213 555 444 333",
      isGuest: false
    },
    source: "qr",
    terminal: null,
    paymentMethod: "cib",
    amount: 8000,
    currency: "DA",
    fee: 160,
    netAmount: 7840,
    status: "successful",
    createdAt: "2026-07-17T08:54:00.000Z",
    completedAt: "2026-07-17T08:55:00.000Z",
    settlement: {
      destination: "bank_account",
      status: "settled",
      amount: 7840,
      settledAt: "2026-07-18T09:00:00.000Z"
    },
    refund: {
      status: "not_refunded"
    }
  },
  {
    id: "TXN-61E012",
    customer: {
      name: "Fethi Dahmani",
      phone: "+213 555 333 444",
      isGuest: false
    },
    source: "vtpe",
    terminal: "Constantine",
    paymentMethod: "wallet",
    amount: 8000,
    currency: "DA",
    fee: 160,
    netAmount: 7840,
    status: "pending",
    createdAt: "2026-07-16T16:28:00.000Z",
    completedAt: null,
    settlement: {
      destination: "balance",
      status: "not_applicable"
    },
    refund: {
      status: "not_refunded"
    }
  },
  {
    id: "TXN-C3086E",
    customer: {
      name: "Mohamed Ali",
      phone: "+213 555 444 333",
      isGuest: false
    },
    source: "api",
    terminal: null,
    paymentMethod: "wallet",
    amount: 4500,
    currency: "DA",
    fee: null,
    netAmount: null,
    status: "refunded",
    createdAt: "2026-07-16T13:08:00.000Z",
    completedAt: "2026-07-16T13:09:00.000Z",
    settlement: {
      destination: "balance",
      status: "not_applicable"
    },
    refund: {
      status: "refunded",
      amount: 4500,
      requestedAt: "2026-07-16T13:13:00.000Z",
      completedAt: "2026-07-17T13:18:00.000Z",
      reference: "RF-C3086E"
    }
  },
  {
    id: "TXN-FB99E8",
    customer: {
      name: "Guest customer",
      isGuest: true
    },
    source: "qr",
    terminal: null,
    paymentMethod: "wallet",
    amount: 4500,
    currency: "DA",
    fee: 90,
    netAmount: 4410,
    status: "successful",
    createdAt: "2026-07-16T10:21:00.000Z",
    completedAt: "2026-07-16T10:22:00.000Z",
    settlement: {
      destination: "balance",
      status: "settled",
      amount: 4410,
      settledAt: "2026-07-17T09:00:00.000Z"
    },
    refund: {
      status: "not_refunded"
    }
  },
  {
    id: "TXN-B5E0E3",
    customer: {
      name: "Leila Boudjema",
      phone: "+213 555 234 567",
      isGuest: false
    },
    source: "api",
    terminal: null,
    paymentMethod: "wallet",
    amount: 18500,
    currency: "DA",
    fee: 370,
    netAmount: 18130,
    status: "successful",
    createdAt: "2026-07-14T11:01:00.000Z",
    completedAt: "2026-07-14T11:02:00.000Z",
    settlement: {
      destination: "bank_account",
      status: "settled",
      amount: 18130,
      settledAt: "2026-07-15T09:00:00.000Z"
    },
    refund: {
      status: "not_refunded"
    }
  },
  {
    id: "TXN-604DC7",
    customer: {
      name: "Leila Boudjema",
      phone: "+213 555 234 567",
      isGuest: false
    },
    source: "vtpe",
    terminal: "RERE",
    paymentMethod: "wallet",
    amount: 12000,
    currency: "DA",
    fee: 240,
    netAmount: 11760,
    status: "successful",
    createdAt: "2026-07-13T20:54:00.000Z",
    completedAt: "2026-07-13T20:55:00.000Z",
    settlement: {
      destination: "balance",
      status: "settled",
      amount: 11760,
      settledAt: "2026-07-14T09:00:00.000Z"
    },
    refund: {
      status: "not_refunded"
    }
  },
  {
    id: "TXN-7D49F8",
    customer: {
      name: "Guest customer",
      isGuest: true
    },
    source: "qr",
    terminal: null,
    paymentMethod: "wallet",
    amount: 6700,
    currency: "DA",
    fee: 134,
    netAmount: 6566,
    status: "successful",
    createdAt: "2026-07-13T13:49:00.000Z",
    completedAt: "2026-07-13T13:50:00.000Z",
    settlement: {
      destination: "balance",
      status: "settled",
      amount: 6566,
      settledAt: "2026-07-14T09:00:00.000Z"
    },
    refund: {
      status: "not_refunded"
    }
  },
  {
    id: "TXN-A3E737",
    customer: {
      name: "Mohamed Ali",
      phone: "+213 555 444 333",
      isGuest: false
    },
    source: "payment_link",
    terminal: null,
    paymentMethod: "edahabia",
    amount: 10000,
    currency: "DA",
    fee: 200,
    netAmount: 9800,
    status: "successful",
    createdAt: "2026-07-12T13:43:00.000Z",
    completedAt: "2026-07-12T13:44:00.000Z",
    settlement: {
      destination: "balance",
      status: "settled",
      amount: 9800,
      settledAt: "2026-07-13T09:00:00.000Z"
    },
    refund: {
      status: "not_refunded"
    }
  },
  {
    id: "TXN-9F584E",
    customer: {
      name: "Omar Belkacem",
      phone: "+213 555 111 222",
      isGuest: false
    },
    source: "api",
    terminal: null,
    paymentMethod: "cib",
    amount: 15000,
    currency: "DA",
    fee: 300,
    netAmount: 14700,
    status: "successful",
    createdAt: "2026-07-11T17:33:00.000Z",
    completedAt: "2026-07-11T17:34:00.000Z",
    settlement: {
      destination: "balance",
      status: "settled",
      amount: 14700,
      settledAt: "2026-07-12T09:00:00.000Z"
    },
    refund: {
      status: "not_refunded"
    }
  },
  {
    id: "TXN-D529E6",
    customer: {
      name: "Ahmed Benali",
      phone: "+213 555 123 456",
      isGuest: false
    },
    source: "api",
    terminal: null,
    paymentMethod: "cib",
    amount: 2200,
    currency: "DA",
    fee: 44,
    netAmount: 2156,
    status: "successful",
    createdAt: "2026-07-11T12:52:00.000Z",
    completedAt: "2026-07-11T12:53:00.000Z",
    settlement: {
      destination: "balance",
      status: "settled",
      amount: 2156,
      settledAt: "2026-07-12T09:00:00.000Z"
    },
    refund: {
      status: "not_refunded"
    }
  },
  {
    id: "TXN-9ABBA4",
    customer: {
      name: "Sara Khelifi",
      phone: "+213 555 654 321",
      isGuest: false
    },
    source: "vtpe",
    terminal: "TEST",
    paymentMethod: "wallet",
    amount: 22000,
    currency: "DA",
    fee: 440,
    netAmount: 21560,
    status: "successful",
    createdAt: "2026-07-09T20:40:00.000Z",
    completedAt: "2026-07-09T20:41:00.000Z",
    settlement: {
      destination: "balance",
      status: "settled",
      amount: 21560,
      settledAt: "2026-07-10T09:00:00.000Z"
    },
    refund: {
      status: "not_refunded"
    }
  },
  {
    id: "TXN-AFEC0E",
    customer: {
      name: "Karim Aitouche",
      phone: "+213 555 999 000",
      isGuest: false
    },
    source: "vtpe",
    terminal: "Store Bab Ezzouar",
    paymentMethod: "wallet",
    amount: 15000,
    currency: "DA",
    fee: 300,
    netAmount: 14700,
    status: "successful",
    createdAt: "2026-07-07T19:25:00.000Z",
    completedAt: "2026-07-07T19:26:00.000Z",
    settlement: {
      destination: "balance",
      status: "settled",
      amount: 14700,
      settledAt: "2026-07-08T09:00:00.000Z"
    },
    refund: {
      status: "not_refunded"
    }
  },
  {
    id: "TXN-2BD300",
    customer: {
      name: "Guest customer",
      isGuest: true
    },
    source: "qr",
    terminal: null,
    paymentMethod: "wallet",
    amount: 5000,
    currency: "DA",
    fee: 100,
    netAmount: 4900,
    status: "successful",
    createdAt: "2026-07-06T08:21:00.000Z",
    completedAt: "2026-07-06T08:22:00.000Z",
    settlement: {
      destination: "balance",
      status: "settled",
      amount: 4900,
      settledAt: "2026-07-07T09:00:00.000Z"
    },
    refund: {
      status: "not_refunded"
    }
  },
  {
    id: "TXN-F156F3",
    customer: {
      name: "Imane Cherif",
      phone: "+213 555 888 999",
      isGuest: false
    },
    source: "payment_link",
    terminal: null,
    paymentMethod: "bank_transfer",
    amount: 22000,
    currency: "DA",
    fee: 440,
    netAmount: 21560,
    status: "successful",
    createdAt: "2026-07-05T17:56:00.000Z",
    completedAt: "2026-07-05T17:57:00.000Z",
    settlement: {
      destination: "balance",
      status: "settled",
      amount: 21560,
      settledAt: "2026-07-06T09:00:00.000Z"
    },
    refund: {
      status: "not_refunded"
    }
  },
  {
    id: "TXN-922888",
    customer: {
      name: "Yacine Mezhoud",
      phone: "+213 555 987 654",
      isGuest: false
    },
    source: "qr",
    terminal: null,
    paymentMethod: "wallet",
    amount: 10000,
    currency: "DA",
    fee: 200,
    netAmount: 9800,
    status: "refunded",
    createdAt: "2026-07-05T14:56:00.000Z",
    completedAt: "2026-07-05T14:57:00.000Z",
    settlement: {
      destination: "balance",
      status: "not_applicable"
    },
    refund: {
      status: "refunded",
      amount: 10000,
      requestedAt: "2026-07-05T14:59:00.000Z",
      completedAt: "2026-07-06T14:59:00.000Z",
      reference: "RF-922888"
    }
  },
  {
    id: "TXN-F32CB8",
    customer: {
      name: "Sarah Karim",
      phone: "+213 555 222 111",
      isGuest: false
    },
    source: "vtpe",
    terminal: "Store Bab Ezzouar",
    paymentMethod: "bank_transfer",
    amount: 8000,
    currency: "DA",
    fee: 160,
    netAmount: 7840,
    status: "successful",
    createdAt: "2026-07-04T13:00:00.000Z",
    completedAt: "2026-07-04T13:01:00.000Z",
    settlement: {
      destination: "balance",
      status: "settled",
      amount: 7840,
      settledAt: "2026-07-05T09:00:00.000Z"
    },
    refund: {
      status: "not_refunded"
    }
  },
  {
    id: "TXN-CC2509",
    customer: {
      name: "Guest customer",
      isGuest: true
    },
    source: "payment_link",
    terminal: null,
    paymentMethod: "wallet",
    amount: 3800,
    currency: "DA",
    fee: 76,
    netAmount: 3724,
    status: "successful",
    createdAt: "2026-07-03T08:08:00.000Z",
    completedAt: "2026-07-03T08:09:00.000Z",
    settlement: {
      destination: "bank_account",
      status: "settled",
      amount: 3724,
      settledAt: "2026-07-04T09:00:00.000Z"
    },
    refund: {
      status: "not_refunded"
    }
  },
  {
    id: "TXN-D820A4",
    customer: {
      name: "Yacine Mezhoud",
      phone: "+213 555 987 654",
      isGuest: false
    },
    source: "payment_link",
    terminal: null,
    paymentMethod: "cib",
    amount: 3800,
    currency: "DA",
    fee: 76,
    netAmount: 3724,
    status: "successful",
    createdAt: "2026-07-01T12:49:00.000Z",
    completedAt: "2026-07-01T12:50:00.000Z",
    settlement: {
      destination: "bank_account",
      status: "settled",
      amount: 3724,
      settledAt: "2026-07-02T09:00:00.000Z"
    },
    refund: {
      status: "not_refunded"
    }
  },
  {
    id: "TXN-A36C57",
    customer: {
      name: "Sarah Karim",
      phone: "+213 555 222 111",
      isGuest: false
    },
    source: "payment_link",
    terminal: null,
    paymentMethod: "edahabia",
    amount: 5000,
    currency: "DA",
    fee: 100,
    netAmount: 4900,
    status: "successful",
    createdAt: "2026-06-30T08:37:00.000Z",
    completedAt: "2026-06-30T08:38:00.000Z",
    settlement: {
      destination: "bank_account",
      status: "settled",
      amount: 4900,
      settledAt: "2026-07-01T09:00:00.000Z"
    },
    refund: {
      status: "not_refunded"
    }
  },
  {
    id: "TXN-26A158",
    customer: {
      name: "Yacine Mezhoud",
      phone: "+213 555 987 654",
      isGuest: false
    },
    source: "api",
    terminal: null,
    paymentMethod: "wallet",
    amount: 4500,
    currency: "DA",
    fee: 90,
    netAmount: 4410,
    status: "successful",
    createdAt: "2026-06-28T08:00:00.000Z",
    completedAt: "2026-06-28T08:01:00.000Z",
    settlement: {
      destination: "balance",
      status: "settled",
      amount: 4410,
      settledAt: "2026-06-29T09:00:00.000Z"
    },
    refund: {
      status: "not_refunded"
    }
  },
  {
    id: "TXN-6A1FD3",
    customer: {
      name: "Guest customer",
      isGuest: true
    },
    source: "payment_link",
    terminal: null,
    paymentMethod: "cib",
    amount: 4500,
    currency: "DA",
    fee: 90,
    netAmount: 4410,
    status: "failed",
    createdAt: "2026-06-27T08:54:00.000Z",
    completedAt: null,
    settlement: {
      destination: "bank_account",
      status: "not_applicable"
    },
    refund: {
      status: "not_refunded"
    }
  },
  {
    id: "TXN-75B627",
    customer: {
      name: "Sarah Karim",
      phone: "+213 555 222 111",
      isGuest: false
    },
    source: "api",
    terminal: null,
    paymentMethod: "wallet",
    amount: 5000,
    currency: "DA",
    fee: 100,
    netAmount: 4900,
    status: "successful",
    createdAt: "2026-06-26T20:20:00.000Z",
    completedAt: "2026-06-26T20:21:00.000Z",
    settlement: {
      destination: "balance",
      status: "settled",
      amount: 4900,
      settledAt: "2026-06-27T09:00:00.000Z"
    },
    refund: {
      status: "not_refunded"
    }
  },
  {
    id: "TXN-CDEDEB",
    customer: {
      name: "Guest customer",
      isGuest: true
    },
    source: "qr",
    terminal: null,
    paymentMethod: "bank_transfer",
    amount: 22000,
    currency: "DA",
    fee: 440,
    netAmount: 21560,
    status: "successful",
    createdAt: "2026-06-26T14:46:00.000Z",
    completedAt: "2026-06-26T14:47:00.000Z",
    settlement: {
      destination: "bank_account",
      status: "settled",
      amount: 21560,
      settledAt: "2026-06-27T09:00:00.000Z"
    },
    refund: {
      status: "not_refunded"
    }
  },
  {
    id: "TXN-76964A",
    customer: {
      name: "Asma Lamali",
      phone: "+213 555 666 777",
      isGuest: false
    },
    source: "api",
    terminal: null,
    paymentMethod: "cib",
    amount: 18500,
    currency: "DA",
    fee: null,
    netAmount: null,
    status: "successful",
    createdAt: "2026-06-25T13:12:00.000Z",
    completedAt: "2026-06-25T13:13:00.000Z",
    settlement: {
      destination: "bank_account",
      status: "settled",
      amount: 18500,
      settledAt: "2026-06-26T09:00:00.000Z"
    },
    refund: {
      status: "not_refunded"
    }
  },
  {
    id: "TXN-AE3C21",
    customer: {
      name: "Guest customer",
      isGuest: true
    },
    source: "api",
    terminal: null,
    paymentMethod: "cib",
    amount: 12000,
    currency: "DA",
    fee: 240,
    netAmount: 11760,
    status: "failed",
    createdAt: "2026-06-24T20:57:00.000Z",
    completedAt: null,
    settlement: {
      destination: "balance",
      status: "not_applicable"
    },
    refund: {
      status: "not_refunded"
    }
  },
  {
    id: "TXN-3ED5D1",
    customer: {
      name: "Guest customer",
      isGuest: true
    },
    source: "vtpe",
    terminal: "TEST",
    paymentMethod: "other",
    amount: 22000,
    currency: "DA",
    fee: 440,
    netAmount: 21560,
    status: "successful",
    createdAt: "2026-06-24T16:39:00.000Z",
    completedAt: "2026-06-24T16:40:00.000Z",
    settlement: {
      destination: "balance",
      status: "settled",
      amount: 21560,
      settledAt: "2026-06-25T09:00:00.000Z"
    },
    refund: {
      status: "not_refunded"
    }
  },
  {
    id: "TXN-E99A32",
    customer: {
      name: "Yacine Mezhoud",
      phone: "+213 555 987 654",
      isGuest: false
    },
    source: "vtpe",
    terminal: "Store Bab Ezzouar",
    paymentMethod: "cib",
    amount: 2200,
    currency: "DA",
    fee: 44,
    netAmount: 2156,
    status: "successful",
    createdAt: "2026-06-24T08:01:00.000Z",
    completedAt: "2026-06-24T08:02:00.000Z",
    settlement: {
      destination: "bank_account",
      status: "settled",
      amount: 2156,
      settledAt: "2026-06-25T09:00:00.000Z"
    },
    refund: {
      status: "not_refunded"
    }
  }
];
