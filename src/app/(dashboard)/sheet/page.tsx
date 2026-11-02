"use client";

import { useEffect, useState } from "react";

export default function SheetPage() {
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/sheets")
      .then((r) => r.json())
      .then((data) => {
        if (data.error) setError(data.error);
        else setResult(data);
      })
      .catch(() => setError("Não foi possível ler a planilha"));
  }, []);

  if (error) return <main className="p-8"><h1>Planilha</h1><p>{error}</p></main>;
  if (!result) return <main className="p-8"><h1>Planilha</h1><p>Carregando...</p></main>;

  return (
    <main className="p-8 space-y-8">
      <div><h1 className="text-2xl font-bold">Dados da planilha</h1><p>Última leitura: {result.updated_at}</p></div>
      {Object.entries(result.data).map(([name, rows]: any) => (
        <section key={name}>
          <h2 className="text-xl font-semibold mb-3">{name}</h2>
          <div className="overflow-auto"><table className="min-w-full text-sm"><tbody>
            {rows.map((row: any[], i: number) => <tr key={i}>{row.map((cell, j) => <td key={j} className="border p-2">{String(cell ?? "")}</td>)}</tr>)}
          </tbody></table></div>
        </section>
      ))}
    </main>
  );
}
