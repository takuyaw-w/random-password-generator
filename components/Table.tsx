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
  const hasData = rows.length > 0;
  const numOfColumn = headers.length;
  return (
    <div class="overflow-hidden shadow rounded overflow-x-auto">
      <table class="min-w-full">
        <thead class="bg-gray-800">
          <tr>
            {headers.map((h) => (
              <th class="text-white p-4" key={h}>{h.headerName}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {hasData
            ? rows.map((r, i) => {
              return (
                <tr class={i % 2 === 0 ? "bg-gray-50" : "bg-gray-200"} key={r}>
                  {headers.map((h) => {
                    return (
                      <td class="p-4 text-center" key={h}>
                        {r[h.field]}
                      </td>
                    );
                  })}
                </tr>
              );
            })
            : (
              <tr class="bg-gray-50">
                <td colSpan={numOfColumn} class="p-4 text-center">
                  Empty Data...
                </td>
              </tr>
            )}
        </tbody>
      </table>
    </div>
  );
}
