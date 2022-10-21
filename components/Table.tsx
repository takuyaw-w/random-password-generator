type Props = {
  headers: Header[];
  rows: any[];
};

type Header = {
  field: string;
  headerName: string;
};

export function Table(props: Props) {
  const { headers, rows } = props;
  return (
    <table class="min-w-full table-auto">
      <thead class="bg-gray-800">
        <tr class="text-white">
          {headers.map((h) => <th class="p-4" key={h}>{h.headerName}</th>)}
        </tr>
      </thead>
      <tbody>
        {rows.map((r, i) => {
          return (
            <tr class={i % 2 === 0 ? "bg-gray-50" : "bg-gray-200"} key={r}>
              {headers.map((h) => {
                return <td class="p-4 text-center" key={h}>{r[h.field]}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
