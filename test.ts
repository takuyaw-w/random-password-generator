type Props = {
  headers: Header[];
  rows: any[];
};

type Header = {
  field: string;
  headerName: string;
};

const header: Header[] = [
  {
    field: "hoge",
    headerName: "hoge",
  },
  {
    field: "fuga",
    headerName: "fuga",
  },
];

const rows = [
  {
    "hoge": 1,
    "fuga": 2,
  },
  {
    "hoge": 1,
    "fuga": 2,
  },
  {
    "hoge": 1,
    "fuga": 2,
  },
  {
    "hoge": 1,
    "fuga": 2,
  },
  {
    "hoge": 1,
    "fuga": 2,
  },
  {
    "hoge": 1,
    "fuga": 2,
  },
];

const hoge = header.map((h) =>
  rows.map((r) => {
    console.log(r[h.field]);
  })
);
