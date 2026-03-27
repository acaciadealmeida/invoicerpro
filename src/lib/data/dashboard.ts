export const dashboardStats = {
  activeCustomers: { value: 93, change: "+2.18%", trend: "up" as const },
  totalProfit:     { value: 280900, change: "+8.26%", trend: "up" as const },   // in pence
  overduePayments: { value: 7,  change: "-3.15%", trend: "down" as const },
  revenue:         { value: 802000, change: "+12.92%", trend: "up" as const }, // in pence
};

export interface RevenueDataPoint {
  label: string;
  amount: number; // in pence
}

export const revenueChartData: RevenueDataPoint[] = [
  { label: "1 st",  amount: 192000 },
  { label: "",      amount: 162000 },
  { label: "",      amount: 8000   },
  { label: "",      amount: 120000 },
  { label: "",      amount: 245000 },
  { label: "",      amount: 42000  },
  { label: "7 th",  amount: 0      },
  { label: "",      amount: 98000  },
  { label: "",      amount: 42000  },
  { label: "",      amount: 180000 },
  { label: "",      amount: 62000  },
  { label: "",      amount: 8000   },
  { label: "",      amount: 52000  },
  { label: "",      amount: 25000  },
  { label: "15 th", amount: 60000  },
  { label: "",      amount: 10000  },
  { label: "",      amount: 30000  },
  { label: "",      amount: 5000   },
  { label: "",      amount: 78000  },
  { label: "",      amount: 15000  },
  { label: "",      amount: 8000   },
  { label: "22 th", amount: 5000   },
  { label: "",      amount: 32000  },
  { label: "",      amount: 48000  },
  { label: "",      amount: 5000   },
  { label: "",      amount: 12000  },
  { label: "",      amount: 18000  },
  { label: "",      amount: 38000  },
  { label: "",      amount: 25000  },
  { label: "30 th", amount: 55000  },
];
