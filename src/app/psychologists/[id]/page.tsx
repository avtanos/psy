import { MOCK_PSYCHOLOGISTS, MOCK_REVIEWS } from "@/lib/mock-data";
import { PsychologistDetailClient } from "./client";

export function generateStaticParams() {
  return MOCK_PSYCHOLOGISTS.map((p) => ({ id: p.id }));
}

export default function PsychologistDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const p = MOCK_PSYCHOLOGISTS.find((x) => x.id === params.id) ?? MOCK_PSYCHOLOGISTS[0];
  const reviews = MOCK_REVIEWS[p.id] ?? [];
  return <PsychologistDetailClient psychologist={p} reviews={reviews} />;
}
