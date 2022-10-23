import { Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
  async POST(req) {
    const body = await req.formData();
    const header = ["Password", "Hash"];
    const h = Array.from(body.values()).map((v) => v.split(","));
    const merge = [
      header,
      ...h,
    ];
    const d = merge.map((v) => {
      const i = v.map((v) => {
        return '"' + v + '"';
      });
      return i.join(",");
    }).join("\r\n");

    return new Response(d, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=UTF-8",
        "Content-disposition": "attachment; filename=password_list.csv",
      },
    });
  },
};
