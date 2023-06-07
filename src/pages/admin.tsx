import { FormEvent, useState } from "react";

interface FormData {
  id: number;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

interface Props {
  formDatas: FormData[];
}

export default function Admin() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [formDatas, setFormDatas] = useState<FormData[]>([]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      password: { value: string };
    };

    const response = await fetch("/api/admin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: target.password.value }),
    });

    if (response.ok) {
      const data = await response.json();
      setFormDatas(data);
      setIsAdmin(true);
    }
  }
  if (isAdmin) {
    return <Table formDatas={formDatas} />;
  }
  if (!isAdmin) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <form onSubmit={handleSubmit} className="flex">
          <input
            type="password"
            name="password"
            id="password"
            className="border-2 bg-transparent p-1 text-5xl outline-none"
          />
          <input type="submit" className="bg-zinc-200 px-2 text-black" />
        </form>
      </main>
    );
  }
}

export function Table({ formDatas }: Props) {
  return (
    <>
      <main className="mx-auto min-h-screen max-w-6xl border-x-2 pt-20">
        <div className="flex gap-10 border-b-2 pb-5 text-center [&>*]:basis-1/4">
          <div>Name</div>
          <div>Email</div>
          <div>Message</div>
          <div>Date</div>
        </div>
        <div className="flex flex-col-reverse">
          {formDatas.map((formData: FormData) => (
            <div
              key={formData.id}
              className="flex gap-10 text-center [&>*]:basis-1/4 [&>*]:py-5"
            >
              <h2>{formData.name}</h2>
              <p>{formData.email}</p>
              <p>{formData.message}</p>
              <p>{new Date(formData.createdAt).toLocaleString()}</p>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
