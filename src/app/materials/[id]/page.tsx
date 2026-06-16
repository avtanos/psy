import { MOCK_MATERIALS } from "@/lib/mock-data";
import { MaterialDetailClient } from "./client";

export function generateStaticParams() {
  return MOCK_MATERIALS.map((m) => ({ id: m.id }));
}

export default function MaterialPage({ params }: { params: { id: string } }) {
  const m = MOCK_MATERIALS.find((x) => x.id === params.id) ?? MOCK_MATERIALS[0];
  return <MaterialDetailClient material={m} />;
}
