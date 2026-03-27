export type MandateStatus = "active" | "pending" | "cancelled" | "expired";

export interface Customer {
  id: string;
  name: string;
  email: string;
  mandateStatus: MandateStatus;
  mandateReference: string;
  address: string;
  city: string;
  postcode: string;
  country: string;
  createdAt: string;
}

export const customers: Customer[] = [
  { id: "CU001", name: "Sarah Robin",    email: "srobin@mail.com",      mandateStatus: "active",    mandateReference: "PBPW78JTH",  address: "12, Oak Street", city: "San Francisco", postcode: "94102", country: "US", createdAt: "2024-01-15" },
  { id: "CU002", name: "Daryl Eddy",     email: "daryl@example.com",    mandateStatus: "active",    mandateReference: "VY8CBR2J8",  address: "5, Maple Ave",   city: "London",        postcode: "EC1A 1BB", country: "GB", createdAt: "2024-02-03" },
  { id: "CU003", name: "Myron Arleen",   email: "myron@ee.com",         mandateStatus: "active",    mandateReference: "VZZCY8JH7",  address: "8, Pine Road",   city: "Manchester",    postcode: "M1 1AA", country: "GB", createdAt: "2024-02-18" },
  { id: "CU004", name: "Vinnie Dawn",    email: "vdawn@o2.net",         mandateStatus: "active",    mandateReference: "WECM11SG0",  address: "3, Birch Lane",  city: "Birmingham",    postcode: "B1 1BB", country: "GB", createdAt: "2024-03-05" },
  { id: "CU005", name: "Carmella Monna", email: "cmonna@ee.com",        mandateStatus: "active",    mandateReference: "WJEB5BQX9",  address: "17, Elm Drive",  city: "Leeds",         postcode: "LS1 1AA", country: "GB", createdAt: "2024-03-22" },
  { id: "CU006", name: "Joanne Smith",   email: "jsmith@gmail.com",     mandateStatus: "active",    mandateReference: "WKV5VF0J1",  address: "2, Oak Street",  city: "San Francisco", postcode: "94102", country: "US", createdAt: "2024-04-10" },
  { id: "CU007", name: "Thomas Karly",   email: "tkarly@gmail.com",     mandateStatus: "active",    mandateReference: "Y477KKQZ3",  address: "9, Cedar Close", city: "Bristol",       postcode: "BS1 1AA", country: "GB", createdAt: "2024-04-28" },
  { id: "CU008", name: "Romey Dove",     email: "romey@gmail.com",      mandateStatus: "active",    mandateReference: "Y6RXZMM0P",  address: "21, Ash Court",  city: "Sheffield",     postcode: "S1 1AA", country: "GB", createdAt: "2024-05-14" },
  { id: "CU009", name: "Rikki Jude",     email: "rjud@gmail.com",       mandateStatus: "active",    mandateReference: "WECM11SG0",  address: "6, Walnut Way",  city: "Liverpool",     postcode: "L1 1AA", country: "GB", createdAt: "2024-05-30" },
  { id: "CU010", name: "Alex Blay",      email: "alexb@gmail.com",      mandateStatus: "active",    mandateReference: "VZZCY8JH7",  address: "33, Lime Street", city: "Edinburgh",    postcode: "EH1 1AA", country: "GB", createdAt: "2024-06-08" },
  { id: "CU011", name: "Petra Sands",    email: "petra.s@work.com",     mandateStatus: "pending",   mandateReference: "MN3KL9PQ2",  address: "14, Ivy Road",   city: "Oxford",        postcode: "OX1 1AA", country: "GB", createdAt: "2024-06-20" },
  { id: "CU012", name: "Leon Cruz",      email: "lcruz@studio.io",      mandateStatus: "pending",   mandateReference: "ZT5WR1MX8",  address: "7, Fern Place",  city: "Cambridge",     postcode: "CB1 1AA", country: "GB", createdAt: "2024-07-02" },
  { id: "CU013", name: "Faye Morton",    email: "fmorton@biz.com",      mandateStatus: "cancelled", mandateReference: "QP9BN6TJ4",  address: "2, Rose Ave",    city: "York",          postcode: "YO1 1AA", country: "GB", createdAt: "2024-01-05" },
  { id: "CU014", name: "Gary Bell",      email: "gbell@corp.net",       mandateStatus: "expired",   mandateReference: "HV2CM7SK1",  address: "50, Bay View",   city: "Brighton",      postcode: "BN1 1AA", country: "GB", createdAt: "2023-11-12" },
  { id: "CU015", name: "Nina Voss",      email: "nina.voss@mail.de",    mandateStatus: "active",    mandateReference: "LK8DP3FW6",  address: "Berliner Str 4", city: "Berlin",        postcode: "10115", country: "DE", createdAt: "2024-07-15" },
];
