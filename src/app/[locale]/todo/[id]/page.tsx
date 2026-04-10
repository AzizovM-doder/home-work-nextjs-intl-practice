// app/todo/[id]/page.tsx

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function TodoPage({ params }: PageProps) {
  // 1. Await the params (Required in Next.js 15)
  const { id } = await params;

  // 2. Fetch data directly from your API
  const res = await fetch(`http://37.27.29.18:8001/api/to-dos/${id}`, {
    cache: 'no-store', // Ensures you get fresh data every time
  });

  const todo = await res.json();
  const data = todo.data; // Adjust based on your API response structure

  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold">{data.name}</h1>
      <p className="text-gray-600 my-4">{data.description}</p>
      
      <div className="grid grid-cols-2 gap-4">
        {data.images?.map((img: any) => (
          <img
            key={img.id}
            src={`http://37.27.29.18:8001/images/${img.imageName}`}
            alt="todo"
            className="rounded-xl w-full h-auto"
          />
        ))}
      </div>
    </div>
  );
}