import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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

export async function getServerSideProps() {
  const formDatas = await prisma.formData.findMany();

  const formDatasSerializable = formDatas.map((formData) => ({
    ...formData,
    createdAt: formData.createdAt.toISOString(),
  }));

  return {
    props: {
      formDatas: formDatasSerializable,
    },
  };
}

export default function Admin({ formDatas }: Props) {
  return (
    <div>
      {formDatas.map((formData: FormData) => (
        <div key={formData.id}>
          <h2>{formData.name}</h2>
          <p>{formData.email}</p>
          <p>{formData.message}</p>
          <p>{new Date(formData.createdAt).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
}
